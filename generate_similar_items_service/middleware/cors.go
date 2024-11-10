package middleware

import (
	"net/http"
	"os"
)

// AllowCORS allows cross-origin requests
func AllowCORS(next http.Handler) http.Handler {
	// return a middleware handler that adds CORS headers to the response
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// Set CORS headers to allow your Chrome extension or specific domain
		w.Header().Set("Access-Control-Allow-Origin", "chrome-extension://"+os.Getenv("EXTENSION_ID"))
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
		w.Header().Set("Access-Control-Allow-Credentials", "true")

		// Handle OPTIONS preflight request
		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusOK)
			return
		}

		// Pass the request to the next handler
		next.ServeHTTP(w, r)
	})
}
