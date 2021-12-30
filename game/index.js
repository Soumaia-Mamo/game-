const gameLogicValidation = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function validateGame(game) {
  if (Array.isArray(game) === false || game.length !== 9) {
    console.log("Dit is geen geldig spel");
    return;
  }

 // Probeer een winnaar te vinden.

  for (let k = 0; k < gameLogicValidation.length; k++) {
    let currentRule = gameLogicValidation[k];
    if (
      game[currentRule[0]] === 1 &&
      game[currentRule[1]] === 1 &&
      game[currentRule[2]] === 1
    ) {
      return 1;
    } else if (
      game[currentRule[0]] === 2 &&
      game[currentRule[1]] === 2 &&
      game[currentRule[2]] === 2
    ) {
      return 2;
    }
  }
// We weten hier dat er geen winnaar is. Probeer om te zien of het spel is klaar.

  let turnCount = 0;
  for (let i = 0; i < game.length; i++) {
    if (game[i] > 0) {
      turnCount += 1;
    }
  }
  if (turnCount === 9) {
    return 0;
  } else {
    return null;
  }
}

const inputs = document.querySelectorAll("input");
let currentPlayer = 1;

function getStatusGame() {
  const board = [];
  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].value === "-") board.push(0);
    if (inputs[i].value === "X") board.push(1);
    if (inputs[i].value === "O") board.push(2);
  }
  return board;
}
function switchTurn() {

  if (currentPlayer === 1) {
    currentPlayer = 2;
  } else {
    currentPlayer = 1;
  }
  updateGame();
}

function updateGame() {
  const status = document.querySelector("#status");
  const statusGame = getStatusGame();
  const winner = validateGame(statusGame);
  if (winner != null) {
    if (winner === 0) {
      status.innerText = `Spel is afgelopen. Het is een gelijkspel!`;
    } else {
      status.innerText = `Spel is afgelopen. Winnaar is speler ${winner}!`;
    }
    disableAllInputs();
  } else {
    status.innerText = ` Huidige speler: ${currentPlayer}`;
  }
  const restartButton = document.querySelector("#restart");
  restartButton.style.display = winner == null ? "none" : "block";
}
function handleInput(event) {
  const input = event.target;
  const letter = input.value.toUpperCase();
  if (letter !== "X" && letter !== "O") {
    console.log("ongeldige invoer");
    input.value = "-";
    return;
  }
  if (letter === "X" && currentPlayer !== 1) {
    console.log("ongeldige invoer");
    input.value = "-";
    return;
  }
  if (letter === "O" && currentPlayer !== 2) {
    console.log("ongeldige invoer");
    input.value = "-";
    return;
  }
  input.value = letter;
  finishTurn(input);
}
function handleClick(event) {
  const input = event.target;
  const letter = currentPlayer === 1 ? "X" : "O";
  input.value = letter;
  finishTurn(input);
}
function handleFocus(event) {
  const input = event.target;
  input.select();
}
function handleRestartClick() {
  currentPlayer = 1;
  for (const input of inputs) {
    input.value = "-";
    input.removeAttribute("disabled");
  }
  updateGame();
}
function finishTurn(input) {
  input.setAttribute("disabled", true);
  updateGame();
  switchTurn();
}
function disableAllInputs() {
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].setAttribute("disabled", true);
  }
}
for (let i = 0; i < inputs.length; i++) {
  const input = inputs[i];
  input.addEventListener("click", handleClick);
  input.addEventListener("focus", handleFocus);
}
const restartButton = document.querySelector("#restart");
restartButton.addEventListener("click", handleRestartClick);
updateGame();
