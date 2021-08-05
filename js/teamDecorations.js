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
    generatePlayerIconSelect(playerIcons)
};
/*Grabs all of the icon names and URLs from player.json. Places them in the playerIcons object.*/

generatePlayerIconSelect = (playerIcons) => {
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

placeSelectedPlayerImg = (sel) => {
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
    playerIconSelect.style.display = "none"
}
/*
The function is run 'onchange' of the playerIconSelect.
It takes class name (url) and assigns it to the source of an img that is appended.
A reload button is added and then the playerIconSelect element is removed.
*/

replacePlayerSelect = () => {
    playerIconSelect.style.display = "inline-block"
}

document.getElementById("teamColor").addEventListener("click",function(e) {
    //The eventual goal is to have multiple teams on the page and the .parentElement chain keeps the color change in the desired team.
    if(e.target.nodeName === "LI") {
        if (e.target.parentElement.parentElement.parentElement.parentElement.parentElement.className == "black") {
            for (i = 0; i < e.target.parentElement.childElementCount; i++) {
                e.target.parentElement.children[i].style.borderColor = "black"
            }
            e.target.parentElement.parentElement.parentElement.parentElement.parentElement.style.color = 'black';
            e.target.parentElement.parentElement.parentElement.parentElement.parentElement.style.borderColor = 'black';
        }
        const teamColor = e.target.className;
        e.target.parentElement.parentElement.parentElement.parentElement.parentElement.className = teamColor;
        if (teamColor == "black") {
            for (i = 0; i < e.target.parentElement.childElementCount; i++) {
                e.target.parentElement.children[i].style.borderColor = "white"
            }
            e.target.parentElement.parentElement.parentElement.parentElement.parentElement.style.color = 'white';
            teamOf6.style.color = "black";
            e.target.parentElement.parentElement.parentElement.parentElement.parentElement.style.borderColor = 'grey';
        }
    }
});

document.getElementById('teamOptions').addEventListener('click', (e) => {
    e.preventDefault();
    if(e.target.tagName === 'BUTTON') {
        e.preventDefault();
        const button = e.target;
        const action = button.textContent;
        if(action === 'Save') {
            const input = teamName.firstElementChild
            const div = document.createElement('div')
            const span = document.createElement('span')
            const editButton = document.createElement('button')
            editButton.textContent = 'Edit';
            span.textContent = input.value;
            div.className = "userTeamName"
            div.id = "userTeamName"
            div.appendChild(span)
            div.appendChild(editButton)
            teamName.parentNode.appendChild(div)
            teamName.parentNode.firstElementChild.style.display = 'none';
            teamName.style.display = 'none';
            //Adds a Span with the user-input team name as well as an "edit" button.
            //Removes the input for entering a team name.
        } else if (action === 'Edit') {
            const removeOldName = document.getElementById("userTeamName")
            removeOldName.remove()
            teamName.firstElementChild.removeAttribute("onfocus");
            teamName.parentNode.firstElementChild.textContent = "Rename your team!"
            teamName.parentNode.firstElementChild.style.display = 'block';
            teamName.style.display = 'inline-block';
            //Removes the team-name span and replaces the entry field. Adds the previous entry to the field.
        } else if (action === '↺') {
            e.target.parentElement.remove()
            replacePlayerSelect()
        }
    }
})