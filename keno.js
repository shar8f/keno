// ======================== GAME SETTINGS HERE ========================
const betsTimer = 5 // SET THE BETS-CLOSED TIMER HERE - calculate in seconds, the time to wait before bets close.







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
  



  // ======================== FUNCTIONS AND JS BELOW ====================
  
  // ============================================== Ball Shuffling






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





