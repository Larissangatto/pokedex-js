loadPokemons()
const sectionPokedex = document.getElementById("pokedex")
cardPokedex.addEventListener("click", (event) => {
    const cardClicked = event.target.closest(".cardPokemon")
    if (!cardClicked) {
        return
    }
    const pokemonId = Number(cardClicked.dataset.id)
    const pokemonCard = loadedPokemons.find((pokemon)=> pokemon.number === pokemonId)
    sectionPokedex.classList.add("hidden")
    loadCardDetail(pokemonCard)
})
