function addLetter(letter) {
    if (currentCol < 5) {
        const tile = rows[currentRow].children[currentCol];

        tile.textContent = letter;
        tile.classList.add("pop");

        setTimeout(() => {
            tile.classList.remove("pop");
        }, 100);

        currentCol++;
    }
}

function addLetterAt(index, letter) {
    const tile = rows[currentRow].children[index];

    tile.textContent = letter;
    tile.dataset.hinted = "true";
    tile.classList.add("pop", "hinted");

    setTimeout(() => {
        tile.classList.remove("pop");
    }, 100);

    if (index >= currentCol) {
        currentCol = index + 1;
    }
}

function removeLetter() {
    if (currentCol > 0) {
        const prevCol = currentCol - 1;
        const tile = rows[currentRow].children[prevCol];

        if (tile.dataset.hinted === "true") return;

        currentCol--;
        tile.textContent = "";
    }
}

function submitGuess() {
    if (isAnimating) return;

    if (currentCol < 5) {
        rows[currentRow].classList.add("shake");
        setTimeout(() => {
            rows[currentRow].classList.remove("shake");
        }, 300);
        return;
    }

    let guess = "";
    for (let i = 0; i < 5; i++) {
        guess += rows[currentRow].children[i].textContent.toLowerCase();
    }

    checkGuess(guess);
}

function checkGuess(guess) {
    const answerArray = answer.split("");
    const guessArray = guess.split("");
    const tileStates = ["wrong", "wrong", "wrong", "wrong", "wrong"];

    for (let i = 0; i < 5; i++) {
        if (guessArray[i] === answerArray[i]) {
            tileStates[i] = "correct";
            answerArray[i] = null;
            guessArray[i] = null;
        }
    }

    for (let i = 0; i < 5; i++) {
        if (guessArray[i] !== null) {
            const foundIndex = answerArray.indexOf(guessArray[i]);
            if (foundIndex !== -1) {
                tileStates[i] = "present";
                answerArray[foundIndex] = null;
            }
        }
    }

    isAnimating = true;

    for (let i = 0; i < 5; i++) {
        const tile = rows[currentRow].children[i];
        const letter = guess[i];

        setTimeout(() => {
            tile.classList.add("flip");
            tile.classList.add(tileStates[i]);
            markKey(letter, tileStates[i]);
        }, i * 200);
    }

    setTimeout(() => {
        isAnimating = false;

        if (guess === answer) {
            showPopup("You Won! 🎉");
            return;
        }

        currentRow++;
        currentCol = 0;

        if (currentRow === 6) {
            showPopup(`Game Over! The word was "${answer.toUpperCase()}"`);
        }
    }, 1200);
}