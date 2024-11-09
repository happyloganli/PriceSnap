package scrapers

import (
	"bytes"
	"log"
	"net/http"
	"github.com/PuerkitoBio/goquery"
)

// amazonScraper scrapes product data from an Amazon page and returns a list of products
func ScrapeEbay(url string) ([]Product, error) {

	// Make an HTTP GET request to the Ebay page
	req := NewRequestBase(url, http.MethodGet, nil)
	body, err := req.SendRequest()
	if err!= nil {
        log.Printf("Error sending HTTP request: %v", err)
        return nil, err
    }

	// Load the HTML document into goquery
	doc, err := goquery.NewDocumentFromReader(bytes.NewReader(body))
	if err != nil {
		log.Printf("Error loading HTML into goquery: %v", err)
		return nil, err
	}

	// Slice to hold all product data
	var products []Product

	// Scrape the required elements
	doc.Find("li.s-item.s-item__pl-on-bottom").Each(func(i int, s *goquery.Selection) {
		// Scrape image URL
		imageLink, _ := s.Find(".s-item__image img").Attr("src")
		image, _ := req.ImageURLToBase64(imageLink)

		// Scrape title text
		title := s.Find(".s-item__title span").Text()

		// Scrape price
		price := s.Find(".s-item__price").Text()

		// Scrape product link
		link, _ := s.Find(".s-item__link").Attr("href")

		// Append product to list
		if title != "Shop on eBay" {
			products = append(products, Product{
				Image:       image,
				Title:       title,
				Price:       price,
				ProductLink: link,
			})
		}
	})

	// Return the list of products
	return products, nil
}
