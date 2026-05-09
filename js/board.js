function addLetter(letter){
    if (currentCol <5) {
        const tile = rows[currentRow].children[currentCol];

        tile.textContent = letter;

        currentCol++;
    }
}

function removeLetter() {
    if (currentCol > 0) {
        currentCol--;

        const tile = rows[currentRow].children[currentCol];

        tile.textContent = "";
    }
}

function submitGuess() {
    if (currentCol < 5) {
        return;
    }

    let guess = "";

    for (let i = 0; i < 5; i++) {
        guess += rows[currentRow].children[i].textContent.toLowerCase();
    }

    //console.log("Guess: ", guess);
    checkGuess(guess);
}

function checkGuess(guess) {
    for (let i = 0; i < 5; i++) {
        const tile = rows[currentRow].children[i];

        const letter = guess[i];

        if (letter === answer[i]) {
            tile.classList.add("correct");
        }

        else if (answer.includes(letter)) {
            tile.classList.add("present");
        } else {
            tile.classList.add("wrong");

                markWrongKey(letter);
        }
    }

    if (guess === answer) {
        setTimeout(() => {
            alert(`You Won! the word was : ${answer}`);
        }, 100);
        return;
    }

    currentRow++;
    currentCol = 0;

    if (currentRow === 6) {
        setTimeout(() => {
            alert(`Game Over ! Word was ${answer}`)
        }, 100);
    }
}