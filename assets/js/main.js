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

const maxRecords = 151;
const limit = 8;
let offset = 0;

loadPokemonItems(offset, 12);

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
        
        pokemons.forEach((pokemon) => {
            const pokeCard = document.getElementById(`${pokemon.name}-card`);
            
            pokeCard.addEventListener('click', () => {   
                ShowModal(pokemon);
            })
        })
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

    modalPrevBtn.addEventListener('click', () => {

    });

    modalNextBtn.addEventListener('click', () => {
        
    });
}

function CloseModal(e){
    if(e.target.id == pokemonModalContainer.id || e.target.id == closeModalBtn.id)
    {
        pokemonModal.setAttribute("visible", "false");
    }
}