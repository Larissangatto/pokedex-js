const cardPokedex = document.getElementById('grid')
const buttonLoadMore = document.getElementById('loadMoreButton')

const loadedPokemons = []
const limit = 6
let offset = 0

buttonLoadMore.addEventListener("click", () => {
    offset += limit
    loadPokemons(offset,limit)
}
)
function loadPokemons(){
    pokeApi.getPokemons(offset,limit)
    .then((pokemons) => {
        const requests = pokemons.map((pokemon) => pokeApi.getPokemonDetails(pokemon))
        return Promise.all(requests)
    })    
    .then((pokemons) => {
        const initialCardPokedex = pokemons.map((pokemon) => 

            `
        <li class="cardPokemon ${pokemon.type}" data-id="${pokemon.number}">
        <div class="top">
            <h2 class="name"> ${pokemon.name}</h2>
            <span class="number"> #${pokemon.number} </span>
        </div>
        <div class="body">
            <ul class="types">
                ${pokemon.types.map((type) => `<li class="type ${pokemon.type}">${type}</li>`).join('')}
            </ul>
            <img src="${pokemon.photo}" alt="${pokemon.name}">
        </div>
        </li>`
        ).join('')
        loadedPokemons.push(...pokemons)
        
        cardPokedex.innerHTML += initialCardPokedex
    })
}

