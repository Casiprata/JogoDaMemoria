// Variáveis globais
const gameBoard = document.getElementById('game-board'); // Elemento do jogo
const startButton = document.getElementById('start'); // Botão de início
const pauseButton = document.getElementById('pause'); // Botão de pausa
const resetButton = document.getElementById('reset'); // Botão de reset
const difficultySelect = document.getElementById('difficulty'); // Seletor de dificuldade
const timerElement = document.getElementById('time'); // Elemento do temporizador

let timer; // Variável para o temporizador
let time = 0; // Contador de tempo
let flippedCards = []; // Cartas viradas
let matchedPairs = 0; // Pares correspondentes
let isPaused = false; // Variável para verificar se o jogo está pausado

// Adiciona um ouvinte de evento ao botão de início
startButton.addEventListener('click', startGame);

// Adiciona um ouvinte de evento ao botão de pausa
pauseButton.addEventListener('click', pauseGame);

// Adiciona um ouvinte de evento ao botão de reset
resetButton.addEventListener('click', resetGame);

/**
 * Inicia o jogo
 */
function startGame() {
    const gridSize = parseInt(difficultySelect.value); // Tamanho da grade
    createBoard(gridSize); // Cria o tabuleiro
    startTimer(); // Inicia o temporizador
}

/**
 * Pausa o jogo
 */
function pauseGame() {
    isPaused = !isPaused; // Alterna o estado de pausa
    pauseButton.textContent = isPaused ? 'Continuar' : 'Pausar'; // Atualiza o texto do botão de pausa
}

/**
 * Verifica se há pares correspondentes
 */
function checkMatch() {
    const [card1, card2] = flippedCards; // Pega as duas cartas viradas

    if (card1.dataset.value === card2.dataset.value) {
        matchedPairs++; // Incrementa o número de pares correspondentes
        flippedCards = []; // Limpa as cartas viradas
        if (matchedPairs === (parseInt(difficultySelect.value) ** 2) / 2) {
            clearInterval(timer); // Para o temporizador
            alert(`Parabéns! Você completou o jogo em ${time} segundos.`); // Exibe uma mensagem de parabéns
        }
    } else {
        setTimeout(() => {
            card1.classList.remove('flip'); // Remove a classe de rotação da primeira carta
            card2.classList.remove('flip'); // Remove a classe de rotação da segunda carta
            card1.textContent = ''; // Limpa o conteúdo da primeira carta
            card2.textContent = ''; // Limpa o conteúdo da segunda carta
            flippedCards = []; // Limpa as cartas viradas
        }, 1000); // Espera 1 segundo antes de desfazer a rotação das cartas
    }
}


/**
 * Starts a timer that increments the time every second, unless the game is paused.
 *
 * @return {void} This function does not return anything.
 */
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

/**
 * Toggles the game's pause state and updates the pause button's text accordingly.
 *
 * @return {void} This function does not return anything.
 */
function pauseGame() {
    isPaused = !isPaused;
    pauseButton.textContent = isPaused ? 'Continuar' : 'Pausar';
}

/**
 * Resets the game by clearing the timer, resetting the time, and recreating the game board based on the selected difficulty.
 *
 * @return {void} This function does not return anything.
 */
function resetGame() {
    clearInterval(timer);
    time = 0;
    timerElement.textContent = time;
    createBoard(parseInt(difficultySelect.value));
}
