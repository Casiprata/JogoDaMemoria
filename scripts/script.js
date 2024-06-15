const gameBoard = document.getElementById('game-board');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const difficultySelect = document.getElementById('difficulty');
const timerElement = document.getElementById('time');
const scoreList = document.getElementById('score-list');
const highScoresContainer = document.getElementById('high-scores');

let timer;
let time = 0;
let flippedCards = [];
let matchedPairs = 0;
let isPaused = false;

startButton.addEventListener('click', startGame);
pauseButton.addEventListener('click', pauseGame);
resetButton.addEventListener('click', resetGame);

function startGame() {
    const gridSize = parseInt(difficultySelect.value);
    createBoard(gridSize);
    startTimer();
}

function createBoard(size) {
    gameBoard.innerHTML = '';
    gameBoard.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    const totalCards = size * size;
    const cardValues = Array.from({ length: totalCards / 2 }, (_, i) => i + 1);
    const cards = [...cardValues, ...cardValues];
    shuffleArray(cards);

    cards.forEach(value => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.value = value;
        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
    });

    matchedPairs = 0;
    flippedCards = [];
    isPaused = false;
    pauseButton.textContent = 'Pausar';
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function flipCard() {
    if (isPaused || this.classList.contains('flip') || flippedCards.length === 2) {
        return;
    }
    this.classList.add('flip');
    this.textContent = this.dataset.value;
    flippedCards.push(this);

    if (flippedCards.length === 2) {
        checkMatch();
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;

    if (card1.dataset.value === card2.dataset.value) {
        matchedPairs++;
        flippedCards = [];
        if (matchedPairs === (parseInt(difficultySelect.value) ** 2) / 2) {
            clearInterval(timer);
            saveScore(time);
            alert(`Parabéns! Você completou o jogo em ${time} segundos.`);
        }
    } else {
        setTimeout(() => {
            card1.classList.remove('flip');
            card2.classList.remove('flip');
            card1.textContent = '';
            card2.textContent = '';
            flippedCards = [];
        }, 1000);
    }
}

function startTimer() {
    clearInterval(timer);
    time = 0;
    timerElement.textContent = time;
    timer = setInterval(() => {
        if (!isPaused) {
            time++;
            timerElement.textContent = time;
        }
    }, 1000);
}

function pauseGame() {
    isPaused = !isPaused;
    pauseButton.textContent = isPaused ? 'Continuar' : 'Pausar';
}

function resetGame() {
    clearInterval(timer);
    time = 0;
    timerElement.textContent = time;
    createBoard(parseInt(difficultySelect.value));
}

function saveScore(score) {
    const scores = JSON.parse(localStorage.getItem('memoryGameScores')) || [];
    scores.push(score);
    scores.sort((a, b) => a - b);
    if (scores.length > 5) {
        scores.pop();
    }
    localStorage.setItem('memoryGameScores', JSON.stringify(scores));
    displayScores();
}

function displayScores() {
    const scores = JSON.parse(localStorage.getItem('memoryGameScores')) || [];
    scoreList.innerHTML = scores.map(score => `<li>${score} segundos</li>`).join('');
}

// Inicializar a exibição de pontuações ao carregar a página
displayScores();
