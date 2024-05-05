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
function showModal(pokemon) {
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

      // Guardar el nombre del Pokémon en el historial
      const pokemonHistory = JSON.parse(localStorage.getItem('pokemonHistory')) || [];
      if (!pokemonHistory.includes(pokemon.name)) {
          pokemonHistory.push(pokemon.name);
          localStorage.setItem('pokemonHistory', JSON.stringify(pokemonHistory));
      }
  }

    // Función para cerrar el modal
function closeModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
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


// Función para buscar Pokémon
function searchPokemon() {
    const searchInput = document.getElementById('search').value.toLowerCase();
    const pokemonCards = document.querySelectorAll('.pokemon-card');
    pokemonCards.forEach(card => {
        const pokemonName = card.querySelector('h3').textContent.toLowerCase();
        if (pokemonName.includes(searchInput)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}


// Event listener para la tecla Enter en el campo de búsqueda
document.getElementById('search').addEventListener('keyup', function (event) {
    if (event.key === 'Enter') {
        searchPokemon();
    }
});

// Función para mostrar el historial de Pokémon visitados
function showHistoryModal() {
    const historyModal = document.getElementById('historyModal');
    const historyList = document.getElementById('historyList');
    historyList.innerHTML = '';
    const history = JSON.parse(localStorage.getItem('pokemonHistory')) || [];
    if (history.length === 0) {
        historyList.innerHTML = '<li>No hay Pokémon en el historial</li>';
    } else {
        history.forEach(pokemonName => {
            const listItem = document.createElement('li');
            listItem.textContent = pokemonName;
            historyList.appendChild(listItem);
        });
    }
    historyModal.style.display = 'block';
}


// Event listener para el botón de historial para mostrar el historial guardado en localStorage
document.getElementById('historyBtn').addEventListener('click', () => {
    showHistoryModal();
});

// Función para cerrar el modal del historial
function closeHistoryModal() {
    const historyModal = document.getElementById('historyModal');
    historyModal.style.display = 'none';
}

// Event listener para cerrar el modal del historial al hacer clic en el botón "Cerrar historial"
document.getElementById('cerrarHistorial').addEventListener('click', () => {
    closeHistoryModal();
});

// Función para borrar el historial de Pokémon visitados
function clearHistory() {
    localStorage.removeItem('pokemonHistory');
    const historyList = document.getElementById('historyList');
    historyList.innerHTML = '<li>No hay Pokémon en el historial</li>';
}

// Event listener para borrar el historial al hacer clic en el botón "Borra historial"
document.getElementById('borrarHistorial').addEventListener('click', () => {
    clearHistory();
});