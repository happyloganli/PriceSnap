package middleware

import (
	"log"
	"net/http"
	"os"
	"strconv"
	"golang.org/x/time/rate"
)

// RateLimiter controls the rate at which incoming requests are processed.
func RateLimiter(next http.Handler) http.Handler {
	rateLimit := os.Getenv("RATE_LIMIT")   
	burstLimit := os.Getenv("BURST_LIMIT") 

	// Convert to integers (you may need error handling here for invalid input)
	limit, err := strconv.Atoi(rateLimit)
	if err != nil {
		log.Fatal("Invalid RATE_LIMIT value")
	}
	burst, err := strconv.Atoi(burstLimit)
	if err != nil {
		log.Fatal("Invalid BURST_LIMIT value")
	}

	// Create a new rate limiter with the configured rate and burst
	limiter := rate.NewLimiter(rate.Limit(limit), burst)

	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if !limiter.Allow() {
			http.Error(w, "Too many requests, please try again later.", http.StatusTooManyRequests)
			return
		}
		// Pass the request to the next handler if rate limit is not exceeded
		next.ServeHTTP(w, r)
	})
}
