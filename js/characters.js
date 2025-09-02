/**
 * Characters - Defines all NPCs and enemies in the game
 */

class Character {
    constructor(id, name, description, dialog, isEnemy = false) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.dialog = dialog;
        this.isEnemy = isEnemy;
        this.onTalk = null;
    }
}

class Enemy extends Character {
    constructor(id, name, description, level, health, strength, defense, experience) {
        super(id, name, description, null, true);
        this.level = level;
        this.health = health;
        this.maxHealth = health;
        this.strength = strength;
        this.defense = defense;
        this.experience = experience;
        this.loot = [];
    }
    
    addLoot(item, dropChance) {
        this.loot.push({
            item: item,
            dropChance: dropChance // 0-100 percentage
        });
    }
}

// Define characters
const characters = {
    // NPCs
    elderSage: new Character(
        'elder_sage',
        'Elder Sage',
        'An ancient sage with a long white beard and wise eyes that seem to see beyond the physical realm.',
        'Welcome, traveler. The shadows grow longer as the prophecy unfolds. You must find the three Crystals of Power before the Dark One returns.'
    ),
    
    villageGuard: new Character(
        'village_guard',
        'Village Guard',
        'A sturdy guard with weathered armor and alert eyes.',
        'Keep your wits about you if you venture beyond the village. Strange creatures have been spotted in the forest lately.'
    ),
    
    mysteriousStranger: new Character(
        'mysterious_stranger',
        'Mysterious Stranger',
        'A cloaked figure whose face remains hidden in shadow. There\'s something unsettling about their presence.',
        'The path you walk is dangerous, but necessary. Not all is as it seems in this world. Trust your instincts, not your eyes.'
    ),
    
    tavernKeeper: new Character(
        'tavern_keeper',
        'Tavern Keeper',
        'A jovial man with a round belly and rosy cheeks. His hearty laugh fills the tavern.',
        'Welcome to the Sleeping Dragon! Best ale this side of the mountains. Heard any interesting tales on your travels?'
    ),
    
    blacksmith: new Character(
        'blacksmith',
        'Blacksmith',
        'A muscular woman with soot-stained clothes and calloused hands. Her craftsmanship is renowned throughout the region.',
        'Need something forged? I can make you a blade that'll cut through armor like butter, for the right price.'
    ),
    
    // Enemies
    forestWolf: new Enemy(
        'forest_wolf',
        'Forest Wolf',
        'A large wolf with matted gray fur and hungry yellow eyes.',
        2, // level
        30, // health
        8,  // strength
        3,  // defense
        15  // experience
    ),
    
    bandit: new Enemy(
        'bandit',
        'Bandit',
        'A rough-looking human with a scarred face and tattered clothes.',
        3, // level
        40, // health
        10, // strength
        5,  // defense
        25  // experience
    ),
    
    shadowWraith: new Enemy(
        'shadow_wraith',
        'Shadow Wraith',
        'A ghostly figure that seems to be made of darkness itself. Its eyes glow with an eerie blue light.',
        5, // level
        60, // health
        15, // strength
        8,  // defense
        50  // experience
    ),
    
    corruptedGuardian: new Enemy(
        'corrupted_guardian',
        'Corrupted Guardian',
        'Once a protector of the sacred temple, now twisted by dark magic. Its stone body is cracked, revealing pulsing purple energy within.',
        7, // level
        100, // health
        20,  // strength
        15,  // defense
        80   // experience
    ),
    
    darkOne: new Enemy(
        'dark_one',
        'The Dark One',
        'A towering figure shrouded in darkness. The air around it seems to warp and distort, as if reality itself fears its presence.',
        10, // level
        200, // health
        30,  // strength
        25,  // defense
        200  // experience
    )
};

// Add custom behaviors and loot
characters.elderSage.onTalk = function(engine) {
    if (!engine.gameState.gameFlags.receivedQuestFromSage) {
        engine.print('dialog', 'Elder Sage: "I sense a great destiny within you. Take this map, it will guide you to the first Crystal of Power."');
        
        // Add map to inventory
        const ancientMap = game.items.ancientMap;
        engine.gameState.inventory.push(ancientMap);
        engine.print('system', 'You received: Ancient Map');
        
        // Add quest to quest log
        const crystalQuest = {
            id: 'crystal_quest',
            name: 'The Three Crystals',
            description: 'Find the three Crystals of Power to prevent the return of the Dark One.',
            completed: false,
            objectives: [
                { description: 'Find the Crystal of Earth', completed: false },
                { description: 'Find the Crystal of Water', completed: false },
                { description: 'Find the Crystal of Fire', completed: false }
            ]
        };
        
        engine.gameState.questLog.push(crystalQuest);
        engine.print('system', 'New quest added: The Three Crystals');
        
        // Set flag
        engine.gameState.gameFlags.receivedQuestFromSage = true;
    } else {
        engine.print('dialog', 'Elder Sage: "Time grows short. You must find the Crystals before it\'s too late."');
    }
};

// Add loot to enemies
characters.forestWolf.addLoot(game.items.wolfFang, 75);
characters.forestWolf.addLoot(game.items.wolfPelt, 50);

characters.bandit.addLoot(game.items.rustyDagger, 60);
characters.bandit.addLoot(game.items.leatherPouch, 80);
characters.bandit.addLoot(game.items.healthPotion, 30);

characters.shadowWraith.addLoot(game.items.shadowEssence, 90);
characters.shadowWraith.addLoot(game.items.enchantedAmulet, 40);

characters.corruptedGuardian.addLoot(game.items.guardianCore, 100);
characters.corruptedGuardian.addLoot(game.items.stoneArmor, 70);

characters.darkOne.addLoot(game.items.darkCrystal, 100);
characters.darkOne.addLoot(game.items.voidblade, 100);

