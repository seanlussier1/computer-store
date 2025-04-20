import { fetchData } from "/project/js/modules/fetchWrapper.js";

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

        displayProducts(products);
    } catch (error) {
        console.log(`Error while fetching: ${error.message}`);
    }
}

function displayProducts(products) {
    const productListing = document.querySelector(".product-Listings");
    
    productListing.innerHTML = '';

    products.forEach(product => {
        const productElement = document.createElement("div");
        productElement.classList.add("product-item");

        productElement.innerHTML = `
            <img src="${product.image.url}" alt="${product.product_name}" class="product-image">
            <h3 class="product-name">${product.product_name}</h3>
            <p class="product-description">${product.description}</p>
            <p class="product-price">${product.price}</p>
        `;

        productListing.appendChild(productElement);
    });
}
