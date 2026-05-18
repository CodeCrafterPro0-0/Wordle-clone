const answer = words[Math.floor(Math.random() * words.length)];

let hintsLeft = 0;
let isAnimating = false;

// console.log("Answer:", answer); // uncomment to debug

// ─── On-screen keyboard ───────────────────────────────────────────────────────

const keys = document.querySelectorAll(".key");

keys.forEach((key) => {
    key.addEventListener("click", () => {
        const value = key.textContent.toLowerCase();

        if (value === "enter") {
            submitGuess();
        } else if (value === "⇐") {
            removeLetter();
        } else {
            addLetter(value);
        }
    });
});

// ─── Physical keyboard support ────────────────────────────────────────────────

document.addEventListener("keydown", (e) => {
    if (e.ctrlKey || e.altKey || e.metaKey) return;

    const key = e.key;

    if (key === "Enter") {
        submitGuess();
    } else if (key === "Backspace") {
        removeLetter();
    } else if (/^[a-zA-Z]$/.test(key)) {
        addLetter(key.toLowerCase());
    }
});

// ─── Popup ────────────────────────────────────────────────────────────────────

const popup = document.getElementById("popup");
const popupMessage = document.getElementById("popup-message");
const newGameBtn = document.getElementById("new-game-btn");

function showPopup(message) {
    popupMessage.textContent = message;
    popup.classList.remove("hidden");
}

newGameBtn.addEventListener("click", () => {
    location.reload();
});

// ─── Start menu ───────────────────────────────────────────────────────────────

const startMenu = document.querySelector(".start-menu");
const gamePage = document.getElementById("game-container");
const startBtn = document.getElementById("start");
const difficultySelect = document.getElementById("difficulty");

const hintText = document.getElementById("hint-text");
const hintBtn = document.getElementById("hint-btn");

function updateHintText() {
    hintText.textContent = `Hints Left: ${hintsLeft}`;
    hintBtn.disabled = hintsLeft <= 0;
}

startBtn.addEventListener("click", () => {
    const difficulty = difficultySelect.value;

    if (difficulty === "easy") {
        hintsLeft = 3;
    } else if (difficulty === "intermediate") {
        hintsLeft = 2;
    } else if (difficulty === "hard") {
        hintsLeft = 1;
    } else {
        hintsLeft = 0; // hardcore
    }

    updateHintText();
    startMenu.classList.add("hidden");
    gamePage.classList.remove("hidden");
});

// ─── Hint system ──────────────────────────────────────────────────────────────

hintBtn.addEventListener("click", useHint);

function useHint() {
    if (hintsLeft <= 0 || isAnimating) return;
    if (currentCol >= 5) return; // row already full

    // Always hint the next position the player would type at (no gaps)
    addLetterAt(currentCol, answer[currentCol].toUpperCase());

    hintsLeft--;
    updateHintText();
}

// ─── Keyboard colour tracking ─────────────────────────────────────────────────

// Priority order: correct > present > wrong (never downgrade a key's colour)
const keyPriority = { correct: 2, present: 1, wrong: 0 };
const keyStates = {};

function markKey(letter, state) {
    const currentState = keyStates[letter];

    if (currentState && keyPriority[currentState] >= keyPriority[state]) return;

    keyStates[letter] = state;

    keys.forEach((key) => {
        if (key.textContent.toLowerCase() === letter) {
            key.classList.remove("wrong", "present", "correct");
            key.classList.add(state);
        }
    });
}