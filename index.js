const accessKey = 'DRoVHp26mZTqk0ixCeJAKW2wzl9TVbBj-2Qmpc9Jnao';
const formEl = document.querySelector("form");
const inputEl = document.getElementById("search-input");
const searchResults = document.getElementById("search-results");
const showMore = document.getElementById("show-more-button");

let inputData = "";
let page = 1;

async function searchImages() {
    inputData = inputEl.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        const results = data.results;

        if (page === 1) {
            searchResults.innerHTML = ""; // Clear previous results only if it's a new search
        }

        results.map((result) => {
            const imageWrapper = document.createElement("div");
            imageWrapper.classList.add("search-result");

            const image = document.createElement("img");
            image.src = result.urls.small;
            image.alt = result.alt_description; // Use result.alt_description

            const imageLink = document.createElement("a");
            imageLink.href = result.links.html; // Use result.links.html
            imageLink.target = "_blank";
            imageLink.textContent = result.alt_description;

            imageLink.appendChild(image);
            imageWrapper.appendChild(imageLink);
            searchResults.appendChild(imageWrapper);
        });

        page++;
        if (page > 1) {
            showMore.style.display = "block"; // Show 'Show more' button after the first page
        }
    } catch (error) {
        console.error("Error fetching images:", error);
    }
}

formEl.addEventListener("submit", (event) => {
    event.preventDefault();
    page = 1; // Reset to page 1 for new search
    searchImages();
});

showMore.addEventListener("click", () => {
    searchImages(); // Load more images
});
