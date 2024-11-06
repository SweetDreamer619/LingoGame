// Word list for each language and difficulty level
const words = { 
    en: {
        easy: ["APPLE", "BANJO", "CRISP", "DOZER", "EAGLE", "FRUIT"],
        medium: ["GRAIN", "PLATE", "TRAIN", "SHARK", "WATER", "MANGO"],
        hard: ["BRISK", "CRANE", "FLOAT", "GRAVE", "PLUMB", "SWORD"]
    },
    de: {
        easy: ["APFEL", "BIRNE", "KIRSC", "TRAUBE", "ADLER", "BEERE"],
        medium: ["BLUME", "FISCH", "TISCH", "STUHL", "HERZ", "KATZE"],
        hard: ["SCHIFF", "ZIMMER", "KLAVIER", "SCHNEE", "FREUND", "KERZEN"]
    },
    nl: {
        easy: ["APPEL", "FIETS", "CRISP", "BRAND", "VOGEL", "FRUIT"],
        medium: ["HUIS", "BOOM", "BROOD", "KAARS", "VOGEL", "VISJE"],
        hard: ["SCHIP", "KONING", "TAFEL", "STERRE", "WATERK", "GEBOUW"]
    },
    es: {
        easy: ["MORAS", "LIBRO", "COCHE", "PLAYA", "PERRO", "FRUTA"],
        medium: ["CIELO", "FRESA", "GATOS", "BEBER", "SALSA", "HOJAS"],
        hard: ["CABALLO", "PUERTA", "CALZON", "MOLINO", "FLORES", "JUGUETE"]
    }
};

let targetWord = "";
let currentRow = 0;
let difficulty = "easy";

// Set target word for the game based on selected language and difficulty
function setTargetWord(language, level) {
    targetWord = words[language][level][Math.floor(Math.random() * words[language][level].length)];
}

// Set difficulty level for the game
function setDifficulty(level) {
    difficulty = level;
    resetGame();
}

document.addEventListener("DOMContentLoaded", () => {
    const languageSelect = document.getElementById("language-select");
    const difficultySelect = document.getElementById("difficulty-level");
    const gameContainer = document.getElementById("game-container");
    
    setTargetWord(languageSelect.value, difficultySelect.value);
    createGameBoard();
    setTimeout(() => {
        gameContainer.style.display = "block";
        gameContainer.style.opacity = 1;
    }, 1000);

    languageSelect.addEventListener("change", function() {
        setTargetWord(this.value, difficulty);
        resetGame(); 
    });

    difficultySelect.addEventListener("change", function() {
        setDifficulty(this.value);
    });

    document.getElementById("guess-btn").addEventListener("click", handleGuess);
    document.getElementById("replay-btn").addEventListener("click", resetGame);
});

// Open sidebar menu
function openNav() {
    document.getElementById("mySidebar").style.width = "250px";
}

// Close sidebar menu
function closeNav() {
    document.getElementById("mySidebar").style.width = "0";
}

// Toggle between dark mode and light mode
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}

// Create game board
function createGameBoard() {
    const gameBoard = document.getElementById("game-board");
    gameBoard.innerHTML = "";
    let rows = difficulty === "easy" ? 6 : difficulty === "medium" ? 5 : 4;
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < 5; j++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.setAttribute("data-row", i);
            cell.setAttribute("data-col", j);
            gameBoard.appendChild(cell);
        }
    }
}

// Handle user's guess
function handleGuess() {
    const guessInput = document.getElementById("guess-input");
    const guess = guessInput.value.toUpperCase();
    console.log("Current target word:", targetWord);
    
    if (guess.length !== 5) {
        alert("Please enter a 5-letter word.");
        return;
    }

    const currentCells = document.querySelectorAll(`[data-row="${currentRow}"]`);
    const correctSound = document.getElementById("correct-sound");
    const incorrectSound = document.getElementById("incorrect-sound");
    let wordCorrect = true;

    for (let i = 0; i < 5; i++) {
        currentCells[i].textContent = guess[i];
        if (guess[i] === targetWord[i]) {
            currentCells[i].classList.add("correct");
        } else if (targetWord.includes(guess[i])) {
            currentCells[i].classList.add("misplaced");
            wordCorrect = false;
        } else {
            currentCells[i].classList.add("incorrect");
            wordCorrect = false;
        }
    }

    if (wordCorrect) {
        correctSound.play();
        endGame(true);
    } else {
        incorrectSound.play();
        currentRow++;
        if (currentRow === (difficulty === "easy" ? 6 : difficulty === "medium" ? 5 : 4)) {
            endGame(false);
        }
    }

    guessInput.value = "";
}

// End game with win or loss
function endGame(isWin) {
    const replayContainer = document.getElementById("replay-container");
    const correctWordDisplay = document.getElementById("correct-word");

    replayContainer.classList.remove("hidden");
    correctWordDisplay.textContent = isWin ? "Congratulations! You guessed the word!" : `The correct word was: ${targetWord}`;
}

// Reset game
function resetGame() {
    const languageSelect = document.getElementById("language-select");
    setTargetWord(languageSelect.value, difficulty);
    currentRow = 0;
    createGameBoard();
    document.getElementById("replay-container").classList.add("hidden");
    document.getElementById("guess-input").value = "";
}
