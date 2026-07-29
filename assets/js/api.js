const pokeApi = {}
function pokemonDetails(details) {
    const pokemon = new Pokemon

    pokemon.name = details.name
    pokemon.number = details.id 
    const types = details.types.map((typeSlot)=>typeSlot.type.name)
    const type = types[0]
    pokemon.type = type
    pokemon.types = types
    pokemon.speciesUrl = details.species.url
    pokemon.photo = details.sprites.other.dream_world.front_default
    const stats = details.stats.map((statSlot) => {
        return {
            name: statSlot.stat.name,
            value: statSlot.base_stat           
        }
    })
    pokemon.stats = stats
    pokemon.height = details.height
    pokemon.weight = details.weight
    pokemon.baseXP = details.base_experience

    return pokemon
}

function pokemonComplete(pokemon,  description, evolutions) {
    pokemon.description = description
    pokemon.evolutions = evolutions

    return pokemon

}
pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`
    return fetch(url)
        .then((pokemosList) => pokemosList.json())
        .then((response) => response.results)
        
}
pokeApi.getDetailsPokedex = (details) => {
    return fetch(details.url)
        .then((response) => response.json())
}

pokeApi.getSpeciesData = (speciesUrl) => {
    return fetch(speciesUrl)
        .then((dataSpecies) => dataSpecies.json())
        .then((data) => {
            return {
                dataDescription: data.flavor_text_entries,
                evolutionsUrl: data.evolution_chain.url
            }    
        
        })
}
pokeApi.getDescription = (dataDescription) => {
    const descriptionEntry = dataDescription.find((entry) => entry.language.name === 'en')
    const description = descriptionEntry ? descriptionEntry.flavor_text.replace(/\n|\f/g, " ") : "Description not found."
    return description
}
function convertEvolutionToList(evolutionData) {
    const evolutions = []

    function readEvolution(start) {
        evolutions.push(start.species.name)

        start.evolves_to.forEach((nextEvolution) => {
            readEvolution(nextEvolution)
        })
    }

    readEvolution(evolutionData.chain)

    return evolutions
}
pokeApi.getEvolutions = (evolutionsUrl) => {
    return fetch(evolutionsUrl)
        .then(evolutionsJson => evolutionsJson.json())
        .then((evolutionsData) => {
            const evolutions = convertEvolutionToList(evolutionsData)
            return evolutions
        })
}

pokeApi.getPokemonDetails = (pokemon) => {
    return pokeApi.getDetailsPokedex(pokemon)
        .then((details) => {
            return pokemonDetails(details)
        
    })
}
pokeApi.getPokemonComplete = (pokemon) => {
    return pokeApi.getSpeciesData(pokemon.speciesUrl)
        .then((speciesData) => {
            const description = pokeApi.getDescription(speciesData.dataDescription)
            return pokeApi.getEvolutions(speciesData.evolutionsUrl)
                .then((evolutions) => {
                    return pokemonComplete(pokemon,description,evolutions)
                })
        })
}