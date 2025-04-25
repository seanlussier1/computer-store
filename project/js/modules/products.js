export function displayProducts(products) {
    const productListing = document.querySelector(".recommended-listing");
    
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