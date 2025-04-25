export function displayDeals(products) {
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