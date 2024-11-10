package middleware

import (
	"log"
	"net/http"
	"os"
)

// APIKeyValidator middleware
func APIKeyValidator(next http.Handler) http.Handler {
	validAPIKey := "Bearer " + os.Getenv("API_KEY")
	if validAPIKey == "" {
		log.Fatal("API_KEY environment variable is not set")
	}
	// Return a middleware handler that checks the API key
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		apiKey := r.Header.Get("Authorization")
		if apiKey == "" {
			http.Error(w, "API key is required", http.StatusUnauthorized)
			return
		}

		if apiKey != validAPIKey {
			http.Error(w, "Invalid API key", http.StatusUnauthorized)
			return
		}

		// Pass the request to the next handler if API key is valid
		next.ServeHTTP(w, r)
	})
}
