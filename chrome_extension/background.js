const serverUrl = 'http://localhost:8080/v1/item/search';

// Function to send a POST request to "/search-links"
function sendPostRequest(productInfo) {
  fetch(serverUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(productInfo)
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }
    return response.json(); // Parse JSON response
  })
  .then(result => {
    console.log('Response from server:', result);
    // You can process the result here
  })
  .catch(error => {
    console.error('Error:', error);
  });
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'search') {
        const products = [];
        console.log('background received search request');

        // pop up window
        chrome.runtime.sendMessage({ type: 'showWindow', payload: products });

        // get product informations
        chrome.runtime.sendMessage({ type: 'extractProductInfo' }, (productInfo) => {
            // send products to window
            try {
                const productResponse = sendPostRequest(productInfo);
                const productsToPush = Object.values(productResponse).slice(0, 5);
                products.push(...productsToPush);
            } catch (error) {
                console.error(error);
            }
        });
    }
});