const playerIconSelect = document.getElementById('playerIconSelect')
const chooseCharDiv = document.getElementById('teamCharDiv')

let playerIcons = {}

const getAllIcons = fetch("player.json")
    .then(r=>r.json())
    .then(data => {
        playerIcons = data.results;
});
window.onload = async () => {
    let placeholderData = await getAllIcons;
    iconsBuilder(playerIcons)
};

replacePlayerSelect = () => {
    const playerList = playerIconSelect
    playerList.className = "playerIconSelect"
    playerList.setAttribute('onchange', "placePlayerImg(this)");
    const defaultPLayer = document.createElement('option');
    defaultPLayer.textContent = 'Player Select'
    defaultPLayer.style="display:none";
    playerList.appendChild(defaultPLayer);
    chooseCharDiv.appendChild(playerList)
}

iconsBuilder = (playerIcons) => {
    for (i = 0; i < playerIcons.length; i++) {
        const option = document.createElement('option');
        option.textContent = playerIcons[i].name;
        option.className = playerIcons[i].url;
        playerIconSelect.appendChild(option);
    }; 
}

placePlayerImg = (sel) => {
    let foo = sel.options[sel.selectedIndex].className
    const pickedPlayer = playerIcons.filter((choice) => { 
        return choice.name.includes(foo);
    });

    const playerIconDiv = document.createElement('div')
    
    const playerIcon = document.createElement('img')
    playerIcon.src = foo
    playerIcon.className = 'playerIcon'
    playerIconDiv.appendChild(playerIcon)

    const reload = document.createElement('button')    
    reload.textContent = `↺`;
    reload.className = "reload"
    playerIconDiv.appendChild(reload)

    playerIconSelect.parentElement.appendChild(playerIconDiv)

    playerIconSelect.remove()
}