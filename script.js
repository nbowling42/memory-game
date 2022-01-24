const gameContainer = document.getElementById("game");
const gameBoard = document.querySelector('#game-board');
const startMenu = document.querySelector('#start-menu');
const finishMenu = document.querySelector('#finish-menu');
const highScore = document.querySelectorAll('.high-score');
const finishText = document.querySelector('.finish-text');
const scoreCounter = document.querySelector('.score-counter');
const easyBtn = document.querySelectorAll('.easy');
const mediumBtn = document.querySelectorAll('.medium');
const hardBtn = document.querySelectorAll('.hard');


// Start menu
// Hide gameboard before start
gameBoard.classList.add('remove');

// Buttons to select game difficulty
easyBtn[0].addEventListener('click', function(e) {
  gameBoard.classList.remove('remove');
  startMenu.classList.add('remove');
  startGame(easy);
})
mediumBtn[0].addEventListener('click', function(e) {
  gameBoard.classList.remove('remove');
  startMenu.classList.add('remove');
  startGame(medium);
})
hardBtn[0].addEventListener('click', function(e) {
  gameBoard.classList.remove('remove');
  startMenu.classList.add('remove');
  startGame(hard);
})

// Checks if games has been played before and sets high score to 0 if not
if(!localStorage.getItem('score')) {
  localStorage.setItem('score', '0');
}

// Game over menu buttons to play again 
easyBtn[1].addEventListener('click', function(e) {
  gameBoard.classList.remove('remove');
  finishMenu.classList.add('remove');
  startGame(easy);
})
mediumBtn[1].addEventListener('click', function(e) {
  gameBoard.classList.remove('remove');
  finishMenu.classList.add('remove');
  startGame(medium);
})
hardBtn[1].addEventListener('click', function(e) {
  gameBoard.classList.remove('remove');
  finishMenu.classList.add('remove');
  startGame(hard);
})

// difficulty levels
const easy = [
  "memory_game_pics/cincinnati.jpg",
  "memory_game_pics/colts.jpg",
  "memory_game_pics/earth.jpg",
  "memory_game_pics/hawaii.jpg",
  "memory_game_pics/cincinnati.jpg",
  "memory_game_pics/colts.jpg",
  "memory_game_pics/earth.jpg",
  "memory_game_pics/hawaii.jpg"
]
const medium = [
  "memory_game_pics/cincinnati.jpg",
  "memory_game_pics/colts.jpg",
  "memory_game_pics/earth.jpg",
  "memory_game_pics/hawaii.jpg",
  "memory_game_pics/rocket_2.jpg",
  "memory_game_pics/rocket.jpg",
  "memory_game_pics/cincinnati.jpg",
  "memory_game_pics/colts.jpg",
  "memory_game_pics/earth.jpg",
  "memory_game_pics/hawaii.jpg",
  "memory_game_pics/rocket_2.jpg",
  "memory_game_pics/rocket.jpg"
];

const hard = [
  "memory_game_pics/cincinnati.jpg",
  "memory_game_pics/colts.jpg",
  "memory_game_pics/earth.jpg",
  "memory_game_pics/hawaii.jpg",
  "memory_game_pics/rocket_2.jpg",
  "memory_game_pics/rocket.jpg",
  "memory_game_pics/tesla.jpg",
  "memory_game_pics/uk.jpg",
  "memory_game_pics/cincinnati.jpg",
  "memory_game_pics/colts.jpg",
  "memory_game_pics/earth.jpg",
  "memory_game_pics/hawaii.jpg",
  "memory_game_pics/rocket_2.jpg",
  "memory_game_pics/rocket.jpg",
  "memory_game_pics/tesla.jpg",
  "memory_game_pics/uk.jpg"
]
// Add high score to page on load up 
highScore[0].innerText = `High Score: ${localStorage.getItem('score')}`;

// Function to start the game/ game logic
function startGame(difficulty){
  // Different variables for functions/creating the divs
  let opened = [];
  let shuffledDivs = shuffle(difficulty);
  let lockBoard = false;
  let matchedCards = [];
  let score = 0;

  createDivsForColors(shuffledDivs);

  // Adds score counter to page on start of game
  scoreCounter.innerText = `Score: ${score}`;

  // Keep track of score/function to set the high score
  gameContainer.addEventListener('click', function() {
    score += 1;
  })

  function setHighScore() {
    let newHighScore = JSON.stringify(score);
    localStorage.setItem('score', newHighScore);
    highScore[0].innerText = `High Score: ${localStorage.getItem('score')}`;
    highScore[1].innerText = `High Score: ${localStorage.getItem('score')}`;
  }

  // Function to clear the board
  function clear(board) {
    while(board.firstChild)
      board.removeChild(board.firstChild)
  }

  // Shuffle cards
  function shuffle(array) {
    let counter = array.length;

    while (counter > 0) {
      let index = Math.floor(Math.random() * counter);
      counter--;
      let temp = array[counter];
      array[counter] = array[index];
      array[index] = temp;
    }

    return array;
  }

  // Function for creating divs for shuffled items
  function createDivsForColors(divArray) {
    for (let div of divArray) {
      const newDiv = document.createElement("div");
      newDiv.classList.add(div);
      newDiv.addEventListener("click", handleCardClick);
      gameContainer.append(newDiv);
    }
  }

  // Handle what happens when you click on a card
  function handleCardClick(event) {
    scoreCounter.innerText = `Score: ${score}`;
    if(!lockBoard)
      openCard();
    if(opened.length === 2){
      lockBoard = true;
      checkCards(opened);
    }
  }

  // Reveal the card
  function openCard() {
    const guess = event.target;
    let backgroundImage = `url(${guess.className})`
    guess.style.backgroundImage = backgroundImage;
    if(!guess.classList.contains('selected')) {
      guess.classList.add('selected');
      opened.push(guess);
    }
  }

  // Compare opened cards for a match/check for game over and clear board
  function checkCards(list) {
    if(list[0].className === list[1].className) {
      // If cards match add to matched card list
      matchedCards.push(list[0], list[1]);
      // If all cards are matched clear the game board, check for high score, and bring up finish menu
      if(matchedCards.length === difficulty.length) {
        gameBoard.classList.add('remove');
        finishText.innerText = `Score: ${score}`;
        highScore[1].innerText = `High Score: ${localStorage.getItem('score')}`;
        finishMenu.classList.remove('remove');
        clear(gameContainer);

        if(JSON.parse(localStorage.getItem('score')) === 0) {
          setHighScore();
        }else if(score < JSON.parse(localStorage.getItem('score'))) {
          setHighScore();
        }
      }
      lockBoard = false;
    } else {
      setTimeout(function() {
        for(let li of list) {
          li.style.backgroundImage = '';
          li.classList.remove('selected');
          lockBoard = false;
        }
      }, 1500)
    }
    opened = [];
  }
}