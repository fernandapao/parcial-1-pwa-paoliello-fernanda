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

    // Función para cerrar el modal
function closeModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
}


}

// Función para crear tarjeta de los Pokemons
function createPokemonCard(pokemon) {
    const card = document.createElement('div');
    card.classList.add('pokemon-card');
    card.innerHTML = `
        <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
        <h3>${pokemon.name}</h3>
        <button class="detail-btn">Detalle</button>
    `;
    const detailBtn = card.querySelector('.detail-btn');
    detailBtn.addEventListener('click', () => showModal(pokemon));
    return card;
}

// Función para mostrar la lista de Pokémon
function showPokemonList() {
    fetchPokemon().then(pokemonDetails => {
        const pokemonContainer = document.getElementById('pokemon-container');
        pokemonDetails.sort((a, b) => a.id - b.id);
        pokemonContainer.innerHTML = '';
        pokemonDetails.forEach(pokemon => {
            const card = createPokemonCard(pokemon);
            pokemonContainer.appendChild(card);
        });
    });
}

// Cargar la lista de Pokémon al cargar la página
window.onload = showPokemonList;
