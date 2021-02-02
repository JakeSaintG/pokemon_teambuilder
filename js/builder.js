const entry = document.getElementById('entry');
const input = document.getElementById('description')
const form = document.getElementById('enterMon')

requestByName = (name) => {
    const baseUrl = 'https://pokeapi.co/api/v2/pokemon/';
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
        if(xhr.readyState === 4) {
            const pokemon = JSON.parse(xhr.responseText)
            updatePokemonResult(pokemon);
        }
    };
    xhr.open('GET', `${baseUrl}${name}`);
    xhr.send();
}

getAllNatures = () => {
    const baseUrl = 'https://pokeapi.co/api/v2/nature';
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
            const natures = JSON.parse(xhr.responseText);
            const nature = document.createElement('select')
    
            entry.appendChild(nature);
            const defaultNature = document.createElement('option');
            defaultNature.textContent = 'Natures'
            defaultNature.style="display:none";
            nature.appendChild(defaultNature);
        
            for (i = 0; i < natures.results.length; i++) {
                const option = document.createElement('option');
                option.textContent = natures.results[i].name;
                nature.appendChild(option);
            }; 
        }
    };
    xhr.open('GET', `${baseUrl}`);
    xhr.send();
}


const updatePokemonResult = (pokemon) => {
    const h2 = document.createElement('h2');
    const img = document.createElement('img');
    const type1 = document.createElement('p')
    const ability = document.createElement('select')

    h2.textContent = pokemon.name;
    entry.appendChild(h2);

    if (Math.floor(Math.random() * 8192) + 1 === 1) {
        // img.src = pokemon.sprites.versions["generation-viii"].icons.front_default;
        img.src = pokemon.sprites.front_shiny;
    } else {
        // img.src = pokemon.sprites.versions["generation-viii"].icons.front_default;
        img.src = pokemon.sprites.front_default;
    }
    entry.appendChild(img);
    
    type1.textContent = pokemon.types[0].type.name;
    entry.appendChild(type1);
    
    if (pokemon.types[1] === undefined) {
        null;
    } else {
        const type2 = document.createElement('p')
        type2.textContent = pokemon.types[1].type.name;
        entry.appendChild(type2)
    };

    entry.appendChild(ability);
    const defaultOption = document.createElement('option');
    defaultOption.textContent = 'Abilties'
    defaultOption.style="display:none";
    ability.appendChild(defaultOption);

    for (i = 0; i < pokemon.abilities.length; i++) {
        const option = document.createElement('option');
        option.textContent = pokemon.abilities[i].ability.name;
        ability.appendChild(option);
    }

    getAllNatures();
};

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = input.value;
    const name = data.toLowerCase()
    input.value = '';
    requestByName(name);

    const team = document.getElementById('team')
    if (team.children === 6) {
        
    }
});