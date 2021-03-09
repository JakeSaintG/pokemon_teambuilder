// A Pokémon's Nature usually affects the value of two of its stats,
// ultimately increasing one of its non-HP stats (Attack, Defense,
// Special Attack, Special Defense, or Speed) by 10% and decreasing another by 10%.

// getNatures = () => {
//     fetch('nature.json')
//     .then(response => response.json())
//     .then(data => console.log(data))
// };

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