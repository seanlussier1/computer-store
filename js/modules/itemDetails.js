export function productDetails(products) {
    const computerListing = document.querySelector("#item-listing");
    sessionStorage.getItem("show-id")
    // Only choose the product where the ID is the same.
    const filteredProducts = products.products.filter(product => product.item_id.toString() === sessionStorage.getItem("show-id"));

        const productElement = document.getElementById("item-listing");
        productElement.classList.add("item-details-info");  
        productElement.style.width = "30rem";
// Make a card for that product
        productElement.innerHTML = `
             <img src="${filteredProducts[0].thumbnail_image}" class="card-img-top" alt="Image of ${filteredProducts[0].item_title}">
             <div class="card-body">
                 <h1 class="product-name">${filteredProducts[0].item_title}</h3>
                 <p>Brand: ${filteredProducts[0].brand}</p>
                 <p>Make: ${filteredProducts[0].make}</p>
                 <p class="card-text">${filteredProducts[0].description}</p>
                 <p class="product-price">$${filteredProducts[0].unit_price}</p>
                 <p>Quantity of product: ${filteredProducts[0].quantity_in_stock}</p>
                 <p>Product ID: ${filteredProducts[0].item_id}</p>
             </div>
                <div class="card-footer">
                    <button class="btn btn-primary" id="add-to-cart">Add to Cart</button>
                    <button class="btn btn-secondary" id="buy-now">Buy Now</button>
         `;
        console.log(filteredProducts[0].item_title)
// Add to cart button with local storage.
        const addToCartButton = document.getElementById("add-to-cart");
        addToCartButton.addEventListener("click", () => {
            
            const productToAdd = {
                item_id: filteredProducts[0].item_id,
                item_title: filteredProducts[0].item_title,
                brand: filteredProducts[0].brand,
                make: filteredProducts[0].make,
                unit_price: filteredProducts[0].unit_price,
                thumbnail_image: filteredProducts[0].thumbnail_image,
                quantity: 1
            };
            
            let cart;
            const cartData = localStorage.getItem("cart");
            try {
                cart = cartData ? JSON.parse(cartData) : [];
            } catch (e) {
                console.error("Invalid cart data:", e);
                cart = [];
            }

            // Check if item already exists in cart
            const existingItemIndex = cart.findIndex(item => item.item_id === productToAdd.item_id);
            if (existingItemIndex !== -1) {
                // Increment quantity if item exists
                cart[existingItemIndex].quantity += 1;
            } else {
                // Add new item if it doesn't exist
                cart.push(productToAdd);
            }
            
            console.log(cart);
            localStorage.setItem("cart", JSON.stringify(cart));
    
        });

        computerListing.appendChild(productElement);

}; 

