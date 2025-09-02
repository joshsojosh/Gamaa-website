/**
 * Game - Main game initialization and global state
 */

// Create global game object
const game = {};

// Initialize the game when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Display welcome screen
    const gameDisplay = document.getElementById('game-display');
    gameDisplay.innerHTML = `
        <div style="text-align: center; margin-top: 50px;">
            <h2>Shadows of Destiny</h2>
            <p>A text-based RPG adventure</p>
            <button id="start-button" style="margin-top: 20px; padding: 10px 20px; background-color: #000; color: #fff; border: 1px solid #333; cursor: pointer;">Start New Game</button>
            <button id="load-button" style="margin-top: 10px; padding: 10px 20px; background-color: #000; color: #fff; border: 1px solid #333; cursor: pointer;">Load Saved Game</button>
        </div>
    `;
    
    // Add event listeners to buttons
    document.getElementById('start-button').addEventListener('click', () => {
        engine.startNewGame();
    });
    
    document.getElementById('load-button').addEventListener('click', () => {
        engine.loadGame();
    });
    
    // Add custom command handlers
    engine.commands['help'] = engine.showHelp.bind(engine);
    
    // Add custom command for quitting the game
    engine.commands['quit'] = function() {
        if (confirm('Are you sure you want to quit? Unsaved progress will be lost.')) {
            location.reload();
        }
    };
    
    // Add custom command for starting a new game
    engine.commands['restart'] = function() {
        if (confirm('Are you sure you want to restart? Unsaved progress will be lost.')) {
            engine.startNewGame();
        }
    };
    
    // Add custom command for using items
    engine.commands['use'] = function(args) {
        if (engine.gameState.combatActive) {
            game.combat.useItem(args.join(' '));
        } else {
            engine.useItem(args);
        }
    };
    
    // Add custom command for fleeing from combat
    engine.commands['flee'] = function() {
        if (engine.gameState.combatActive) {
            game.combat.flee();
        } else {
            engine.print('system', 'There\'s nothing to flee from.');
        }
    };
    
    // Add custom command for examining the map
    engine.commands['map'] = function() {
        const mapItem = engine.gameState.inventory.find(item => item.id === 'ancient_map');
        if (mapItem) {
            engine.useItem(['ancient', 'map']);
        } else {
            engine.print('system', 'You don\'t have a map.');
        }
    };
    
    // Add custom command for checking quest status
    engine.commands['quest'] = engine.showQuests.bind(engine);
    
    // Add custom command for resting (restore some health)
    engine.commands['rest'] = function() {
        if (engine.gameState.combatActive) {
            engine.print('system', 'You can\'t rest while in combat!');
            return;
        }
        
        const player = engine.gameState.player;
        const currentLocation = engine.gameState.currentLocation;
        
        // Check if location is safe for resting
        const hasDangerousCharacters = currentLocation.characters.some(char => char.isEnemy);
        
        if (hasDangerousCharacters) {
            engine.print('system', 'It\'s not safe to rest here.');
            return;
        }
        
        // Restore health (50% of missing health)
        const missingHealth = player.maxHealth - player.health;
        const healAmount = Math.floor(missingHealth * 0.5);
        
        if (healAmount <= 0) {
            engine.print('system', 'You are already at full health.');
            return;
        }
        
        player.health += healAmount;
        engine.print('system', `You rest for a while and recover ${healAmount} health points.`);
        
        // Advance game time
        engine.gameState.turnCount += 10;
        
        // Random chance of an event while resting
        if (Math.random() < 0.2) {
            engine.print('narrative', 'While resting, you overhear a conversation that might be useful...');
            
            // Different hints based on location
            if (currentLocation.id === 'village_square') {
                engine.print('dialog', 'Villager: "They say the old temple can only be entered with a special amulet. The fishing village elder might know more."');
            } else if (currentLocation.id === 'tavern') {
                engine.print('dialog', 'Patron: "The forest wolves have been acting strange lately. Something\'s disturbing them deeper in the woods."');
            } else if (currentLocation.id === 'forest_clearing') {
                engine.print('dialog', 'Traveler: "The sacred grove is protected by ancient magic. Only those who show respect can enter."');
            }
        }
    };
});

