import { fetchData } from "./fetchWrapper.js";

export async function fetchPokemon() {
    try {
        console.log("Fetching pokemons");
        let pokemon = await fetchData("https://pokeapi.co/api/v2/pokemon/treecko");
        console.log(pokemon);
        showTreecko(pokemon);

    } catch (error) {
        console.log(`Error. ${error.message}`);
    }
}

function showTreecko(pokemon) {
    const placePokemon = document.getElementsByClassName("pokemon-listing")[0];
    
    placePokemon.innerHTML = `
        <div class="pokemon-card">
            <div id="treecko-card">
                <img src="${pokemon.sprites.front_default}" alt="Treecko">
                <p>Treecko Front</p>
            </div>
            <div id="treecko-card">
                <img src="${pokemon.sprites.back_default}" alt="Treecko Back">
                <p>Treecko Back</p>
            </div>
            <div id="treecko-card">
                <img src="${pokemon.sprites.front_shiny}" alt="Treecko SHINY">
                <p>Shiny Treecko Front</p>
            </div>
            <div id="treecko-card">
                <img src="${pokemon.sprites.back_shiny}" alt="Treecko Back SHINY">
                <p>Shiny Treecko Front</p>
            </div>
        </div>
    `;
    
    
}