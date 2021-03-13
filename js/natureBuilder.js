// A Pokémon's Nature usually affects the value of two of its stats,
// ultimately increasing one of its non-HP stats (Attack, Defense,
// Special Attack, Special Defense, or Speed) by 10% and decreasing another by 10%.

getAllNatures = (url) => {
    fetch(url)
    .then(response => response.json())
    .then(natures => natureBuilder(natures))
};

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