// Snake Game JavaScript

// Get the canvas element and its context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Game variables
const gridSize = 20;
const gridWidth = canvas.width / gridSize;
const gridHeight = canvas.height / gridSize;

let snake = [];
let food = {};
let direction = 'right';
let nextDirection = 'right';
let score = 0;
let highScore = localStorage.getItem('snakeHighScore') || 0;
let gameSpeed = 150; // milliseconds
let gameInterval;
let gameRunning = false;

// Initialize the game
function initGame() {
    // Create the snake (3 segments at the start)
    snake = [
        {x: 5, y: 10},
        {x: 4, y: 10},
        {x: 3, y: 10}
    ];
    
    // Set initial direction
    direction = 'right';
    nextDirection = 'right';
    
    // Reset score
    score = 0;
    document.getElementById('score').textContent = score;
    document.getElementById('highScore').textContent = highScore;
    
    // Create initial food
    createFood();
    
    // Draw the initial state
    draw();
}

// Create food at a random position
function createFood() {
    food = {
        x: Math.floor(Math.random() * gridWidth),
        y: Math.floor(Math.random() * gridHeight)
    };
    
    // Make sure food doesn't appear on the snake
    for (let segment of snake) {
        if (segment.x === food.x && segment.y === food.y) {
            createFood(); // Try again
            break;
        }
    }
}

// Draw everything on the canvas
function draw() {
    // Clear the canvas
    ctx.fillStyle = '#222';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw the snake
    for (let i = 0; i < snake.length; i++) {
        // Head is a different color
        if (i === 0) {
            ctx.fillStyle = '#ff5252';
        } else {
            ctx.fillStyle = '#ff6b6b';
        }
        
        ctx.fillRect(
            snake[i].x * gridSize,
            snake[i].y * gridSize,
            gridSize - 1,
            gridSize - 1
        );
    }
    
    // Draw the food
    ctx.fillStyle = '#4CAF50';
    ctx.fillRect(
        food.x * gridSize,
        food.y * gridSize,
        gridSize - 1,
        gridSize - 1
    );
}

// Move the snake
function moveSnake() {
    // Update direction from nextDirection
    direction = nextDirection;
    
    // Create new head based on current direction
    const head = {x: snake[0].x, y: snake[0].y};
    
    switch (direction) {
        case 'up':
            head.y--;
            break;
        case 'down':
            head.y++;
            break;
        case 'left':
            head.x--;
            break;
        case 'right':
            head.x++;
            break;
    }
    
    // Check for collisions
    if (
        head.x < 0 || head.x >= gridWidth ||
        head.y < 0 || head.y >= gridHeight ||
        checkCollision(head)
    ) {
        gameOver();
        return;
    }
    
    // Add the new head to the snake
    snake.unshift(head);
    
    // Check if the snake ate the food
    if (head.x === food.x && head.y === food.y) {
        // Increase score
        score++;
        document.getElementById('score').textContent = score;
        
        // Update high score if needed
        if (score > highScore) {
            highScore = score;
            document.getElementById('highScore').textContent = highScore;
            localStorage.setItem('snakeHighScore', highScore);
        }
        
        // Create new food
        createFood();
        
        // Increase game speed slightly
        if (gameSpeed > 50) {
            gameSpeed -= 2;
            clearInterval(gameInterval);
            gameInterval = setInterval(gameLoop, gameSpeed);
        }
    } else {
        // Remove the tail if the snake didn't eat
        snake.pop();
    }
}

// Check if the head collides with the snake body
function checkCollision(head) {
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            return true;
        }
    }
    return false;
}

// Game over function
function gameOver() {
    clearInterval(gameInterval);
    gameRunning = false;
    
    // Display game over message
    ctx.fillStyle = 'rgba(0, 0, 0, 0.75)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.font = '30px Arial';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.fillText('Game Over!', canvas.width / 2, canvas.height / 2 - 15);
    
    ctx.font = '20px Arial';
    ctx.fillText(`Score: ${score}`, canvas.width / 2, canvas.height / 2 + 20);
    
    // Enable the start button
    document.getElementById('startBtn').disabled = false;
}

// Game loop function
function gameLoop() {
    moveSnake();
    draw();
}

// Start the game
function startGame() {
    if (!gameRunning) {
        initGame();
        gameRunning = true;
        document.getElementById('startBtn').disabled = true;
        gameInterval = setInterval(gameLoop, gameSpeed);
    }
}

// Event listeners
document.getElementById('startBtn').addEventListener('click', startGame);

// Keyboard controls
document.addEventListener('keydown', (e) => {
    // Prevent the default action (scrolling) when pressing arrow keys
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault();
    }
    
    // Update direction based on key press
    // Prevent 180-degree turns (can't go directly opposite of current direction)
    switch (e.key) {
        case 'ArrowUp':
            if (direction !== 'down') nextDirection = 'up';
            break;
        case 'ArrowDown':
            if (direction !== 'up') nextDirection = 'down';
            break;
        case 'ArrowLeft':
            if (direction !== 'right') nextDirection = 'left';
            break;
        case 'ArrowRight':
            if (direction !== 'left') nextDirection = 'right';
            break;
    }
});

// Initialize the game when the page loads
window.addEventListener('load', initGame);

