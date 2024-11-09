package main

import (
	"fmt"
	"log"
	"net/http"
)

func main() {

	// Set up the HTTP server and route
	http.HandleFunc("/search-links", RequestHandler)
	port := ":8080"
	fmt.Printf("Server listening on port %s\n", port)
	if err := http.ListenAndServe(port, nil); err != nil {
		log.Printf("Error starting server: %v\n", err)
	}

}
