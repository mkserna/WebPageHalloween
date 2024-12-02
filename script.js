let score = 0;
let totalScore = 0;
let highScore = 0;
let gameInterval;
let isGamePaused = false;

const scoreElement = document.getElementById('score');
const totalScoreElement = document.getElementById('totalscore');
const highScoreElement = document.getElementById('highscore');
const gameArea = document.getElementById('game-area');
const startButton = document.getElementById('start-button');
const pauseButton = document.getElementById('pause-button');
const endButton = document.getElementById('end-button');

startButton.addEventListener('click', startGame);
pauseButton.addEventListener('click', pauseGame);
endButton.addEventListener('click', endGame);

function startGame() {
    score = 0;
    scoreElement.innerText = score;
    isGamePaused = false;
    startButton.disabled = true;
    pauseButton.disabled = false;
    endButton.disabled = false;
    clearInterval(gameInterval);
    
    gameInterval = setInterval(() => {
        if (!isGamePaused) {
            createGhost();
        }
    }, 100);
}

function pauseGame() {
    isGamePaused = !isGamePaused;
    pauseButton.innerText = isGamePaused ? 'Reanudar Juego' : 'Pausar Juego';
}

function endGame() {
    clearInterval(gameInterval);
    totalScore += score;
    totalScoreElement.innerText = totalScore;
    if (score > highScore) {
        highScore = score;
        highScoreElement.innerText = highScore;
    }
    startButton.disabled = false;
    pauseButton.disabled = true;
    endButton.disabled = true;
    gameArea.innerHTML = ''; // Limpiar los fantasmas restantes
}

function createGhost() {
    const ghost = document.createElement('div');
    ghost.classList.add('ghost');
    ghost.style.top = `${Math.random() * (gameArea.clientHeight - 50)}px`;
    ghost.style.left = `${Math.random() * (gameArea.clientWidth - 50)}px`;

    ghost.addEventListener('click', () => {
        score++;
        scoreElement.innerText = score;
        ghost.remove();
    });

    gameArea.appendChild(ghost);

    setTimeout(() => {
        if (ghost.parentElement) {
            ghost.remove();
        }
    }, 1000);
}
