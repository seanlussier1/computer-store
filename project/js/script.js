import { fetchData } from "/js/modules/fetchWrapper.js";
import { displayProducts } from "/js/modules/products.js";
import { displayRecommended } from "/js/modules/home.js";
import { displayComputerParts } from "/js/modules/computer.js";
import { displayDeals } from "/js/modules/deals.js";
import { displayLaptops } from "/js/modules/laptop.js";
import { displayDesktops } from "/js/modules/desktop.js";

document.addEventListener('DOMContentLoaded', initApp);

function initApp() {
    console.log("initializing the app");
    fetchProducts();
    const searchBar = document.querySelector("#input-search-show")
    searchBar.addEventListener('keypress', () => {
        // 1) Get what the user typed in the input box.
         const searchKeyword = searchBar.value;
         console.log(searchKeyword)
        // 2) We need to loop through the table rows, and search for a matching show name.
        const productItem = document.querySelector(".product-Listings");
        productItem.childNodes.forEach(item => {
            item.childNodes.forEach(elem=> {
                if (elem.textContent.toLowerCase().includes(searchKeyword.toLowerCase())) {
                } else {
                    elem.remove();
                }
            });
        });
    });
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
            displayRecommended(products); 
        } else if (isRecommendedPage) {
            displayProducts(products); 
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