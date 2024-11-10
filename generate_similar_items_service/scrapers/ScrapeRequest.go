package scrapers

import (
	"bytes"
	"encoding/base64"
	"fmt"
	"io"
	"net/http"
	"time"
)

// defaultHeaders contains common headers for making HTTP requests
var defaultHeaders = map[string]string{
	"Accept":          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
	"Accept-Language": "en-US,en;q=0.9",
	"User-Agent":      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36",
}

// Product represents a product scraped from a website
type Product struct {
	Title       string
	Price       string
	Image       string
	ProductLink string
}

// RequestBase is a base struct for making HTTP requests
type RequestBase struct {
	URL     string
	Headers map[string]string
	Body    []byte
	Method  string
}

// SendRequest sends an HTTP request and returns the response body
func (rb *RequestBase) SendRequest() ([]byte, error) {

	client := &http.Client{}
	maxRetries := 3
	delay := 2 * time.Second
	// Retry sending the request up to maxRetries with a delay between retries
	for attempt := 1; attempt <= maxRetries; attempt++ {
		// Create the request
		req, err := http.NewRequest(rb.Method, rb.URL, bytes.NewBuffer(rb.Body))
		if err != nil {
			return nil, fmt.Errorf("failed to create request: %v", err)
		}

		// Add headers to the request
		for key, value := range rb.Headers {
			req.Header.Set(key, value)
		}

		// Send the request and handle potential errors
		resp, err := client.Do(req)
		if err != nil {

			if attempt < maxRetries {
				fmt.Printf("Attempt %d failed: %v. Retrying in %v...\n", attempt, err, delay)
				time.Sleep(delay)
			}
			continue
		}

		// Read and return response body
		defer resp.Body.Close()
		body, err := io.ReadAll(resp.Body)
		if err != nil {
			return nil, fmt.Errorf("failed to read response body: %v", err)
		}

		// Return successful response
		return body, nil
	}

	// Return error if all attempts fail
	return nil, fmt.Errorf("failed to send request after %d attempts", maxRetries)
}

// Method to convert an image URL to Base64 format
func (rb *RequestBase) ImageURLToBase64(imageURL string) (string, error) {
	// Make a request to the image URL
	resp, err := http.Get(imageURL)
	if err != nil {
		return "", fmt.Errorf("failed to fetch image: %v", err)
	}
	defer resp.Body.Close()

	// Read the response body
	imageData, err := io.ReadAll(resp.Body)
	if err != nil {
		return "", fmt.Errorf("failed to read image data: %v", err)
	}

	// Encode the image data to Base64
	base64Image := base64.StdEncoding.EncodeToString(imageData)

	return base64Image, nil
}

// Method to update a header in the ScrapeRequest
func (rb *RequestBase) SetHeader(key, value string) {
	rb.Headers[key] = value
}

// Method to update the body of the ScrapeRequest
func (rb *RequestBase) SetBody(body []byte) {
	rb.Body = body
}

// Method to create a new ScrapeRequest with default headers
func NewRequestBase(url string, method string, body []byte) *RequestBase {
	return &RequestBase{
		URL:     url,
		Method:  method,
		Body:    body,
		Headers: defaultHeaders,
	}
}
