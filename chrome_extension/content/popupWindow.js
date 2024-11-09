// Function to display the eBay website from url in a floating window
function showFloatingWindow(url) {
    console.log("Displaying floating window with eBay URL:", url);
    const floatingWindow = document.createElement("div");
    floatingWindow.style.position = "fixed";
    floatingWindow.style.top = "20px"; // Distance from the top of the page
    floatingWindow.style.right = "20px"; // Distance from the right of the page
    floatingWindow.style.width = "300px"; // Adjust width as needed
    floatingWindow.style.height = "400px"; // Set height for better visibility
    floatingWindow.style.padding = "0";
    floatingWindow.style.backgroundColor = "#fff";
    floatingWindow.style.borderRadius = "8px";
    floatingWindow.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.3)";
    floatingWindow.style.zIndex = "9999"; // Ensure the window is on top
    floatingWindow.style.textAlign = "center";
    floatingWindow.style.overflow = "hidden"; // Hide overflow to prevent scrollbars

    floatingWindow.innerHTML = `
      <div style="padding: 10px; background-color: #f5f5f5; border-bottom: 1px solid #ddd;">
        <h4 style="margin: 0;">eBay Browser</h4>
        <button id="closeFloatingWindow" style="float: right; padding: 4px 8px; cursor: pointer;">Close</button>
      </div>
      <iframe src="${url}" style="width: 100%; height: calc(100% - 40px); border: none;"></iframe>
    `;

    document.body.appendChild(floatingWindow);
    console.log("Floating window with eBay iframe appended to body.");

    document.getElementById("closeFloatingWindow").addEventListener("click", () => {
        console.log("Closing floating window.");
        floatingWindow.remove();
    });

    // Drag and Drop Implementation
    let offsetX, offsetY;
    let isDragging = false;

    // Function to start dragging
    floatingWindow.addEventListener("mousedown", (e) => {
        if (e.target.id !== "closeFloatingWindow") { // Ignore if close button is clicked
            isDragging = true;
            offsetX = e.clientX - floatingWindow.getBoundingClientRect().left;
            offsetY = e.clientY - floatingWindow.getBoundingClientRect().top;
            floatingWindow.style.cursor = "move"; // Change cursor to indicate dragging
        }
    });

    // Function to drag the window
    window.addEventListener("mousemove", (e) => {
        if (isDragging) {
            floatingWindow.style.left = `${e.clientX - offsetX}px`;
            floatingWindow.style.top = `${e.clientY - offsetY}px`;
        }
    });

    // Function to stop dragging
    window.addEventListener("mouseup", () => {
        isDragging = false;
        floatingWindow.style.cursor = "default"; // Reset cursor
    });
}

// Expose the functions to be accessible by other
window.createstyledElement =createstyledElement;window.showFloatingWindow =showFloatingWindow;



//showFloatingWindow("https://www.ebay.com"); // Pass the eBay URL you want to embed
