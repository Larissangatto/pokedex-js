const cardDetail = document.getElementById('card')

function loadCardDetail(pokemon) {
    if (!pokemon) {
        console.log("Pokémon não encontrado")
        return
    }
    pokeApi.getPokemonComplete(pokemon)
        .then(pokemon => {
            const newHtmlCard =
            
                `
     <nav id="nav" class="nav">
     <button type="button" id="back" class="back">←</button>
    <button type="button" id="like" class="like">♡</button>
    </nav>
    <div class="cardDetail">
        <div class="top">
        <h1 class="name"> ${pokemon.name}</h1>
        <span class="number"> #${pokemon.number}</span>
        </div>
        <ul class="typesCard">
            ${pokemon.types.map((type) => `<li class="typeCard ${pokemon.type}">${type}</li>`).join('')}
        </ul>
        <div class="bodyCard">
            <img src="${pokemon.photo}" alt="${pokemon.name}">
        </div>
        <div class="details">
            <div class="description">
                <h2>Description</h2>
                <p>${pokemon.description}</p>
            </div>
            <div class="stats">
                <h2>Stats</h2>
                <ul>
                    ${pokemon.stats.map((stat) =>
                    `<li class="stat-item">
                            <span class="stat-name">${stat.name}</span>
                            <div class="stat-bar-bg">
                                <div class="stat-bar-fill" style="width: ${stat.value}%">
                                </div>
                            </div>
                            <span class="stat-value">${stat.value}</span>
                        </li>`).join('')}      
                </ul>
            </div>      
            <ul class="info"> 
                <h2>INFO</h2>
                <li> Height: ${(pokemon.height) / 10} m </li>
                <li> Weight: ${(pokemon.weight) / 10}kg </li>
                <li> Base Exp: ${(pokemon.baseXP)} XP </li>
            </ul>
            <ul class="abilities"> 
                <h2>ABILITIES</h2>
                ${pokemon.abilities.map((ability) => `<li>${ability}`).join('')}
            </ul>
            <ul class="evolution"> 
                <h2>EVOLUTION</h2>
                <li>${pokemon.evolutions.join(" → ")} </li>
            </ul>
        </div>
                        
    </div>
                 `
    
    cardDetail.innerHTML = newHtmlCard
    cardDetail.classList.remove("hidden")
    cardDetail.classList.add(`${pokemon.type}`)
    
    const backButton = document.getElementById('back')
    
    backButton.addEventListener("click", (event) => {
        cardDetail.classList.remove(`${pokemon.type}`)
        sectionPokedex.classList.remove("hidden")
        cardDetail.classList.add("hidden")

    })
})

}
