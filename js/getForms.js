let forms = []

window.onload = function pullAllMonsList()  {
    let foo = `https://pokeapi.co/api/v2/pokemon?limit=1283`
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
        if(xhr.readyState === 4 && xhr.status === 200) {
            const pokemonList = JSON.parse(xhr.responseText)
            forms = pokemonList.results
        } 
    };
    xhr.open('GET', foo);
    xhr.send();
    return(forms)
}

function findAllForms(pokemon) {
    const bar = forms.filter((mon) => {
        return mon.name.includes(pokemon);
    });
    const formSelect = document.createElement('select');
    formSelect.setAttribute('onchange', "changeForm(this)");
    const defaultForm = document.createElement('option');
    defaultForm.textContent = 'Forms'
    formSelect.className = `formSelect`
    defaultForm.style="display:none";
    formSelect.appendChild(defaultForm);
    for (i = 0; i < bar.length; i++) {
        const option = document.createElement('option');
        option.textContent = bar[i].name;
        formSelect.appendChild(option);
    }; 
    return formSelect
}

function changeForm(sel) {
    let foo = sel.options[sel.selectedIndex].textContent
    let newUrl = `https://pokeapi.co/api/v2/pokemon/${foo}`
    requestByForm(newUrl);
    sel.parentElement.remove()
};

requestByForm = (url) => {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
        if(xhr.readyState === 4 && xhr.status === 200) {
            const pokemon = JSON.parse(xhr.responseText)
            updatePokemonResult(pokemon);
        };
    };
    xhr.open('GET', `${url}`);
    xhr.send();
}