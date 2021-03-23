const statBuilder = (pokemon) => {
    const statsDiv = document.createElement('div');
    const statName = document.createElement('div');
    const statBar = document.createElement('div');

    const statsNames = [
        `HP:`,
        `Att:`,
        `Def:`,
        `S.At:`,
        `S.Df:`,
        `Spd:`
    ]

    for (i = 0; i < pokemon.stats.length; i++) {
        const stat = document.createElement('p');
        stat.innerHTML = `&nbsp;${pokemon.stats[i].base_stat}`;
        stat.setAttribute('value', `${pokemon.stats[i].base_stat}`);
        const barWidth = `${(pokemon.stats[i].base_stat / 255) * 100}%`;
        stat.style.width = barWidth;
        stat.className = `statItem ${pokemon.stats[i].stat.name}`
        statBar.appendChild(stat);
    }
    /*
    + The chosen pokemon's stats are handled here. This loops over the stats and displays them as a number
    + It also sets the width of the element to a percent based on a max stat of 255. This is styled by the CSS to show as a stat graph.
    */

    statsNames.forEach((entry) => {
        const stat = document.createElement('p');
        stat.innerHTML = `${entry}`;
        stat.className = "statItem"
        statName.appendChild(stat);
    });
    /* Gets each of the Stat Names from the statsNames array and displays it.*/

    statName.className = "statName";
    statBar.className = "statBar";
    statsDiv.appendChild(statName);
    statsDiv.appendChild(statBar);
    return statsDiv
    /* This sets the statName div and statBar elements next to each other.*/
}