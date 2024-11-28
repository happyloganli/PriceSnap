# PriceSnap

![1731199266462](https://github.com/user-attachments/assets/a2c0d6e7-b552-4e6a-b21d-9b4424c93a91)


## Hack This Fall 2024 Project

PriceSnap makes shopping on Facebook Marketplace easier. With one click, you can search for similar items on eBay to check prices and see if you're getting a good deal.

## Quick Start

**Directly Load the Chrome Extension**

- Open Chrome and go to `chrome://extensions/`.

- Enable **"Developer mode"** (toggle is in the upper-right corner).

- Select **"Load unpacked"** and choose the **"chrome_extension"** folder in this project.
  
- Open Facebook Market Place, open item details in another tab to trigger the extension, there will be a search button for your searching:
  ![image](https://github.com/user-attachments/assets/102711ad-1c4e-4173-b4c5-5ee4d6704142)


  

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
- Select "Load unpacked" and choose the "chrome_extension" folder in this project.
