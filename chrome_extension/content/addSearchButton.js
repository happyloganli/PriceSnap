// add a button, when user clicked, pop up a small window and start searching
function addSearchButton() {

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

// Listen for messages and display the button
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log("Received message:", message.type);
    if (message.type === 'showButton') {
        addSearchButton();
    }
});