// Function to display the rearch results in a floating window
function showFloatingWindow(result) {
    console.log("Displaying floating window with result:", result);
    const floatingWindow = document.createElement("div");
    floatingWindow.style.position = "fixed";
    floatingWindow.style.top = "20px"; // Distance from the top of the page
    floatingWindow.style.right = "20px"; // Distance from the right of the page
    floatingWindow.style.width = "300px"; // Adjust width as needed
    floatingWindow.style.padding = "20px";
    floatingWindow.style.backgroundColor = "#fff";
    floatingWindow.style.borderRadius = "8px";
    floatingWindow.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.3)";
    floatingWindow.style.zIndex = "9999"; // Ensure the window is on top
    floatingWindow.style.textAlign = "center";
    floatingWindow.style.overflow = "auto"; // Allow scrolling if needed
    floatingWindow.style.maxHeight = "80%"; // Prevent it from growing too large

    floatingWindow.innerHTML = `
      <h4>Here are the search results:</h4>
      <p><strong>${result}</strong></p>
      <button id="closeFloatingWindow" style="margin-top: 10px; padding: 8px 12px;">Close</button>
    `;

    document.body.appendChild(floatingWindow);
    console.log("Floating window appended to body.");

    document.getElementById("closeFloatingWindow").addEventListener("click", () => {
      console.log("Closing floating window.");
      floatingWindow.remove();
    });

    // Drag and Drop Implementation
    let offsetX, offsetY;
    let isDragging = false;

    // Function to start dragging
    floatingWindow.addEventListener("mousedown", (e) => {
        isDragging = true;
        // Calculate the offset of the mouse from the top-left corner of the floating window
        offsetX = e.clientX - floatingWindow.getBoundingClientRect().left;
        offsetY = e.clientY - floatingWindow.getBoundingClientRect().top;

        // Change cursor to indicate dragging
        floatingWindow.style.cursor = "move";
    });

    // Function to drag the window
    window.addEventListener("mousemove", (e) => {
        if (isDragging) {
            // Update the position of the floating window based on the mouse movement
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