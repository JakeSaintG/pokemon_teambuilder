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
    
    remove.textContent = `X`;
    remove.title = "Remove from team"
    title.appendChild(remove)

    title.className='title';
    entry.appendChild(title);

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
    
    teamOf6.appendChild(entry);
    console.log(pokemon.name)
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
            const div = document.createElement('div')
            const span = document.createElement('span')
            const editButton = document.createElement('button')
            editButton.textContent = 'Edit';
            span.textContent = input.value;
            div.className = "userTeamName"
            div.id = "userTeamName"
            div.appendChild(span)
            div.appendChild(editButton)
            teamName.parentNode.appendChild(div)
            teamName.parentNode.firstElementChild.style.display = 'none';
            teamName.style.display = 'none';
            //Adds a Span with the user-input team name as well as an "edit" button.
            //Removes the input for entering a team name.
        } else if (action === 'Edit') {
            const removeOldName = document.getElementById("userTeamName")
            removeOldName.remove()
            teamName.firstElementChild.removeAttribute("onfocus");
            teamName.parentNode.firstElementChild.textContent = "Rename your team!"
            teamName.parentNode.firstElementChild.style.display = 'block';
            teamName.style.display = 'inline-block';
            //Removes the team-name span and replaces the entry field. Adds the previous entry to the field.
        } else if (action === 'Add') {
            if (input.value === '' || input.value === 'Pokémon name') {
                let reason = `<h5>No P̷o̶k̵e̷m̸o̵n̴ Listed!</h5> <p>Please supply a Pok&eacute;mon</p>`;
                generateMissingNo(reason);
                return
                //If the user did not put anything into the submission input, generate a MissingNo Error.
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
            if (name.includes('mime') && name.includes('mr')) {
                name = `mr-mime`
            };
            if (name.includes('type') && name.includes('null')) {
                name = `type-null`
            };
            if (name.includes(`ho`) && name.includes(`oh`)) {
                name = `ho-oh`
            } 
            //The above if-chain fixes some of the Pokemon that have punctuation in their name and lets the user input them with or without punctuation.

            filterEdgeCases(name);
            //A surprisingly large amount of pokemon in the API are named something like "toxtricity-amped" which breaks if the user does not know that and just types "toxtricity".
            //filterEdgeCases() takes the forms array from getForms.js and matches the user input first result in the array.
            //This allows at least something to generate and the user can then pick the form that they want.
            input.value = '';
        } else if (action === 'X') {
            e.target.parentElement.parentElement.remove()
            if (teamOf6.childElementCount === 5) {
                document.getElementById('descriptionAdd').disabled = false;
                //Re-enables the submission of more pokemon to be added to the team if there are 5 or less.
            };
            if (teamOf6.childElementCount === 0) { 
                placeHolder.style.display = 'flex';
                //Brings the placeholder card back if there are no Pokemon added to the div.
            };
        } else if (action === '↺') {
            e.target.parentElement.remove()
            replacePlayerSelect()
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
    };
    //Mew is a weird edge case. Most versions of this filter would have it generate a Mewtwo if "mew" is entered since Mewtwo appears first in the array/pokedex.
    //This literally checks if the user wants a mew and just gives it to them.

    if (name.includes('sinistea')) {
        name = 'sinistea'
        pokeImageUrl = pokeUrl+`pokemon-form/${name}-phony`;
    };
    if (name.includes('polteageist')) {
        name = 'polteageist'
        pokeImageUrl = pokeUrl+`pokemon-form/${name}-phony`;
    };
    //Sinistea and Polteageist don't have images in PokeAPI for their "Antique" forms and picking this form generates a MissingNo.
    //Since the change in form is on the underside of the Pokemon and is not visible in the "Phony" form, I just set the image for 
    //"Antique" and "Phony" as the same image.

    function requestbyImg(pokeImageUrl) {
        return new Promise((resolve) => {
            //I was having an issue where the rest of the Pokemon element would generate before the loadedImg object was populated.
            //This would lead to some goofy image loading so I went with the below promise to hopefully let the object be populated before the rest of the pokemon loads.
            const xhr = new XMLHttpRequest();
            xhr.onreadystatechange = () => {
                if (xhr.status === 404 && xhr.readyState === 4) {
                    console.log('error')
                }
                if(xhr.readyState === 4 && xhr.status === 200) {
                    const pokemon = JSON.parse(xhr.responseText)
                    const shinyChance = 8192;
                    if (Math.floor(Math.random() * shinyChance) + 1 === 1) {
                        resolve(loadedImg[0] = pokemon.sprites.front_shiny)
                    } else {
                        resolve(loadedImg[0] = pokemon.sprites.front_default)
                    } 
                    //This "easter egg" has a 1-in-8192 chance of generating the Pokemon's image as their shiny form. 
                    //The odds are based on the chance of a wild Pokemon encounter being shiny in the current main series games.
                    //To test or change the odds, alter the value set in "shinyChance". For shinies all the time, set it to 1.
                };
            };
            xhr.open('GET', `${pokeImageUrl}`);
            xhr.send();
        });   
    }
    requestbyImg(pokeImageUrl).then( 
        () => {
            if (
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
                filteredImgForms[0].name.includes(`silvally`)
                ) {
                let filteredForms = filteredImgForms[0].name
                filteredForms = filteredForms.substring(0, filteredForms.indexOf("-"));
                let pokeNameUrl = pokeUrl+`pokemon/${filteredForms}`
                requestByName(pokeNameUrl);
            } else if (name === 'mew') {
                requestByName(pokeNameUrl);
            } else if (filteredImgForms[0].name.includes(`pichu-spiky-eared`)) {
                let filteredForms = 'pichu'
                let pokeNameUrl = pokeUrl+`pokemon/${filteredForms}`
                requestByName(pokeNameUrl);
            } else if (name === "polteageist" || "sinistea") {
                pokeNameUrl = pokeUrl+`pokemon/${name}`
                requestByName(pokeNameUrl);
            } else if (filteredImgForms[0].name.includes(`genesect`)) {
                let filteredForms = 'genesect'
                let pokeNameUrl = pokeUrl+`pokemon/${filteredForms}`
                requestByName(pokeNameUrl);
            } else { 
                let pokeNameUrl = pokeUrl+`pokemon/${filteredForms[0].name}`
                requestByName(pokeNameUrl);
            };
            /*
            After hunting down all of the pokemon with differences in name between "https://pokeapi.co/api/v2/pokemon-form"(images) and
            "https://pokeapi.co/api/v2/pokemon"(details like stats), this if-else statement helps process the correct URLs based on the
            user's pick pokemon. These are the edge-cases that required a little more work get running.
            */
        }
    );  
};