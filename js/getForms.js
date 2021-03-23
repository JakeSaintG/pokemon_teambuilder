//The way that the API handled forms of pokemon is kind of tricky and the below functions prevent the user from having to search for each form
//with the syntax that the API wants.

let forms = []

const pullAllMonsList = fetch(`https://pokeapi.co/api/v2/pokemon-form?limit=1283`)
    .then(r=>r.json())
    .then(pokemonList => {
        forms = pokemonList.results
        return(forms)
});
window.onload = async () => {
    let placeholderData = await pullAllMonsList;
};
//Calls to store the name of every pokemon in the forms array
//I chose to do it this way to avoid dozens of API requests for every form a pokemon may or may not have.
//This mad it easy for every added pokemon to check for forms against an established list with no more API requests until the form is chosen.

function findAllForms(pokemon) {
    if (pokemon === 'mew') { //Prevents Mewtwo from showing up as a Mew form from showing up as forms. (edge case)
        const formSelect = document.createElement('select');
        const defaultForm = document.createElement('option');
        defaultForm.textContent = 'Forms'
        formSelect.className = `formSelect`
        formSelect.appendChild(defaultForm);
        return formSelect
    } 
    const filteredForms = forms.filter((mon) => { 
        return mon.name.includes(pokemon);
    });
    //Searches for any form of the pokemon that the user chose (forms array).
    //Form names are returned from the api as "pokemon-form" (ex: 'sandshrew-alola' or 'gengar-gmax').
    //It finds everything that contains the pokemon name and returns it to the 'filteredForms' array.
    const formSelect = document.createElement('select');
    formSelect.setAttribute('onchange', "changeForm(this)");
    const defaultForm = document.createElement('option');
    defaultForm.textContent = 'Forms'
    formSelect.className = `formSelect`
    defaultForm.style="display:none";
    formSelect.appendChild(defaultForm);
    //The above chunk adds the select element for the forms.

    for (i = 0; i < filteredForms.length; i++) {
        const option = document.createElement('option');
        option.className = filteredForms[i].name;
        if (filteredForms[i].name.includes('porygon')) { //Prevents Porygon evolutions (Porygon2 and Porygon-Z) from showing up as forms. (edge case)
            option.textContent = 'Forms';
            formSelect.appendChild(option);
            break;
        } 
        if (filteredForms[i].name === 'nidoran-f') { //Changes the female Nidoran's option to match name (edge case)
            option.textContent = 'Nidoran♀';
        } else if (filteredForms[i].name === 'nidoran-m') { //Changes the male Nidoran's option to match name (edge case)
            option.textContent = 'Nidoran♂';
        } else if(filteredForms[i].name.includes(`mega`) && filteredForms[i].name.includes(`x`)) { //Handles the two Pokemon with X/Y evolutions
            option.textContent = 'Mega Evolve X';
        } else if(filteredForms[i].name.includes(`mega`) && filteredForms[i].name.includes(`y`)) { //Handles the two Pokemon with X/Y evolutions
            option.textContent = 'Mega Evolve Y';
        } else if(filteredForms[i].name.includes(`mega`)) { //Changes option to just list "Mega Evolve"
            option.textContent = 'Mega Evolve';
        } else if (filteredForms[i].name.includes(`gmax`)) { //Changes option to just list "Gigantamax"
            option.textContent = 'Gigantamax';
        } else if (filteredForms[i].name.includes(`-`)) { //Removes hyphens from anything that is not covered above edge cases
            let baz = filteredForms[i].name.split('-').join(' ');
            option.textContent = baz;
        } else {
            option.textContent = filteredForms[i].name;
        };
        formSelect.appendChild(option);
    }; 
    //This loops through the 'filteredForms' array and adds an option for each form.
    return formSelect
}

function changeForm(sel) {
    let foo = sel.options[sel.selectedIndex].className
    // Used className to avoid issues with style changes to list option.
    filterEdgeCases(foo)
    sel.parentElement.remove()
};
//This takes the users choice and modifies it to be searchable in the API.