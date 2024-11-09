package main

import (
	"encoding/json"
	"fmt"
	"net/http"
)

// RequestBody struct to capture incoming request body
type RequestBody struct {
	Platform    string `json:"platform"`
	ItemID      string `json:"itemID"`
	Title       string `json:"title"`
	Details     string `json:"details"`
	Description string `json:"description"`
}

type Product struct {
	Title       string
	Price       string
	Image       string
	ProductLink string
}

type Response struct {
	AmazonProducts []Product `json:"amazon_products"`
	EbayProducts   []Product `json:"ebay_products"`
}

// SearchLinksGenerator handles the HTTP request and generates Amazon and eBay search links.
func RequestHandler(w http.ResponseWriter, r *http.Request) {
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

	// Construct the prompt for content generation
	prompt := fmt.Sprintf("I am browsing an item in Facebook Marketplace. The title of this item is: %s. The details of this item are: %s. The description of this item is: %s. "+
		"I want to find the same items in Amazon. Please provide me with the search keywords including brands, model, size, etc. Please respond only with the search keywords joined by space.",
		body.Title, body.Details, body.Description)

	// Call connectGeminiAI to generate the search keywords
	searchKeywords, err := ConnectGeminiAI(r.Context(), prompt)
	if err != nil {
		http.Error(w, fmt.Sprintf("Failed to generate content: %v", err), http.StatusInternalServerError)
		return
	}

	// Generate Amazon and eBay links
	amazonLink := fmt.Sprintf("https://www.amazon.com/s?k=%s", searchKeywords)
	ebayLink := fmt.Sprintf("https://www.ebay.com/sch/%s", searchKeywords)

	amazonProducts := AmazonScraper(amazonLink)
	ebayProducts := EbayScraper(ebayLink)

	response := Response{
		AmazonProducts: amazonProducts,
		EbayProducts:   ebayProducts,
	}

	// Send response
	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(response); err != nil {
		http.Error(w, "Failed to send response", http.StatusInternalServerError)
	}

}
