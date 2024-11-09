package main

import (
	"fmt"
	"generate_similar_items_service/handlers"
	"generate_similar_items_service/middleware"
	"log"
	"net/http"
)

func main() {

	// Set up the HTTP server and route
	http.HandleFunc("/v1/items/search", handlers.SearchItemHandler)
	http.Handle("/", middleware.AllowCORS(http.DefaultServeMux))
	port := ":8080"
	fmt.Printf("Server listening on port %s\n", port)
	if err := http.ListenAndServe(port, nil); err != nil {
		log.Printf("Error starting server: %v\n", err)
	}

}
