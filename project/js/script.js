// import { fetchData } from "./modules/fetchWrapper";

// TODO: fix product display stuffs

document.addEventListener('DOMContentLoaded', initApp);

function initApp() {
    console.log("initializing the app");

    // const btnDisplayContent = document.getElementById("current-page");
    // btnDisplayContent.addEventListener('click', fetchProducts);
    fetchProducts();
    
}

async function fetchProducts() {

    try {
        console.log("fetching products...");

    const resourceUri = "data\fakerAPI_2025-04-17_13-02-14.json";
    fetchData(resourceUri);
    const products = await fetchData(resourceUri);
    console.log(products);
    }
    catch {
        console.log(`Error while fetching. ${error.message}`);
    }
    
}