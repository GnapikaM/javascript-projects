const accessKey = 'zBTsDwMpCkjRFRQ1uH1_eotJbPsXCsqOtBQS1nNWgFI';

const form = document.querySelector("form");
const inputBox = document.getElementById("inputBox");
const searchResults = document.querySelector(".search-results");
const showmoreBtn = document.getElementById("showmoreBtn");
const imagesName = document.getElementById("images-name");

const menuBar = document.querySelector(".menu");
const sideBar = document.querySelector(".side-bar");
const cancelBtn = document.querySelector(".cancel");

menuBar.addEventListener("click", () => {
    sideBar.classList.add("active");
});

cancelBtn.addEventListener("click", () => {
    sideBar.classList.remove("active");
});

let page = 1;
let currentCategory = '';

function displayResults(results) {
    results.map((result) => {
        const imageWrapper = document.createElement("div");
        imageWrapper.classList.add("search-result");
        const image = document.createElement("img");
        image.src = result.urls.small;
        image.alt = result.alt_description;
        const imageLink = document.createElement("a");
        imageLink.href = result.links.html;
        imageLink.target = "_blank";
        imageLink.textContent = result.alt_description;

        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);
        searchResults.appendChild(imageWrapper);
    })
}

async function fetchURL(URL) {
    const response = await fetch(URL);
    const data = await response.json();
    const results = data.results;

    return results;
}

async function searchImages(category) {
    const URL = `https://api.unsplash.com/search/photos?page=${page}&query=${category}&client_id=${accessKey}`;

    const results = await fetchURL(URL);

    if(page === 1) {
        searchResults.innerHTML = '';
    }

    displayResults(results);

    page++;
    if(page > 1) {
        showmoreBtn.style.display = 'block';
    }
}

document.querySelectorAll(".menu-item .link").forEach((item) => {
    item.addEventListener("click", async (event) => {
        event.preventDefault();
        page = 1;
        const category = event.currentTarget.querySelector("span").textContent;
        currentCategory = category;
        imagesName.textContent = `Searched Results for "${category}"`;
        await searchImages(category);

        const container = document.querySelector('.container');
        container.scrollTop = 0;
    })
})

form.addEventListener("submit", async (event) => {
    if(inputBox.value !== '') {
        event.preventDefault();
        page = 1;
        const category = inputBox.value;
        currentCategory = category;
        imagesName.textContent = `Searched Results for "${category}"`;
        await searchImages(category);

        const container = document.querySelector('.container');
        container.scrollTop = 0;
    }
})

showmoreBtn.addEventListener("click", async() => {
    if(currentCategory) {
        await searchImages(currentCategory);
    }
})