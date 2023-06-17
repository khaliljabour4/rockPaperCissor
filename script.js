
let computerMove = "";
let playerAutoMove = "";
let result = "";
let statutAutoPlaying = false;
let intervalID = "";

let score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  Lose: 0,
  Ties: 0,
}; // if the left side is falsy it will use the right side for default value

let rockButton = document.querySelector('.rock-buttons');
let paperButton = document.querySelector('.Paper-buttons');
let scissorButton = document.querySelector('.scissors-buttons');
let resetButton = document.querySelector('.reset_button');
let autoPlayButton = document.querySelector('.autoPlay_button');
document.body.addEventListener('keydown',(event) =>{
  if(event.key === 'r'){
    playerMove('rock');
  }
  else if(event.key === 'p'){
    playerMove('Paper');
  }
  else if(event.key === 's'){
    playerMove('Scissor');
  }
})


rockButton.addEventListener('click',() =>{
  playerMove('rock');
});
paperButton.addEventListener('click',() => {
  playerMove('Paper');
});
scissorButton.addEventListener('click',() => {
  playerMove('Scissor');
});
resetButton.addEventListener('click',() => {
  resetGame();
});
autoPlayButton.addEventListener('click',() => {
  autoPlay();
});

function computerPlayMove() {
  const randomNumber = Math.random();

  if (
    (randomNumber >= 0 && randomNumber <= 1 / 9) ||
    (randomNumber > 3 / 9 && randomNumber <= 4 / 9) ||
    (randomNumber > 6 / 9 && randomNumber <= 7 / 9)
  ) {
    computerMove = "rock";
  } else if (
    (randomNumber > 1 / 9 && randomNumber <= 2 / 9) ||
    (randomNumber > 4 / 9 && randomNumber <= 5 / 9) ||
    (randomNumber > 7 / 9 && randomNumber <= 8 / 9)
  ) {
    computerMove = "Paper";
  } else if (
    (randomNumber > 2 / 9 && randomNumber <= 3 / 9) ||
    (randomNumber > 5 / 9 && randomNumber <= 6 / 9) ||
    (randomNumber > 8 / 9 && randomNumber <= 1)
  ) {
    computerMove = "Scissor";
  }
}

function playerMove(playMove) {
  computerPlayMove();
  if (playMove === "rock") {
    if (computerMove === "rock") {
      result = "Tie";
    } else if (computerMove === "Paper") {
      result = "You lose";
    } else if (computerMove === "Scissor") {
      result = "You win";
    }
  } else if (playMove === "Paper") {
    if (computerMove === "rock") {
      result = "You win";
    } else if (computerMove === "Paper") {
      result = "Tie";
    } else if (computerMove === "Scissor") {
      result = "You lose";
    }
  } else if (playMove === "Scissor") {
    if (computerMove === "rock") {
      result = "You lose";
    } else if (computerMove === "Paper") {
      result = "You win";
    } else if (computerMove === "Scissor") {
      result = "Tie";
    }
  }

  if (result === "You win") {
    score.wins++;
  } else if (result === "You lose") {
    score.Lose++;
  } else if (result === "Tie") {
    score.Ties++;
  }

  document.querySelector(".etatGame").innerHTML = result;
  document.querySelector(
    ".jsMove"
  ).innerHTML = `you <img src="resources/${playMove}-emoji.png" alt="scissor img" class="jsMoveIcon"> <img src="resources/${computerMove}-emoji.png" alt="scissors img" class="jsMoveIcon">  compoter`;
  updateScore();
  localStorage.setItem("score", JSON.stringify(score));
}
function resetGame() {
  score.wins = 0;
  score.Lose = 0;
  score.Ties = 0;
  localStorage.removeItem("gameScore");
  document.querySelector(".etatGame").innerHTML = "Choose one";
  document.querySelector(".jsMove").innerHTML = null;
  updateScore();
}

function updateScore() {
  document.querySelector(
    ".gameScore"
  ).innerHTML = `Wins : ${score.wins} .loses : ${score.Lose} .Ties: ${score.Ties}`;
}


function autoPlay() {
  if (statutAutoPlaying === false) {
    intervalID = setInterval(() => {
      computerPlayMove();
      playerMove(computerMove);
      document.querySelector(".autoPlay_button").innerHTML = "Stop auto Play";
      statutAutoPlaying = true;
    }, 1000);
  } else {
    clearInterval(intervalID);
    document.querySelector(".autoPlay_button").innerHTML = "Auto Play";
    resetGame();
    statutAutoPlaying = false;
  }
}

