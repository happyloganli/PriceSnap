// Create a global floating window element
let floatingWindow;

function initializeFloatingWindow() {
    if (!floatingWindow) {
        floatingWindow = document.createElement("div");
        floatingWindow.style.position = "fixed";
        floatingWindow.style.top = "56px";
        floatingWindow.style.right = "0px";
        floatingWindow.style.width = "380px";
        floatingWindow.style.height = "178px"; // Initial height for loading state
        floatingWindow.style.padding = "0";
        floatingWindow.style.backgroundColor = "#fff"; // Set background color to white
        floatingWindow.style.borderRadius = "0";
        floatingWindow.style.boxShadow = "0 4px 16px rgba(0, 0, 0, 0.4)"; // Stronger shadow for distinction
        floatingWindow.style.zIndex = "9999";
        floatingWindow.style.overflow = "hidden"; // Prevent scrolling in loading state
        document.body.appendChild(floatingWindow);
    }
}

// Function to display loading window
function showLoadingWindow() {
    initializeFloatingWindow();
    floatingWindow.innerHTML = `
        <div style="display: flex; align-items: center; padding: 10px; border-bottom: 1px solid #ddd; position: relative;">
            <img src="https://assets.leetcode.com/users/Joshuaarr/avatar_1710399234.png" alt="Icon" style="width: 24px; height: 24px; margin-right: 8px;">
            <h4 style="margin: 0; font-size: 20px;">PriceSnap</h4>
            <button id="closeFloatingWindow" style="
                position: absolute;
                right: 10px;
                top: 10px;
                padding: 4px 8px;
                cursor: pointer;
                border: none;
                background: #f5f5f5;
                border-radius: 4px;">X</button>
        </div>
        <div style="background-color: #fff; padding: 20px; text-align: center; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);">
            <h4 style="margin: 0; font-size: 18px;">Loading Products...</h4>
            <img src="https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExeXlhaDZ5eHh2NXc5MzVpY3JqazJxMWpycGpueTVzMXBicHdwMHNjcSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/emySgWo0iBKWqni1wR/giphy.gif" 
                 alt="Loading..." style="width: 100px; height: 100px; margin-top: 10px;">
        </div>
    `;
}

// Function to display timeout message
function showTimeoutWindow() {
    initializeFloatingWindow();
    floatingWindow.innerHTML = `
        <div style="display: flex; align-items: center; padding: 10px; border-bottom: 1px solid #ddd; position: relative;">
            <img src="https://assets.leetcode.com/users/Joshuaarr/avatar_1710399234.png" alt="Icon" style="width: 24px; height: 24px; margin-right: 8px;">
            <h4 style="margin: 0; font-size: 20px;">PriceSnap</h4>
            <button id="closeFloatingWindow" style="
                position: absolute;
                right: 10px;
                top: 10px;
                padding: 4px 8px;
                cursor: pointer;
                border: none;
                background: #f5f5f5;
                border-radius: 4px;">X</button>
        </div>
        <div style="background-color: #fff; padding: 20px; text-align: center;">
            <h4 style="margin: 0; font-size: 18px; color: #d9534f;">Unable to find result</h4>
            <p style="font-size: 14px; color: #555;">Please try again later.</p>
        </div>
    `;
}

// Function to display product results
function showResultWindow(products) {
    initializeFloatingWindow();
    floatingWindow.style.height = "70vh"; // Adjust as needed for desired overall height
    floatingWindow.style.overflow = "hidden"; // Hide overflow on main container to control scrolling in cards area


    // Clear loading content and add header
    floatingWindow.innerHTML = `
        <div style="display: flex; align-items: center; padding: 10px; border-bottom: 1px solid #ddd; position: relative;">
            <img src="https://assets.leetcode.com/users/Joshuaarr/avatar_1710399234.png" alt="Icon" style="width: 24px; height: 24px; margin-right: 8px;">
            <h4 style="margin: 0; font-size: 20px;">PriceSnap</h4>
            <button id="closeFloatingWindow" style="
                position: absolute;
                right: 10px;
                top: 10px;
                padding: 4px 8px;
                cursor: pointer;
                border: none;
                background: #f5f5f5;
                border-radius: 4px;">X</button>
        </div>
        <div style="display: flex; align-items: center; padding: 10px; border-bottom: 1px solid #ddd;">
            <h4 style="margin: 0; font-size: 16px;">Product List</h4>
        </div>
        <div id="productCardsContainer" style="height: calc(70vh - 100px); overflow-y: auto; padding: 10px;">
        </div>
    `;

    // Add product cards to the container
    const productCardsContainer = document.getElementById("productCardsContainer");
    products.slice(0, 5).forEach(({ title, price, imageUrl, link }) => {
        productCardsContainer.innerHTML += `
            <div style="
                display: flex;
                align-items: center;
                background-color: #fff;
                border-radius: 0px;
                margin-bottom: 8px; /* Reduce margin between cards */
                padding: 10px; /* Reduce padding to make the card more compact */
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                font-family: Arial, sans-serif;">
                
                <!-- Image Container, Smaller Square -->
                <div style="width: 100px; height: 100px; overflow: hidden; border-radius: 8px; margin-right: 15px;">
                    <img src="${imageUrl}" alt="${title}" style="
                        width: 100%;
                        height: 100%;
                        object-fit: cover;">
                </div>
                
                <!-- Title and Price on the Right Side, Adjusted Spacing -->
                <div style="flex-grow: 1; padding-left: 10px; max-width: 200px;">
                    <h4 style="margin: 0 0 5px; font-size: 16px; color: #333;">${title}</h4>
                    <p style="font-size: 14px; font-weight: bold; color: #555; margin: 0 0 10px;">Price: ${price}</p>
                    <a href="${link}" target="_blank" style="
                        display: inline-block;
                        padding: 6px 10px;
                        background-color: #0074cc;
                        color: #fff;
                        border-radius: 4px;
                        text-decoration: none;
                        font-size: 13px;">View on eBay</a>
                </div>
            </div>
        `;
    });

    // Add close button event listener
    document.getElementById("closeFloatingWindow").addEventListener("click", () => {
        floatingWindow.remove();
        floatingWindow = null; // Reset floatingWindow for future use
    });
}

// Listen for messages and display the appropriate window based on message type
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log("Received message:", message.type);
    if (message.type === 'showLoadingWindow') {
        showLoadingWindow();
    } else if (message.type === 'showTimeoutWindow') {
        showTimeoutWindow();
    } else if (message.type === 'showResultWindow') {
        showResultWindow(message.payload); // Pass products payload
    }
});
