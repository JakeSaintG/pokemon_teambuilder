let generateHere

enterTeam.addEventListener('click', (e) => {
    e.preventDefault();
    if(e.target.tagName === 'BUTTON') {
        e.preventDefault();
        const button = e.target;
        const action = button.textContent;
        if (action === 'add') {
            const enteredPokemon = e.target.parentElement.firstElementChild.value
            generateHere = e.target.parentElement.parentElement.parentElement

            if (enteredPokemon === '' || enteredPokemon === 'Pokémon name') {
                let reason = `<h5>No P̷o̶k̵e̷m̸o̵n̴ Listed!</h5> <p>Please supply a Pok&eacute;mon</p>`;
                generateMissingNo(reason);
                return
                //If the user did not put anything into the submission input, generate a MissingNo Error.
            };
            const data = enteredPokemon;
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
            e.target.parentElement.parentElement.remove()

            //A surprisingly large amount of pokemon in the API are named something like "toxtricity-amped" which breaks if the user does not know that and just types "toxtricity".
            //filterEdgeCases() takes the forms array from getForms.js and matches the user input first result in the array.
            //This allows at least something to generate and the user can then pick the form that they want.
        }
    }
})

let loadedImg = {};

function filterEdgeCases(name) {
    const filteredImgForms = forms.filter((mon) => { 
        return mon.name.includes(name);
    });

    if (filteredImgForms[0] === undefined) {
        // input.value = '';
        let reason = `<h5>Error 404?</h5> <p> Something went wrong.</br>Connection/Spelling issue.</br>Please try again!</p>`
        generateMissingNo(reason);
        //checks to see if forms has what the user is looking for. If not, generates a 404-MissingNo/Error.
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
    //Since the change in form is on the underside of the Pokemon and is not visible in the "Phony" form, I just set the image for 
    //"Antique" and "Phony" as the same image.
    if (name.includes(`pichu-spiky-eared`)) {
        pokeImageUrl = "imgs/spriteFix/pichu.json";
    };
    
    requestByName = (url) => {
        fetch(url)
            .then(r=>r.json())
            .then(pokemon => {
                updatePokemonResult(pokemon)
            })
            .catch((error) => {
                let reason = `<h5>Error 404?</h5> <p> Something went wrong.</br>Connection/Spelling issue.</br>Please try again!</p>`
                generateMissingNo(reason);
                console.error('Error:', error);
                return
            })
    }

    function requestbyImg(pokeImageUrl) {
        return new Promise((resolve) => {
            //I was having an issue where the rest of the Pokemon element would generate before the loadedImg object was populated.
            //This would lead to some goofy image loading so I went with the below promise to hopefully let the object be populated before the rest of the pokemon loads.
            const xhr = new XMLHttpRequest();
            xhr.onreadystatechange = () => {
                if (xhr.status === 404 && xhr.readyState === 4) {
                    console.error('Error:', error);
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
            } else if (name === 'pidgeot') {
                requestByName(pokeNameUrl);
            } else if (filteredImgForms[0].name.includes(`pichu-spiky-eared`)) {
                let filteredForms = 'pichu'
                let pokeNameUrl = pokeUrl+`pokemon/${filteredForms}`
                requestByName(pokeNameUrl);
            } else if (filteredImgForms[0].name.includes(`genesect`)) {
                let pokeNameUrl = pokeUrl+`pokemon/649`
                requestByName(pokeNameUrl);
            } else if (filteredImgForms[0].name.includes(`polteageist`) || filteredImgForms[0].name.includes(`sinistea`)) {
                pokeNameUrl = pokeUrl+`pokemon/${name}`
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