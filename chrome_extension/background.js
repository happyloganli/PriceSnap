/*
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
*/

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log("Background script received message:", message);
    if (message.type === 'showResultWindow') {
        const products = [
            {
                title: "CATLINK Automatic Self Cleaning Cat Litter Box",
                price: "$389.99",
                imageUrl: "https://i.ebayimg.com/images/g/W8gAAOSw2JFnKIGM/s-l500.webp",
                productLink: "https://www.ebay.com/itm/123456789",
            },
            {
                title: "Litter-Robot 3 Self-Cleaning Litter Box",
                price: "$550.00",
                imageUrl: "https://i.ebayimg.com/images/g/xyzAAOSw2JFnKIGM/s-l500.webp",
                productLink: "https://www.ebay.com/itm/987654321",
            },
            {
                title: "PetSafe ScoopFree Ultra Self-Cleaning Litter Box",
                price: "$169.99",
                imageUrl: "https://i.ebayimg.com/images/g/abcAAOSw2JFnKIGM/s-l500.webp",
                productLink: "https://www.ebay.com/itm/135792468",
            },
            {
                title: "Catit SmartSift Self-Cleaning Litter Box",
                price: "$249.95",
                imageUrl: "https://i.ebayimg.com/images/g/DEFgAAOSw2JFnKIGM/s-l500.webp",
                productLink: "https://www.ebay.com/itm/456123789",
            },
            {
                title: "Omega Paw Self-Cleaning Litter Box",
                price: "$85.00",
                imageUrl: "https://i.ebayimg.com/images/g/GHHgAAOSw2JFnKIGM/s-l500.webp",
                productLink: "https://www.ebay.com/itm/789456123",
            }
        ];

        console.log('background received search request');
        
        // Show pop up window with laoding first
        chrome.tabs.sendMessage(sender.tab.id, { type: 'showLoadingWindow' });

        // Show products list after 1000ms
        setTimeout(() => {
            chrome.tabs.sendMessage(sender.tab.id, { type: 'showResultWindow', payload: products });
        }, 1000);

        // get product informations
        /*
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
        */
    }
});