/**
 * Combat - Handles all combat-related functionality
 */

class CombatSystem {
    constructor() {
        this.currentEnemy = null;
        this.playerTurn = true;
        this.turnCount = 0;
    }
    
    // Start combat with an enemy
    startCombat(enemy) {
        this.currentEnemy = JSON.parse(JSON.stringify(enemy)); // Clone enemy to avoid modifying the original
        this.playerTurn = true;
        this.turnCount = 0;
        engine.gameState.combatActive = true;
        
        engine.print('combat', `=== COMBAT START: ${this.currentEnemy.name} ===`);
        engine.print('combat', `A ${this.currentEnemy.name} appears!`);
        this.displayCombatStatus();
        
        engine.print('system', 'Commands: attack, use [item], flee');
    }
    
    // End combat
    endCombat(victory) {
        if (victory) {
            engine.print('combat', `You defeated the ${this.currentEnemy.name}!`);
            
            // Award experience
            const expGained = this.currentEnemy.experience;
            engine.gameState.player.experience += expGained;
            engine.print('system', `You gained ${expGained} experience points.`);
            
            // Check for level up
            this.checkLevelUp();
            
            // Drop loot
            if (this.currentEnemy.loot && this.currentEnemy.loot.length > 0) {
                this.dropLoot();
            }
            
            // Check for quest updates
            this.checkQuestUpdates();
        } else {
            engine.print('combat', `You fled from the ${this.currentEnemy.name}.`);
        }
        
        this.currentEnemy = null;
        engine.gameState.combatActive = false;
        
        // Check for special effects that need to be cleared
        this.checkEffects();
    }
    
    // Player attacks the enemy
    playerAttack() {
        if (!this.playerTurn) {
            engine.print('system', 'It\'s not your turn to attack.');
            return;
        }
        
        const player = engine.gameState.player;
        
        // Calculate base damage
        let damage = player.strength;
        
        // Add weapon damage if equipped
        const equippedWeapon = engine.gameState.inventory.find(item => item.type === 'weapon' && item.equipped);
        if (equippedWeapon) {
            damage += equippedWeapon.damage;
        }
        
        // Apply random factor (80-120%)
        damage = Math.floor(damage * (0.8 + Math.random() * 0.4));
        
        // Apply enemy defense
        damage = Math.max(1, damage - this.currentEnemy.defense);
        
        // Apply damage to enemy
        this.currentEnemy.health = Math.max(0, this.currentEnemy.health - damage);
        
        // Display attack message
        if (equippedWeapon) {
            engine.print('combat', `You attack the ${this.currentEnemy.name} with your ${equippedWeapon.name} for ${damage} damage!`);
        } else {
            engine.print('combat', `You attack the ${this.currentEnemy.name} with your bare hands for ${damage} damage!`);
        }
        
        // Check if enemy is defeated
        if (this.currentEnemy.health <= 0) {
            this.endCombat(true);
            return;
        }
        
        // Switch to enemy turn
        this.playerTurn = false;
        this.displayCombatStatus();
        
        // Enemy attacks after a short delay
        setTimeout(() => this.enemyAttack(), 1000);
    }
    
    // Enemy attacks the player
    enemyAttack() {
        if (this.playerTurn || !this.currentEnemy) {
            return;
        }
        
        const player = engine.gameState.player;
        
        // Calculate base damage
        let damage = this.currentEnemy.strength;
        
        // Apply random factor (80-120%)
        damage = Math.floor(damage * (0.8 + Math.random() * 0.4));
        
        // Apply player defense
        damage = Math.max(1, damage - player.defense);
        
        // Apply damage to player
        player.health = Math.max(0, player.health - damage);
        
        // Display attack message
        engine.print('combat', `The ${this.currentEnemy.name} attacks you for ${damage} damage!`);
        
        // Check if player is defeated
        if (player.health <= 0) {
            this.playerDefeated();
            return;
        }
        
        // Switch to player turn
        this.playerTurn = true;
        this.turnCount++;
        this.displayCombatStatus();
        
        // Check for turn-based effects
        this.checkEffects();
    }
    
    // Player uses an item in combat
    useItem(itemName) {
        if (!this.playerTurn) {
            engine.print('system', 'It\'s not your turn.');
            return;
        }
        
        const itemIndex = engine.gameState.inventory.findIndex(
            item => item.name.toLowerCase() === itemName.toLowerCase()
        );
        
        if (itemIndex === -1) {
            engine.print('system', `You don't have a ${itemName}.`);
            return;
        }
        
        const item = engine.gameState.inventory[itemIndex];
        
        if (!item.canUse) {
            engine.print('system', `You can't use the ${item.name} in combat.`);
            return;
        }
        
        // Use the item
        const consumed = item.onUse(engine);
        
        // Remove consumable items after use
        if (consumed && item.consumable) {
            engine.gameState.inventory.splice(itemIndex, 1);
        }
        
        // Switch to enemy turn
        this.playerTurn = false;
        this.displayCombatStatus();
        
        // Enemy attacks after a short delay
        setTimeout(() => this.enemyAttack(), 1000);
    }
    
    // Player attempts to flee from combat
    flee() {
        if (!this.playerTurn) {
            engine.print('system', 'It\'s not your turn.');
            return;
        }
        
        // 60% chance to flee successfully
        if (Math.random() < 0.6) {
            this.endCombat(false);
        } else {
            engine.print('combat', 'You failed to escape!');
            
            // Switch to enemy turn
            this.playerTurn = false;
            
            // Enemy attacks after a short delay
            setTimeout(() => this.enemyAttack(), 1000);
        }
    }
    
    // Display combat status
    displayCombatStatus() {
        const player = engine.gameState.player;
        
        engine.print('system', '-------------------');
        engine.print('system', `${player.name}: HP ${player.health}/${player.maxHealth}`);
        engine.print('system', `${this.currentEnemy.name}: HP ${this.currentEnemy.health}/${this.currentEnemy.maxHealth}`);
        
        if (this.playerTurn) {
            engine.print('system', 'Your turn. Commands: attack, use [item], flee');
        } else {
            engine.print('system', `${this.currentEnemy.name}'s turn...`);
        }
    }
    
    // Handle player defeat
    playerDefeated() {
        engine.print('combat', 'You have been defeated!');
        
        // Respawn at village with half health
        engine.gameState.player.health = Math.ceil(engine.gameState.player.maxHealth / 2);
        engine.gameState.currentLocation = game.locations.find(loc => loc.id === 'village_square');
        
        engine.print('system', 'You wake up in the village square, having been rescued by the villagers.');
        
        this.currentEnemy = null;
        engine.gameState.combatActive = false;
    }
    
    // Check for level up
    checkLevelUp() {
        const player = engine.gameState.player;
        
        if (player.experience >= player.experienceToNextLevel) {
            player.level++;
            player.experience -= player.experienceToNextLevel;
            player.experienceToNextLevel = Math.floor(player.experienceToNextLevel * 1.5);
            
            // Increase stats
            player.maxHealth += 20;
            player.health = player.maxHealth;
            player.strength += 2;
            player.defense += 1;
            
            engine.print('system', `Congratulations! You reached level ${player.level}!`);
            engine.print('system', 'Your stats have increased:');
            engine.print('system', `Max Health: +20 (${player.maxHealth})`);
            engine.print('system', `Strength: +2 (${player.strength})`);
            engine.print('system', `Defense: +1 (${player.defense})`);
        }
    }
    
    // Drop loot from defeated enemy
    dropLoot() {
        const currentLocation = engine.gameState.currentLocation;
        
        this.currentEnemy.loot.forEach(lootItem => {
            // Check drop chance
            if (Math.random() * 100 <= lootItem.dropChance) {
                currentLocation.items.push(lootItem.item);
                engine.print('system', `The ${this.currentEnemy.name} dropped: ${lootItem.item.name}`);
            }
        });
    }
    
    // Check for quest updates based on combat
    checkQuestUpdates() {
        // Example: Update kill quests
        // This would be expanded based on actual quest requirements
        const questLog = engine.gameState.questLog;
        
        questLog.forEach(quest => {
            if (quest.objectives) {
                quest.objectives.forEach(objective => {
                    // Check if objective is to kill this type of enemy
                    if (objective.type === 'kill' && 
                        objective.targetId === this.currentEnemy.id &&
                        !objective.completed) {
                        
                        objective.progress = (objective.progress || 0) + 1;
                        
                        if (objective.progress >= objective.required) {
                            objective.completed = true;
                            engine.print('system', `Quest objective completed: ${objective.description}`);
                            
                            // Check if all objectives are complete
                            const allComplete = quest.objectives.every(obj => obj.completed);
                            if (allComplete) {
                                quest.completed = true;
                                engine.print('system', `Quest completed: ${quest.name}`);
                                
                                // Award quest rewards if any
                                if (quest.rewards) {
                                    this.giveQuestRewards(quest.rewards);
                                }
                            }
                        } else {
                            engine.print('system', `Quest progress: ${objective.progress}/${objective.required} ${this.currentEnemy.name}s defeated`);
                        }
                    }
                });
            }
        });
    }
    
    // Give quest rewards
    giveQuestRewards(rewards) {
        const player = engine.gameState.player;
        
        if (rewards.experience) {
            player.experience += rewards.experience;
            engine.print('system', `You gained ${rewards.experience} experience points.`);
            this.checkLevelUp();
        }
        
        if (rewards.items) {
            rewards.items.forEach(item => {
                engine.gameState.inventory.push(item);
                engine.print('system', `You received: ${item.name}`);
            });
        }
    }
    
    // Check for turn-based effects
    checkEffects() {
        // Check for strength elixir duration
        if (engine.gameState.gameFlags.strengthElixirActive) {
            engine.gameState.gameFlags.strengthElixirTurns--;
            
            if (engine.gameState.gameFlags.strengthElixirTurns <= 0) {
                engine.gameState.player.strength -= 5;
                engine.gameState.gameFlags.strengthElixirActive = false;
                engine.print('system', 'The effects of the strength elixir have worn off.');
            }
        }
        
        // Other status effects would be checked here
    }
}

// Create global combat instance
game.combat = new CombatSystem();

