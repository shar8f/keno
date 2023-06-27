
    document.addEventListener("DOMContentLoaded", function() {
      var fullscreenPrompt = document.getElementById("fullscreen-prompt");
      var fullscreenButton = document.getElementById("fullscreen-button");

      function showPrompt() {
        fullscreenPrompt.style.display = "block"; // Show the fullscreen prompt
      }

      function hidePrompt() {
        fullscreenPrompt.style.display = "none"; // Hide the fullscreen prompt
      }

      // Check if browser is not in fullscreen mode and show prompt
      if (!document.fullscreenElement && !document.mozFullScreenElement &&
          !document.webkitFullscreenElement && !document.msFullscreenElement) {
        showPrompt();
      }

      // Request fullscreen when the button is clicked
      fullscreenButton.addEventListener("click", function() {
        var element = document.documentElement; // Fullscreen the whole document
        if (element.requestFullscreen) {
          element.requestFullscreen();
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen();
        } else if (element.webkitRequestFullscreen) {
          element.webkitRequestFullscreen();
        } else if (element.msRequestFullscreen) {
          element.msRequestFullscreen();
        }
        hidePrompt(); // Hide the fullscreen prompt
      });

      // Listen for fullscreenchange event to show/hide prompt
      document.addEventListener("fullscreenchange", function() {
        if (!document.fullscreenElement && !document.mozFullScreenElement &&
            !document.webkitFullscreenElement && !document.msFullscreenElement) {
          showPrompt();
        } else {
          hidePrompt();
        }
      });
    });

// ======================== GAME SETTINGS HERE ========================
const betsTimer = 1; // Set the BETS-CLOSED timer here - calculate in seconds, the time to wait before bets close.


// Provide Draw ID by getting previous drawid from localstorage and adding 1 to it.
var drawId = (parseInt(localStorage.getItem('lastGameId')) || 5000) + 1;

//input the drawID in each draw number label on the screen.
var drawCode = document.getElementsByClassName('draw-code');
Array.from(drawCode).forEach(function(place) {
  place.innerHTML = drawId;
});


// Define  the lucky balls.

// Temporary function to generate luckyballs randomly. you can change this. 
function generateRandomBalls() {
  var randomNumbers = [];

  while (randomNumbers.length < 20) {
    var randomNumber = Math.floor(Math.random() * 40) + 1;

    // Check if the generated number already exists in the array
    if (!randomNumbers.includes(randomNumber)) {
      randomNumbers.push(randomNumber);
    }
  }

  return randomNumbers;
}

const luckyBalls = generateRandomBalls();

// function to save the game results to local storage.
saveGameResult(drawId, luckyBalls);

//========================= CHECK SCREEN RESOLUTION ====================

// Fullscreen mode =========================

gsap.from("#fullscreen-button", {duration: 3, scale: 1.2, repeat: -1, ease: "bounce"});

//========================= TIMER TIMELINE =============================
const timerLine = gsap
  .timeline({ paused: true })
  .from(".timer-screen", { duration: 2, opacity: 0 })
  .from(
    ".ball-options",
    { x: "-60vw", duration: 0.5, y: 200, ease: "bounce.inout", stagger: 0.01 },
    "+=0.5"
  )
  .from(
    ".active-yellow, .active-orange",
    { scale: 1.8, duration: 0.3, stagger: 0.1, ease: "elastic" },
    "-=1"
  );

// ========================= SHUFFLE TIMELINE ===========================

const shuffleWait = betsTimer + 2; // calculate time to wait before loading shuffle screen (allow some time for "bets closed" to flash).

const shuffleLine = gsap
  .timeline({ delay: shuffleWait, paused: true })
  .call(() => {
    console.log(" Time to Shuffle!");

    document.querySelector(".timer-screen").classList.add("hide-label");
    document.querySelector(".shuffle-screen").classList.remove("hide-label");
    gsap.set("#shuffVideo", {
      transformOrigin: "top left", // Set the transform origin to the top left corner
    });

    console.log("first duration is" + timerLine.duration());
    console.log(betsTimer);
  })
  .to("#shuffVideo", 0, { opacity: 1 })
  .to("#shuffVideo", 0, { onComplete: playVideo, duration: 5 })
  .to("#shuffVideo", 1, { scale: 1.1 }, 4.5)
  .to(
    "--",
    {
      // Delay the start of the tween by 5 seconds
      onStart: () => {
        document.querySelector(".shuffle-screen").classList.add("hide-label");
        document.querySelector(".shuffle-screen").style.zIndex = "1000";
        document
          .querySelector(".selection-screen")
          .classList.remove("hide-label");
      },
    },
    "-=1"
  );

// Pause and play the video, and change the button text
function playVideo() {
  // Get the video
  var video = document.getElementById("shuffVideo");

  // Add the autoplay attribute to the video element
  video.setAttribute("autoplay", "");

  //play the video
  video.play();
}

// ======================== FUNCTIONS AND JS BELOW ====================

// ========================= HISTORY STORAGE ==========================
//save the game results in the localstorage.

function saveGameResult(gameId, luckyBalls) {
  var gameHistory = JSON.parse(localStorage.getItem('gameHistory')) || [];
  gameHistory.push({ gameId: drawId, result: luckyBalls });
  localStorage.setItem('gameHistory', JSON.stringify(gameHistory));
  // Set the lastGameId based on the newly generated gameId
  localStorage.setItem('lastGameId', gameId)
}



// ======================== HISTORY SCREEN ===========================
// display last game results from local storage.
function displayGameHistory() {
  var gameHistory = JSON.parse(localStorage.getItem('gameHistory')) || [];
  var historyTable = document.getElementById('history-table');
  
  // Clear previous content in historyTable
  historyTable.innerHTML = '';

  // Retrieve the last 10 game results from the gameHistory array
  var lastTenGames = gameHistory.slice(-10).reverse();

  // Iterate over the lastTenGames array and add each drawId and result pair to historyTable
  lastTenGames.forEach(function(game) {
    var drawId = game.gameId;
    var historyBalls = game.result;
    const numbers = historyBalls.sort((a, b) => a - b);

    // Create the container div for each game
    var gameDiv = document.createElement('div');
    gameDiv.className = 'history-set';
    gameDiv.setAttribute('draw-number', drawId);

    // Create the game ID div and append it to the gameDiv
    var gameIdDiv = document.createElement('div');
    gameIdDiv.className = 'game-id';
    gameIdDiv.textContent = drawId;
    gameDiv.appendChild(gameIdDiv);

    // Create the record numbers div and append it to the gameDiv
    var recordNumbersDiv = document.createElement('div');
    recordNumbersDiv.className = 'record-numbers';


    numbers.forEach(function(number) {
      var numberBorder = document.createElement('div');
      numberBorder.className = 'number-border';

      var numberDiv = document.createElement('div');
      numberDiv.className = 'record-number';
      numberDiv.textContent = number;

      // Attach ball colors based on ball number
      if (parseInt(number) > 40) {
        numberDiv.classList.add("orange-ball");
      } else {
        numberDiv.classList.add("yellow-ball");
      }
      numberBorder.appendChild(numberDiv);
      recordNumbersDiv.appendChild(numberBorder);
    });

    gameDiv.appendChild(recordNumbersDiv);

     
    // indicate the middle in the list of luckyballs for each game.

    // Get the number of records or balls
    var numBalls = recordNumbersDiv.children.length;

    // Calculate the index of the middle div
    var middleIndex = Math.floor((numBalls - 1) / 2);

    // Get the middle child element
    var middleBall = recordNumbersDiv.children[middleIndex];

    // Add styles to the middle child element
    middleBall.style.borderRight = "1px solid #fff";
    middleBall.style.paddingright = "10px";
    console.log(middleBall);

    // Append the gameDiv to the historyTable
    historyTable.appendChild(gameDiv);
  });

}


// Call the function to display the game history
displayGameHistory();



//--------------------------------------------------------------

// const history = document.getElementById("history-table");
// const gameId = document.createElement("div");

// //create html for game id.
// const drawTitle = document.createElement("span");
// // drawTitle.innerHTML = "DRAW";
// gameId.innerHTML = drawId;
// gameId.classList.add("game-id");

// //create a history row for current draw.
// const historyRow = document.createElement("div");
// historyRow.setAttribute("draw-number", drawId);
// historyRow.classList.add("history-set");
// history.appendChild(historyRow);


// // historyRow.appendChild(drawTitle);
// historyRow.appendChild(gameId);



// ============================================== Ball Creation

// create and select popup balls elements.
for (let i = 0; i <= 80; i++) {
  const ballContainer = document.getElementById("popupBalls");
  const ball = document.createElement("span");
  ball.className = "popupBall";
  ballContainer.appendChild(ball);
}

// get the popupballs and save in balls list.
const ballElements = document.getElementsByClassName("popupBall");
const balls = Array.from(ballElements);

//get scoreboardballs and save in scoreboard balls list.

const scoreboard = document.getElementsByClassName("scoreboard-ball");
const scoreboardBalls = Array.from(scoreboard);

scoreboardBalls.forEach((ball, index) => {
  //mark corresponding scoreboard ball.
  const ballNumber = (index + 1).toString().padStart(1, "0");
  ball.setAttribute("data-number", ballNumber);
});

//Mark each ball with a number attribute.
balls.forEach((ball, index) => {
  const number = (index + 1).toString().padStart(1, "0");
  ball.setAttribute("data-number", number);

  // assign texture to each ball according to ball number.
  const ballBgUrl = `images/balls/ball-${index + 1}.png`; // set variable for each ball imag.
  ball.style.backgroundImage = `url('${ballBgUrl}')`;
  ball.style.backgroundSize = "cover";
  ball.style.backgroundPosition = "center";
  ball.style.backgroundRepeat = "no-repeat";

  console.log("ball numbered");
});

// =========================== SELECTION TIMELINE =========================

balls.forEach((ball, index) => {
  // Mark Lucky Balls
  const ballNumber = parseInt(ball.getAttribute("data-number"));

  if (luckyBalls.includes(ballNumber)) {
    ball.classList.add("luckyBall");
    // ball.innerHTML = ballNumber;
    ball.style.textAlign = "center";
  }
});

// get all the lucked balls.
const luckedBalls = document.getElementsByClassName("luckyBall");
const popballs = Array.from(luckedBalls);
const shufflePopBalls = shuffleArray(popballs); // shuffle the balls

//function to shuffle any array
function shuffleArray(array) {
  const shuffled = array.slice(); // Create a copy of the original array
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // Generate a random index
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // Swap elements
  }
  return shuffled;
}

// start the scoreboard animation on the shuffled popball array.
const popLine = gsap.timeline(); // the number in delay here is the pause between each ball's animation.
gsap.from(".selection-screen", {
  // scale: 1.2,
  duration: 2,
  x: "-=1vh",
  y: "-=1vh",
});

shufflePopBalls.forEach((ball, index) => {
  popLine

    .to(ball, {
      delay: 1,
      x: 0,
      y: "-70vh",
      duration: 0.1,
    })
    .to(ball, {
      scale: 2,
      duration: 0.01,
      ease: "bounce",
    })

    .to(ball, {
      rotation: gsap.utils.random(30, -30),
      ease: "bounce",
      onComplete: function () {
        pushToBoard(ball);
        playSound();
      },
    })

    .to(ball, {
      delay: 2,
      scale: 1,
      duration: 0.2,
    })

    .to(
      ball,
      {
        x: 0,
        y: "-150vh",
        duration: 0.5,
      },
      "-=0.15"
    );

  if (index === shufflePopBalls.length - 1) {
    popLine.to("--", {
      duration: 2,
      delay: 5, // time delay before displaying the history screen.
      onComplete: function () {
        // load history screen.
        document.querySelector(".selection-screen").classList.add("hide-label");
        document
          .querySelector(".history-screen")
          .classList.remove("hide-label");
        console.log("now we are done. go to history");
      },
    });

    popLine.to(".more-events",{

    duration: 5,
    delay: 2,
    onComplete: function () {
      // load history screen.
      document.querySelector(".history-screen").classList.add("hide-label");
      document
        .querySelector(".more-events")
        .classList.remove("hide-label");
      
    },



    })
  }
});



//display ball on scoreboard.

//initiate heads and tails variables outside function so that the values are updated on each iteration of the function.
var heads = 0;
var tails = 0;

function pushToBoard(ball) {
  //get the ball data-number attribute.
  const scoreNumber = parseInt(ball.getAttribute("data-number")) - 1;

  //identify the ball number on the scoreboard
  const scoreboardBall = scoreboardBalls[scoreNumber];

  //get heads or tails tags.
  const headsLabels = document.getElementsByClassName("heads-label");
  const tailsLabels = document.getElementsByClassName("tails-label");
  const evensLabels = document.getElementsByClassName("evens-label");

  // animate the respective scoreboard number.
  if (scoreNumber < 40) {
    scoreboardBall.classList.add("active-yellow");
    heads += 1;
  } else {
    scoreboardBall.classList.add("active-orange");
    tails += 1;
  }
  gsap.from(scoreboardBall, { scale: 1.8, duration: 0.3, ease: "elastic" }); //animate the scores

  // Check the counts and show the corresponding labels
  if (heads > tails) {
    // Show the heads labels
    for (let i = 0; i < 2; i++) {
      headsLabels[i].classList.remove("hide-label");
      tailsLabels[i].classList.add("hide-label");
      evensLabels[i].classList.add("hide-label");
    }
  } else if (tails > heads) {
    // Show the tails labels
    for (let i = 0; i < 2; i++) {
      tailsLabels[i].classList.remove("hide-label");
      evensLabels[i].classList.add("hide-label");
      headsLabels[i].classList.add("hide-label");
    }
  } else {
    // Show the evens labels
    for (let i = 0; i < 2; i++) {
      evensLabels[i].classList.remove("hide-label");
      headsLabels[i].classList.add("hide-label");
      tailsLabels[i].classList.add("hide-label");
    }
  }

  console.log("ball pushed to board!");
}

function playSound() {
  const audio = document.getElementById("sound");
  audio.play().catch((error) => {
    console.log("Failed to play audio:", error);
  });
}

// ===============================================Countdown Timer.

const timeCounter = document.getElementById("timer-clock");
const timerLabels = document.getElementById("timers"); // Min and Sec labels below timer
let countdown = betsTimer;

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
    .toString()
    .padStart(2, "0")}`;
}

countdown = countdown + 1; // add one so that the reduction on screen starts from intended time rather than one second less.
function updateTimer() {
  if (countdown > 0) {
    countdown--;
    timeCounter.textContent = formatTime(countdown);
    if (countdown < 10) {
      timeCounter.classList.add("blink"); // Add the CSS class for blinking effect
    }
  } else {
    // Additional actions to take when the countdown reaches 0
    timeCounter.textContent = "BETS CLOSED!";
    timeCounter.classList.add("bets-closed");
    timerLabels.style.display = "none";
    timerLine.kill();
  }
}

setTimeout(() => {
  updateTimer();
  setInterval(updateTimer, 1000); // Update the timer every second after the initial delay
}, 3000); // wait in milliseconds before timer starts.

// ================================================= instructions animation
const instructionItems = Array.from(
  document.querySelectorAll(".instruction-item")
);
let currentInstructionIndex = 0;

function displayCurrentInstruction() {
  instructionItems.forEach((item, index) => {
    if (index === currentInstructionIndex) {
      item.style.display = "block"; // Show the current instruction item
    } else {
      item.style.display = "none"; // Hide the other instruction items
    }
  });
}

function switchToNextInstruction() {
  currentInstructionIndex++;
  if (currentInstructionIndex >= instructionItems.length) {
    currentInstructionIndex = 0;
  }
  displayCurrentInstruction();
}

// displayCurrentInstruction();
setInterval(switchToNextInstruction, 3000);

// ========================= MAIN TIMELINE =============================
const mainTimeline = gsap
  .timeline()
  .add(timerLine.play())
  .add(shuffleLine.play())
  .add(popLine.play());

mainTimeline.play();
