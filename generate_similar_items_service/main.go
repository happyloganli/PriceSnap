package main

import (
	"fmt"
	"generate_similar_items_service/handlers"
	"generate_similar_items_service/middleware"
	"log"
	"net/http"
	"os"

	"github.com/joho/godotenv"
)

func main() {

	err := godotenv.Load()
	if err != nil {
		log.Fatalf("Error loading.env file: %v\n", err)
	}
	executionID := os.Getenv("EXTENSION_ID")
	if executionID == "" {
		log.Fatal("EXTENSION_ID environment variable not set")
	}

	// Set up the HTTP server and route
	http.Handle("/v1/items/search", middleware.AllowCORS(http.HandlerFunc(handlers.SearchItemHandler), executionID))
	port := ":8080"
	fmt.Printf("Server listening on port %s\n", port)
	if err := http.ListenAndServe(port, nil); err != nil {
		log.Printf("Error starting server: %v\n", err)
	}
}
