
const offset = 0;
const limit = 10;
const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

function convertPokemonToLi(pokemon){
    return `<li class="pokemon">
    <span class="number">#001</span>
    <span class="name"><a href="${pokemon.url}">${pokemon.name}</a></span>
    <div class="detail">
        <ol class="types">
            <li class="type">Grass</li>
            <li class="type">Poison</li>
        </ol>
        <img src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png" alt="${pokemon.name}">
    </div>
</li>`;
}

const pokemonOl = document.getElementById("pokemonList");

fetch(url)
    .then((response) => response.json())
    .then((jsonBody) => jsonBody.results)
    .then((pokemonList) => {
        for (let i = 0; i < pokemonList.length; i++) {
            const pokemon = pokemonList[i];
            pokemonOl.innerHTML += convertPokemonToLi(pokemon);
        }
    })
    .catch((error) => console.log(error))
