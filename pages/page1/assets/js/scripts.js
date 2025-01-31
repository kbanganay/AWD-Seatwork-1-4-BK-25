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

    // Check if score and level are within the 3-digit limit
    if (score < 0 || score > 999 || level < 1 || level > 999) {
        alert("Score must be between 0 and 999 and Level must be between 1 and 999.");
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

    // Sort players based on selected criteria
    playerArray.sort((a, b) => {
        if (sortBy === 'score' || sortBy === 'level') {
            return b[sortBy] - a[sortBy]; // Descending order
        } else if (sortBy === 'name') {
            return a.name.localeCompare(b.name); // Ascending order
        }
    });

    // Re-render the player list after sorting
    renderPlayerListDisplay();
});

document.getElementById("input-player-score").addEventListener("input", function() {
    if (this.value.length > 3) {
        this.value = this.value.slice(0, 3); // Restrict to 3 digits
    }
});

document.getElementById("input-player-level").addEventListener("input", function() {
    if (this.value.length > 3) {
        this.value = this.value.slice(0, 3);
    }
});

