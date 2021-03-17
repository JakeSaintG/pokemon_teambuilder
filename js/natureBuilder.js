// A Pokémon's Nature usually affects the value of two of its stats,
// ultimately increasing one of its non-HP stats (Attack, Defense,
// Special Attack, Special Defense, or Speed) by 10% and decreasing another by 10%.

let naturesList = {}

const getAllNatures = fetch("nature.json")
    .then(r=>r.json())
    .then(data => {
        naturesList = data.results;
});
window.onload = async () => {
    let placeholderData = await getAllNatures;
};

natureBuilder = (naturesList) => {
    const nature = document.createElement('select')
    nature.setAttribute('onchange', "natureChanger(this)");
    const defaultNature = document.createElement('option');
    defaultNature.textContent = 'Natures'
    defaultNature.style="display:none";
    nature.appendChild(defaultNature);

    for (i = 0; i < naturesList.length; i++) {
        const option = document.createElement('option');
        option.textContent = naturesList[i].name;
        option.className = naturesList[i].name;
        nature.appendChild(option);
    }; 

    return nature
}

natureChanger = (sel) => {
    let foo = sel.options[sel.selectedIndex].className
    const filteredNatures = naturesList.filter((choice) => { 
        return choice.name.includes(foo);
    });

    const statGraph = sel.parentElement.children[5].lastElementChild

    for (let i = 0; i < statGraph.children.length; i++) {
        const resetNum = parseInt(statGraph.children[i].attributes[0].value)
        statGraph.children[i].innerHTML = `&nbsp;${resetNum}`;
        const barWidth = `${(resetNum / 255) * 100}%`;
        statGraph.children[i].style.width = barWidth;
    }
    //The above for loop reset the stats at the beginning of the function execution.
    //This prevents changing natures from stacking numbers.
    
    const changeInStat = filteredNatures[0].stats

    changeStat = (statToChange, change) => {
        let originalStat = parseInt(statToChange.textContent)
        let statChange = originalStat * change + originalStat
        statChange = Math.ceil(statChange)
        statToChange.innerHTML = `&nbsp;${statChange}`;
        const barWidth = `${(statChange / 255) * 100}%`;
        statToChange.style.width = barWidth;
    }

    if (changeInStat.attack !== 0) {
        statToChange = statGraph.children[1]
        const change = changeInStat.attack
        changeStat(statToChange, change)
    }
    if (changeInStat.defense !== 0) {
        statToChange = statGraph.children[2]
        const change = changeInStat.defense
        changeStat(statToChange, change)
    }
    if (changeInStat.speed !== 0) {
        statToChange = statGraph.children[5]
        const change = changeInStat.speed 
        changeStat(statToChange, change)
    }
    if (changeInStat.spattack !== 0) {
        statToChange = statGraph.children[3]
        const change = changeInStat.spattack
        changeStat(statToChange, change)
    }
    if (changeInStat.spdefense !== 0) {
        statToChange = statGraph.children[4]
        const change = changeInStat.spdefense
        changeStat(statToChange, change)
    }

}

