import { fetchData } from "/js/modules/fetchWrapper.js";
import { displayProducts } from "/js/modules/products.js";
import { displayRecommended } from "/js/modules/home.js";
import { displayComputerParts } from "/js/modules/computer.js";
import { displayDeals } from "/js/modules/deals.js";
import { displayLaptops } from "/js/modules/laptop.js";
import { displayDesktops } from "/js/modules/desktop.js";
import { productDetails } from "/js/modules/itemDetails.js";

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

        const isHomePage = document.querySelector(".products-page");
        const isRecommendedPage = document.querySelector(".recommended-page");
        const isComputerPartsPage = document.querySelector('.computer-parts-page');
        const isDealsPage = document.querySelector('.deals-page');
        const isLaptopPage = document.querySelector('.laptop-page');
        const isDesktopPage = document.querySelector('.desktop-page');
        const isItemDetails = document.querySelector('.item-details');

        if (isHomePage) {
            displayRecommended(products);
            hasSearchBar() 
        } else if (isRecommendedPage) {
            displayProducts(products);
            hasSearchBar() 
        } else if (isComputerPartsPage) {
            displayComputerParts(products);
            hasSearchBar() 
        } else if (isDealsPage) {
            displayDeals(products);
            hasSearchBar() 
        } else if (isLaptopPage) {
            displayLaptops(products);
            hasSearchBar()
        } else if (isDesktopPage) {
            displayDesktops(products);
            hasSearchBar()
        } else if (isItemDetails) {
            productDetails(products);
        } else {
            console.log("no matching page.");
        }
            
        
    } catch (error) {
        console.log(`Error while fetching: ${error.message}`);
    }
}

function hasSearchBar() {
    const searchBar = document.querySelector("#input-search-show")
    searchBar.addEventListener('keypress', () => {
        // 1) Get what the user typed in the input box.
        const searchKeyword = searchBar.value;
        console.log(searchKeyword)
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