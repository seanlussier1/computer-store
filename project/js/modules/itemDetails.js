export function productDetails(products) {
    const computerListing = document.querySelector("#item-listing");
    sessionStorage.getItem("show-id")
    const filteredProducts = products.products.filter(product => product.item_id.toString() === sessionStorage.getItem("show-id"));

        const productElement = document.getElementById("item-listing");
        productElement.classList.add("card");
        productElement.innerHTML = `
             <img src="${filteredProducts[0].thumbnail_image}" class="card-img-top" alt="Image of ${filteredProducts[0].item_title}">
             <div class="card-body">
                 <h1 class="product-name">${filteredProducts[0].item_title}</h3>
                 <p class="card-text">${filteredProducts[0].description}</p>
                 <p class="product-price">$${filteredProducts[0].unit_price}</p>
             </div>
         `;
        console.log(filteredProducts[0].item_title)
        computerListing.appendChild(productElement);

};  
function createCustomElement(parent,newElementName,content){
    const newElem = document.createElement(newElementName);
    newElem.textContent = content;
    parent.appendChild(newElem);
    return newElem;
}