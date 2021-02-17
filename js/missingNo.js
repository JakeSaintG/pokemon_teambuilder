function generateMissingNo(reason){
    let noEntry = document.createElement('div')
    noEntry.className = 'missingNo entry'
    noEntry.innerHTML = `
        <div class="title">
            <img src="imgs/dexicon.png" class="dex" title = "Show in PokeDex not functional yet">
            <h2>MissingNo.</h2>
            <button>X</button>
        </div>
        <img src="imgs/MissingNo.png" class="PokeImg">
        <div class="types">
            <p class="typeIcon" style="background-color:black;">Ň̷̨ȕ̷͕l̷͇̑l̸̠̏</p>
        </div>
        <select id="missingAbility" onchange="missing(value);">
        <option value="1" style="display: none;">Abilties</option>
        <option value="2">Item Duplication</option>
        <option value="3">Crash Game</option>
    </select>
        <select>
            <option style="display: none;">Forms</option>
            <option>(Test) Alolan</option>
        </select>
        <div class="statsGraph">
            ${reason}
        </div>
    `
    teamOf6.appendChild(noEntry)
    if (teamOf6.childElementCount === 6) {
        enterMon.parentNode.style.display = "none";
    };
};

function missing(){
    let foo = document.getElementById("missingAbility");
    let bar = foo.options[foo.selectedIndex].value;
    if (bar == '3'){
        window.location.reload();
    } else {
        return
    }
    // =====================BUG====================
    // Crash Game only works on first missingno: fix later
    // =====================BUG====================
};
