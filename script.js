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

//Funcion para mostrar los detalles de los pokemon en el modal
function showModal(pokemonj) {
    const modal = document.getElementById('modal');
    const modalContent = document.getElementById('modal-content');
    modal.style.display = 'block';
    modalContent.innerHTML = `
        <h2>${pokemon.name}</h2>
        <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
        <p>Altura: ${pokemon.height}</p>
        <p>Peso: ${pokemon.weight}</p>
        <p>Tipo(s): ${pokemon.types.map(type => type.type.name).join(', ')}</p>
        <p>Habilidades: ${pokemon.abilities.map(ability => ability.ability.name).join(', ')}</p>
        <p>Experiencia base: ${pokemon.base_experience}</p>
    `;
}