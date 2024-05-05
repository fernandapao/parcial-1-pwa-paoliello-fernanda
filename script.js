// Función para obtener datos de la API
function fetchPokemon() {
    return fetch('https://pokeapi.co/api/v2/pokemon?limit=100')
        .then(response => response.json())
        .then(data => {
            const pokemonList = data.results;
            return Promise.all(pokemonList.map(pokemon => {
                return fetch(pokemon.url)
                    .then(response => response.json());
            }));
        })
        .catch(error => {
            console.error('Error al obtener los Pokémon:', error);
        });
}