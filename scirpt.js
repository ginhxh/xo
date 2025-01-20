let choix = ["rock", "peper", "sesier"];
const choixx = document.querySelectorAll("button");
let computer = document.querySelector("h2");
const winer = document.querySelector("h1");
const spnhymn = document.querySelector(".hymn");
const spncomp = document.querySelector(".comp");
let scrhym = 0;
let scrcom = 0;
choixx.forEach((choi) => {
  choi.addEventListener("click", () => {
    let coChoix = Math.floor(Math.random() * 3);

    let com = (computer.textContent = choix[coChoix]);
    let choic = choi.textContent;
    whoWinn(com, choic, winer);

    spncomp.textContent = scrcom;
    spnhymn.textContent = scrhym;
  });
});

function whoWinn(computer, you, h1) {
  if (computer === "rock" && you === "peper") {
    h1.textContent = `you choose ${you} and computer choose ${computer} you win`;
    scrhym++;
  } else if (computer === "peper" && you === "rock") {
    h1.textContent = `you choose ${you} and computer choose ${computer} you loose`;
    scrcom++;
  } else if (computer === "sesier" && you === "peper") {
    h1.textContent = `you choose ${you} and computer choose ${computer} you lose`;
    scrcom++;
  } else if (computer === "peper" && you === "sesier") {
    h1.textContent = `you choose ${you} and computer choose ${computer} you win`;
    scrhym++;
  } else if (computer === "rock" && you === "sesier") {
    h1.textContent = `you choose ${you} and computer choose ${computer} you lose`;
    scrcom++;
  } else if (computer === "sesier" && you === "rock") {
    h1.textContent = `you choose ${you} and computer choose ${computer} you win`;
    scrhym++;
  } else {
    h1.textContent = `you choose ${you} and computer choose ${computer} its drow`;
  }
}
