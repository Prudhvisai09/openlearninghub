document.addEventListener('DOMContentLoaded', function () {
    const startButton = document.getElementById('start-button');
    const listeningMessage = document.getElementById('listening-message');
    const responseMessage = document.getElementById('response-message');
    const searchResultsContainer = document.getElementById('searchResultsContainer');
    const searchResults = document.getElementById('searchResults');

    if ('webkitSpeechRecognition' in window) {
        const recognition = new webkitSpeechRecognition();
        
        // Adjust recognition parameters
        recognition.maxAlternatives = 5; // You can experiment with this value
        recognition.continuous = false;
        recognition.interimResults = false;

        recognition.onstart = function () {
            listeningMessage.style.display = 'block';
            responseMessage.textContent = '';
            searchResultsContainer.style.display = 'none';
        };

        recognition.onresult = async function (event) {
            listeningMessage.style.display = 'none';
            const userResponse = event.results[0][0].transcript;
            responseMessage.textContent = 'You said: ' + userResponse;

            // Send the spoken text to your Python server for keyword extraction
            const keywordsResponse = await fetch('http://localhost:5000/extractKeywords', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text: userResponse }),
            });

            const keywordsData = await keywordsResponse.json();
            const results = keywordsData.results;

            // Update the HTML with the search results
            displayResults(results);
        };

        recognition.onerror = function (event) {
            listeningMessage.style.display = 'none';
            responseMessage.textContent = 'Error: ' + event.error;
        };

        startButton.addEventListener('click', function () {
            listeningMessage.style.display = 'block';
            responseMessage.textContent = '';
            searchResultsContainer.style.display = 'none';
            recognition.start();
        });
    } else {
        listeningMessage.textContent = "Sorry, your browser doesn't support speech recognition.";
    }
});


async function displayResults(results) {
    const searchResultsContainer = document.getElementById('searchResultsContainer');
    const searchResults = document.getElementById('searchResults');

    // Clear previous results
    searchResults.innerHTML = '';

    // Parse the JSON string back to an array
    results = JSON.parse(results);

    // Display the results
    results.forEach(result => {
        const resultElement = document.createElement('div');
        resultElement.classList.add('result-item');

        // Check if the result has a path and name
        if (result.filepath && result.name) {
            // Create an iframe for the PDF thumbnail
            const pdfThumbnail = document.createElement('iframe');
            pdfThumbnail.src = result.filepath;
            pdfThumbnail.width = '100%';
            pdfThumbnail.height = '200px'; // You can adjust the height as needed

            // Create a paragraph for the name
            const resultName = document.createElement('p');
            resultName.textContent = result.name;

            // Append the thumbnail and name to the result element
            resultElement.appendChild(pdfThumbnail);
            resultElement.appendChild(resultName);

            // Attach a click event to open the full path in a new page
            resultElement.addEventListener('click', () => {
                window.open(result.filepath, '_blank');
            });
        } else {
            // If there is no path or name, display a message or handle it accordingly
            resultElement.innerHTML = '<p>No PDF path or name provided</p>';
        }

        // Append the result element to the search results
        searchResults.appendChild(resultElement);
    });

    // Show the container
    searchResultsContainer.style.display = results.length > 0 ? 'flex' : 'none';
}

