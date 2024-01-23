const pokemonList = document.getElementById("pokemonList");
const loadMoreButton = document.getElementById("loadMoreButton");

const maxRecords = 151;
const limit = 8;
let offset = 0;

function loadPokemonItems(offset, limit) {

    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map((pokemon) => `
        <li class="pokemon ${pokemon.type}">
            <span class="number">${pokemon.number}</span>
            <span class="name"><a href="#">${pokemon.name}</a></span>
            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
                <img src="${pokemon.photo}" alt="${pokemon.name}">
            </div>
        </li>
        `).join('');

        pokemonList.innerHTML += newHtml;
    });
    
    setTimeout(() => loadMoreButton.scrollIntoView({behavior: "smooth"}), 750); // Adiciona rolagem automática suave
}

loadPokemonItems(offset, 12)

loadMoreButton.addEventListener('click', () => {
    offset += limit

    qtdRecordNextPage = offset + limit;

    if(qtdRecordNextPage >= maxRecords){
        const newLimit = maxRecords - offset;
        loadPokemonItems(offset, newLimit)
        loadMoreButton.parentElement.removeChild(loadMoreButton);
    } else {
        loadPokemonItems(offset, limit)
    }
});