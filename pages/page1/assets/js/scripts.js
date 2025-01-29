
const playerFormElement = document.getElementById("new-player-form");
const playerNameInputElement = document.getElementById("input-player-name");
const playerScoreInputElement = document.getElementById("input-player-score");
const playerLevelInputElement = document.getElementById("input-player-level");
const playerListElement = document.getElementById("dynamic-player-list");
const playerCountElement = document.getElementById("current-player-count");

let playerArray = [];

function updatePlayerCountDisplay() {
    playerCountElement.textContent = `Players added: ${playerArray.length}/10`;
}

function renderPlayerListDisplay() {
    playerListElement.innerHTML = "";
    
   
    playerArray.sort((a, b) => a.score - b.score);

    playerArray.forEach((player) => {
        const rowElement = document.createElement("tr");

        const nameCell = document.createElement("td");
        nameCell.textContent = player.name;

        const scoreCell = document.createElement("td");
        scoreCell.textContent = `${player.score}/100`;

        const levelCell = document.createElement("td");
        levelCell.textContent = `Level ${player.level}`;

        rowElement.appendChild(nameCell);
        rowElement.appendChild(scoreCell);
        rowElement.appendChild(levelCell);

        playerListElement.appendChild(rowElement);
    });
}

function addNewPlayer() {
    const name = playerNameInputElement.value.trim();
    const score = parseInt(playerScoreInputElement.value, 10);
    const level = parseInt(playerLevelInputElement.value, 10);

 
    playerNameInputElement.classList.remove("input-error");
    playerScoreInputElement.classList.remove("input-error");
    playerLevelInputElement.classList.remove("input-error");

    if (!name || isNaN(score) || isNaN(level)) {
        alert("PLEASE COMPLETE THE INPUTS.");

        
        if (!name) playerNameInputElement.classList.add("input-error");
        if (isNaN(score)) playerScoreInputElement.classList.add("input-error");
        if (isNaN(level)) playerLevelInputElement.classList.add("input-error");

        return;
    }

    playerArray.push({ name, score, level });

    playerNameInputElement.value = "";
    playerScoreInputElement.value = "";
    playerLevelInputElement.value = "";

    updatePlayerCountDisplay();
    renderPlayerListDisplay();
}


document.getElementById("btn-add-player").addEventListener("click", addNewPlayer);