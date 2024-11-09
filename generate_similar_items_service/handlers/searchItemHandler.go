package handlers

import (
	"context"
	"encoding/json"
	"fmt"
	"generate_similar_items_service/ai"
	"generate_similar_items_service/scrapers"
	"net/http"
	"os"
	"strings"
)

// RequestBody struct to capture incoming request body
type RequestBody struct {
	Platform    string `json:"platform"`
	ItemID      string `json:"itemID"`
	Title       string `json:"title"`
	Details     string `json:"details"`
	Description string `json:"description"`
}

type Response struct {
	SearchKeyWords string                        `json:"searchKeyWords"`
	Products       map[string][]scrapers.Product `json:"products"`
}

// SearchLinksGenerator handles the HTTP request and generates Amazon and eBay search links.
func SearchItemHandler(w http.ResponseWriter, r *http.Request) {
	// Check if method is POST
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	// Parse request body
	var body RequestBody
	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	// Validate required fields
	if body.Platform == "" || body.ItemID == "" || body.Title == "" || body.Details == "" || body.Description == "" {
		http.Error(w, "Missing field. The itemID, title, details and description should not be null.", http.StatusBadRequest)
		return
	}

	searchKeyWords, err := getSearchKeywords(r.Context(), body)

	if err != nil {
		http.Error(w, fmt.Sprintf("Failed to generate content: %v", err), http.StatusInternalServerError)
		return
	}

	// Generate Amazon and eBay links
	products, _ := scrapeProducts(searchKeyWords)

	response := Response{
		SearchKeyWords: searchKeyWords,
		Products:       products,
	}

	// Send response
	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(response); err != nil {
		http.Error(w, "Failed to send response", http.StatusInternalServerError)
	}
}

func scrapeProducts(searchKeyWords string) (map[string][]scrapers.Product, error) {

	var err error
	searchKeyWords = strings.Join(strings.Fields(searchKeyWords), "+")
	products := make(map[string][]scrapers.Product)
	//products["Amazon"] = ScrapeAmazon(fmt.Sprintf("https://www.amazon.com/s?k=%s", searchKeyWords))
	products["Ebay"], err = scrapers.ScrapeEbay(fmt.Sprintf("https://www.ebay.com/sch/%s", searchKeyWords))
	if err != nil {
		return nil, fmt.Errorf("failed to scrape eBay: %v", err)
	}
	return products, nil
}

func getSearchKeywords(ctx context.Context, body RequestBody) (string, error) {

	// Construct the prompt for content generation
	prompt := fmt.Sprintf("I am browsing an item in Facebook Marketplace. The title of this item is: %s. The details of this item are: %s. The description of this item is: %s. "+
		"I want to find the same items in Amazon. Please provide me with the search keywords including brands, model, size, etc. Please respond only with the search keywords joined by space.",
		body.Title, body.Details, body.Description)

	// Call connectGeminiAI to generate the search keywords
	searchKeywords, err := ai.PromptAI(ctx, prompt, os.Getenv("AI_PLATFORM"))
	if err != nil {
		return "", fmt.Errorf("failed to generate content: %v", err)
	}
	return searchKeywords, nil
}
