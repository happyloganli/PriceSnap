// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//     if (message.type === 'fetch page') {
//         const url = message.url;
        
//         // Use fetch to get the data from the URL
//         fetch(url)
//             .then(response => {
//                 if (!response.ok) {
//                     throw new Error('Network response was not ok ' + response.statusText);
//                 }
//                 return response.json();  // Assuming the response is in JSON format
//             })
//             .then(data => {
//                 // Send the fetched JSON data as the response
//                 sendResponse({ success: true, data: data });
//             })
//             .catch(error => {
//                 // Handle error and send an error response
//                 sendResponse({ success: false, error: error.message });
//             });

//         // Indicate that we will use sendResponse asynchronously
//         return true;  
//     }
// });

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'showWindow') {
        console.log('background received show window request');
        chrome.tabs.sendMessage(sender.tab.id, message);
    }
});