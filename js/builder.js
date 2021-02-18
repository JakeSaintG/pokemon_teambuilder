const pokeUrl = 'https://pokeapi.co/api/v2/';
const input = document.getElementById('description');
const enterMon = document.getElementById('enterMon');
const teamOf6 = document.getElementById('teamOf6');
const teamName = document.getElementById('teamName');


requestByName = (url) => {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
        if (xhr.status === 404 && xhr.readyState === 4) {
            let reason = `<h5>Error 404?</h5> <p> Something went wrong.</br>Connection/Spelling issue.</br>Please try again!</p>`
            generateMissingNo(reason);
        }
        if(xhr.readyState === 4 && xhr.status === 200) {
            const pokemon = JSON.parse(xhr.responseText)
            updatePokemonResult(pokemon);
        };
    };
    xhr.open('GET', `${url}`);
    xhr.send();
}

getAllNatures = (url) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = () => {
        if (xhr.status === 200) {
            const natures = JSON.parse(xhr.responseText);
            natureBuilder(natures);
        };
    };
    xhr.open('GET', `${url}`);
    xhr.send();
}

natureBuilder = (natures) => {
    const nature = document.createElement('select')

    const defaultNature = document.createElement('option');
    defaultNature.textContent = 'Natures'
    defaultNature.style="display:none";
    nature.appendChild(defaultNature);

    for (i = 0; i < natures.results.length; i++) {
        const option = document.createElement('option');
        option.textContent = natures.results[i].name;
        nature.appendChild(option);
    }; 
    teamOf6.lastElementChild.appendChild(nature);
}

const updatePokemonResult = (pokemon) => {
    const entry = document.createElement('div');
    const h2 = document.createElement('h2');
    const img = document.createElement('img');
    const types = document.createElement('div')
    const type1 = document.createElement('p')
    const ability = document.createElement('select')
    const remove = document.createElement('button')
    const title = document.createElement('div')
    const dex = document.createElement('img');
    const stats = document.createElement('div');
    const forms = document.createElement('select');

    // Adds the entry for the pokemon
    teamOf6.appendChild(entry);
    entry.style.backgroundColor = 'white';
    
    // Adds title header for the pokemon
    dex.src = 'imgs/dexicon.png'
    dex.className="dex"
    dex.title = "Show in PokeDex not functional yet"
    title.appendChild(dex);
    title.className='title';
    h2.textContent = pokemon.name;
    title.appendChild(h2);
    entry.appendChild(title);
    remove.textContent = 'X'
    remove.title = "Show in PokeDex not functional yet"
    title.appendChild(remove)

    //Currently, not all sprites are available for special forms (Alolan, Galar, some megas, etc) and shiny pokemon.
    //When they become available, the below code can be used to make a shiny sprite easter-egg in the teamOf6 builder.
    //For example, the below code works for "Mudkip" and "Ditto" but not Alolan Sandshrew or Mega Swampert
    //
    // if (Math.floor(Math.random() * 8192) + 1 === 1) {
    //     img.src = pokemon.sprites.front_shiny;
    // } else {
    //     img.src = pokemon.sprites.front_default;
    // }

    //this will do for now
    img.src = pokemon.sprites.other["official-artwork"].front_default;
    img.className="PokeImg"
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

    // =================================================================================================FINISH FORMS====================
    entry.appendChild(forms);
    const defaultFormsOption = document.createElement('option');
    defaultFormsOption.textContent = 'Forms'
    defaultFormsOption.style="display:none";
    forms.appendChild(defaultFormsOption);
    const formsOption = document.createElement('option');
    formsOption.textContent = '(Test) Alolan';
    forms.appendChild(formsOption);
    // =================================================================================================FINISH FORMS====================

    getAllNatures(pokeUrl+`nature`);

    // =================================================================================================FINISH STATS====================
    stats.textContent = "StatsPlaceholder"
    stats.className = 'statsGraph'
    entry.appendChild(stats);
    // =================================================================================================FINISH STATS====================

    if (teamOf6.childElementCount === 6) {
        enterMon.parentNode.style.display = "none";
    };
};

// ===================================================================================================EVENT LISTENERS===================

document.getElementById("teamColor").addEventListener("click",function(e) {
    if(e.target.nodeName === "LI") {
        if (e.target.parentElement.parentElement.parentElement.parentElement.className == "black") {
            for (i = 0; i < e.target.parentElement.childElementCount; i++) {
                e.target.parentElement.children[i].style.borderColor = "black"
            }
            e.target.parentElement.parentElement.parentElement.parentElement.style.color = 'black';
            e.target.parentElement.parentElement.parentElement.parentElement.style.borderColor = 'black';
        }
        const teamColor = e.target.className;
        e.target.parentElement.parentElement.parentElement.parentElement.className = teamColor;
        if (teamColor == "black") {
            for (i = 0; i < e.target.parentElement.childElementCount; i++) {
                e.target.parentElement.children[i].style.borderColor = "white"
            }
            e.target.parentElement.parentElement.parentElement.parentElement.style.color = 'white';
            e.target.parentElement.parentElement.parentElement.parentElement.style.borderColor = 'grey';
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
            input.value = span.textContent;
            teamName.parentNode.insertBefore(nameYourTeam, teamName);
            teamName.insertBefore(input, span);
            teamName.removeChild(span);
            button.textContent = 'Save';
        } else if (action === 'Add') {
            const placeHolder = document.getElementById('placeHolder')
            if (placeHolder !== null) {
                const placeHolder = document.getElementById('placeHolder')
                placeHolder.remove()
            };
            if (input.value === '' || input.value === 'Pokémon name') {
                let reason = `<h5>No P̷o̶k̵e̷m̸o̵n̴ Listed!</h5> <p>Please supply a Pok&eacute;mon</p>`;
                generateMissingNo(reason);
                return
            };
            const data = input.value;
            const name = data.toLowerCase()
            input.value = '';
            let pokeNameUrl = pokeUrl+`pokemon/${name}`
            requestByName(pokeNameUrl);
        } else if (action === 'X') {
            e.target.parentElement.parentElement.remove()
            if (teamOf6.childElementCount === 5) {
                enterMon.parentNode.style.display = "block";
            };
        }
    }
});