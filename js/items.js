/**
 * Items - Defines all items in the game
 */

class Item {
    constructor(id, name, description, type) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.type = type; // 'weapon', 'armor', 'consumable', 'quest', 'key', 'misc'
        this.canTake = true;
        this.canUse = false;
        this.consumable = false;
        this.equipped = false;
        this.onTake = null;
        this.onDrop = null;
        this.onUse = null;
        this.onEquip = null;
    }
}

class Weapon extends Item {
    constructor(id, name, description, damage) {
        super(id, name, description, 'weapon');
        this.damage = damage;
        this.bonus = Math.floor(damage / 2); // Strength bonus when equipped
    }
}

class Armor extends Item {
    constructor(id, name, description, protection) {
        super(id, name, description, 'armor');
        this.protection = protection;
        this.bonus = protection; // Defense bonus when equipped
    }
}

class Consumable extends Item {
    constructor(id, name, description, effect) {
        super(id, name, description, 'consumable');
        this.effect = effect;
        this.canUse = true;
        this.consumable = true;
    }
}

// Define items
const items = {
    // Weapons
    rustyDagger: new Weapon(
        'rusty_dagger',
        'Rusty Dagger',
        'An old, rusty dagger. It\'s not much, but it\'s better than nothing.',
        5
    ),
    
    ironSword: new Weapon(
        'iron_sword',
        'Iron Sword',
        'A standard iron sword. Well-balanced and reliable.',
        10
    ),
    
    silverBlade: new Weapon(
        'silver_blade',
        'Silver Blade',
        'A finely crafted blade made of pure silver. It glows faintly in the presence of dark magic.',
        15
    ),
    
    voidblade: new Weapon(
        'voidblade',
        'Voidblade',
        'A legendary weapon forged from the essence of the void. It seems to absorb light around it.',
        25
    ),
    
    // Armor
    leatherArmor: new Armor(
        'leather_armor',
        'Leather Armor',
        'Basic leather armor that provides minimal protection.',
        5
    ),
    
    chainmail: new Armor(
        'chainmail',
        'Chainmail',
        'A shirt made of interlocking metal rings. Offers good protection against slashing attacks.',
        10
    ),
    
    stoneArmor: new Armor(
        'stone_armor',
        'Stone Armor',
        'Heavy armor made from enchanted stone. Despite its weight, it\'s surprisingly comfortable to wear.',
        15
    ),
    
    shadowCloak: new Armor(
        'shadow_cloak',
        'Shadow Cloak',
        'A cloak woven from shadow itself. It shifts and moves as if alive.',
        20
    ),
    
    // Consumables
    healthPotion: new Consumable(
        'health_potion',
        'Health Potion',
        'A red potion that restores health when consumed.',
        'Restores 50 health points.'
    ),
    
    strengthElixir: new Consumable(
        'strength_elixir',
        'Strength Elixir',
        'A glowing orange elixir that temporarily increases strength.',
        'Increases strength by 5 for 10 turns.'
    ),
    
    antidote: new Consumable(
        'antidote',
        'Antidote',
        'A green liquid that cures poison.',
        'Cures poison status effect.'
    ),
    
    // Quest items
    ancientMap: new Item(
        'ancient_map',
        'Ancient Map',
        'A weathered map showing the locations of the three Crystals of Power.',
        'quest'
    ),
    
    crystalOfEarth: new Item(
        'crystal_of_earth',
        'Crystal of Earth',
        'A green crystal pulsing with the power of nature and earth.',
        'quest'
    ),
    
    crystalOfWater: new Item(
        'crystal_of_water',
        'Crystal of Water',
        'A blue crystal that seems to flow like water even though it\'s solid.',
        'quest'
    ),
    
    crystalOfFire: new Item(
        'crystal_of_fire',
        'Crystal of Fire',
        'A red crystal that radiates heat and occasionally flickers with inner flames.',
        'quest'
    ),
    
    darkCrystal: new Item(
        'dark_crystal',
        'Dark Crystal',
        'A black crystal that seems to absorb light. It feels cold to the touch and whispers can be heard emanating from it.',
        'quest'
    ),
    
    // Keys and access items
    rustedKey: new Item(
        'rusted_key',
        'Rusted Key',
        'An old, rusted key. It might still work on an equally old lock.',
        'key'
    ),
    
    templeAmulet: new Item(
        'temple_amulet',
        'Temple Amulet',
        'An ancient amulet bearing the symbol of the forgotten temple. It might grant access to sacred areas.',
        'key'
    ),
    
    // Miscellaneous items
    wolfFang: new Item(
        'wolf_fang',
        'Wolf Fang',
        'A sharp fang from a forest wolf.',
        'misc'
    ),
    
    wolfPelt: new Item(
        'wolf_pelt',
        'Wolf Pelt',
        'The pelt of a forest wolf. It could be useful for crafting or trading.',
        'misc'
    ),
    
    leatherPouch: new Item(
        'leather_pouch',
        'Leather Pouch',
        'A small pouch containing a few gold coins.',
        'misc'
    ),
    
    shadowEssence: new Item(
        'shadow_essence',
        'Shadow Essence',
        'A vial containing a swirling dark substance. It\'s cold to the touch.',
        'misc'
    ),
    
    enchantedAmulet: new Item(
        'enchanted_amulet',
        'Enchanted Amulet',
        'An amulet that glows with magical energy. It seems to enhance the wearer\'s natural abilities.',
        'misc'
    ),
    
    guardianCore: new Item(
        'guardian_core',
        'Guardian Core',
        'The pulsing energy core of a corrupted guardian. It contains immense power.',
        'misc'
    )
};

// Add custom behaviors
items.healthPotion.onUse = function(engine) {
    const player = engine.gameState.player;
    const healAmount = 50;
    
    if (player.health >= player.maxHealth) {
        engine.print('system', 'Your health is already full.');
        return false; // Don't consume the potion
    }
    
    player.health = Math.min(player.health + healAmount, player.maxHealth);
    engine.print('system', `You drink the health potion and restore ${healAmount} health points.`);
    return true; // Consume the potion
};

items.strengthElixir.onUse = function(engine) {
    const player = engine.gameState.player;
    
    if (engine.gameState.gameFlags.strengthElixirActive) {
        engine.print('system', 'You already have an active strength elixir effect.');
        return false; // Don't consume the elixir
    }
    
    player.strength += 5;
    engine.gameState.gameFlags.strengthElixirActive = true;
    engine.gameState.gameFlags.strengthElixirTurns = 10;
    
    engine.print('system', 'You drink the strength elixir and feel power surging through your body.');
    return true; // Consume the elixir
};

items.ancientMap.canUse = true;
items.ancientMap.onUse = function(engine) {
    engine.print('system', 'You examine the ancient map carefully.');
    engine.print('narrative', 'The map shows three locations marked with crystal symbols:');
    engine.print('narrative', '1. The Crystal of Earth - Hidden in the Ancient Forest');
    engine.print('narrative', '2. The Crystal of Water - Beneath the depths of the Misty Lake');
    engine.print('narrative', '3. The Crystal of Fire - Within the Volcanic Caverns');
    return false; // Don't consume the map
};

// Export items
game.items = items;

