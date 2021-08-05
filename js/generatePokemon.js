const pokeUrl = 'https://pokeapi.co/api/v2/';
const input = document.getElementById('description');
const enterMon = document.getElementById('enterMon');
const teamOf6 = document.getElementById('teamOf6');
const teamName = document.getElementById('teamName');
const placeHolder = document.getElementById('placeHolder')

updatePokemonResult = (pokemon) => {
    const entry = document.createElement('div'); //The whole Pokemon element.
    const h2 = document.createElement('h2'); //Pokemon name
    const img = document.createElement('img'); //The pokemon's image icon.
    const types = document.createElement('div') //Where the type icons will be placed.
    const type1 = document.createElement('p') //The first Pokemon's type icon.
    const ability = document.createElement('select') //A select element for listing the Pokemon's special abilities.
    const remove = document.createElement('button') //A remove button.
    const title = document.createElement('div') //Top of the Pokemon element that contains the name and the remove button.
    const useLater = document.createElement('span'); //Currently being used for spacing in title-div.
    
    useLater.className="useLater"
    useLater.textContent=" "
    title.appendChild(useLater);
    //May be used later to let user change the img to the shiny version.

    let alterName = pokemon.name
    if(alterName.includes(`-`)) {
        alterName = alterName.substring(0, alterName.indexOf("-")); 
        // Gets a substring from the beginning of the string to the first instance of the character "-". 
        // Removes hyphens and other form info from the end of the pokemon name.
    };
    if (pokemon.id === 29) {
        alterName = `${alterName}♀`
    }; // Alters the name of nidoran to the correct Dex form of "Nidoran♀".
    if (pokemon.id === 32) {
        alterName = `${alterName}♂`
    }; // Alters the name of nidoran to the correct Dex form of "Nidoran♂".
    if (pokemon.id === 474) {
        alterName = `${alterName}-Z`
    }; // Fixes Porygon-Z's name
    if (pokemon.id === 250) {
        alterName = `${alterName}-oh`
    }; // Attempt to fix Ho-Oh's name
    if (pokemon.id === 439) {
        alterName = `${alterName} Jr.`
    }; // Fixes Mime Jr.'s name
    if (pokemon.id === 122) {
        alterName = `${alterName}. Mime`
    }; // Fixes Mr. Mime's name
    if (pokemon.id === 10165) {
        alterName = `${alterName}. Mime`
    }; // Fixes Galar Mr. Mime's name
    if (pokemon.id === 866) {
        alterName = `${alterName}. Rime`
    }; // Fixes Mr. Rime's name
    if (pokemon.id === 83) {
        alterName = `Farfetch'd`
    }; // Fixes Farfetch'd's name
    if (pokemon.id === 10163) {
        alterName = `Farfetch'd`
    }; // Fixes Galar Farfetch'd's name
    if (pokemon.id === 784) {
        alterName = `kommo-o`
    }; // Fixes name
    if (pokemon.id === 783) {
        alterName = `hakamo-o`
    }; // Fixes name
    if (pokemon.id === 782) {
        alterName = `jangmo-o`
    }; // Fixes name
    if (pokemon.id === 151) {
        alterName = `mew`
    }; // Fixes name
    if (pokemon.id === 772) {
        alterName = `Type: Null`
    }; // Fixes name
    h2.className = "entryName"
    h2.textContent = alterName;
    title.appendChild(h2);
    
    remove.textContent = `x`;
    remove.setAttribute(`role`, `button`)
    remove.title = "Remove from team"
    title.appendChild(remove)

    title.className='title';
    entry.appendChild(title);

    img.src = loadedImg[0];
    img.alt=`${alterName}'s icon`
    img.className="PokeImg";
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

    entry.className = entry.className+' '+"replaceMe";
    
    entry.appendChild(ability);
    const defaultAbilitiesOption = document.createElement('option');
    defaultAbilitiesOption.textContent = 'Abilties'
    defaultAbilitiesOption.style="display:none";
    ability.appendChild(defaultAbilitiesOption);

    for (i = 0; i < pokemon.abilities.length; i++) {
        const abiltiesOption = document.createElement('option');
        abiltiesOption.textContent = pokemon.abilities[i].ability.name;
        ability.appendChild(abiltiesOption);
    }

    let pokemonBaseName = pokemon.name
    if (pokemonBaseName === 'mr-rime' || pokemonBaseName === 'ho-oh') {
        pokemonBaseName
    } else if(pokemonBaseName.includes(`-`)) {
        pokemonBaseName = pokemonBaseName.substring(0, pokemonBaseName.indexOf("-"));  
    }
    entry.appendChild(findAllForms(pokemonBaseName));

    let statsGraph = statBuilder(pokemon);
    statsGraph.className = 'statsGraph'
    statsGraph.id = 'statsGraph'
    entry.appendChild(statsGraph);

    entry.appendChild(natureBuilder(naturesList));

    // Adds the entry for the pokemon
    if (pokemon.name.includes('mega')) {
        entry.className = entry.className + ` mega`
    } else if (pokemon.name.includes('gmax')) {
        entry.className = entry.className + ` gmax`
    } else {
        entry.style.backgroundColor = 'white';
    }

    generateHere.parentElement.replaceChild(entry, generateHere)
    
    return entry
};

document.getElementById('teamOf6').addEventListener('click', (e) => {
    e.preventDefault();
    if(e.target.tagName === 'BUTTON') {
        e.preventDefault();
        const button = e.target;
        const action = button.textContent;
        if (action === 'x') {
            if (teamOf6.childElementCount === 6 && document.getElementById('placeHolder') === null) {
                replacePlaceholder = document.createElement('div')
                replacePlaceholder.className = "placeHolder entry"
                replacePlaceholder.id = "placeHolder"
                replacePlaceholder.innerHTML = `<button class="addButton" role="button" type="submit" name="submit" value="submit">+</button>`
                teamOf6.appendChild(replacePlaceholder);
            }
            e.target.parentElement.parentElement.remove()
        } else if (action === '+') {
            if (teamOf6.childElementCount < 7) {
                const entry = document.createElement("div")
                entry.className = "entry tempEntry"
                const tempDiv = document.createElement("div")
                tempDiv.className = 'tempDiv'
                tempDiv.innerHTML =                     
                    `<h2>Pick a Pok&eacute;mon!</h2>
                    <p>Enter the name of a Pok&eacute;mon as it appears in the Pok&eacute;Dex.</p>
                    <p>Spelling matters but punctuation does not!</p>
                    <form id="enterPokemon">
                        <input type="text" class="description" role="searchbox" id="description" value="Pok&eacute;mon name" onfocus="this.value=''">
                        <button type="submit" role="button" name="submit" id="descriptionAdd" value="submit">add</button>
                    </form>`
                entry.appendChild(tempDiv)
                teamOf6.insertBefore(entry, e.target.parentElement)
                tempDiv.lastElementChild.firstElementChild.focus()
            };
            if (teamOf6.childElementCount >= 7) {
                e.target.parentElement.remove();
            };
            if (document.getElementById('tip') !== null) {
                document.getElementById('tip').remove()
            }
        }
    }
});