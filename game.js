
var kweenPics = new Array("ad1.png", "ad2.png", "al1.png", "al2.png", "ar1.png", "ar2.png", "be1.png", "be2.png", "bi1.png", "bi2.png", "de1.png", "de2.png", "du1.png", "du2.png", "ga1.png", "ga2.png", "la1.png", "la2.png", "li1.png", "li2.png", "ri1.png", "ri2.png", "ro1.png", "ro2.png");


function startGame() {
    for (let i = 0; i < 24; i++) {
        var container = document.getElementById('cardContainer');
        let newCard = document.createElement('div');
        newCard.classList.add('card');
        let backFace = document.createElement('div');
        backFace.classList.add('back');
        backFace.innerHTML = '<img src="purple-card.png" class="purpleCard"/>';
        let frontFace = document.createElement('div');
        frontFace.classList.add('front');
        
        choosePic(frontFace, kweenPics);

        newCard.appendChild(backFace);
        newCard.appendChild(frontFace);
        container.appendChild(newCard);

        newCard.addEventListener('click', function () {
            flipCard(newCard);
        })
    }
    showBestScore();
}
function choosePic(div, arr) {
    let idx = Math.floor(Math.random() * arr.length)
    var pic = document.createElement('img');
    pic.src = arr[idx];
    pic.classList.add('kweenPic');
    arr.splice(idx, 1);
    div.appendChild(pic);
}

let flipped = false;
let card1, card2, firstCard1, firstCard2, secondCard1, secondCard2

function flipCard(card) {
    var pic = card.childNodes[1].childNodes[0].src
    console.log(pic);
    console.log(pic[46]);
    console.log(pic[47]);

    if (!card.classList.contains('matched') && !card.classList.contains('first')) {
        addCount();

        card.classList.add('clicked');

        if (!flipped) {
            flipped = true;
            firstCard1 = pic[46];
            firstCard2 = pic[47];
            card1 = card;
            card1.classList.add('first');

        } else {
            flipped = false;
            secondCard1 = pic[46];
            secondCard2 = pic[47];
            card2 = card;
            card1.classList.remove('first');

            if (firstCard1 == secondCard1 && firstCard2 == secondCard2) {
                card1.classList.add('matched');
                card2.classList.add('matched');
            } else {
                setTimeout(function() {
                card1.classList.remove('clicked');
                card2.classList.remove('clicked');
                }, 1000);
            }
        }
        
    }
    finish();
}
var count = 1
function addCount() {
    let newCount = count++;
    document.getElementById('count').innerHTML = newCount;
  
}

function finish() {
    var cards = document.getElementById('cardContainer').childNodes;
    for (let i = 1; i < 25; i++) {
        if (!(cards[i].classList.contains('matched'))) {
            return;
        }
    }
    finished();
}

function finished() {
    var body = document.getElementsByClassName('bg')[0];
    let finished = document.createElement('div');
    finished.classList.add('finished');
    finished.innerHTML = 'Yaaas Kween!';
    body.appendChild(finished);

    isBestScore();
}

function isBestScore() {
    if (count < localStorage.getItem('bestScore') || localStorage.getItem('bestScore') == null) {
        let score = document.getElementById('bestScore');
        score.innerHTML = 'Best Score = ' + (count-1);
        localStorage.setItem('bestScore', count);
    }
}

function showBestScore() {
    if (localStorage.getItem('bestScore') == null) {
        let score = document.getElementById('bestScore');
        score.innerHTML = 'Best Score = --';
    } else {
        let score = document.getElementById('bestScore');
        score.innerHTML = 'Best Score = ' + (localStorage.getItem('bestScore')-1); 
    }
}