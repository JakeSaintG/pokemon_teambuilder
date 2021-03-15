const pokeUrl = 'https://pokeapi.co/api/v2/';
const input = document.getElementById('description');
const enterMon = document.getElementById('enterMon');
const teamOf6 = document.getElementById('teamOf6');
const teamName = document.getElementById('teamName');
const placeHolder = document.getElementById('placeHolder')

requestByName = (url) => {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
        if (xhr.status === 404 && xhr.readyState === 4) {
            let reason = `<h5>Error 404?</h5> <p> Something went wrong.</br>Connection/Spelling issue.</br>Please try again!</p>`
            generateMissingNo(reason);
            removePlaceholder();
        }
        if(xhr.readyState === 4 && xhr.status === 200) {
            const pokemon = JSON.parse(xhr.responseText)
            updatePokemonResult(pokemon);
        };
    };
    xhr.open('GET', `${url}`);
    xhr.send();
}

updatePokemonResult = (pokemon) => {
    const entry = document.createElement('div');
    const h2 = document.createElement('h2');
    const types = document.createElement('div')
    const type1 = document.createElement('p')
    const ability = document.createElement('select')
    const remove = document.createElement('button')
    const title = document.createElement('div')
    const dex = document.createElement('img');
    
    // Adds title header for the pokemon
    dex.src = 'imgs/dexicon.png'
    dex.className="dex"
    dex.title = "Show in PokeDex not functional yet"
    title.appendChild(dex);
    title.className='title';

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

    h2.textContent = alterName;
    title.appendChild(h2);
    entry.appendChild(title);
    remove.textContent = `X`;
    remove.title = "Show in PokeDex not functional yet"
    title.appendChild(remove)
    
    
    // if (Math.floor(Math.random() * 8192) + 1 === 1) {
    //     img.src = pokemon.sprites.front_shiny;
    // } else {
    //     img.src = pokemon.sprites.front_default;
    // } 
    const img = document.createElement('img');
    img.src = loadedImg[0];
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
    
    getAllNatures('nature.json');

    let foo = statBuilder(pokemon);
    foo.className = 'statsGraph'
    entry.appendChild(foo);

    // Adds the entry for the pokemon
    teamOf6.appendChild(entry);
    entry.style.backgroundColor = 'white';
    removePlaceholder();

    if (teamOf6.childElementCount === 6) {
        document.getElementById('descriptionAdd').disabled = true;
    };
};

// ===================================================================================================EVENT LISTENERS===================

removePlaceholder = () => {
    if (placeHolder !== null) {
        placeHolder.style.display = 'none';
    }
}

document.getElementById("teamColor").addEventListener("click",function(e) {
    //The eventual goal is to have multiple teams on the page and the .parentElement chain keeps the color change in the desired team.
    if(e.target.nodeName === "LI") {
        if (e.target.parentElement.parentElement.parentElement.parentElement.parentElement.className == "black") {
            for (i = 0; i < e.target.parentElement.childElementCount; i++) {
                e.target.parentElement.children[i].style.borderColor = "black"
            }
            e.target.parentElement.parentElement.parentElement.parentElement.parentElement.style.color = 'black';
            e.target.parentElement.parentElement.parentElement.parentElement.parentElement.style.borderColor = 'black';
        }
        const teamColor = e.target.className;
        e.target.parentElement.parentElement.parentElement.parentElement.parentElement.className = teamColor;
        if (teamColor == "black") {
            for (i = 0; i < e.target.parentElement.childElementCount; i++) {
                e.target.parentElement.children[i].style.borderColor = "white"
            }
            e.target.parentElement.parentElement.parentElement.parentElement.parentElement.style.color = 'white';
            e.target.parentElement.parentElement.parentElement.parentElement.parentElement.style.borderColor = 'grey';
        }
    }
});

const enterTeam = document.getElementById('enterTeam');
enterTeam.addEventListener('click', (e) => {
    e.preventDefault();
    if(e.target.tagName === 'BUTTON') {
        e.preventDefault();
        const button = e.target;
        const action = button.textContent;
        if(action === 'Save') {
            const input = teamName.firstElementChild
            const span = document.createElement('span')
            span.textContent = input.value;
            teamName.insertBefore(span, input);
            teamName.parentNode.firstElementChild.remove();
            teamName.removeChild(input);
            button.textContent = 'Edit';
        } else if (action === 'Edit') {
            const span = teamName.firstElementChild
            const input = document.createElement('input')
            const nameYourTeam = document.createElement('h2')
            nameYourTeam.textContent = "Rename your team!"
            input.type = 'text';
            // input.setAttribute(class="teamNameInput" id="teamNameInput");
            input.setAttribute('maxlength', '20');
            input.setAttribute('class', "teamNameInput");
            input.setAttribute('id', "teamNameInput");
            input.value = span.textContent;
            teamName.parentNode.insertBefore(nameYourTeam, teamName);
            teamName.insertBefore(input, span);
            teamName.removeChild(span);
            button.textContent = 'Save';
        } else if (action === 'Add') {
            if (input.value === '' || input.value === 'Pokémon name') {
                let reason = `<h5>No P̷o̶k̵e̷m̸o̵n̴ Listed!</h5> <p>Please supply a Pok&eacute;mon</p>`;
                generateMissingNo(reason);
                return
            };
            const data = input.value;
            let name = data.toLowerCase();
            if (name.includes('farfet')) {
                name = `farfetchd`
            };            
            if (name.includes('jr')) {
                name = `mime-jr`
            };
            if (name.includes('rime') && name.includes('mr')) {
                name = `mr-rime`
            };
            if (name.includes('mr. mime')) {
                name = `mr-mime`
            };
            filterEdgeCases(name);
            //A surprisingly large amount of pokemon in the API are named something like "toxtricity-amped" which breaks if the user does not know that and just types "toxtricity".
            //filterEdgeCases() takes the forms array from getForms.js and matches the user input first result in the array.
            //This allows at least something to generate and the user can then pick the form that they want.
            input.value = '';
        } else if (action === 'X') {
            e.target.parentElement.parentElement.remove()
            if (teamOf6.childElementCount === 5) {
                document.getElementById('descriptionAdd').disabled = false;
            };
            if (teamOf6.childElementCount === 0) {
                placeHolder.style.display = 'flex';
            };
        }
    }
});

let loadedImg = {};
function filterEdgeCases(name) {
    const filteredImgForms = forms.filter((mon) => { 
        return mon.name.includes(name);
    });

    if (filteredImgForms[0] === undefined) {
        requestByName(name);
        //checks to see if forms has what the user is looking for. If not, it throws to requestByName() to generate a 404-MissingNo/Error.
        input.value = '';
        return
    }

    let filteredForms = filteredImgForms
    let pokeImageUrl = pokeUrl+`pokemon-form/${filteredImgForms[0].name}`;
    
    if (name === 'mew') {
        pokeNameUrl = pokeUrl+`pokemon/${name}`
        pokeImageUrl = pokeUrl+`pokemon-form/${name}`;
        requestByName(pokeNameUrl);
        //Mew is a weird edge case. Most version of this filter would have it generate a Mewtwo if "mew" is entered since Mewtwo appears first in the array/pokedex.
        //This literally checks if the user wants a mew and just gives it to them.
    };

    //I was having an issue where the rest Pokemon would generate before the loadedImg object was populated.
    //This would lead to some goofy image loading so I went with the below promise to hopefully let the object be populated before the rest of the pokemon loads.
    function requestbyImg(pokeImageUrl) {
        return new Promise((resolve) => {
            const xhr = new XMLHttpRequest();
            xhr.onreadystatechange = () => {
                if (xhr.status === 404 && xhr.readyState === 4) {
                    console.log('error')
                }
                if(xhr.readyState === 4 && xhr.status === 200) {
                    const pokemon = JSON.parse(xhr.responseText)
                    resolve(loadedImg[0] = pokemon.sprites.front_default)
                };
            };
            xhr.open('GET', `${pokeImageUrl}`);
            xhr.send();
        });   
    }
    requestbyImg(pokeImageUrl).then( 
        () => {
            if (name === 'mew') {
            pokeNameUrl = pokeUrl+`pokemon/${name}`
            pokeImageUrl = pokeUrl+`pokemon-form/${name}`;
            //Mew is a weird edge case. Most version of this filter would have it generate a Mewtwo if "mew" is entered since Mewtwo appears first in the array/pokedex.
            //This literally checks if the user wants a mew and just gives it to them.
            } else if (
                filteredImgForms[0].name.includes(`unown`) || 
                filteredImgForms[0].name.includes(`burmy`) ||
                filteredImgForms[0].name.includes(`deerling`) ||
                filteredImgForms[0].name.includes(`shellos`) ||
                filteredImgForms[0].name.includes(`arceus`) ||
                filteredImgForms[0].name.includes(`cherrim`) ||
                filteredImgForms[0].name.includes(`vivillon`) ||
                filteredImgForms[0].name.includes(`sawsbuck`) ||
                filteredImgForms[0].name.includes(`flabebe`) ||
                filteredImgForms[0].name.includes(`floette`) ||
                filteredImgForms[0].name.includes(`florges`) ||
                filteredImgForms[0].name.includes(`furfrou`) ||
                filteredImgForms[0].name.includes(`xerneas`) ||
                filteredImgForms[0].name.includes(`sinistea`)
                ) {
                let filteredForms = filteredImgForms[0].name
                filteredForms = filteredForms.substring(0, filteredForms.indexOf("-"));
                let pokeNameUrl = pokeUrl+`pokemon/${filteredForms}`
                requestByName(pokeNameUrl);
            } else if (filteredImgForms[0].name.includes(`pichu-spiky-eared`)) {
                let filteredForms = 'pichu'
                let pokeNameUrl = pokeUrl+`pokemon/${filteredForms}`
                requestByName(pokeNameUrl);
            } else if (filteredImgForms[0].name.includes(`genesect`)) {
                let filteredForms = 'genesect'
                let pokeNameUrl = pokeUrl+`pokemon/${filteredForms}`
                requestByName(pokeNameUrl);
            } else { 
                let pokeNameUrl = pokeUrl+`pokemon/${filteredForms[0].name}`
                requestByName(pokeNameUrl);
            };
        }
    );  
};