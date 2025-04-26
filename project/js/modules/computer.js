export function displayComputerParts(products) {
    const computerListing = document.querySelector(".product-Listings");

    const filteredProducts = products.products.filter(product => product.category_id === 2);

    filteredProducts.forEach(product => {
        const productElement = document.createElement("div");
        productElement.classList.add("computer-item");

        productElement.innerHTML = `
          <div class="card" style="width: 18rem;">
            <img src="${product.thumbnail_image}" class="card-img-top" alt="Image of ${product.item_title}">
            <div class="card-body">
                <h1 class="product-name">${product.item_title}</h3>
                <p class="card-text">${product.description}</p>
                <p class="product-price">$${product.unit_price}</p>
                <a href="item-listing.html">Item Listing</a>
            </div>
        </div>
        `;

        computerListing.appendChild(productElement);
    });
}