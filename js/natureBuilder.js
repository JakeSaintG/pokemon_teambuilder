// A Pokémon's Nature usually affects the value of two of its stats.
// Increasing one of its non-HP stats (Attack, Defense, Special Attack, Special Defense, or Speed)
// by 10% and decreasing another by 10%.

let naturesList = {}

const getAllNatures = fetch("nature.json")
    .then(r=>r.json())
    .then(data => {
        naturesList = data.results;
});
window.onload = async () => {
    let placeholderData = await getAllNatures;
};
//Gets the nature.json data and puts in naturesList to be used later.

natureBuilder = (naturesList) => {
    const nature = document.createElement('select')
    nature.setAttribute('onchange', "natureChanger(this)");
    const defaultNature = document.createElement('option');
    defaultNature.setAttribute(`role`, `option`);
    defaultNature.textContent = 'Natures'
    defaultNature.style="display:none";
    nature.appendChild(defaultNature);

    for (i = 0; i < naturesList.length; i++) {
        const option = document.createElement('option');
        option.textContent = naturesList[i].name;
        option.setAttribute(`role`, `option`);
        option.className = naturesList[i].name;
        nature.appendChild(option);
    }; 
    return nature
}
//natureBuilder gets the names of the natures that were put into the naturesList obj and makes a select element.

natureChanger = (sel) => {
    let foo = sel.options[sel.selectedIndex].className
    const filteredNatures = naturesList.filter((choice) => { 
        return choice.name.includes(foo);
    });
    //Filters the options that weren't selected

    const statGraph = sel.parentElement.children[5].lastElementChild
    //Selects the stat graph for the Pokemon that the user chose a nature to apply.

    for (let i = 0; i < statGraph.children.length; i++) {
        const resetNum = parseInt(statGraph.children[i].attributes[0].value)
        statGraph.children[i].innerHTML = `&nbsp;${resetNum}`;
        const barWidth = `${(resetNum / 255) * 100}%`;
        statGraph.children[i].style.width = barWidth;
    }
    //The above for loop reset the stats at the beginning of the function execution.
    //This prevents changing natures from stacking numbers.
    
    const changeInStat = filteredNatures[0].stats
    //Assigned the selected nature's stats to changeInStat.

    changeStat = (statToChange, change) => {
        let originalStat = parseInt(statToChange.textContent)
        let statChange = originalStat * change + originalStat
        //Takes the original stat and multiplies it by 0.1 or -0.1 to be added back to the original stat.
        //Natures change a Pokemon's stats by adding 10% to a stat and subtracting 10% from another stat.
        statChange = Math.ceil(statChange)
        if (change === 0.1) {
            change = `&#8679;`
        } else {
            change = `&#8681;`
        }
        //Reassigns the "change" variable to be an up or down arrow.
        statToChange.innerHTML = `&nbsp;${change}${statChange}`;
        //Replaces the number with the changed stat.
        //An up or down arrow is added to help the user more-easily ID which stats were affected.
        const barWidth = `${(statChange / 255) * 100}%`;
        statToChange.style.width = barWidth;
        //Sets the the width of the element for the graph.
    }

    //The below if-statements check if a stat change is applicable.
    //If a number in the JSON is 0.1 or -0.1, then change that stat.
    //Stats that do not change are given a 0.
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
    if (changeInStat.speed !== 0) {
        statToChange = statGraph.children[5]
        const change = changeInStat.speed 
        changeStat(statToChange, change)
    }

}

