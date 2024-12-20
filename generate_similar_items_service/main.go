package main

import (
	"fmt"
	"generate_similar_items_service/handlers"
	"generate_similar_items_service/middleware"
	"log"
	"net/http"
	"github.com/joho/godotenv"
)

func main() {
	
	err := godotenv.Load()
	if err != nil {
		log.Fatalf("Error loading.env file: %v\n", err)
	}

	// Set up the HTTP server and route
	http.Handle("/v1/items/search", middleware.AllowCORS(middleware.APIKeyValidator(middleware.RateLimiter(http.HandlerFunc(handlers.SearchItemHandler)))))
	port := ":8080"
	fmt.Printf("Server listening on port %s\n", port)
	if err := http.ListenAndServe(port, nil); err != nil {
		log.Printf("Error starting server: %v\n", err)
	}
}
