// Your GNews API key (replace with your actual key)
const apiKey = '';

// Function to fetch and display news articles
function fetchNews() {
    const newsSection = document.querySelector('.news-section');

    // Define your query parameters, e.g., 'weather' for weather-related news
    const query = 'weather';

    // Build the API URL with your query and API key
    const apiUrl = `https://gnews.io/api/v4/search?q=${query}&token=${apiKey}`;

    // Make a GET request to the GNews API
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Clear any existing content in the news section
            newsSection.innerHTML = '';

            // Loop through the articles and create HTML elements to display them
            data.articles.forEach(article => {
                const articleElement = document.createElement('div');
                articleElement.classList.add('news-article');

                const titleElement = document.createElement('h2');
                titleElement.textContent = article.title;

                const descriptionElement = document.createElement('p');
                descriptionElement.textContent = article.description;

                const linkElement = document.createElement('a');
                linkElement.href = article.url;
                linkElement.textContent = 'Read more';

                articleElement.appendChild(titleElement);
                articleElement.appendChild(descriptionElement);
                articleElement.appendChild(linkElement);

                newsSection.appendChild(articleElement);
            });
        })
        .catch(error => {
            console.error('Error fetching news:', error);
            // Display an error message on the page
            newsSection.innerHTML = 'Failed to load news articles.';
        });
}

// Call the function to fetch news
fetchNews();
