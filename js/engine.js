/**
 * Game Engine - Core functionality for the text-based RPG
 */

class GameEngine {
    constructor() {
        this.gameDisplay = document.getElementById('game-display');
        this.commandInput = document.getElementById('command-input');
        this.gameState = {
            currentLocation: null,
            player: null,
            inventory: [],
            questLog: [],
            gameFlags: {},
            turnCount: 0,
            combatActive: false
        };
        
        this.commandHistory = [];
        this.historyIndex = -1;
        
        // Command handlers
        this.commands = {
            'help': this.showHelp.bind(this),
            'look': this.lookAround.bind(this),
            'go': this.travel.bind(this),
            'move': this.travel.bind(this),
            'talk': this.talkTo.bind(this),
            'speak': this.talkTo.bind(this),
            'take': this.takeItem.bind(this),
            'get': this.takeItem.bind(this),
            'drop': this.dropItem.bind(this),
            'inventory': this.checkInventory.bind(this),
            'i': this.checkInventory.bind(this),
            'stats': this.showStats.bind(this),
            'use': this.useItem.bind(this),
            'equip': this.equipItem.bind(this),
            'attack': this.attackTarget.bind(this),
            'fight': this.attackTarget.bind(this),
            'examine': this.examineObject.bind(this),
            'inspect': this.examineObject.bind(this),
            'quests': this.showQuests.bind(this),
            'save': this.saveGame.bind(this),
            'load': this.loadGame.bind(this),
            'clear': this.clearScreen.bind(this)
        };
        
        // Initialize event listeners
        this.initEventListeners();
    }
    
    // Initialize event listeners
    initEventListeners() {
        this.commandInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const command = this.commandInput.value.trim();
                if (command) {
                    this.processCommand(command);
                    this.commandHistory.unshift(command);
                    this.historyIndex = -1;
                    this.commandInput.value = '';
                }
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                if (this.historyIndex < this.commandHistory.length - 1) {
                    this.historyIndex++;
                    this.commandInput.value = this.commandHistory[this.historyIndex];
                }
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                if (this.historyIndex > 0) {
                    this.historyIndex--;
                    this.commandInput.value = this.commandHistory[this.historyIndex];
                } else if (this.historyIndex === 0) {
                    this.historyIndex = -1;
                    this.commandInput.value = '';
                }
            }
        });
    }
    
    // Process player commands
    processCommand(commandStr) {
        this.print('command', '> ' + commandStr);
        
        // Split the command into parts
        const parts = commandStr.toLowerCase().split(' ');
        const command = parts[0];
        const args = parts.slice(1);
        
        // Check if command exists and execute it
        if (this.commands[command]) {
            this.commands[command](args);
        } else {
            this.print('system', "I don't understand that command. Type 'help' for a list of commands.");
        }
        
        // Increment turn counter if not in combat
        if (!this.gameState.combatActive) {
            this.gameState.turnCount++;
        }
        
        // Scroll to bottom
        this.gameDisplay.scrollTop = this.gameDisplay.scrollHeight;
    }
    
    // Print text to the game display
    print(type, text) {
        const element = document.createElement('div');
        element.className = type;
        element.textContent = text;
        this.gameDisplay.appendChild(element);
        this.gameDisplay.scrollTop = this.gameDisplay.scrollHeight;
    }
    
    // Print text with a typewriter effect
    async printTyping(type, text, speed = 30) {
        const element = document.createElement('div');
        element.className = type;
        this.gameDisplay.appendChild(element);
        
        for (let i = 0; i < text.length; i++) {
            element.textContent += text[i];
            this.gameDisplay.scrollTop = this.gameDisplay.scrollHeight;
            await new Promise(resolve => setTimeout(resolve, speed));
        }
    }
    
    // Clear the screen
    clearScreen() {
        this.gameDisplay.innerHTML = '';
        this.print('system', 'Screen cleared.');
    }
    
    // Show help
    showHelp() {
        this.print('system', '=== AVAILABLE COMMANDS ===');
        this.print('system', 'help - Show this help menu');
        this.print('system', 'look - Look around your current location');
        this.print('system', 'go/move [direction] - Move in a direction (north, south, east, west)');
        this.print('system', 'talk/speak [character] - Talk to a character');
        this.print('system', 'take/get [item] - Pick up an item');
        this.print('system', 'drop [item] - Drop an item from your inventory');
        this.print('system', 'inventory/i - Check your inventory');
        this.print('system', 'stats - Show your character stats');
        this.print('system', 'use [item] - Use an item');
        this.print('system', 'equip [item] - Equip a weapon or armor');
        this.print('system', 'attack/fight [target] - Attack a target');
        this.print('system', 'examine/inspect [object] - Look at something more closely');
        this.print('system', 'quests - View your active quests');
        this.print('system', 'save - Save your game');
        this.print('system', 'load - Load a saved game');
        this.print('system', 'clear - Clear the screen');
    }
    
    // Look around the current location
    lookAround() {
        if (!this.gameState.currentLocation) {
            this.print('system', "You're in a void. There's nothing to see.");
            return;
        }
        
        const location = this.gameState.currentLocation;
        this.print('location', `=== ${location.name} ===`);
        this.print('narrative', location.description);
        
        // List exits
        if (location.exits.length > 0) {
            this.print('system', 'Exits: ' + location.exits.map(exit => exit.direction).join(', '));
        } else {
            this.print('system', 'There are no obvious exits.');
        }
        
        // List characters
        if (location.characters.length > 0) {
            this.print('system', 'Characters here: ' + location.characters.map(char => char.name).join(', '));
        }
        
        // List items
        if (location.items.length > 0) {
            this.print('system', 'Items here: ' + location.items.map(item => item.name).join(', '));
        }
    }
    
    // Travel to a new location
    travel(args) {
        if (args.length === 0) {
            this.print('system', 'Go where? Please specify a direction.');
            return;
        }
        
        const direction = args[0];
        const currentLocation = this.gameState.currentLocation;
        
        if (!currentLocation) {
            this.print('system', "You're in a void. There's nowhere to go.");
            return;
        }
        
        const exit = currentLocation.exits.find(e => e.direction === direction);
        
        if (!exit) {
            this.print('system', `You can't go ${direction} from here.`);
            return;
        }
        
        // Check if exit is locked
        if (exit.locked) {
            if (exit.lockMessage) {
                this.print('system', exit.lockMessage);
            } else {
                this.print('system', `The way ${direction} is locked.`);
            }
            return;
        }
        
        // Move to the new location
        const newLocation = game.locations.find(loc => loc.id === exit.leadsTo);
        
        if (!newLocation) {
            this.print('system', 'Error: Location not found.');
            return;
        }
        
        this.gameState.currentLocation = newLocation;
        this.print('system', `You go ${direction}.`);
        this.lookAround();
        
        // Trigger any location events
        if (newLocation.onEnter) {
            newLocation.onEnter(this);
        }
    }
    
    // Talk to a character
    talkTo(args) {
        if (args.length === 0) {
            this.print('system', 'Talk to whom?');
            return;
        }
        
        const characterName = args.join(' ').toLowerCase();
        const currentLocation = this.gameState.currentLocation;
        
        if (!currentLocation) {
            this.print('system', "There's no one here to talk to.");
            return;
        }
        
        const character = currentLocation.characters.find(
            c => c.name.toLowerCase() === characterName
        );
        
        if (!character) {
            this.print('system', `There's no ${characterName} here.`);
            return;
        }
        
        if (character.dialog) {
            this.print('dialog', `${character.name}: "${character.dialog}"`);
            
            // Trigger any dialog events
            if (character.onTalk) {
                character.onTalk(this);
            }
        } else {
            this.print('dialog', `${character.name} has nothing to say.`);
        }
    }
    
    // Take an item
    takeItem(args) {
        if (args.length === 0) {
            this.print('system', 'Take what?');
            return;
        }
        
        const itemName = args.join(' ').toLowerCase();
        const currentLocation = this.gameState.currentLocation;
        
        if (!currentLocation) {
            this.print('system', "There's nothing here to take.");
            return;
        }
        
        const itemIndex = currentLocation.items.findIndex(
            item => item.name.toLowerCase() === itemName
        );
        
        if (itemIndex === -1) {
            this.print('system', `There's no ${itemName} here.`);
            return;
        }
        
        const item = currentLocation.items[itemIndex];
        
        // Check if item can be taken
        if (!item.canTake) {
            this.print('system', `You can't take the ${item.name}.`);
            return;
        }
        
        // Add to inventory and remove from location
        this.gameState.inventory.push(item);
        currentLocation.items.splice(itemIndex, 1);
        
        this.print('system', `You take the ${item.name}.`);
        
        // Trigger any item events
        if (item.onTake) {
            item.onTake(this);
        }
    }
    
    // Drop an item
    dropItem(args) {
        if (args.length === 0) {
            this.print('system', 'Drop what?');
            return;
        }
        
        const itemName = args.join(' ').toLowerCase();
        const currentLocation = this.gameState.currentLocation;
        
        if (!currentLocation) {
            this.print('system', "There's nowhere to drop anything.");
            return;
        }
        
        const itemIndex = this.gameState.inventory.findIndex(
            item => item.name.toLowerCase() === itemName
        );
        
        if (itemIndex === -1) {
            this.print('system', `You don't have a ${itemName}.`);
            return;
        }
        
        const item = this.gameState.inventory[itemIndex];
        
        // Remove from inventory and add to location
        this.gameState.inventory.splice(itemIndex, 1);
        currentLocation.items.push(item);
        
        this.print('system', `You drop the ${item.name}.`);
        
        // Trigger any item events
        if (item.onDrop) {
            item.onDrop(this);
        }
    }
    
    // Check inventory
    checkInventory() {
        if (this.gameState.inventory.length === 0) {
            this.print('system', 'Your inventory is empty.');
            return;
        }
        
        this.print('system', '=== INVENTORY ===');
        this.gameState.inventory.forEach(item => {
            let itemText = item.name;
            if (item.equipped) {
                itemText += ' (equipped)';
            }
            this.print('item', itemText);
        });
    }
    
    // Show character stats
    showStats() {
        const player = this.gameState.player;
        
        if (!player) {
            this.print('system', 'No character data available.');
            return;
        }
        
        this.print('system', `=== ${player.name} ===`);
        this.print('system', `Level: ${player.level}`);
        this.print('system', `Health: ${player.health}/${player.maxHealth}`);
        this.print('system', `Strength: ${player.strength}`);
        this.print('system', `Defense: ${player.defense}`);
        this.print('system', `Experience: ${player.experience}/${player.experienceToNextLevel}`);
        
        // Show equipped items
        const equippedWeapon = this.gameState.inventory.find(item => item.type === 'weapon' && item.equipped);
        const equippedArmor = this.gameState.inventory.find(item => item.type === 'armor' && item.equipped);
        
        if (equippedWeapon) {
            this.print('system', `Weapon: ${equippedWeapon.name}`);
        } else {
            this.print('system', 'Weapon: None');
        }
        
        if (equippedArmor) {
            this.print('system', `Armor: ${equippedArmor.name}`);
        } else {
            this.print('system', 'Armor: None');
        }
    }
    
    // Use an item
    useItem(args) {
        if (args.length === 0) {
            this.print('system', 'Use what?');
            return;
        }
        
        const itemName = args.join(' ').toLowerCase();
        const itemIndex = this.gameState.inventory.findIndex(
            item => item.name.toLowerCase() === itemName
        );
        
        if (itemIndex === -1) {
            this.print('system', `You don't have a ${itemName}.`);
            return;
        }
        
        const item = this.gameState.inventory[itemIndex];
        
        // Check if item can be used
        if (!item.canUse) {
            this.print('system', `You can't use the ${item.name}.`);
            return;
        }
        
        // Use the item
        if (item.onUse) {
            item.onUse(this);
        } else {
            this.print('system', `You use the ${item.name}, but nothing happens.`);
        }
        
        // Remove consumable items after use
        if (item.consumable) {
            this.gameState.inventory.splice(itemIndex, 1);
            this.print('system', `The ${item.name} is consumed.`);
        }
    }
    
    // Equip an item
    equipItem(args) {
        if (args.length === 0) {
            this.print('system', 'Equip what?');
            return;
        }
        
        const itemName = args.join(' ').toLowerCase();
        const itemIndex = this.gameState.inventory.findIndex(
            item => item.name.toLowerCase() === itemName
        );
        
        if (itemIndex === -1) {
            this.print('system', `You don't have a ${itemName}.`);
            return;
        }
        
        const item = this.gameState.inventory[itemIndex];
        
        // Check if item can be equipped
        if (item.type !== 'weapon' && item.type !== 'armor') {
            this.print('system', `You can't equip the ${item.name}.`);
            return;
        }
        
        // Unequip any currently equipped items of the same type
        this.gameState.inventory.forEach(i => {
            if (i.type === item.type && i.equipped) {
                i.equipped = false;
                
                // Remove stat bonuses
                if (i.type === 'weapon') {
                    this.gameState.player.strength -= i.bonus || 0;
                } else if (i.type === 'armor') {
                    this.gameState.player.defense -= i.bonus || 0;
                }
                
                this.print('system', `You unequip the ${i.name}.`);
            }
        });
        
        // Equip the new item
        item.equipped = true;
        
        // Apply stat bonuses
        if (item.type === 'weapon') {
            this.gameState.player.strength += item.bonus || 0;
        } else if (item.type === 'armor') {
            this.gameState.player.defense += item.bonus || 0;
        }
        
        this.print('system', `You equip the ${item.name}.`);
        
        // Trigger any equip events
        if (item.onEquip) {
            item.onEquip(this);
        }
    }
    
    // Attack a target
    attackTarget(args) {
        if (!this.gameState.combatActive) {
            this.print('system', 'There is nothing to attack here.');
            return;
        }
        
        // Combat logic is handled in combat.js
        game.combat.playerAttack();
    }
    
    // Examine an object
    examineObject(args) {
        if (args.length === 0) {
            this.print('system', 'Examine what?');
            return;
        }
        
        const objectName = args.join(' ').toLowerCase();
        const currentLocation = this.gameState.currentLocation;
        
        // Check inventory first
        const inventoryItem = this.gameState.inventory.find(
            item => item.name.toLowerCase() === objectName
        );
        
        if (inventoryItem) {
            if (inventoryItem.description) {
                this.print('item', inventoryItem.description);
            } else {
                this.print('item', `It's a ${inventoryItem.name}.`);
            }
            return;
        }
        
        // Check location items
        if (currentLocation) {
            const locationItem = currentLocation.items.find(
                item => item.name.toLowerCase() === objectName
            );
            
            if (locationItem) {
                if (locationItem.description) {
                    this.print('item', locationItem.description);
                } else {
                    this.print('item', `It's a ${locationItem.name}.`);
                }
                return;
            }
            
            // Check characters
            const character = currentLocation.characters.find(
                char => char.name.toLowerCase() === objectName
            );
            
            if (character) {
                if (character.description) {
                    this.print('dialog', character.description);
                } else {
                    this.print('dialog', `It's ${character.name}.`);
                }
                return;
            }
            
            // Check location features
            if (currentLocation.features) {
                const feature = currentLocation.features.find(
                    f => f.name.toLowerCase() === objectName
                );
                
                if (feature) {
                    if (feature.description) {
                        this.print('location', feature.description);
                    } else {
                        this.print('location', `It's a ${feature.name}.`);
                    }
                    return;
                }
            }
        }
        
        this.print('system', `You don't see a ${objectName} here.`);
    }
    
    // Show quests
    showQuests() {
        if (this.gameState.questLog.length === 0) {
            this.print('system', 'You have no active quests.');
            return;
        }
        
        this.print('system', '=== QUEST LOG ===');
        this.gameState.questLog.forEach(quest => {
            let status = quest.completed ? 'Completed' : 'Active';
            this.print('system', `${quest.name} (${status})`);
            this.print('narrative', quest.description);
            
            if (quest.objectives && quest.objectives.length > 0) {
                quest.objectives.forEach(obj => {
                    let checkmark = obj.completed ? '✓' : '□';
                    this.print('system', `${checkmark} ${obj.description}`);
                });
            }
        });
    }
    
    // Save game
    saveGame() {
        try {
            const saveData = JSON.stringify(this.gameState);
            localStorage.setItem('shadowsOfDestinySave', saveData);
            this.print('system', 'Game saved successfully.');
        } catch (error) {
            this.print('system', 'Failed to save game: ' + error.message);
        }
    }
    
    // Load game
    loadGame() {
        try {
            const saveData = localStorage.getItem('shadowsOfDestinySave');
            
            if (!saveData) {
                this.print('system', 'No saved game found.');
                return;
            }
            
            this.gameState = JSON.parse(saveData);
            this.print('system', 'Game loaded successfully.');
            this.lookAround();
        } catch (error) {
            this.print('system', 'Failed to load game: ' + error.message);
        }
    }
    
    // Start a new game
    startNewGame() {
        // Initialize player
        this.gameState.player = {
            name: 'Hero',
            level: 1,
            health: 100,
            maxHealth: 100,
            strength: 10,
            defense: 5,
            experience: 0,
            experienceToNextLevel: 100
        };
        
        // Set starting location
        this.gameState.currentLocation = game.locations[0]; // First location
        
        // Clear inventory and quest log
        this.gameState.inventory = [];
        this.gameState.questLog = [];
        this.gameState.gameFlags = {};
        this.gameState.turnCount = 0;
        
        // Display intro
        this.clearScreen();
        this.printTyping('narrative', game.story.intro);
        
        // Show starting location
        setTimeout(() => {
            this.print('system', '');
            this.lookAround();
        }, game.story.intro.length * 30 + 500);
    }
}

// Create global engine instance
const engine = new GameEngine();

