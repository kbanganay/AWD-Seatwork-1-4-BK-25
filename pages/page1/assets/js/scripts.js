
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

document.getElementById('sort-options').addEventListener('change', function() {
    const sortBy = this.value;
    const playerList = document.getElementById('dynamic-player-list');

    // Assuming players is an array of player objects
    const players = Array.from(playerList.children).map(row => {
        const name = row.cells[0].innerText;
        const score = parseInt(row.cells[1].innerText);
        const level = parseInt(row.cells[2].innerText);
        return { name, score, level, row };
    });

    // Sort based on selected criteria
    players.sort((a, b) => {
        if (sortBy === 'score') {
            return b.score - a.score; // Descending order
        } else if (sortBy === 'level') {
            return b.level - a.level; // Descending order
        } else if (sortBy === 'name') {
            return a.name.localeCompare(b.name); // Ascending order
        }
    });

    // Clear the current list and repopulate sorted data
    playerList.innerHTML = '';
    players.forEach(player => playerList.appendChild(player.row));
});