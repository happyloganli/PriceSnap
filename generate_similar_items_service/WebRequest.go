package main

import (
	"encoding/base64"
	"fmt"
	"io"
	"net/http"
)

func ImageURLToBase64(imageURL string) (string, error) {
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
