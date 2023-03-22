var wrap = document.querySelector(".wrap");
var cards = document.querySelectorAll(".card");
var cardsDiv = document.querySelector(".cards");
var move = document.getElementById("move");
var time = document.getElementById("time");
var ngButton = document.getElementById("newGame");
var labelsDiv = document.querySelector(".labels");
var goDiv = document.querySelector(".gameOver");
var ary = [];
var min = 0, sec = 0;

function shuffle(){
  for (var a = 0; a < cards.length; a++) {
    cards[a].onclick = flip;
  }

  for (var i = 0; i < cards.length; i++) {
    var random = Math.floor(Math.random()*16);
    cardsDiv.insertBefore(cards[i],cards[random]);
  }

}

shuffle();



var newTime = setInterval(function(){
  sec++;
  if (sec == 60) {
    min++; sec = 0;
    time.innerText = min + ":0" + sec;
  }
  else if (sec<10) {
    time.innerText = min + ":0" + sec;
  }
  else{
    time.innerText = min + ":" + sec;
  }

},1000);



var counter = 0, moveC = 0, match1, match2;

function flip(){
  var x = this;
  //dogru olanlara blocked classını ekle

  if (x.classList.contains("flipped") == false) {
    x.classList.add("flipped");
    counter++;
    if (counter % 2 == 0) {
      moveC++;
      move.innerText = moveC;
      match2 = x;
      control();
    }else {
      match1 = x;
    }

  }else {
    x.classList.remove("flipped");
    counter++;
    if (counter % 2 == 0) {
      moveC++;
      move.innerText = moveC;
    }
    match1 = ""; match2 = "";
  }


  function control(){
    cardsDiv.classList.add("blocked");

    if (match1.getAttribute("data-number") == match2.getAttribute("data-number")) {
      setTimeout(function(){
        match1.classList.add("blocked");
        match2.classList.add("blocked");
        cardsDiv.classList.remove("blocked");
        lastCheck();
      },1300);
    }else {
      setTimeout(function(){
        match1.classList.remove("flipped");
        match2.classList.remove("flipped");
        cardsDiv.classList.remove("blocked");
        match1 = ""; match2 = "";
        lastCheck();
      },1300);
    }

    function lastCheck(){
      var cnt = false;
      for (var i = 0; i < cards.length; i++) {
        if (cards[i].classList.contains("flipped") == false) {
          cnt = true;
        }
      }
      if (cnt == false) {
        gameOver();
      }
    }

}



}

function gameOver(){
  labelsDiv.classList.add("hide");
  cardsDiv.classList.add("hide");
  newGame.classList.add("hide");
  goDiv.classList.remove("hide");

  goDiv.children[1].innerText = "Moves : " + move.innerText;
  goDiv.children[2].innerText = "Time : " + time.innerText;
}

function playAgain(){
  goDiv.classList.add("hide");
  labelsDiv.classList.remove("hide");
  cardsDiv.classList.remove("hide");
  newGame.classList.remove("hide");

  min = 0; sec = 0;
  moveC = 0;
  move.innerText = 0;

  for (var i = 0; i < cards.length; i++) {
    cards[i].classList.remove("flipped");
    cards[i].classList.remove("blocked");
  }
}
