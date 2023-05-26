const cards = document.querySelectorAll(".matchCard");
let hasFlippedCard = false;
let firstCard;
let secondCard;
let lockBoard = false;

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;
  this.classList.toggle("flip");
  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }
  secondCard = this;

  checkForMatch();
}

function checkForMatch() {
  if (firstCard.dataset.selector === secondCard.dataset.selector) {
    disableCards();
    return;
  }

  unflipCards();
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  resetBoard();
}

function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

cards.forEach((card) => card.addEventListener("click", flipCard));

function shuffle() {
  cards.forEach((card) => {
    let ramdomPos = Math.floor(Math.random() * 12);
    card.style.order = ramdomPos;
  });
}

document.getElementById("start").addEventListener("click", () => {
  if (totalSeconds === 0) {
    shuffle();
    setInterval(setTime, 1000);
  } else {
    return;
  }
});

document.getElementById("reset").addEventListener("click", () => {
  document.querySelectorAll(".matchCard").forEach((card) => {
    card.classList.remove("flip");
  });
  shuffle();
  resetBoard();
  cards.forEach((card) => card.addEventListener("click", flipCard));
  totalSeconds = 0;
});

var minutesLabel = document.getElementById("minutes");
var secondsLabel = document.getElementById("seconds");
var totalSeconds = 0;

function setTime() {
  ++totalSeconds;
  secondsLabel.innerHTML = pad(totalSeconds % 60);
  minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
}

function pad(val) {
  var valString = val + "";
  if (valString.length < 2) {
    return "0" + valString;
  } else {
    return valString;
  }
}
