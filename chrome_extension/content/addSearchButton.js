// add a button, when user clicked, pop up a small window and start searching
function addSearchButton() {
    const buttonsRootNode = document.querySelector('div.x78zum5.x2lah0s.x1xmf6yo.xktsk01.x12nagc.x1d52u69');

    if (buttonsRootNode) {
        // Create the new button element
        const searchButton = document.createElement('button');

        // Apply styles to the new button
        Object.assign(searchButton.style, {
            backgroundColor: '#007bff', // Blue background
            color: '#fff',              // White text color
            borderRadius: '8px',        // Rounded corners
            padding: '5px 20px',        // Padding to reserve space for icon
            marginLeft: '10px',         // Space to the left to align with existing buttons
            border: 'none',             // Remove default border
            cursor: 'pointer',          // Pointer cursor on hover
            display: 'inline-flex',     // Flex layout for potential icon
            alignItems: 'center',       // Center-align content
        });

        searchButton.innerHTML = '<strong>Search</strong>';
        searchButton.addEventListener('click', () => {
            console.log("start search");
            chrome.runtime.sendMessage({ type: 'search'});
        });

        buttonsRootNode.appendChild(searchButton);
    }
}

// // Send a message to the background script to fetch a page
// chrome.runtime.sendMessage({ type: 'fetch page', url: 'https://www.amazon.com/' }, (response) => {
//     if (response.success) {
//         console.log('Fetched data:', response.data);
//     } else {
//         console.error('Error fetching data:', response.error);
//     }
// });

addSearchButton();