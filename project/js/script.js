// import { fetchData } from "/project/js/modules/fetchWrapper.js";

document.addEventListener('DOMContentLoaded', initApp);

function initApp() {
    console.log("initializing the app");
    fetchProducts();
}

async function fetchProducts() {
    try {
        console.log("fetching products...");

        const response = await fetch('data/products.json'); 
        if (!response.ok) {
            throw new Error('Failed to fetch the local JSON file');
        }

        const products = await response.json();
        console.log(products);

        const isHomePage = document.querySelector(".products-page");
        const isRecommendedPage = document.querySelector(".recommended-page");
        const isComputerPartsPage = document.querySelector('.computer-parts-page');
        const isDealsPage = document.querySelector('.deals-page');
        const isLaptopPage = document.querySelector('.laptop-page');
        const isDesktopPage = document.querySelector('.desktop-page');

        if (isHomePage) {
            displayProducts(products); 
        } else if (isRecommendedPage) {
            displayRecommended(products); 
        } else if (isComputerPartsPage) {
            displayComputerParts(products); 
        } else if (isDealsPage) {
            displayDeals(products); 
        } else if (isLaptopPage) {
            displayLaptops(products);
        } else if (isDesktopPage) {
            displayDesktops(products);
        } else {
            console.log("no matching page.");
        }
            
        
    } catch (error) {
        console.log(`Error while fetching: ${error.message}`);
    }
}

function displayProducts(products) {
    const productListing = document.querySelector(".product-Listings");
    
    productListing.innerHTML = '';

    products.products.forEach(product => {
        const productElement = document.createElement("div");
        productElement.classList.add("product-item");

        productElement.innerHTML = `
            <h3 class="product-name">${product.item_title}</h3>
            <img class="product-image" src="${product.thumbnail_image}" alt="${product.product_name}" >
            <p class="product-description">${product.description}</p>
            <p class="product-price">${product.unit_price}</p>
        `;

        productListing.appendChild(productElement);
    });  
}

function displayRecommended(products) {
    const computerListing = document.querySelector(".recommended-listing");
    computerListing.innerHTML = '';

    const filteredProducts = products.products.filter(product => product.category_id === 1);

    filteredProducts.forEach(product => {
        const productElement = document.createElement("div");
        productElement.classList.add("recommended-item");

        productElement.innerHTML = `
            <h3 class="product-name">${product.item_title}</h3>
            <img class="product-image" src="${product.thumbnail_image}" alt="${product.item_title}" >
            <p class="product-description">${product.description}</p>
            <p class="product-price">$${product.unit_price}</p>
        `;

        computerListing.appendChild(productElement);
    });
}

function displayComputerParts(products) {
    const computerListing = document.querySelector(".computer-listing");
    computerListing.innerHTML = '';

    const filteredProducts = products.products.filter(product => product.category_id === 2);

    filteredProducts.forEach(product => {
        const productElement = document.createElement("div");
        productElement.classList.add("computer-item");

        productElement.innerHTML = `
            <h3 class="product-name">${product.item_title}</h3>
            <img class="product-image" src="${product.thumbnail_image}" alt="${product.item_title}" >
            <p class="product-description">${product.description}</p>
            <p class="product-price">$${product.unit_price}</p>
        `;

        computerListing.appendChild(productElement);
    });
}

function displayDeals(products) {
    const computerListing = document.querySelector(".deals-listings");
    computerListing.innerHTML = '';

    const filteredProducts = products.products.filter(product => product.category_id === 3);

    filteredProducts.forEach(product => {
        const productElement = document.createElement("div");
        productElement.classList.add("deals-item");

        productElement.innerHTML = `
            <h3 class="product-name">${product.item_title}</h3>
            <img class="product-image" src="${product.thumbnail_image}" alt="${product.item_title}" >
            <p class="product-description">${product.description}</p>
            <p class="product-price">$${product.unit_price}</p>
        `;

        computerListing.appendChild(productElement);
    });
}

function displayLaptops(products) {
    const computerListing = document.querySelector(".laptops-listing");
    computerListing.innerHTML = '';

    const filteredProducts = products.products.filter(product => product.category_id === 4);

    filteredProducts.forEach(product => {
        const productElement = document.createElement("div");
        productElement.classList.add("laptop-item");

        productElement.innerHTML = `
            <h3 class="product-name">${product.item_title}</h3>
            <img class="product-image" src="${product.thumbnail_image}" alt="${product.item_title}" >
            <p class="product-description">${product.description}</p>
            <p class="product-price">$${product.unit_price}</p>
        `;

        computerListing.appendChild(productElement);
    });
}

function displayDesktops(products) {
    const computerListing = document.querySelector(".desktop-listing");
    computerListing.innerHTML = '';

    const filteredProducts = products.products.filter(product => product.category_id === 5);

    filteredProducts.forEach(product => {
        const productElement = document.createElement("div");
        productElement.classList.add("desktop-item");

        productElement.innerHTML = `
            <h3 class="product-name">${product.item_title}</h3>
            <img class="product-image" src="${product.thumbnail_image}" alt="${product.item_title}" >
            <p class="product-description">${product.description}</p>
            <p class="product-price">$${product.unit_price}</p>
        `;

        computerListing.appendChild(productElement);
    });
}