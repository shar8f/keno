// ======================== GAME SETTINGS HERE ========================
const betsTimer = 5 // SET THE BETS-CLOSED TIMER HERE - calculate in seconds, the time to wait before bets close.







//========================= TIMER TIMELINE =============================
const timerLine = gsap.timeline({paused: true})
  .from('.timer-screen', { duration: 2, opacity: 0 })
  .from('.ball-options', { x: '-60vw', duration: 0.5, y: 200, ease: 'bounce.inout', stagger: 0.01 }, "+=0.5")
  .from('.active-yellow, .active-orange', { scale: 1.8, duration: 0.3, stagger: 0.1, ease: 'elastic' }, "-=1")
  .call(() => {
    
    delay = initDelay;

    setTimeout(() => {
      document.querySelector('.timer-screen').classList.add('hide-label');
      document.querySelector('.shuffle-screen').classList.remove('hide-label');
    }, delay-5000);

  })
  .to({}, {
    delay: 3,
    onComplete: function() {
    shuffleLine.play();
  }})
 
  console.log("first duration is" + timerLine.duration());
  console.log(betsTimer);

  const initDelay = (timerLine.duration() + betsTimer) * 1000; // Calculate the delay in milliseconds

// ========================= SHUFFLE TIMELINE ===========================


const shuffleLineA = gsap.timeline({paused: true})
.to('.ball', {
  x: () => Math.random() > 0.5 ? Math.random() * -800 : Math.random() * 800,
  y: () => Math.random() * -800,
  repeat: -1,
  // stagger: { each: 0.2, from: 'random' },
  duration: 0.1,
  yoyo: false,
  ease: 'power1.out'
})

.to('.ball', {
  x: () => Math.random() > 0.5 ? Math.random() * -800 : Math.random() * 800,
  y: () => Math.random() * -700,
  repeat: 1,
  // stagger: { each: 0.2, from: 'random' },
  duration: 0.5,
  yoyo:false,
  ease: 'power1.out'
})

.to('.ball', {
  x: () => Math.random() > 0.5 ? Math.random() * -600 : Math.random() * 800,
  y: () => Math.random() * -700,
  repeat: -1,
  // stagger: { each: 0.2, from: 'random' },
  duration: 0.2,
  yoyo: false,
  ease: 'power1.out'
})

.to('.ball', {
  x: () => Math.random() > 0.5 ? Math.random() * -500 : Math.random() * 800,
  y: () => Math.random() * -800,
  repeat: -1,
  // stagger: { each: 0.2, from: 'random' },
  duration: 0.05,
  yoyo: false,
  ease: 'power1.out'
})

.to('.ball', {
  x: () => Math.random() > 0.5 ? Math.random() * -500 : Math.random() * 800,
  y: () => Math.random() * -800,
  repeat: -1,
  // stagger: { each: 0.2, from: 'random' },
  duration: 0.4,
  yoyo: false,
  ease: 'power1.out'
}, '-=0.5')


const shuffleLineB = gsap.timeline({paused:true})
  .to('.ball', {
    x: () => Math.random() > 0.5 ? Math.random() * -500 : Math.random() * 800,
    y: () => Math.random() * -800,
    repeat: -1,
    // stagger: { each: 0.2, from: 'random' },
    duration: 0.4,
    yoyo: false,
    ease: 'power1.out'
  }, '-=1')


  .to('.ball', {
    x: () => Math.random() > 0.5 ? Math.random() * -500 : Math.random() * 500,
    y: () => Math.random() * -600,
    repeat: -1,
    // stagger: { each: 0.2, from: 'random' },
    duration: 0.4,
    yoyo: false,
    ease: 'power1.out'
  }, '-=0.5')


const shuffleLine = gsap.timeline({paused: true})
  .add(shuffleLineA.play())
  .add(shuffleLineB.play())




  // ======================== FUNCTIONS AND JS BELOW ====================
  
  // ============================================== Ball Shuffling

// function ballShuffling() {
//   // Define the container and ball elements
// var container = document.getElementById("old-div");
// var balls = document.getElementsByClassName("ball");

// // Randomize the splash-out position and rotation of the balls
// function splashOutBalls() {
//   for (var i = 0; i < balls.length; i++) {
//     var ball = balls[i];
//     var radius = container.offsetWidth / 2; // Assuming the container is a perfect circle

//     // Calculate random splash-out distance and rotation
//     var splashOutDistance = Math.random() * radius * 2; // Random distance within the container circle
//     var splashOutAngle = Math.random() * 2 * Math.PI;
//     var splashOutX = splashOutDistance * Math.cos(splashOutAngle);
//     var splashOutY = splashOutDistance * Math.sin(splashOutAngle);
//     var rotation = Math.random() * 360;

//     // Apply splash-out position and rotation relative to the current position
//     gsap.set(ball, { x: "+=" + splashOutX, y: "+=" + splashOutY, rotation: rotation });
//   }
// }

// // Animate the balls vigorously
// function shuffleBalls() {
//   gsap.fromTo(
//     balls,
//     {
//       x: 0,
//       y: 0,
//       rotation: 0,
//       ease: "power4.out",
//     },
//     {
//       x: "+=200",
//       y: "+=200",
//       rotation: "+=720",
//       duration: 2,
//       stagger: {
//         each: 0.1,
//         repeat: -1,
//         yoyo: true,
//       },
//     }
//   );
// }

// // Randomize the initial splash-out position of the balls
// splashOutBalls();

// // Start the vigorous shuffling animation
// shuffleBalls();

// } 
  

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
// .add(shuffleLine.play())

mainTimeline.play();


console.log(timerLine.duration());


