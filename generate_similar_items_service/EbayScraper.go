package main

import (
	"bytes"
	"io"
	"log"
	"net/http"

	"github.com/PuerkitoBio/goquery"
)

// amazonScraper scrapes product data from an Amazon page and returns a list of products
func EbayScraper(url string) []Product {
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
	doc.Find("li.s-item").Each(func(i int, s *goquery.Selection) {
		// Scrape image URL
		imageLink, _ := s.Find(".s-item__image img").Attr("src")
		image, _:=ImageURLToBase64(imageLink)

		// Scrape title text
		title := s.Find(".s-item__title span").Text()

		// Scrape price
		price := s.Find(".s-item__price").Text()

		// Scrape product link
		link, _ := s.Find(".s-item__link").Attr("href")

		// Append product to list
		products = append(products, Product{
			Image:       image,
			Title:       title,
			Price:       price,
			ProductLink: link,
		})
	})

	// Return the list of products
	return products
}
