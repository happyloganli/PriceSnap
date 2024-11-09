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

// extract product id
function extractProductId() {
    const pageUrl = window.location.href;
    console.log('Current page URL: ' + pageUrl);
    const productId = pageUrl.split('/')[5];
    console.log('product id: ' + productId);
}

// extract product informations when called
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'extractProductInfo') {
        console.log("receieve call, extract product informations");
        const platform = 'facebook';
        const itemID = extractProductId();
        const title = extractProductName();
        const details = extractDetails();
        const description = extractDescription();
        const productInfo = {
            platform,
            itemID,
            title,
            details,
            description
        };
        sendResponse(productInfo);
    }
});