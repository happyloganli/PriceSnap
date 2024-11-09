import {sendPostRequest} from './utils.js';

let state = 'idle'; // can be 'fetching', 'success', 'error'
let fetchResponse = null;
let fetchTimeout = null;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log("Background script received message:", message);
    if (message.type === 'search') {
		console.log("call server");
        // // Start fetching
        state = 'fetching';
        fetchResponse = null;

		// get product info
		console.log('extract product info');
		const productInfo = chrome.tabs.sendMessage(sender.tab.id, { type: 'extractProductInfo' });
		console.log(productInfo);

        // Call sendPostRequest to fetch data
        sendPostRequest(productInfo)
            .then(response => {
                // If response is received successfully, update state
                fetchResponse = response;
                state = 'success';
            })
            .catch(error => {
                // If there's an error, set the state to error
                state = 'error';
                fetchResponse = error;
            })
            .finally(() => {
                clearTimeout(fetchTimeout); // Clear the timeout when done
            });

        // Set a timeout to change state to 'error' if not successful in 1 minute
        fetchTimeout = setTimeout(() => {
            if (state === 'fetching') {
                state = 'error';
                fetchResponse = 'Timeout';
            }
        }, 60000); // Timeout after 1 minute

    }
	else if (message.type === 'showWindow') {
		console.log("pop up window");
        if (state === 'fetching') {
            // If still fetching, show loading window and wait for success
            chrome.tabs.sendMessage(sender.tab.id, { type: 'showLoadingWindow' });

            // // Poll until successful fetching or timeout
            // const interval = setInterval(() => {
            //     if (state === 'success') {
            //         clearInterval(interval);
            //         chrome.runtime.sendMessage({ type: 'showResultWindow', data: fetchResponse });
            //     } else if (state === 'error') {
            //         clearInterval(interval);
            //         chrome.runtime.sendMessage({ type: 'showTimeoutWindow' });
            //     }
            // }, 500); // Check every 500ms
        }
		else if (state === 'success') {
            // If successfully fetched, show the result window
            chrome.tabs.sendMessage(sender.tab.id, { type: 'showResultWindow', data: fetchResponse });
        }
		else if (state === 'error') {
            // If there was an error, show timeout window
            chrome.tabs.sendMessage(sender.tab.id, { type: 'showTimeoutWindow' });
        }
    }
});