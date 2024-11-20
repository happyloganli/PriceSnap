// add a button, when user clicked, pop up a small window and start searching
function addSearchButton() {
    // const buttonsRootNode = document.querySelector('div.x78zum5.x2lah0s.x1xmf6yo.xktsk01.x12nagc.x1d52u69');

    // if (buttonsRootNode) {
    //     // Create the new button element
    //     const searchButton = document.createElement('button');

    //     // Apply styles to the new button
    //     Object.assign(searchButton.style, {
    //         backgroundColor: '#007bff', // Blue background
    //         color: '#fff',              // White text color
    //         borderRadius: '8px',        // Rounded corners
    //         padding: '5px 20px',        // Padding to reserve space for icon
    //         marginLeft: '10px',         // Space to the left to align with existing buttons
    //         border: 'none',             // Remove default border
    //         cursor: 'pointer',          // Pointer cursor on hover
    //         display: 'inline-flex',     // Flex layout for potential icon
    //         alignItems: 'center',       // Center-align content
    //     });

    //     searchButton.innerHTML = '<strong>Search</strong>';
    //     searchButton.addEventListener('click', () => {
    //         console.log("pop up window");
    //         chrome.runtime.sendMessage({ type: 'showWindow'});
    //     });

    //     buttonsRootNode.appendChild(searchButton);

    //     chrome.runtime.sendMessage({ type: 'search'});
    // }

    chrome.runtime.sendMessage({ type: 'search'});
    
    // Create the button element
    const button = document.createElement('div');
    button.className = 'floating-button';
    button.addEventListener('click', () => {
        console.log("pop up window");
        chrome.runtime.sendMessage({ type: 'showWindow' });
        event.stopPropagation();
        button.remove();
    });

    // Create an img element for the icon
    const icon = document.createElement('img');
    icon.src = chrome.runtime.getURL('content/searchIcon.png'); // Get icon URL
    icon.className = 'button-icon';

    // Create a close icon
    const closeIcon = document.createElement('span');
    closeIcon.innerHTML = '&times;';
    closeIcon.className = 'close-icon';
    closeIcon.onclick = (event) => {
        event.stopPropagation(); // Prevent triggering button click
        button.remove();
    };

    // Append icons to button
    button.appendChild(closeIcon);
    button.appendChild(icon);

    // Append button to the document
    document.body.appendChild(button);
}

addSearchButton();