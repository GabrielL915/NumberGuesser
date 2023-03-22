const min = 1;
const max = 10;
let winningNum = Math.floor(Math.random() * (max - min + 1)) + min;
let guessesLeft = 3;

const game = document.querySelector("#game");
const minNum = document.querySelector(".min-num");
const maxNum = document.querySelector(".max-num");
const message = document.querySelector(".message");
const form = document.querySelector("form");
const input = document.querySelector("#guess-input");
const button = document.querySelector("#guess-button");

minNum.textContent = min;
maxNum.textContent = max;

form.addEventListener("submit", (event) => {
  event.preventDefault();
  guessesLeft--;

  let guessInput = parseInt(input.value);
  if (isNaN(guessInput) || guessInput < min || guessInput > max) {
    displayMessage(`Please enter a number between ${min} and ${max}`, "red");
  } else if (guessInput === winningNum) {
    gameOver(true, `Number ${guessInput} is correct, YOU WIN!!!`, "green");
  } else if (guessesLeft === 0) {
    gameOver(false, `${guessesLeft} guesses left, GAME OVER!!`, "red");
  } else {
    displayMessage(
      `${guessInput} is not the winning number: more ${guessesLeft} guesses left`,
      "blue"
    );
  }
});

function displayMessage(msg, color) {
  message.textContent = msg;
  message.style.color = color;
}

function gameOver(isWon, msg, color) {
  button.disabled = true;
  result = document.createElement("h3");
  result.textContent = msg;
  result.style.color = color;
  game.appendChild(result);
  message.style.display = "none";

  const playAgain = document.createElement("button");
  playAgain.textContent = "Play Again";
  playAgain.className = "play-again";
  game.appendChild(playAgain);
  game.addEventListener("click", playAgainClick);
}
function playAgainClick(event) {
  if (event.target.classList.contains("play-again")) {
    resetGame();
  }
}

function resetGame() {
  guessesLeft = 3;
  button.disabled = false;
  result.remove();
  document.querySelector(".play-again").remove();
  message.style.display = "block";
  displayMessage("", "");
  input.value = "";
}
