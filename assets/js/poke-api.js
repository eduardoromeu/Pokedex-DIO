const pokeApi = {};

function convertPokeApiDetailToPokemon(pokeDetail){
    const pokemon = new Pokemon();
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name
    pokemon.photo = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${String(pokeDetail.id).padStart(3, '0')}.png`

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type1] = types;

    pokemon.types = types;
    pokemon.type = type1;

    return pokemon;
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 12) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonDetails) => pokemonDetails)
}

pokeApi.getPokemon = (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    return fetch(url)
            .then((response) => response.json())
            .then(convertPokeApiDetailToPokemon)
}