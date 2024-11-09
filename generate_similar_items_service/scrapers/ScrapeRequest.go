package scrapers

import (
	"bytes"
	"encoding/base64"
	"fmt"
	"io"
	"net/http"
)

var defaultHeaders = map[string]string{
	"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
	"Accept":     "application/json",
}

type Product struct {
	Title       string
	Price       string
	Image       string
	ProductLink string
}

type RequestBase struct {
	URL string
	Headers map[string]string
	Body       []byte
	Method     string
}

func (rb* RequestBase) SendRequest() ([]byte, error) {
	
	client := &http.Client{}
    req, err := http.NewRequest(rb.Method, rb.URL, bytes.NewBuffer(rb.Body))
    if err!= nil {
        return nil, fmt.Errorf("failed to create request: %v", err)
    }

    // Add headers to the request
    for key, value := range rb.Headers {
        req.Header.Set(key, value)
    }

    // Send the request
    resp, err := client.Do(req)
    if err!= nil {
        return nil, fmt.Errorf("failed to send request: %v", err)
    }
    defer resp.Body.Close()

    // Read the response body
    body, err := io.ReadAll(resp.Body)
	if err!= nil {
        return nil, fmt.Errorf("failed to read response body: %v", err)
    }
	return body, nil
}


func (rb *RequestBase) ImageURLToBase64(imageURL string) (string, error) {
	// Step 1: Make a request to the image URL
	resp, err := http.Get(imageURL)
	if err != nil {
		return "", fmt.Errorf("failed to fetch image: %v", err)
	}
	defer resp.Body.Close()

	// Step 2: Read the response body
	imageData, err := io.ReadAll(resp.Body)
	if err != nil {
		return "", fmt.Errorf("failed to read image data: %v", err)
	}

	// Step 3: Encode the image data to Base64
	base64Image := base64.StdEncoding.EncodeToString(imageData)

	return base64Image, nil
}

// Method to update a header in the ScrapeRequest
func (rb *RequestBase) UpdateHeader(key, value string) {
	rb.Headers[key] = value
}

// Method to update the body of the ScrapeRequest
func (rb *RequestBase) SetBody(body []byte) {
	rb.Body = body
}

func NewRequestBase(url string, method string, body []byte) *RequestBase {
	return &RequestBase{
        URL:     url,
        Method:   method,
        Body:       body,
        Headers: defaultHeaders,
    }
}


