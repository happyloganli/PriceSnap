package ai

import (
	"context"
	"fmt"
	"os"
	"strings"
	"github.com/google/generative-ai-go/genai"
	"github.com/joho/godotenv"
	"google.golang.org/api/option"
)

// ConnectGeminiAI connects to Gemini AI and generates the search keywords based on the provided prompt.
func ConnectGeminiAI(ctx context.Context, prompt string) (string, error) {
	return "CATLINK+automatic+Litterbox+with+Ramp", nil
	err := godotenv.Load()
	if err != nil {
		fmt.Println("Error loading .env file")
		return "", err
	}
	// Set up Gemini client
	client, err := genai.NewClient(ctx, option.WithAPIKey(os.Getenv("GEMINI_API_KEY")))
	if err != nil {
		return "", fmt.Errorf("failed to create Gemini client: %v", err)
	}
	defer client.Close()

	// Create a model
	model := client.GenerativeModel("gemini-1.5-flash")

	// Generate content
	resp, err := model.GenerateContent(ctx, genai.Text(prompt))
	if err != nil {
		return "", fmt.Errorf("failed to generate content: %v", err)
	}

	// Inspect the response structure
	if len(resp.Candidates) == 0 {
		return "", fmt.Errorf("no content generated")
	}

	// Assuming the generated text is in the first candidate's text field
	searchKeywords, err := buildResponseString(resp.Candidates[0].Content.Parts)
	if err!= nil { 
		return "", err
	}
	return searchKeywords, nil
}

func buildResponseString(parts []genai.Part) (string, error) {

	var builder strings.Builder

	for _, part := range parts {
		// Type assertion to directly treat part as genai.Text
		if textPart, ok := part.(genai.Text); ok {
			builder.WriteString(string(textPart))
		} else {
			return "", fmt.Errorf("unexpected part type: %T", part)
		}
	}

	return strings.TrimSpace(builder.String()), nil
}
