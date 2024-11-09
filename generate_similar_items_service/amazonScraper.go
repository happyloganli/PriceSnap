package main

import (
	"bytes"
	"io"
	"log"
	"net/http"

	"github.com/PuerkitoBio/goquery"
)

// amazonScraper scrapes product data from an Amazon page and returns a list of products
func AmazonScraper(url string) ([]Product) {
	// Fetch the content of the Amazon product page using http client
	resp, err := http.Get(url)
	if err != nil {
		log.Fatalf("Error fetching the page: %v", err)
		return nil
	}
	defer resp.Body.Close()

	// Read the response body using io.ReadAll (replacing ioutil.ReadAll)
	body, err := io.ReadAll(resp.Body)
	if err != nil {
		log.Fatalf("Error reading response body: %v", err)
		return nil
	}

	// Load the HTML document into goquery
	doc, err := goquery.NewDocumentFromReader(bytes.NewReader(body))
	if err != nil {
		log.Fatalf("Error loading HTML into goquery: %v", err)
		return nil
	}

	// Slice to hold all product data
	var products []Product

	// Scrape the required elements
	doc.Find(".s-main-slot .s-result-item").Each(func(i int, s *goquery.Selection) {
		// Extract product title
		title := s.Find(".a-size-base-plus.a-color-base.a-text-normal").Text()

		// Extract product price
		price := s.Find(".a-price .a-offscreen").Text()

		// Extract product image
		imgSrc, _ := s.Find(".s-image").Attr("src")

		// Extract product link
		productLink, _ := s.Find(".a-link-normal.s-underline-text.s-underline-link-text.s-link-style").Attr("href")

		// If the product link is not empty, prepend the base Amazon URL
		if productLink != "" {
			productLink = "https://www.amazon.com" + productLink
		}

		// Append product details to the products slice
		products = append(products, Product{
			Title:       title,
			Price:       price,
			Image:       imgSrc,
			ProductLink: productLink,
		})
	})

	// Return the list of products
	return products
}
