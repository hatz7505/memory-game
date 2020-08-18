var kweenPics = new Array(
  "./kween-images/ad1.png",
  "./kween-images/ad2.png",
  "./kween-images/al1.png",
  "./kween-images/al2.png",
  "./kween-images/ar1.png",
  "./kween-images/ar2.png",
  "./kween-images/be1.png",
  "./kween-images/be2.png",
  "./kween-images/bi1.png",
  "./kween-images/bi2.png",
  "./kween-images/de1.png",
  "./kween-images/de2.png",
  "./kween-images/du1.png",
  "./kween-images/du2.png",
  "./kween-images/ga1.png",
  "./kween-images/ga2.png",
  "./kween-images/la1.png",
  "./kween-images/la2.png",
  "./kween-images/li1.png",
  "./kween-images/li2.png",
  "./kween-images/ri1.png",
  "./kween-images/ri2.png",
  "./kween-images/ro1.png",
  "./kween-images/ro2.png"
);

function startGame() {
  for (let i = 0; i < 24; i++) {
    var container = $("#cardContainer");
    let newCard = document.createElement("div");
    newCard.classList.add("card");
    let backFace = document.createElement("div");
    backFace.classList.add("back");
    backFace.innerHTML = '<img src="purple-card.png" class="purpleCard"/>';
    let frontFace = document.createElement("div");
    frontFace.classList.add("front");

    choosePic(frontFace, kweenPics);

    newCard.appendChild(backFace);
    newCard.appendChild(frontFace);
    container.append(newCard);

    newCard.addEventListener("click", function () {
      flipCard(newCard);
    });
  }
  showBestScore();
}
function choosePic(div, arr) {
  let idx = Math.floor(Math.random() * arr.length);
  var pic = document.createElement("img");
  pic.src = arr[idx];
  pic.classList.add("kweenPic");
  arr.splice(idx, 1);
  div.appendChild(pic);
}

let flipped = false;
let card1,
  card2,
  firstCardFirstLetter,
  firstCardSecondLetter,
  secondCardFirstLetter,
  secondCardSecondLetter;

function flipCard(card) {
  var imagePath = card.childNodes[1].childNodes[0].src;

  if (
    !card.classList.contains("matched") &&
    !card.classList.contains("first")
  ) {
    addCount();

    card.classList.add("clicked");

    if (!flipped) {
      flipped = true;
      firstCardFirstLetter = imagePath[52];
      firstCardSecondLetter = imagePath[53];
      card1 = card;
      card1.classList.add("first");
    } else {
      flipped = false;
      secondCardFirstLetter = imagePath[52];
      secondCardSecondLetter = imagePath[53];
      card2 = card;
      card1.classList.remove("first");
      if (
        firstCardFirstLetter == secondCardFirstLetter &&
        firstCardSecondLetter == secondCardSecondLetter
      ) {
        card1.classList.add("matched");
        card2.classList.add("matched");
      } else {
        setTimeout(function () {
          card1.classList.remove("clicked");
          card2.classList.remove("clicked");
        }, 1000);
      }
    }
  }
  isFinished();
}
var count = 1;
function addCount() {
  let newCount = count++;
  document.getElementById("count").innerHTML = newCount;
}

function isFinished() {
  var cards = document.getElementById("cardContainer").childNodes;
  for (let i = 0; i < 24; i++) {
    if (!cards[i].classList.contains("matched")) {
      return;
    }
  }
  finished();
}

function finished() {
  var body = document.getElementsByClassName("bg")[0];
  let finished = document.createElement("div");
  finished.classList.add("finished");
  finished.innerHTML = "Yaaas Kween!";
  body.appendChild(finished);

  isBestScore();
}

function isBestScore() {
  if (
    count < localStorage.getItem("bestScore") ||
    localStorage.getItem("bestScore") == null
  ) {
    let score = document.getElementById("bestScore");
    score.innerHTML = "Best Score = " + (count - 1);
    localStorage.setItem("bestScore", count);
  }
}

function showBestScore() {
  if (localStorage.getItem("bestScore") == null) {
    let score = document.getElementById("bestScore");
    score.innerHTML = "Best Score = --";
  } else {
    let score = document.getElementById("bestScore");
    score.innerHTML = "Best Score = " + (localStorage.getItem("bestScore") - 1);
  }
}
