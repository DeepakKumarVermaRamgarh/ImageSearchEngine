const searchForm = document.getElementById('search-form');
const searchBox = document.getElementById('search-box');
const searchResult = document.getElementById('search-result');
const showMoreBtn = document.getElementById('show-more-btn');
var styleSheet = document.createElement('style');

const client_id = 'BQSM3KsnKgrWRcOe2TXa--TAnqOr--9YdzorCPrsI1g';

let keyword = '';
let page = 1;

// Function to search for images based on the entered keyword
async function searchImages() {
    keyword = searchBox.value.trim();
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${client_id}&per_page=12`;

    const response = await fetch(url);
    const data = await response.json();

    // Clear search results on the first page
    if (page === 1) {
        searchResult.innerHTML = "";
    }

    const results = data.results;

    if (!results.length) return;

    // Display the search results
    results.map(result => {
        const image = document.createElement('img');
        image.src = result.urls.small;

        const imageLink = document.createElement('a');
        imageLink.href = result.links.html;
        imageLink.target = '_blank';

        imageLink.appendChild(image);
        searchResult.appendChild(imageLink);
    });

    // Show the "Show more" button
    showMoreBtn.style.display = 'block';

    // Add style to give credit to unsplash container
    styleSheet.innerHTML = "body::before { display: block !important; }";
    document.head.appendChild(styleSheet);
}

// Handle form submission to initiate the image search
searchForm.onsubmit = (e) => {
    e.preventDefault();
    page = 1;
    searchImages();
}

// Handle click event on the "Show more" button to load more search results
showMoreBtn.onclick = function () {
    page++;
    searchImages();
}
