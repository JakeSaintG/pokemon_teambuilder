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
/*Grabs all of the icon names and URLs from player.json. Places them in the playerIcons object.*/

iconsBuilder = (playerIcons) => {
    for (i = 0; i < playerIcons.length; i++) {
        const option = document.createElement('option');
        option.textContent = playerIcons[i].name;
        option.className = playerIcons[i].url;
        option.setAttribute(`role`, `option`);
        playerIconSelect.appendChild(option);
    }; 
}

/*
Gets all of the of the names from the playerIcons object and places them in a select element for the user to pick from.
The URL is assigned to the class name to be grabbed later.
*/

placePlayerImg = (sel) => {
    let pickedPlayer = sel.options[sel.selectedIndex].className
    const playerIconDiv = document.createElement('div');
    const playerIcon = document.createElement('img');
    playerIcon.src = pickedPlayer
    playerIcon.alt = `${sel.options[sel.selectedIndex].textContent}'s Player Icon`
    playerIcon.setAttribute(`role`, `img`);
    playerIcon.className = 'playerIcon'
    playerIconDiv.appendChild(playerIcon);
    const reload = document.createElement('button');
    reload.setAttribute(`role`, `button`);  
    reload.textContent = `↺`;
    reload.className = "reload"
    playerIconDiv.appendChild(reload);
    playerIconSelect.parentElement.appendChild(playerIconDiv);
    playerIconSelect.remove();
}
/*
The function is run 'onchange' of the playerIconSelect.
It takes class name (url) and assigns it to the source of an img that is appended.
A reload button is added and then the playerIconSelect element is removed.
*/

replacePlayerSelect = () => {
    const playerList = playerIconSelect
    playerList.className = "playerIconSelect"
    playerList.setAttribute('onchange', "placePlayerImg(this)");
    const defaultPLayer = document.createElement('option');
    defaultPLayer.textContent = 'Player Select'
    defaultPLayer.style="display:none";
    defaultPLayer.setAttribute(`role`, `option`);
    playerList.appendChild(defaultPLayer);
    chooseCharDiv.appendChild(playerList);
}
/*
The event listers in builder.js look for the '↺'-action to fired and then runs this function.
This removes the chosen player image and replaces/rebuilds the select element to pick a different icon.
*/