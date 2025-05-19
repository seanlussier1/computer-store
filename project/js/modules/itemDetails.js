export function productDetails(products) {
    const computerListing = document.querySelector("#item-listing");
    sessionStorage.getItem("show-id")
    const filteredProducts = products.products.filter(product => product.item_id.toString() === sessionStorage.getItem("show-id"));

        const productElement = document.getElementById("item-listing");
        productElement.classList.add("item-details-info");  // TODO: style this in css
        productElement.style.width = "30rem";

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
            if (cartData) {
                cart = JSON.parse(cartData);
                cart.push(productToAdd);
            } else {
                cart = [productToAdd];
            }
            
            console.log(cart);
            localStorage.setItem("cart", JSON.stringify(cart));
    
        });

        computerListing.appendChild(productElement);

}; 

function createCustomElement(parent,newElementName,content) {
    const newElem = document.createElement(newElementName);
    newElem.textContent = content;
    parent.appendChild(newElem);
    return newElem;
}

// export function displayCartItems() {
//     const cartListing = document.querySelector(".cart-container");
//     if (!cartListing) {
//         console.error("Cart listing container not found!");
//         return;
//     }

//     cartListing.innerHTML = "";

//     const cartData = localStorage.getItem("cart");
//     const cart = cartData ? JSON.parse(cartData) : [];

//     if (cart.length === 0) {
//         createCustomElement(cartListing, "p", "Your cart is empty.");
//         return;
//     }

//     const cartContainer = document.getElementsByClassName("cart-container")[0];
//     cartContainer.classList.add("cart-item-display"); //TODO: style this in css
//     cartContainer.style.width = "40%"; // TODO: Change this to css later

//     cart.forEach((item, index) => {
//         const itemInfo = createCustomElement(cartContainer, "div", "");
//         const itemImage = document.createElement("img");
//         itemInfo.classList.add("item-card");

//         createCustomElement(itemInfo, "h1", item.item_title).classList.add("product-name");
//         createCustomElement(itemInfo, "p", `Brand: ${item.brand}`);
//         createCustomElement(itemInfo, "p", `Make: ${item.make}`);
//         createCustomElement(itemInfo, "p", `Price: $${item.unit_price}`).classList.add("product-price");
//         createCustomElement(itemInfo, "p", `Product ID: ${item.item_id}`);

//         itemImage.src = item.thumbnail_image;
//         itemImage.classList.add("item-img-top");
//         itemInfo.prepend(itemImage);
        
//         const removeButton = createCustomElement(itemInfo, "button", "Remove"); 
//         removeButton.dataset.index = index; 
//         });

//         // REMOVE BUTTON ON EACH ITEM
//         const removeButtons = document.querySelectorAll(".item-card button");
//         removeButtons.forEach(button => {
//         button.addEventListener("click", () => {
//             const index = parseInt(button.dataset.index);
//             removeCartItem(index);
//             displayCartItems();
//             });
//         });

//         // TOTAL OF CART
//         const totalElement = document.querySelector(".price-calculation");
//         if (cart.length > 0) {
//             const totalPrice = cart.reduce((sum, item) => sum + item.unit_price * item.quantity, 0);
//             totalElement.textContent = `Total: $${totalPrice}`;
//         } else if (!totalElement) {
//         console.error("Total element (.price-calculation) not found!");
//     }
//     }

// function removeCartItem(index) {
//     const cartData = localStorage.getItem("cart");
//     let cart;
//     try {
//         cart = cartData ? JSON.parse(cartData) : [];
//     } catch (e) {
//         console.error("Invalid cart data:", e);
//         return;
//     }
//     cart.splice(index, 1); // Remove item at the specified index
//     localStorage.setItem("cart", JSON.stringify(cart));
// }
