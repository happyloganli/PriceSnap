const serverUrl = 'http://localhost:8080/v1/items/search'

export async function sendPostRequest(data) {
    fetch(serverUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }
      return response.json(); // Parse JSON response
    })
    .then(result => {
      console.log('Response from server:', result);
      // You can process the result here
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }
  