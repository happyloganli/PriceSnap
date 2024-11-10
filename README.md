# PriceSnap

![1731199266462](https://github.com/user-attachments/assets/a2c0d6e7-b552-4e6a-b21d-9b4424c93a91)


Hack This Fall 2024 Project.

This application consists of a Chrome extension and a Golang backend service that work together to enhance your shopping experience on Facebook Marketplace. When browsing items on Facebook Marketplace, the extension allows you to search for similar products on Amazon and eBay, helping you determine if you're getting a good deal.

## Project Structure

- **Chrome Extension**: Provides a UI and browser interaction to trigger searches for similar items on Amazon and eBay when browsing Facebook Marketplace.
- **Golang Backend Service**: Performs the scraping of Amazon and eBay to gather product details and returns the data to the Chrome extension.

## Quick Start

**Directly Load the Chrome Extension**

- Open Chrome and go to `chrome://extensions/`.

- Enable "Developer mode" (toggle is in the upper-right corner).

- Select "Load unpacked" and choose the extension folder in this project.

  

## Local Run

### Prerequisites

- **Golang**: Install Go 
- **Chrome Browser**: Required to load the extension.

### Local Setup

**1.Set up Environment Variables**

In the ./generate_similar_items_service, create a `.env` file with the following content (do not share or commit this file):

`GEMINI_API_KEY`: Key for accessing the Gemini API (if using the Gemini platform).

`EXTENSION_ID`: The unique ID for your Chrome extension.

`AI_PLATFORM`: AI platform used in the service, e.g., "gemini".

`DEBUG`: Set to `true` during local development to avoid live API calls.

`API_KEY`: Secret key to secure access to the backend API (should be securely stored and never exposed to the frontend).

`RATE_LIMIT` and `BURST_LIMIT`: Controls for rate limiting requests.

**2.Start the Golang Server**

Run the backend server locally:

```
go run .
```

**3.Load the Chrome Extension**

- Open Chrome and go to `chrome://extensions/`.
- Enable "Developer mode" (toggle is in the upper-right corner).
- Select "Load unpacked" and choose the extension folder in this project.
