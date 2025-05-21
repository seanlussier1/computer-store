import { fetchData } from "./modules/fetchWrapper.js";
import { displayProducts } from "./modules/products.js";
import { displayRecommended } from "./modules/home.js";
import { displayComputerParts } from "./modules/computer.js";
import { displayDeals } from "./modules/deals.js";
import { displayLaptops } from "./modules/laptop.js";
import { displayDesktops } from "./modules/desktop.js";
import { productDetails } from "./modules/itemDetails.js";
import { initLeafletMap } from "./modules/map.js";
import { displayCartItems } from "./modules/cart.js";
import { submitForm } from "./modules/contact-form.js";
import { createAccount } from "./modules/create-account.js";
import { signIn } from "./modules/signIn.js";
import { fetchPokemon } from "./modules/pokemon.js";

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

        const page = document.querySelector("[data-page]").dataset.page;
        console.log(page);
        if (page === "home-page") {
            displayRecommended(products);
            hasSearchBar() 
        } else if (page === "product-listing-page") {
            displayProducts(products);
            hasSearchBar() 
        } else if (page === "computer-parts-page") {
            displayComputerParts(products);
            hasSearchBar() 
        } else if (page === "deals-page") {
            displayDeals(products);
            hasSearchBar() 
        } else if (page === "laptop-page") {
            displayLaptops(products);
            hasSearchBar()
        } else if (page === "desktop-page") {
            displayDesktops(products);
            hasSearchBar()
        } else if (page === "item-details") {
            productDetails(products);
        } else if (page === "map-page") {
            initLeafletMap();
        } else if (page === "cart-page") {
            displayCartItems();
        } else if (page === "contact-page") {
            contactForm();
        } else if (page === "create-account-page") {
            createUserAccount();
        } else if(page === "sign-in-page") {
            userSignIn();
        } else if (page === "pokemon-page") {
            fetchPokemon();
        } else {
            console.log("no matching page.");
        }
            
        
    } catch (error) {
        console.log(`Error while fetching: ${error.message}`);
    }
}

function hasSearchBar() {
    const searchBar = document.querySelector("#input-search-show")
    searchBar.addEventListener('input', () => {
        // 1) Get what the user typed in the input box.
        const searchKeyword = "" + searchBar.value;
        console.log(searchKeyword)
        // 2) Select all the product listings
        const productItem = document.querySelector(".product-Listings");
        // 3) We make a for each loop to get the child nodes which would be each individual item card.
        productItem.childNodes.forEach(item => {
            // 4) Another for each loop which goes through each element in each item.
            item.childNodes.forEach(elem=> {
                // 5) Then we check if the element has child nodes since only the image and then name should have child nodes, 
                // since they are seperated into divs.
                if (elem.hasChildNodes()) {
                    elem.childNodes.forEach(elemChild => {
                        // 6) Then this last for loop is so we can check only the product name and nothing else to ensure that the search does not 
                        // display unexpected results.
                        if (elemChild.className === "product-name") {
                            if (elemChild.textContent.toLowerCase().includes(searchKeyword.toLowerCase())) {
                                item.style.display = "block";
                            } else {
                                item.style.display = "none";
                            
                            }
                        }
                    });
                }
            });
        });
    });
}
// When on contact form runs this method ensures that you are on the right page and no unexpected errors.
function contactForm() {
    const formRegistration = document.getElementById('formRegistration');
    formRegistration.addEventListener('submit', function(event) {
        // prevent the default form behaviour: prevent the automatic submission of the user form
        event.preventDefault();
        submitForm();
    });
}
// Same as with the contact form except it runs when you are on create account form.
function createUserAccount() {
    const formRegistration = document.getElementById('createAccountForm');
    formRegistration.addEventListener('submit', function(event) {
        // prevent the default form behaviour: prevent the automatic submission of the user form
        event.preventDefault();
        createAccount();
    });
}
// Same as the others except it ensure you are on the sign in form
function userSignIn() {
    const formRegistration = document.getElementById('signIn');
    formRegistration.addEventListener('submit', function(event) {
        // prevent the default form behaviour: prevent the automatic submission of the user form
        event.preventDefault();
        signIn();
    });
}