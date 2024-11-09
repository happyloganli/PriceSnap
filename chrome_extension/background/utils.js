export function sendPostRequest(productInfo) {
    return new Promise((resolve, reject) => {
        // Replace this with your actual POST request logic
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'YOUR_API_URL', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onreadystatechange = function() {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    resolve(JSON.parse(xhr.responseText));
                } else {
                    reject(new Error('Failed to fetch data'));
                }
            }
        };
        xhr.send(JSON.stringify(productInfo));
    });
}