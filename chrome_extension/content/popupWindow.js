// Create a global floating window element
let floatingWindow;
let isDragging = false;
let offsetX, offsetY;

// Function to initialize the floating window
async function initializeFloatingWindow() {
    if (!floatingWindow) {
        floatingWindow = document.createElement("div");
        floatingWindow.className = "floating-window";
        floatingWindow.style.right = `16px`;
        floatingWindow.style.top = `56px`;

        try {
            const leftBound = await getFromStorage("leftBound");
            const upBound = await getFromStorage("upBound");
    
            if (leftBound !== undefined) {
                floatingWindow.style.left = `${leftBound}px`;
            }
            if (upBound !== undefined) {
                floatingWindow.style.top = `${upBound}px`;
            }
        } catch (error) {
            console.error('Error checking value in storage:', error);
        }
        document.body.appendChild(floatingWindow);

        // Initialize drag event listeners
        floatingWindow.addEventListener("mousedown", (e) => {
            isDragging = true;
            offsetX = e.clientX - floatingWindow.getBoundingClientRect().left;
            offsetY = e.clientY - floatingWindow.getBoundingClientRect().top;
        });

        floatingWindow.addEventListener("mousemove", (e) => {
            if (isDragging) {
                floatingWindow.style.left = `${e.clientX - offsetX}px`;
                floatingWindow.style.top = `${e.clientY - offsetY}px`;
            }
        });

        floatingWindow.addEventListener("mouseup", (e) => {
            chrome.storage.local.set({ "leftBound": e.clientX - offsetX });
            chrome.storage.local.set({ "upBound": e.clientY - offsetY });
            isDragging = false;
        });
    }
}

function getFromStorage(key) {
    return new Promise((resolve, reject) => {
        chrome.storage.local.get(key, (result) => {
            if (chrome.runtime.lastError) {
                reject(chrome.runtime.lastError);
            } else {
                resolve(result[key]); // Extract the value directly
            }
        });
    });
}

// Function to display loading window
async function showLoadingWindow() {
    await initializeFloatingWindow().then(() => {
        floatingWindow.innerHTML = `
            <div class="floating-header">
                <img src="https://assets.leetcode.com/users/Joshuaarr/avatar_1710399234.png" alt="Icon" class="icon">
                <h4 class="title">PriceSnap</h4>
                <button id="closeFloatingWindow" class="close-button">X</button>
            </div>
            <div class="floating-content">
                <h4 class="loading-text">Loading Products...</h4>
                <img src="https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExeXlhaDZ5eHh2NXc5MzVpY3JqazJxMWpycGpueTVzMXBicHdwMHNjcSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/emySgWo0iBKWqni1wR/giphy.gif" 
                    alt="Loading..." class="loading-gif">
            </div>
        `;
        addCloseButtonListener();
    });
}

// Function to display timeout message
async function showTimeoutWindow() {
    await initializeFloatingWindow().then(() => {
        floatingWindow.innerHTML = `
            <div class="floating-header">
                <img src="https://assets.leetcode.com/users/Joshuaarr/avatar_1710399234.png" alt="Icon" class="icon">
                <h4 class="title">PriceSnap</h4>
                <button id="closeFloatingWindow" class="close-button">X</button>
            </div>
            <div class="floating-content">
                <h4 class="timeout-text">Unable to find result</h4>
                <p class="timeout-description">Please try again later.</p>
            </div>
        `;
        addCloseButtonListener();
    });
}

// Function to display product results
async function showResultWindow(products) {
    await initializeFloatingWindow().then(() => {
        floatingWindow.classList.add("expanded");
        floatingWindow.innerHTML = `
            <div class="floating-header">
                <img src="https://i.postimg.cc/13NCK7Qt/temp-Imagezumi-Hc.avif" alt="Icon" class="icon">
                <h4 class="title">PriceSnap</h4>
                <button id="closeFloatingWindow" class="close-button">X</button>
            </div>
            <div class="floating-subheader">
                <h4 class="product-list-title">Product List</h4>
            </div>
            <div id="productCardsContainer" class="product-cards-container"></div>
        `;
        const productCardsContainer = document.getElementById("productCardsContainer");
    
        products.forEach(({ Title, Price, Image, ProductLink }) => {
            const productCard = `
                <div class="product-card">
                    <div class="product-image">
                        <img src="data:image/jpeg;base64,${Image}" alt="${Title}">
                    </div>
                    <div class="product-details">
                        <h4 class="product-title">${Title}</h4>
                        <p class="product-price">Price: ${Price}</p>
                        <a href="${ProductLink}" target="_blank" class="view-link">View on eBay</a>
                    </div>
                </div>
            `;
            productCardsContainer.innerHTML += productCard;
        });
    
        addCloseButtonListener();
    });
}

function closeWindow() {
    floatingWindow.remove();
    floatingWindow = null; // Reset floatingWindow for future use
}

// Add close button functionality
function addCloseButtonListener() {
    document.getElementById("closeFloatingWindow").addEventListener("click", () => {
        closeWindow();
        chrome.runtime.sendMessage({ type: 'minimizeWindow' });
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
    } else if (message.type === 'closeWindow') {
        closeWindow();
    }
});
