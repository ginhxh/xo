const rock = "img/rock.jpg";
const paper = "img/pip.webp";
const sisser = "img/scissor.webp";

const choiss = document.querySelectorAll(".dd");
const comppp = document.querySelector(".comppp");
const rockk = document.querySelector(".rock");
const scissor = document.querySelector(".sser");
const pip = document.querySelector(".paper");
let yourscor = document.querySelector(".you");
let computerScore = document.querySelector(".computer");
const desicion = document.querySelector(".desicion");
const RPS = [rock, paper, sisser];
let scor_computer = 0;
let scor_user = 0;
let gameActive = true;

const rndomComputerChose = (arr) => {
  let rndom = Math.floor(Math.random() * 3);
  let choix = arr[rndom];
  return (comppp.src = choix);
  console.log(choix);
};
choiss.forEach((choic) => {
  choic.addEventListener("click", () => {
    if (gameActive) {
      whoWin(choic.src, rndomComputerChose(RPS));
    }
  });
});

const whoWin = (userchose, computerchose) => {
  if (
    userchose.endsWith("rock.jpg") &&
    computerchose.endsWith("scissor.webp")
  ) {
    desicion.textContent = "You win rock defeat scissor";
    scor_user++;
  } else if (
    userchose.endsWith("rock.jpg") &&
    computerchose.endsWith("pip.webp")
  ) {
    desicion.textContent = "You lose paper defeat rock";
    scor_computer++;
  } else if (
    userchose.endsWith("pip.webp") &&
    computerchose.endsWith("scissor.webp")
  ) {
    desicion.textContent = "You lose scissor defeat paper";
    scor_computer++;
  } else if (
    userchose.endsWith("pip.webp") &&
    computerchose.endsWith("rock.jpg")
  ) {
    desicion.textContent = "You win paper defeat rock";
    scor_user++;
  } else if (
    userchose.endsWith("scissor.webp") &&
    computerchose.endsWith("rock.jpg")
  ) {
    desicion.textContent = "You lose rock defeat scissor";
    scor_computer++;
  } else if (
    userchose.endsWith("scissor.webp") &&
    computerchose.endsWith("pip.webp")
  ) {
    desicion.textContent = "You win scissor defeat paper";
    scor_user++;
  } else {
    desicion.textContent = "its tea";
  }
  yourscor.textContent = scor_user;
  computerScore.textContent = scor_computer;
  finalWinner(scor_user, scor_computer);
};

const finalWinner = (scor1, scor2) => {
  if (scor1 === 5) {
    desicion.textContent = "You are the Winner! Congratulations!";
    endGame();
  } else if (scor2 === 5) {
    desicion.textContent = "Sorry, the Computer Wins. Try Again!";
    endGame();
  }
};

const endGame = () => {
  gameActive = false;
  choiss.forEach((choic) => {
    choic.classList.add("disabled");
  });
  comppp.classList.add("disabled");
};

const resetGame = () => {
  gameActive = true;
  choiss.forEach((choic) => {
    choic.classList.remove("disabled");
  });
  comppp.classList.remove("disabled");
  scor_computer = 0;
  scor_user = 0;
  yourscor.textContent = scor_user;
  computerScore.textContent = scor_computer;
};
document.querySelector(".btn").addEventListener("click", () => resetGame());
