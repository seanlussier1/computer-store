import { fetchData } from "./fetchWrapper.js";
// Use fetch wrapper to get the anime then we parse the anime have exception handling in case 
// the request does not work.
export async function fetchAnime() {
    try {
        let anime = await fetchData("https://api.jikan.moe/v4/anime");
        console.log(anime);
        parseAnime(anime)
    } catch(error) {
        console.log(`An error has occured while fetching. ${error.message}`);

    }
// Go through each anime and make a card like we did with our other json files.
    function parseAnime(anime) {
        let animeList = document.querySelector(".product-Listings");
        console.log(animeList);
        
        anime.data.forEach(animeData => {
            console.log(animeData.images.jpg.image_url);
            let animeListing = document.createElement("div");
            animeListing.classList.add("card");
            animeListing.style.width = "18rem";
            animeListing.innerHTML = `
            <img src="${animeData.images.jpg.image_url}" class="card-img-top" alt="Image of ${animeData.title}">
            <div class="card-body">
                <h1 class="anime-name">${animeData.title}</h3>
                <p class="card-text">${animeData.episodes}, ${animeData.duration}</p>
            </div>
        `;
        animeList.appendChild(animeListing);
        });
    }
}