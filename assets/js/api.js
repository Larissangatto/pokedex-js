const pokeApi = {}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`
    return fetch(url)
        .then((pokemosList) => pokemosList.json())
        .then((response) => response.results)
        
}
pokeApi.getDetailsPokedex = (pokedex) => {
    return fetch(pokedex.url)
        .then((response) => response.json())
}

pokeApi.getSpeciesData = (pokeSpecies) => {
    return fetch(pokeSpecies.species.url)
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
pokeApi.getEvolutions = (evolutionsUrl) => {
    return fetch(evolutionsUrl)
        .then(evolutionsData => evolutionsData.json())
        
    
}


