export function displayCartItems() {
    const cartListing = document.querySelector(".cart-container");
    if (!cartListing) {
        console.error("Cart listing container not found!");
        return;
    }

    cartListing.innerHTML = "";

    const cartData = localStorage.getItem("cart");
    const cart = cartData ? JSON.parse(cartData) : [];

    if (cart.length === 0) {
        createCustomElement(cartListing, "p", "Your cart is empty.");
        
        return;
    }

    const cartContainer = document.getElementsByClassName("cart-container")[0];
    cartContainer.classList.add("cart-item-display"); //TODO: style this in css
    cartContainer.style.width = "40%"; // TODO: Change this to css later

    cart.forEach((item, index) => {
        const itemInfo = createCustomElement(cartContainer, "div", "");
        const itemImage = document.createElement("img");
        itemInfo.classList.add("item-card");

        createCustomElement(itemInfo, "h1", item.item_title).classList.add("product-name");
        createCustomElement(itemInfo, "p", `Brand: ${item.brand}`);
        createCustomElement(itemInfo, "p", `Make: ${item.make}`);
        createCustomElement(itemInfo, "p", `Price: $${item.unit_price}`).classList.add("product-price");
        createCustomElement(itemInfo, "p", `Product ID: ${item.item_id}`);

        itemImage.src = item.thumbnail_image;
        itemImage.classList.add("item-img-top");
        itemInfo.prepend(itemImage);
        
        const removeButton = createCustomElement(itemInfo, "button", "Remove"); 
        removeButton.dataset.index = index; 
        });

        

        // REMOVE BUTTON ON EACH ITEM
        const removeButtons = document.querySelectorAll(".item-card button");
        removeButtons.forEach(button => {
        button.addEventListener("click", () => {
            const index = parseInt(button.dataset.index);
            removeCartItem(index);
            displayCartItems();
            });
        });

        // TOTAL OF CART
        const totalElement = document.querySelector(".price-calculation");
        if (cart.length > 0) {
            const totalPrice = cart.reduce((sum, item) => sum + item.unit_price * item.quantity, 0);
            totalElement.textContent = `Total: $${totalPrice}`;
        }
    }

function removeCartItem(index) {
    const cartData = localStorage.getItem("cart");
    let cart;
    try {
        cart = cartData ? JSON.parse(cartData) : [];
    } catch (e) {
        console.error("Invalid cart data:", e);
        return;
    }
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
}

function createCustomElement(parent,newElementName,content) {
    const newElem = document.createElement(newElementName);
    newElem.textContent = content;
    parent.appendChild(newElem);
    return newElem;
}