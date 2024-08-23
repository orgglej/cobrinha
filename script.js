const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const box = 20;
let snake = [{ x: 9 * box, y: 9 * box }];
let direction = 'RIGHT';
let food = { x: Math.floor(Math.random() * 20) * box, y: Math.floor(Math.random() * 20) * box };
let score = 0;

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Desenhar a comida
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, box, box);

    // Desenhar a cobra
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i === 0) ? 'green' : 'lightgreen';
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
        ctx.strokeStyle = 'darkgreen';
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }

    // Posição inicial da cobra
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    // Mover a cobra na direção
    if (direction === 'LEFT') snakeX -= box;
    if (direction === 'UP') snakeY -= box;
    if (direction === 'RIGHT') snakeX += box;
    if (direction === 'DOWN') snakeY += box;

    // Verificar se a cobra comeu a comida
    if (snakeX === food.x && snakeY === food.y) {
        score++;
        food = {
            x: Math.floor(Math.random() * 20) * box,
            y: Math.floor(Math.random() * 20) * box,
        };
    } else {
        snake.pop(); // Remover a cauda
    }

    // Adicionar nova cabeça à cobra
    const newHead = { x: snakeX, y: snakeY };

    // Verificar colisão com a parede ou com o próprio corpo
    if (snakeX < 0 || snakeY < 0 || snakeX >= canvas.width || snakeY >= canvas.height || collision(newHead, snake)) {
        clearInterval(game);
        alert('Game Over! Sua pontuação: ' + score);
    }

    snake.unshift(newHead); // Adicionar nova cabeça
}

// Verifica a colisão com o corpo da cobra
function collision(head, array) {
    for (let i = 0; i < array.length; i++) {
        if (head.x === array[i].x && head.y === array[i].y) {
            return true;
        }
    }
    return false;
}

// Controlar a direção da cobra com as teclas
document.addEventListener('keydown', directionControl);
function directionControl(event) {
    if (event.keyCode === 37 && direction !== 'RIGHT') direction = 'LEFT';
    if (event.keyCode === 38 && direction !== 'DOWN') direction = 'UP';
    if (event.keyCode === 39 && direction !== 'LEFT') direction = 'RIGHT';
    if (event.keyCode === 40 && direction !== 'UP') direction = 'DOWN';
}

// Funções para os botões
document.getElementById('up').addEventListener('click', () => {
    if (direction !== 'DOWN') direction = 'UP';
});

document.getElementById('down').addEventListener('click', () => {
    if (direction !== 'UP') direction = 'DOWN';
});

document.getElementById('left').addEventListener('click', () => {
    if (direction !== 'RIGHT') direction = 'LEFT';
});

document.getElementById('right').addEventListener('click', () => {
    if (direction !== 'LEFT') direction = 'RIGHT';
});

// Reiniciar o jogo
document.getElementById('restart').addEventListener('click', restartGame);
function restartGame() {
    snake = [{ x: 9 * box, y: 9 * box }];
    direction = 'RIGHT';
    food = { x: Math.floor(Math.random() * 20) * box, y: Math.floor(Math.random() * 20) * box };
    score = 0;
    clearInterval(game);
    game = setInterval(draw, 100);
}

let game = setInterval(draw, 100);
