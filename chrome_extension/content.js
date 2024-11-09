console.log("load extension");

// extract product name
function extractProductName() {
    const productNameNode = document.querySelector('div.xyamay9.x1pi30zi.x18d9i69.x1swvt13 h1 span');
    const productName = productNameNode.textContent;
    console.log('retrieve product name: ' + productName);
    return productName;
}


// extract details
function extractDetails() {
    const productDetailNode = document.querySelector('div.x9f619.x1n2onr6.x1ja2u2z.x78zum5.xdt5ytf.x2lah0s.x193iq5w.x1swvt13.x1pi30zi.x1gslohp.x12nagc.xzboxd6.x14l7nz5 ul');
    const productDetailColumns = [];
    productDetailNode.childNodes.forEach(colNode => {
        const detailColumn = extractDetailColumn(colNode);
        productDetailColumns.push(detailColumn);
    });
    const productDetail = productDetailColumns.join('\n');

    console.log('retrieve product detail: ' + productDetail);
    return productDetail;
}

// extract a column in details
function extractDetailColumn(colNode) {
    const spanNodes = colNode.childNodes[0].childNodes;
    const detailColumn = [];
    spanNodes.forEach(spanNode => {
        detailColumn.push(spanNode.textContent);
    });
    return detailColumn.join(': ');
}

// extract product description
function extractDescription() {
    const productDescriptionNode = document.querySelector('div.xz9dl7a.x4uap5.xsag5q8.xkhd6sd.x126k92a div span');
    console.log('retrieve product description node: ' + productDescriptionNode.innerHTML);
    const productDescription = productDescriptionNode.textContent;
    console.log('retrieve product description: ' + productDescription);
    return productDescription;
}

// add a button, when user clicked, pop up a small window and start searching
function addSearchButton() {
    const buttonsRootNode = document.querySelector('div.x78zum5.xdt5ytf.x1iyjqo2.x1n2onr6 div div.x1daaz14 div');
    // let searchButton = buttonsRootNode.childNodes[0].cloneNode(true).childNodes[0];
    // console.log('copied button: ' + searchButton.innerHTML);

    // // change inner text
    // const textNode = searchButton.querySelector('span.x1lliihq.x6ikm8r.x10wlt62.x1n2onr6.xlyipyv.xuxw1ft')
    // textNode.textContent = 'search';

    // // Create container that matches the styling of other buttons
    // const searchButton = document.createElement('div');
    // searchButton.className = 'x1emribx x1iyjqo2';

    // // Create span wrapper to match structure
    // const span = document.createElement('span');
    // span.className = 'x4k7w5x x1h91t0o x1h9r5lt x1jfb8zj xv2umb2 x1beo9mf xaigb6o x12ejxvf x3igimt xarpa2k xedcshv x1lytzrv x1t2pt76 x7ja8zs x1qrby5j';

    // // Create inner div structure
    // const innerDiv = document.createElement('div');
    // innerDiv.className = 'xjp7ctv';

    // // Create button wrapper
    // const buttonWrapper = document.createElement('div');
    
    // // Create button element with matching classes
    // const button = document.createElement('div');
    // button.className = 'x1i10hfl xjbqb8w x1ejq31n xd10rxx x1sy0etr x17r0tee x972fbf xcfux6l x1qhh985 xm0m39n x1ypdohk xe8uvvx xdj266r x11i5rnm xat24cr x1mh8g0r xexx8yu x4uap5 x18d9i69 xkhd6sd x16tdsg8 x1hl2dhg xggy1nq x1o1ewxj x3x9cwd x1e5q0jg x13rtm0m x87ps6o x1lku1pv x1a2a7pz x9f619 x3nfvp2 xdt5ytf xl56j7k x1n2onr6 xh8yej3';
    // button.setAttribute('role', 'button');
    // button.setAttribute('tabindex', '0');
    // button.setAttribute('style', 'background-color:powderblue;')

    // // Create button content container
    // const buttonContent = document.createElement('div');
    // buttonContent.className = 'x1ja2u2z x78zum5 x2lah0s x1n2onr6 xl56j7k x6s0dn4 xozqiw3 x1q0g3np xi112ho x17zwfj4 x585lrc x1403ito x972fbf xcfux6l x1qhh985 xm0m39n x9f619 xn6708d x1ye3gou x1qhmfi1 x1r1pt67';

    // // Create flex container for icon and text
    // const flexContainer = document.createElement('div');
    // flexContainer.className = 'x6s0dn4 x78zum5 xl56j7k x1608yet xljgi0e x1e0frkt';

    // // Create icon container
    // const iconContainer = document.createElement('div');
    // iconContainer.className = 'x9f619 x1n2onr6 x1ja2u2z x193iq5w xeuugli x6s0dn4 x78zum5 x2lah0s x1fbi1t2 xl8fo4v';

    // // Create image placeholder
    // const imgPlaceholder = document.createElement('i');
    // imgPlaceholder.className = 'x1b0d499 xep6ejk';
    // imgPlaceholder.setAttribute('aria-hidden', 'true');

    // // Create text container
    // const textContainer = document.createElement('div');
    // textContainer.className = 'x9f619 x1n2onr6 x1ja2u2z x193iq5w xeuugli x6s0dn4 x78zum5 x2lah0s x1fbi1t2 xl8fo4v';

    // // Create text span
    // const textSpan = document.createElement('span');
    // textSpan.className = 'x193iq5w xeuugli x13faqbe x1vvkbs x1xmvt09 x1lliihq x1s928wv xhkezso x1gmr53x x1cpjm7i x1fgarty x1943h6x xudqn12 x3x7a5m x6prxxf xvq8zen x1s688f x1dem4cn';
    // textSpan.setAttribute('dir', 'auto');

    // const innerTextSpan = document.createElement('span');
    // innerTextSpan.className = 'x1lliihq x6ikm8r x10wlt62 x1n2onr6 xlyipyv xuxw1ft';
    // innerTextSpan.textContent = 'Search';

    // // Assemble the component
    // textSpan.appendChild(innerTextSpan);
    // textContainer.appendChild(textSpan);
    // iconContainer.appendChild(imgPlaceholder);
    // flexContainer.appendChild(iconContainer);
    // flexContainer.appendChild(textContainer);
    // buttonContent.appendChild(flexContainer);
    // button.appendChild(buttonContent);
    // buttonWrapper.appendChild(button);
    // innerDiv.appendChild(buttonWrapper);
    // span.appendChild(innerDiv);
    // searchButton.appendChild(span);

    buttonsRootNode.appendChild(searchButton);
}

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

addSearchButton();