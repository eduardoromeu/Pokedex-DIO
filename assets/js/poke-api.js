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

    pokemon.moves = pokeDetail.moves.map((moveSet) => moveSet.move.name);
    pokemon.stats = pokeDetail.stats.map((statSet) => {
        const stat = {};
        stat.name = statSet.stat.name;
        stat.base_stat = statSet.base_stat;
        return stat;
    })

    return pokemon;
}

pokeApi.getPokemonDetail = async(pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = async(offset = 0, limit = 12) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonDetails) => pokemonDetails)
}

pokeApi.getPokemon = async(id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    return fetch(url)
            .then((response) => response.json())
            .then(convertPokeApiDetailToPokemon)
}