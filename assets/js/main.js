const pokemonList = document.getElementById("pokemonList");
const loadMoreButton = document.getElementById("loadMoreButton");
const pokemonModalContainer = document.getElementById("pokemonModalContainer");
const pokemonModal = document.getElementById("pokemonModal");
const closeModalBtn = document.getElementById("closeModalBtn");
const modalTitle = document.getElementById("pokemonName");
const modalNumber = document.getElementById("pokemonNumber");
const modalTypes = document.getElementById("pokemonTypes");
const modalDetailList = document.getElementById("pokemonDetailList");
const modalPrevBtn = document.getElementById("prevPokemonBtn");
const modalNextBtn = document.getElementById("nextPokemonBtn");

const loadedPokemons = [];
const maxRecords = 151;
const limit = 12;
let offset = 0;

loadPokemonItems(offset, limit);

loadMoreButton.addEventListener('click', LoadMoreItems);

closeModalBtn.addEventListener('click', CloseModal);

pokemonModalContainer.addEventListener('click', CloseModal);

function loadPokemonItems(offset, limit) {

    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map((pokemon) => `
        <li class="pokemon ${pokemon.type}" id="${pokemon.name}-card">
            <span class="number">#${pokemon.number}</span>
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

        // Corrigir modal não abrindo após carregar mais items
        pokemons.forEach((pokemon) => {
            const pokeCard = document.getElementById(`${pokemon.name}-card`);
            
            pokeCard.addEventListener('click', () => {   
                ShowModal(pokemon);
            })
        })

        loadedPokemons.push(...pokemons);
    });

    
    
    setTimeout(() => loadMoreButton.scrollIntoView({behavior: "smooth"}), 750); // Adiciona rolagem automática suave
}

function LoadMoreItems(){
    offset += limit

    qtdRecordNextPage = offset + limit;

    if(qtdRecordNextPage >= maxRecords){
        const newLimit = maxRecords - offset;
        loadPokemonItems(offset, newLimit)
        loadMoreButton.parentElement.removeChild(loadMoreButton);
    } else {
        loadPokemonItems(offset, limit)
    }
}

function ShowModal(pokemon){
    pokemonModal.setAttribute("visible", "true");
    
    modalTitle.innerText = pokemon.name;
    modalNumber.innerText = pokemon.number;

    let typesHtml = pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('');
    modalTypes.innerHTML = typesHtml;

    const pokeIndex = loadedPokemons.indexOf(pokemon);

    if(pokeIndex > 0){
        modalPrevBtn.disabled = false;
        modalPrevBtn.addEventListener('click', () => {
            ShowModal(loadedPokemons[pokeIndex - 1])
        }, {once: true});
    } else {
        modalPrevBtn.disabled = true;
    }

    if(pokeIndex < loadedPokemons.length - 1){
        modalNextBtn.disabled = false;
        modalNextBtn.addEventListener('click', () => {
            ShowModal(loadedPokemons[pokeIndex + 1])
        }, {once: true});
    } else {
        if(offset + limit >= maxRecords) modalNextBtn.disabled = true;
        modalNextBtn.addEventListener('click', (e) => {LoadMoreItems(); CloseModal(e, true);}, {once: true});
    }

}

function CloseModal(e, force = false){
    if(e.target.id == pokemonModalContainer.id || e.target.id == closeModalBtn.id || force)
    {
        pokemonModal.setAttribute("visible", "false");
    }
}