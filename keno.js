// ======================== GAME SETTINGS HERE ========================
const betsTimer = 5 // SET THE BETS-CLOSED TIMER HERE - calculate in seconds, the time to wait before bets close.

    //// Define  the lucky balls.
    const luckyBalls = [15, 22, 2, 24, 12, 66, 77, 48, 33, 49, 50];





//========================= TIMER TIMELINE =============================
const timerLine = gsap.timeline({paused: true})
  .from('.timer-screen', { duration: 2, opacity: 0 })
  .from('.ball-options', { x: '-60vw', duration: 0.5, y: 200, ease: 'bounce.inout', stagger: 0.01 }, "+=0.5")
  .from('.active-yellow, .active-orange', { scale: 1.8, duration: 0.3, stagger: 0.1, ease: 'elastic' }, "-=1")



 
  

// ========================= SHUFFLE TIMELINE ===========================


const shuffleWait = betsTimer + 2; // calculate time to wait before loading shuffle screen (allow some time for "bets closed" to flash).

const shuffleLine = gsap.timeline({delay: shuffleWait, paused: true})
  .call(() => {
    console.log(" Time to Shuffle!");
    
    
    document.querySelector('.timer-screen').classList.add('hide-label');
    document.querySelector('.shuffle-screen').classList.remove('hide-label');

    console.log("first duration is" + timerLine.duration());
    console.log(betsTimer);
  })
  .to("#shuffVideo", 0, {opacity: 1 })
  .to("#shuffVideo", 0, { onComplete: playVideo });

  // Pause and play the video, and change the button text
  function playVideo() {
    // Get the video
    var video = document.getElementById("shuffVideo");
    
    // Add the autoplay attribute to the video element
    video.setAttribute("autoplay", "");
  
    //play the video
    video.play();
    }
  


// =========================== SELECTION TIMELINE =========================

const selectLine = gsap.timeline({delay: 0, paused: false})
    .from(".scoreboard-ball", {opacity: 0}, 3);

console.log("selection balls loaded");















  // ======================== FUNCTIONS AND JS BELOW ====================
  
  // ============================================== Ball Selection

// create and select popup balls elements.
for (let i = 0; i <= 80; i++ ){
  const ballContainer = document.getElementById ("popupBalls");
  const ball = document.createElement('span');
  ball.className = 'popupBall';
  ballContainer.appendChild(ball);
}


// get the popupballs and save in balls list.
const ballElements = document.getElementsByClassName('popupBall');
const balls = Array.from(ballElements);

//Mark each ball with a number attribute.
balls.forEach((ball, index) => {
  const number = (index + 1).toString().padStart(1, '0');
  ball.setAttribute('data-number', number);

  // assign texture to each ball according to ball number.
  const ballBgUrl = `images/balls/ball-${index+1}.png`; // set variable for each ball imag.
  ball.style.backgroundImage = `url('${ballBgUrl}')`; 
  ball.style.backgroundSize = "cover";
  ball.style.backgroundPosition = "center";
  ball.style.backgroundRepeat = "no-repeat";

  console.log("ball numbered");
})




  // ===============================================Countdown Timer.

const timeCounter = document.getElementById('timer-clock');
const timerLabels = document.getElementById('timers'); // Min and Sec labels below timer
let countdown = betsTimer; 

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}

countdown = countdown + 1; // add one so that the reduction on screen starts from intented time rather than one second less.
function updateTimer() {
  if (countdown > 0) {
    countdown--;
    timeCounter.textContent = formatTime(countdown);
    if (countdown < 10) {
      timeCounter.classList.add('blink'); // Add the CSS class for blinking effect
    }
  } else {
    // Additional actions to take when the countdown reaches 0
    timeCounter.textContent = "BETS CLOSED!";
    timeCounter.classList.add('bets-closed');
    timerLabels.style.display = "none";
    timerLine.kill();
  }
}

setTimeout(() => {
  updateTimer();
  setInterval(updateTimer, 1000); // Update the timer every second after the initial delay
}, 3000); // wait in milliseconds before timer starts.



// ================================================= instructions animation
const instructionItems = Array.from(document.querySelectorAll('.instruction-item'));
let currentInstructionIndex = 0;

function displayCurrentInstruction() {
  instructionItems.forEach((item, index) => {
    if (index === currentInstructionIndex) {
      item.style.display = 'block'; // Show the current instruction item
    } else {
      item.style.display = 'none'; // Hide the other instruction items
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
const mainTimeline = gsap.timeline()
.add(timerLine.play())
.add(shuffleLine.play())

mainTimeline.play();





