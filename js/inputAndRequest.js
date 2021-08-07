let openSlotInTeam;

document.querySelector(".teamOf6").addEventListener('click', (e) => {
    e.preventDefault();
    if(e.target.tagName === 'BUTTON') {
        e.preventDefault();
        const button = e.target;
        const action = button.textContent;
        if (action === 'add') {
            const enteredPokemon = e.target.parentElement.firstElementChild.value;
            openSlotInTeam = e.target.parentElement.parentElement.parentElement;

            if (enteredPokemon === '' || enteredPokemon === 'Pokémon name') {
                let reason = `<h5>No P̷o̶k̵e̷m̸o̵n̴ Listed!</h5> <p>Please supply a Pok&eacute;mon</p>`;
                generateMissingNo(reason);
                return
                //If the user did not put anything into the submission input, generate a MissingNo Error.
            };
            let name = enteredPokemon.toLowerCase();
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
            }; 
            //The above if-chain fixes some of the Pokemon that have punctuation in their name and lets the user input them with or without punctuation.

            filterEdgeCases(name);
            e.target.parentElement.parentElement.remove()

            //A surprisingly large amount of pokemon in the API are named something like "toxtricity-amped" which breaks if the user does not know that and just types "toxtricity".
            //filterEdgeCases() takes the forms array from getForms.js and matches the user input first result in the array.
            //This allows at least something to generate and the user can then pick the form that they want.
        }
    }
})

formatNameOutput = (pokemon) => {
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
    return alterName;
}

filterEdgeCases = (name) => {
    const filteredImgs = forms.filter((mon) => { 
        return mon.name.includes(name);
    });

    if (filteredImgs[0] === undefined) {
        let reason = `<h5>Error 404?</h5> <p> Something went wrong.</br>Connection/Spelling issue.</br>Please try again!</p>`
        generateMissingNo(reason);
        //checks to see if forms has what the user is looking for. If not, generates a 404-MissingNo/Error.
        return
    }

    let pokeImageUrl = pokeUrl+`pokemon-form/${filteredImgs[0].name}`;
    
    if (name === 'mew') {
        pokeNameUrl = pokeUrl+`pokemon/${name}`
        pokeImageUrl = pokeUrl+`pokemon-form/${name}`;
    };
    //Mew is a weird edge case. Most versions of this filter would have it generate a Mewtwo if "mew" is entered since Mewtwo appears first in the array/pokedex.
    //This literally checks if the user wants a mew and just gives it to them.

    if (name === 'pidgeot') {
        pokeNameUrl = pokeUrl+`pokemon/${name}`
        pokeImageUrl = pokeUrl+`pokemon-form/${name}`;
    };
    //Like Mew, Pidgeotto's and Pidgeot's dex placement requires a little more specific selection.

    if (name.includes('sinistea')) {
        name = 'sinistea'
        pokeImageUrl = pokeUrl+`pokemon-form/${name}-phony`;
    };
    if (name.includes('polteageist')) {
        name = 'polteageist'
        pokeImageUrl = pokeUrl+`pokemon-form/${name}-phony`;
    };
    //Sinistea and Polteageist don't have images in PokeAPI for their "Antique" forms and picking this form generates a MissingNo.
    //Since the change in form is on the underside of the Pokemon and is not visible in the "Phony" form, I just set the image for "Antique" and "Phony" as the same image.

    if (name.includes(`pichu-spiky-eared`)) {
        pokeImageUrl = "imgs/spriteFix/pichu.json";
    };
    //This Pichu form exists in the API but does not have an image so I had to add one to avoid breaking.

    filterImgForms(filteredImgs, name, pokeImageUrl)  
};

filterImgForms = (filteredImgs, name, pokeImageUrl) => {
    if (
        filteredImgs[0].name.includes(`unown`) || 
        filteredImgs[0].name.includes(`burmy`) ||
        filteredImgs[0].name.includes(`deerling`) ||
        filteredImgs[0].name.includes(`shellos`) ||
        filteredImgs[0].name.includes(`arceus`) ||
        filteredImgs[0].name.includes(`cherrim`) ||
        filteredImgs[0].name.includes(`vivillon`) ||
        filteredImgs[0].name.includes(`sawsbuck`) ||
        filteredImgs[0].name.includes(`flabebe`) ||
        filteredImgs[0].name.includes(`floette`) ||
        filteredImgs[0].name.includes(`florges`) ||
        filteredImgs[0].name.includes(`furfrou`) ||
        filteredImgs[0].name.includes(`xerneas`) ||
        filteredImgs[0].name.includes(`silvally`)
        ) {
        let filteredForms = filteredImgs[0].name
        filteredForms = filteredForms.substring(0, filteredForms.indexOf("-"));
        let pokeNameUrl = pokeUrl+`pokemon/${filteredForms}`
        makeRequests(pokeNameUrl, pokeImageUrl);
    } else if (name === 'mew') {
        makeRequests(pokeNameUrl, pokeImageUrl);
    } else if (name === 'pidgeot') {
        makeRequests(pokeNameUrl, pokeImageUrl);
    } else if (filteredImgs[0].name.includes(`pichu-spiky-eared`)) {
        let filteredForms = 'pichu'
        let pokeNameUrl = pokeUrl+`pokemon/${filteredForms}`
        makeRequests(pokeNameUrl, pokeImageUrl);
    } else if (filteredImgs[0].name.includes(`genesect`)) {
        pokeNameUrl = pokeUrl+`pokemon/649`
        makeRequests(pokeNameUrl, pokeImageUrl);
    } else if (filteredImgs[0].name.includes(`polteageist`) || filteredImgs[0].name.includes(`sinistea`)) {
        pokeNameUrl = pokeUrl+`pokemon/${name}`
        makeRequests(pokeNameUrl, pokeImageUrl);
    } else { 
        pokeNameUrl = pokeUrl+`pokemon/${filteredImgs[0].name}`
        makeRequests(pokeNameUrl, pokeImageUrl);
    };
    /*
    After hunting down all of the pokemon with differences in name between "https://pokeapi.co/api/v2/pokemon-form"(images) and
    "https://pokeapi.co/api/v2/pokemon"(details like stats), this if-else statement helps process the correct URLs based on the
    user's pick pokemon. These are the edge-cases that required a little more work get running.
    */
}

makeRequests = (url, pokeImageUrl) => {
    let pokeIMG = "";
    new Promise((resolve) => {
        fetch(pokeImageUrl)
        .then(r=>r.json())
        .then(pokemonIMG => {
            let shinyChance = 8192;
            new Promise((resolve) => {
                shinyChance = Math.floor(Math.random() * shinyChance) + 1;
                resolve(shinyChance)
            })
            if (shinyChance === 1) {
                pokeIMG = pokemonIMG.sprites.front_shiny;
                resolve(pokeIMG)
            } else {
                pokeIMG = pokemonIMG.sprites.front_default;
                resolve(pokeIMG)
            } 
            //This "easter egg" has a 1-in-8192 chance of generating the Pokemon's image as their shiny form. 
            //The odds are based on the chance of a wild Pokemon encounter being shiny in the current main series games.
            //To test or change the odds, alter the value set in "shinyChance". For shinies all the time, set it to 1.
        })       
    })
    .then(
        fetch(url)
        .then(r=>r.json())
        .then(pokemon => {
            updatePokemonResult(pokemon, pokeIMG)
        })
        .catch((error) => {
            let reason = `<h5>Error 404?</h5> <p> Something went wrong.</br>Connection/Spelling issue.</br>Please try again!</p>`
            generateMissingNo(reason);
            console.error('Error:', error);
            return
        })
    )
}