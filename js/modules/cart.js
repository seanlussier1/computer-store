export function displayCartItems() {
    const cartListing = document.querySelector(".cart-container");
    if (!cartListing) {
        console.error("Cart listing container not found!");
        return;
    }

    cartListing.innerHTML = "";
    const cartData = localStorage.getItem("cart");
    const cart = cartData ? JSON.parse(cartData) : [];

    // if the cart has empty array sets total to 0 and says cart is empty
    if (cart.length === 0) {
        createCustomElement(cartListing, "p", "Your cart is empty.");
        const totalElement = document.querySelector(".price-calculation");
        if (totalElement) {
            totalElement.textContent = "Total: $0.00";
        }
        return;
    }

    const cartContainer = document.getElementsByClassName("cart-container")[0];
    cartContainer.classList.add("cart-item-display"); 
    cartContainer.style.width = "40%"; 

    // creates item in the cart page
    cart.forEach((item, index) => {
        const itemInfo = createCustomElement(cartContainer, "div", "");
        const itemImage = document.createElement("img");
        itemInfo.classList.add("item-card");

        createCustomElement(itemInfo, "h1", item.item_title).classList.add("product-name");
        createCustomElement(itemInfo, "p", `Brand: ${item.brand}`);
        createCustomElement(itemInfo, "p", `Make: ${item.make}`);
        createCustomElement(itemInfo, "p", `Price: $${item.unit_price}`).classList.add("product-price");

        // ADDING QUANTITY INPUT
        const quantityContainer = createCustomElement(itemInfo, "div", "");
        const quantityLabel = createCustomElement(quantityContainer, "span", "Quantity:");
        const quantityInput = document.createElement("input");
        quantityInput.type = "number";
        quantityInput.min = "1";
        quantityInput.value = item.quantity || 1;
        quantityInput.dataset.index = index;
        quantityContainer.appendChild(quantityInput);

        itemImage.src = item.thumbnail_image;
        itemImage.classList.add("item-img-top");
        // adds to the start of the parent
        itemInfo.prepend(itemImage);
        
        const removeButton = createCustomElement(itemInfo, "button", "Remove"); 
        removeButton.dataset.index = index; 
        });

        // REMOVE BUTTON ON EACH ITEM
        const removeButtons = document.querySelectorAll(".item-card button");
        removeButtons.forEach(button => {
        // on button click removes item based on the index it is on
        button.addEventListener("click", () => {
            const index = parseInt(button.dataset.index);
            removeCartItem(index);
            displayCartItems();
            });
        });

        // UPDATE QUANTITY
        const quantityInputs = document.querySelectorAll(".item-card input[type='number']");
        // changes the quanitty of the cart and depending on the number user changes it to updates the quantity
        // of specific item
        quantityInputs.forEach(input => {
        input.addEventListener("change", () => {
            const index = parseInt(input.dataset.index);
            const newQuantity = parseInt(input.value);
            // quantity cant go lower than 1
            if (newQuantity >= 1) {
                updateCartQuantity(index, newQuantity);
                displayCartItems();
            } else {
                input.value = item.quantity || 1;
                }
            });
        });

        // TOTAL OF CART
        const totalElement = document.querySelector(".price-calculation");
        if (cart.length > 0) {
            // calculates the total of all the items in the cart 
            const totalPrice = cart.reduce((sum, item) => sum + item.unit_price * item.quantity, 0);
            totalElement.textContent = `Total: $${totalPrice}`;
        }
    }

function removeCartItem(index) {
    const cartData = localStorage.getItem("cart");
    let cart;
    try {
        // checks of the cart is empty or not
        cart = cartData ? JSON.parse(cartData) : [];
    } catch (e) {
        console.error("Invalid cart data:", e);
    }
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
}

function updateCartQuantity(index, newQuantity) {
    const cartData = localStorage.getItem("cart");
    let cart;
    try {
        // checks of cart is empty or not 
        cart = cartData ? JSON.parse(cartData) : [];
    } catch (e) {
        console.error("Invalid cart data:", e);
    }
    // gets the index of a specific item and sets new quantity of that item
    if (cart[index]) {
        cart[index].quantity = newQuantity;
        localStorage.setItem("cart", JSON.stringify(cart));
    }
}

function createCustomElement(parent,newElementName,content) {
    const newElem = document.createElement(newElementName);
    newElem.textContent = content;
    parent.appendChild(newElem);
    return newElem;
}