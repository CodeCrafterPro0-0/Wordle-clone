const answer = words[Math.floor(Math.random()*words.length)];

//console.log("Ans: ", answer);

const keys = document.querySelectorAll(".key");

keys.forEach((key) => {
    key.addEventListener("click", () => {
        const value = key.textContent.toLowerCase();

        if(value === "enter") {
            submitGuess();
        }

        else if (value === "⇐") {
            removeLetter();
        }

        else {
            addLetter(value);
        }
    })
});

const popup = document.getElementById("popup");

const popupMessage = document.getElementById("popup-message");

const newGameBtn = document.getElementById("new-game-btn");

function showPopup(message) {
    popupMessage.textContent = message;

    popup.classList.remove("hidden");
}

newGameBtn.addEventListener("click", () => {
    location.reload();
})