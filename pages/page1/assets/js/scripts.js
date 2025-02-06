const playerFormElement = document.getElementById("new-player-form");
const playerNameInputElement = document.getElementById("input-player-name");
const playerScoreInputElement = document.getElementById("input-player-score");
const playerLevelInputElement = document.getElementById("input-player-level");
const playerListElement = document.getElementById("dynamic-player-list");
const playerCountElement = document.getElementById("current-player-count");

let playerArray = [];

function updatePlayerCountDisplay() {
    playerCountElement.textContent = `PLAYERS: ${playerArray.length}/10`;
}

function renderPlayerListDisplay() {
    playerListElement.innerHTML = "";

    playerArray.forEach((player) => {
        const rowElement = document.createElement("tr");

        const nameCell = document.createElement("td");
        nameCell.textContent = player.name;

        const scoreCell = document.createElement("td");
        scoreCell.textContent = `${player.score} / 999`;

        const levelCell = document.createElement("td");
        levelCell.textContent = `Level ${player.level} / 999`;

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

    if (score < 0 || score > 999 || level < 1 || level > 999) {
        alert("Score must be between 0 and 999 and Level must be between 1 and 999.");
        return;
    }

    playerArray.push({ name, score, level });

    playerNameInputElement.value = "";
    playerScoreInputElement.value = "";
    playerLevelInputElement.value = "";

    localStorage.setItem("players", JSON.stringify(playerArray));

    updatePlayerCountDisplay();
    renderPlayerListDisplay();
}

function loadPlayerDataFromLocalStorage() {
    const savedPlayers = localStorage.getItem("players");

    if (savedPlayers) {
        playerArray = JSON.parse(savedPlayers);
        updatePlayerCountDisplay();
        renderPlayerListDisplay();
    }
}

function clearLocalStorage() {
    localStorage.removeItem("players");
    playerArray = [];
    updatePlayerCountDisplay();
    renderPlayerListDisplay();
}

loadPlayerDataFromLocalStorage();

document.getElementById("btn-add-player").addEventListener("click", addNewPlayer);

document.getElementById('sort-options').addEventListener('change', function() {
    const sortBy = this.value;

    playerArray.sort((a, b) => {
        if (sortBy === 'score' || sortBy === 'level') {
            return b[sortBy] - a[sortBy];
        } else if (sortBy === 'name') {
            return a.name.localeCompare(b.name);
        }
    });

    renderPlayerListDisplay();
});

document.getElementById("input-player-score").addEventListener("input", function() {
    if (this.value.length > 3) {
        this.value = this.value.slice(0, 3);
    }
});

document.getElementById("input-player-level").addEventListener("input", function() {
    if (this.value.length > 3) {
        this.value = this.value.slice(0, 3);
    }
});

document.getElementById("btn-clear-storage").addEventListener("click", clearLocalStorage);
