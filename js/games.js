// Game data - this will be where we define our games
const games = [
    {
        id: 'snake',
        title: 'Snake Game',
        description: 'Classic snake game. Eat the food, grow longer, and avoid hitting the walls or yourself!',
        imageUrl: 'images/snake.jpg',
        path: 'games/snake/index.html'
    },
    {
        id: 'memory',
        title: 'Memory Match',
        description: 'Test your memory by matching pairs of cards. Find all pairs in the shortest time possible!',
        imageUrl: 'images/memory.jpg',
        path: 'games/memory/index.html'
    },
    {
        id: 'tetris',
        title: 'Tetris',
        description: 'The classic block-stacking game. Arrange the falling blocks to create complete rows!',
        imageUrl: 'images/tetris.jpg',
        path: 'games/tetris/index.html'
    }
];

// Function to generate game cards
function generateGameCards() {
    const gamesGrid = document.querySelector('.games-grid');
    
    games.forEach(game => {
        const gameCard = document.createElement('div');
        gameCard.className = 'game-card';
        
        gameCard.innerHTML = `
            <div class="game-image" style="background-image: url('${game.imageUrl}')"></div>
            <div class="game-info">
                <h3>${game.title}</h3>
                <p>${game.description}</p>
                <a href="${game.path}" class="btn">Play Game</a>
            </div>
        `;
        
        gamesGrid.appendChild(gameCard);
    });
}

// Initialize game cards when DOM is loaded
document.addEventListener('DOMContentLoaded', generateGameCards);

