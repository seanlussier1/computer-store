import { fetchData } from "./fetchWrapper.js";

export async function fetchPokemon() {
    try {
        console.log("Fetching pokemons");

        for (let i = 252; i <= 386; i++) {
        let pokemon = fetchData("https://pokeapi.co/api/v2/pokemon${i}");
        console.log(pokemon);

        // Promise.
        }





    } catch (error) {
        console.log(`Error. ${error.message}`);
    }
}
