import { getFromStorage } from "./storage.js";

let state = 'idle'; // can be 'fetching', 'success', 'error'
let ebayItems = null;
let fetchTimeout = null;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log("Background script received message:", message);
    if (message.type === 'search') {
		console.log("call server");
        // Start fetching
        state = 'fetching';
        ebayItems = null;

		// get product info
		console.log('extract product info');
		chrome.tabs.sendMessage(sender.tab.id, { type: 'extractProductInfo' }, async (response) => {
			console.log(response);

			try {
				const storedItem = await getFromStorage(response.itemID);
		
				if (storedItem !== undefined) {
					console.log('Item found in storage:', storedItem);
					state = 'success';
					ebayItems = storedItem;
					return; // Exit early if the item is already in storage
				}
			} catch (error) {
				console.error('Error checking value in storage:', error);
			}

			const serverUrl = 'https://generatesimilaritemsservice-599683195183.us-west4.run.app/v1/items/search'

			await fetch(serverUrl, {
				method: 'POST',
				headers: {
				'Authorization': 'Bearer 5nNXhs5IVUSspVlwMz6HCtGAy8g2pKPCz3U3ULMBxSYTKUI6whYR2AWN39TghtprYJHzUmp6D13rUHTNZbz9HqUbqcvoY2aFMlhLA8m8L05Syb6wk96zPW8Qyu3GbFUJ',
				'Content-Type': 'application/json'
				},
				body: JSON.stringify(response)
			})
			.then(async result => {
				if (!result.ok) {
				throw new Error(`Server error: ${result.status}`);
				}
				const fetchResponse = await result.json();
				ebayItems = fetchResponse.products.Ebay
				console.log("successfully fetched:", ebayItems);
				console.log("item array:", ebayItems);
				state = 'success';
				chrome.storage.local.set({[response.itemID]: ebayItems}, () => {
					if (chrome.runtime.lastError) {
						console.error('Error storing data:', chrome.runtime.lastError);
					}
				})
			})
			.catch(error => {
					state = 'error';
					ebayItems = error;
					console.log("error fetching, error:" + error);
			})
			.finally(() => {
				clearTimeout(fetchTimeout); // Clear the timeout when done
			});

			// Set a timeout to change state to 'error' if not successful in 1 minute
			fetchTimeout = setTimeout(() => {
				if (state === 'fetching') {
					console.log("timeout!");
					state = 'error';
					ebayItems = 'Timeout';
				}
			}, 60000); // Timeout after 1 minute
		});
    }
	else if (message.type === 'showWindow') {
		console.log("pop up window");
        if (state === 'fetching') {
            // If still fetching, show loading window and wait for success
            chrome.tabs.sendMessage(sender.tab.id, { type: 'showLoadingWindow' });

            // Poll until successful fetching or timeout
            const interval = setInterval(() => {
				console.log('check status');
                if (state === 'success') {
					console.log("successfully retrieve similar items, call popup window to display")
                    clearInterval(interval);
                    chrome.tabs.sendMessage(sender.tab.id, { type: 'showResultWindow', payload: ebayItems });
                } else if (state === 'error') {
                    clearInterval(interval);
                    chrome.tabs.sendMessage(sender.tab.id, { type: 'showTimeoutWindow' });
                } else if (state === 'idle') {
					clearInterval(interval);
                    chrome.tabs.sendMessage(sender.tab.id, { type: 'closeWindow' });
				}
            }, 500); // Check every 500ms
        }
		else if (state === 'success') {
            // If successfully fetched, show the result window
            chrome.tabs.sendMessage(sender.tab.id, { type: 'showResultWindow', payload: ebayItems });
        }
		else if (state === 'error') {
            // If there was an error, show timeout window
            chrome.tabs.sendMessage(sender.tab.id, { type: 'showTimeoutWindow' });
        }
    }
	else if (message.type === 'minimizeWindow') {
		state = 'idle';
		chrome.tabs.sendMessage(sender.tab.id, { type: 'showButton' });
	}
});