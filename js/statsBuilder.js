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

    statsNames.forEach((entry) => {
        const stat = document.createElement('p');
        stat.innerHTML = `${entry}`;
        stat.className = "statItem"
        statName.appendChild(stat);
    });

    statName.className = "statName";
    statBar.className = "statBar";
    statsDiv.appendChild(statName);
    statsDiv.appendChild(statBar);
    return statsDiv
}