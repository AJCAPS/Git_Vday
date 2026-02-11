// Elements
const envelopeContainer = document.getElementById("envelope-container");
const envelopeImg = document.getElementById("envelope");
const letter = document.getElementById("letter-container");

const noBtn = document.querySelector(".no-btn");
const buttons = document.getElementById("letter-buttons");

const lettercat = document.getElementById("letter-cat");
const title = document.getElementById("letter-title");
const catImg = document.getElementById("letter-cat");
const finalText = document.getElementById("final-text");
let firstMsg = document.getElementById("startmsg");
let stage = 0; // 0 = mailcat, 1 = envelope
let cat_stage = 0;
let randimg=0;
let nostage=0;
// -----------------------------
// MAILCAT → ENVELOPE → LETTER
// -----------------------------
envelopeContainer.addEventListener("click", () => {
  if (stage === 0) {
    envelopeImg.src = "envelope.png";
    stage = 1;
    firstMsg.innerHTML = "♡ Mail for You! ♡"
  } else {
    envelopeContainer.style.display = "none";
    letter.style.display = "flex";

    setTimeout(() => {
      document.querySelector(".letter-window").classList.add("open");
    }, 50);
  }
});

// -----------------------------
// NO BUTTON DODGE + SPAWN YES
// -----------------------------
noBtn.addEventListener("mouseover", () => {
  const distance = 100;
  const angle = Math.random() * Math.PI * 2;

  const moveX = Math.cos(angle) * distance;
  const moveY = Math.sin(angle) * distance;

  noBtn.style.transition = "transform 0.3s ease";
  noBtn.style.transform = `translate(${moveX}px, ${moveY}px)`;

  lettercat.src = "scared heart cat.png"
  spawnYesButton();
  spawnRandomPictures();
});

noBtn.addEventListener("mouseleave", () => {
    lettercat.src = "heart cat.png"
})

// -----------------------------
// SPAWN EXTRA YES BUTTON
// -----------------------------
function spawnYesButton() {
  const newYes = document.createElement("img");
  newYes.src = "yes.png";
  newYes.className = "btn yes-btn extra-yes";
  newYes.style.position = "fixed";

  const padding = 100;
  newYes.style.left =
    Math.random() * (window.innerWidth - padding) + "px";
  newYes.style.top =
    Math.random() * (window.innerHeight - padding) + "px";

  newYes.addEventListener("click", yesClicked);

  document.body.appendChild(newYes);
}

// List your images here
const valentineImages = [
  '1.png',
  '2.png',
  '3.png',
  '4.png'
];

let imageIndex = 0; // Keeps track of which image is next in the cycle

function spawnRandomPictures(count = 10) {
  for (let i = 0; i < count; i++) {
    // Cycles through the array in order: 0, 1, 2, 3, then back to 0
    const src = valentineImages[imageIndex];
    imageIndex = (imageIndex + 1) % valentineImages.length;

    // We use a slight timeout for each one so they don't 
    // all drop at the exact same time in a big clump
    setTimeout(() => {
      spawnFallingImage(src);
    }, i * 400); 
  }
}

/**
 * Handles the individual creation and animation of each image.
 */
function spawnFallingImage(src) {
  const img = document.createElement('img');
  img.src = src;
  img.classList.add('falling-image');

  // 1. Random horizontal position (0 to 90vw to avoid scrollbars)
  img.style.left = Math.random() * 90 + "vw";

  // 2. Random size (between 70px and 150px)
  const size = Math.random() * 80 + 70 + "px";
  img.style.width = size;

  // 3. Random fall duration (between 5s and 9s for a gentle look)
  const duration = Math.random() * 4 + 5;
  img.style.animationDuration = duration + "s";

  // 4. Random initial rotation
  const initialRotation = Math.random() * 360;
  img.style.transform = `rotate(${initialRotation}deg)`;

  document.body.appendChild(img);

  // 5. Clean up the element after its specific animation duration ends
  setTimeout(() => {
    img.remove();
  }, duration * 1000);
}


// -----------------------------
// YES CLICK (ANY YES BUTTON)
// -----------------------------
function yesClicked() {
  title.textContent = "Yippeeee!";
  catImg.src = "Mailcat.png";

  document.querySelector(".letter-window").classList.add("final");
  buttons.style.display = "none";
  finalText.style.display = "block";

  // Remove all extra YES buttons
  document.querySelectorAll(".extra-yes").forEach(btn => btn.remove());
  document.querySelectorAll(".meimg").forEach(img => img.remove());
}

function noClicked(){
    switch (nostage){
        case 0:
            title.textContent = "Are you sure? :<"
        case 1:
            title.textContent = "Really? :<"
        case 2:
            title.textContent = "Please? :<"
        case 3:
            title.textContent = "Okay.. :("
            document.querySelectorAll(".yes-btn").forEach(btn => btn.remove());
            document.querySelectorAll(".no-btn").forEach(btn => btn.remove());
            document.querySelectorAll(".meimg").forEach(img => img.remove());
            lettercat.src = "scared heart cat.png"
            
    }
    nostage+=1;
}

// Attach to original YES
document.querySelector(".no-btn").addEventListener("click", noClicked);
document.querySelector(".yes-btn").addEventListener("click", yesClicked);
