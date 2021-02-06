const input = document.getElementById('description');
const form = document.getElementById('enterMon');
const team = document.getElementById('team');

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

            team.lastElementChild.appendChild(nature);
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

// if (requestByName(name'-alola')) {
//     console.log('nice')
// } else {
//     null
// }

const updatePokemonResult = (pokemon) => {
    const entry = document.createElement('div');
    const h2 = document.createElement('h2');
    const img = document.createElement('img');
    const types = document.createElement('div')
    const type1 = document.createElement('p')
    const ability = document.createElement('select')
    
    team.appendChild(entry);
    h2.textContent = pokemon.name;
    entry.appendChild(h2);

    //Currently, not all sprites are available for special forms (Alolan, Galar, some megas, etc) and shiny pokemon.
    //When they become available, the below code can be used to make a shiny sprite easter-egg in the team builder.
    //For example, the below code works for "Mudkip" and "Ditto" but not Alolan Sandshrew or Mega Swampert
    //
    // if (Math.floor(Math.random() * 8192) + 1 === 1) {
    //     img.src = pokemon.sprites.front_shiny;
    // } else {
    //     img.src = pokemon.sprites.front_default;
    // }

    //this will do for now
    img.src = pokemon.sprites.other["official-artwork"].front_default;
    entry.appendChild(img);
    
    types.className = "types";
    entry.appendChild(types);
    type1.textContent = pokemon.types[0].type.name;
    type1.className = pokemon.types[0].type.name+' '+"typeIcon";
    entry.className = pokemon.types[0].type.name+"Border"+' '+"entry";
    types.appendChild(type1);
    
    if (pokemon.types[1] === undefined) {
        null;
    } else {
        const type2 = document.createElement('p')
        type2.textContent = pokemon.types[1].type.name;
        type2.className = pokemon.types[1].type.name+' '+"typeIcon";
        entry.className = pokemon.types[0].type.name+"Border"+' '+pokemon.types[1].type.name+"Border2"+' '+"entry";
        types.appendChild(type2)
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

    if (team.childElementCount == 6) {
        form.style.display = "none";
    }
};

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = input.value;
    const name = data.toLowerCase()
    input.value = '';
    requestByName(name);


});