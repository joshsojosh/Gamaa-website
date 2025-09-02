/**
 * Locations - Defines all locations in the game world
 */

class Location {
    constructor(id, name, description) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.exits = [];
        this.characters = [];
        this.items = [];
        this.features = [];
        this.onEnter = null;
    }
    
    addExit(direction, leadsTo, locked = false, lockMessage = null) {
        this.exits.push({
            direction: direction,
            leadsTo: leadsTo,
            locked: locked,
            lockMessage: lockMessage
        });
    }
    
    addCharacter(character) {
        this.characters.push(character);
    }
    
    addItem(item) {
        this.items.push(item);
    }
    
    addFeature(name, description) {
        this.features.push({
            name: name,
            description: description
        });
    }
}

// Create locations
const locations = [
    // Village locations
    new Location(
        'village_square',
        'Village Square',
        'The central square of Eldervale Village. Stone buildings surround a well-maintained plaza with a central fountain. Villagers go about their daily business, occasionally glancing at you with curiosity.'
    ),
    
    new Location(
        'elder_house',
        'Elder\'s House',
        'A modest but well-kept stone house. Ancient tomes and scrolls line the walls, and the air smells of herbs and old parchment. A large crystal ball sits on a central table, glowing faintly.'
    ),
    
    new Location(
        'tavern',
        'The Sleeping Dragon Tavern',
        'A warm, inviting tavern filled with the sounds of conversation and laughter. The smell of ale and roasted meat fills the air. A fire crackles in the hearth, casting dancing shadows on the wooden walls.'
    ),
    
    new Location(
        'blacksmith',
        'Village Blacksmith',
        'The heat from the forge hits you as you enter. The rhythmic sound of hammer on metal rings through the air. Weapons and armor of various qualities are displayed on the walls.'
    ),
    
    new Location(
        'village_gate',
        'Village Gate',
        'The large wooden gates that mark the entrance to Eldervale Village. Beyond lies the path to the wider world, fraught with both adventure and danger.'
    ),
    
    // Forest locations
    new Location(
        'forest_path',
        'Forest Path',
        'A narrow dirt path winding through the ancient forest. Towering trees block much of the sunlight, creating a green-tinted twilight. The sounds of wildlife can be heard all around you.'
    ),
    
    new Location(
        'forest_clearing',
        'Forest Clearing',
        'A peaceful clearing in the heart of the forest. Sunlight streams down, illuminating a carpet of wildflowers. A large, ancient tree stands in the center, its branches reaching toward the sky.'
    ),
    
    new Location(
        'abandoned_cabin',
        'Abandoned Cabin',
        'A dilapidated wooden cabin, long abandoned. The roof has partially collapsed, and nature is slowly reclaiming the structure. Despite its condition, it might offer shelter from the elements.'
    ),
    
    new Location(
        'sacred_grove',
        'Sacred Grove',
        'An otherworldly grove where the trees seem to whisper ancient secrets. The air is thick with magic, and ethereal lights float among the trees. The Crystal of Earth is said to be hidden here.'
    ),
    
    // Lake locations
    new Location(
        'lake_shore',
        'Misty Lake Shore',
        'The shore of a vast lake shrouded in mist. The water is still and dark, reflecting the sky like a mirror. Strange shapes can occasionally be seen moving beneath the surface.'
    ),
    
    new Location(
        'fishing_village',
        'Fishing Village',
        'A small settlement of wooden huts built on stilts over the lake. Fishing nets hang to dry, and boats gently rock in the water. The villagers here are wary of strangers.'
    ),
    
    new Location(
        'underwater_cave',
        'Underwater Cave',
        'A mysterious cave beneath the lake, accessible through a hidden entrance. The walls glow with bioluminescent fungi, illuminating ancient carvings. The Crystal of Water is rumored to be hidden in its depths.'
    ),
    
    // Mountain locations
    new Location(
        'mountain_path',
        'Mountain Path',
        'A treacherous path winding up the side of a steep mountain. The air grows thinner as you climb, and the view of the lands below becomes more spectacular.'
    ),
    
    new Location(
        'abandoned_mine',
        'Abandoned Mine',
        'The entrance to an old mine, its supports creaking ominously. Rusted tools and carts lie scattered about, evidence of its hasty abandonment. Strange noises echo from deep within.'
    ),
    
    new Location(
        'volcanic_cavern',
        'Volcanic Cavern',
        'A vast cavern deep within the mountain, illuminated by rivers of molten lava. The heat is almost unbearable, and the air shimmers with it. The Crystal of Fire is said to be hidden somewhere in this hellish place.'
    ),
    
    // Temple locations
    new Location(
        'temple_entrance',
        'Ancient Temple Entrance',
        'The imposing entrance to a temple built by a long-forgotten civilization. Massive stone doors, covered in intricate carvings, stand partially open. A sense of foreboding hangs in the air.'
    ),
    
    new Location(
        'temple_hall',
        'Temple Main Hall',
        'A vast hall supported by towering columns. Shafts of light pierce through holes in the ceiling, illuminating dust particles dancing in the air. The walls are covered in murals depicting an ancient battle.'
    ),
    
    new Location(
        'temple_library',
        'Temple Library',
        'A repository of ancient knowledge. Most of the scrolls and books have crumbled to dust, but some remain intact, protected by preservation spells. The secrets of the Crystals might be found here.'
    ),
    
    new Location(
        'inner_sanctum',
        'Temple Inner Sanctum',
        'The heart of the temple, a circular chamber with a raised dais in the center. The air thrums with power, and shadows seem to move of their own accord. This is where the final confrontation with the Dark One will take place.'
    )
];

// Define connections between locations
// Village connections
locations[0].addExit('north', 'elder_house');
locations[0].addExit('east', 'tavern');
locations[0].addExit('south', 'village_gate');
locations[0].addExit('west', 'blacksmith');

locations[1].addExit('south', 'village_square');

locations[2].addExit('west', 'village_square');

locations[3].addExit('east', 'village_square');

locations[4].addExit('north', 'village_square');
locations[4].addExit('south', 'forest_path');

// Forest connections
locations[5].addExit('north', 'village_gate');
locations[5].addExit('east', 'forest_clearing');
locations[5].addExit('west', 'abandoned_cabin');

locations[6].addExit('west', 'forest_path');
locations[6].addExit('north', 'sacred_grove', true, 'The path is blocked by thick, thorny vines that seem to move with a will of their own.');

locations[7].addExit('east', 'forest_path');

locations[8].addExit('south', 'forest_clearing');

// Lake connections
locations[5].addExit('south', 'lake_shore');

locations[9].addExit('north', 'forest_path');
locations[9].addExit('east', 'fishing_village');
locations[9].addExit('down', 'underwater_cave', true, 'You need diving equipment or magic to breathe underwater.');

locations[10].addExit('west', 'lake_shore');

locations[11].addExit('up', 'lake_shore');

// Mountain connections
locations[4].addExit('east', 'mountain_path');

locations[12].addExit('west', 'village_gate');
locations[12].addExit('up', 'abandoned_mine');

locations[13].addExit('down', 'mountain_path');
locations[13].addExit('east', 'volcanic_cavern', true, 'The heat is too intense to proceed without protection.');

locations[14].addExit('west', 'abandoned_mine');

// Temple connections
locations[6].addExit('east', 'temple_entrance', true, 'The path is overgrown and hidden. You need to find a way to reveal it.');

locations[15].addExit('west', 'forest_clearing');
locations[15].addExit('north', 'temple_hall', true, 'The massive doors are sealed with ancient magic. You need the Temple Amulet to enter.');

locations[16].addExit('south', 'temple_entrance');
locations[16].addExit('east', 'temple_library');
locations[16].addExit('north', 'inner_sanctum', true, 'A powerful barrier blocks the way. You need all three Crystals of Power to proceed.');

locations[17].addExit('west', 'temple_hall');

locations[18].addExit('south', 'temple_hall');

// Add characters to locations
locations[0].addCharacter(characters.villageGuard);
locations[1].addCharacter(characters.elderSage);
locations[2].addCharacter(characters.tavernKeeper);
locations[2].addCharacter(characters.mysteriousStranger);
locations[3].addCharacter(characters.blacksmith);

// Add enemies to locations
locations[5].addCharacter(characters.forestWolf);
locations[7].addCharacter(characters.bandit);
locations[11].addCharacter(characters.shadowWraith);
locations[14].addCharacter(characters.corruptedGuardian);
locations[18].addCharacter(characters.darkOne);

// Add items to locations
locations[3].addItem(items.ironSword);
locations[3].addItem(items.leatherArmor);
locations[7].addItem(items.rustedKey);
locations[10].addItem(items.templeAmulet);
locations[8].addItem(items.crystalOfEarth);
locations[11].addItem(items.crystalOfWater);
locations[14].addItem(items.crystalOfFire);

// Add features to locations
locations[0].addFeature('fountain', 'A beautiful stone fountain depicting heroes of legend. Water cascades down from the top, creating a soothing sound.');
locations[6].addFeature('ancient tree', 'An enormous tree that must be centuries old. Its bark is covered in strange symbols that seem to shift when you\'re not looking directly at them.');
locations[9].addFeature('mist', 'A thick mist hovers over the lake, obscuring visibility. It seems to move in unnatural patterns, as if guided by an unseen force.');
locations[14].addFeature('lava pool', 'A bubbling pool of molten lava that casts an orange glow throughout the cavern. The heat coming from it is intense.');
locations[16].addFeature('murals', 'Ancient murals depicting a great battle between light and darkness. One figure, shrouded in shadow, stands out - the Dark One of legend.');

// Add special location behaviors
locations[8].onEnter = function(engine) {
    if (!engine.gameState.gameFlags.sacredGroveFirstVisit) {
        engine.print('narrative', 'As you enter the Sacred Grove, you feel a profound sense of peace wash over you. The air is filled with magic, and the trees seem to welcome your presence.');
        engine.gameState.gameFlags.sacredGroveFirstVisit = true;
    }
};

locations[11].onEnter = function(engine) {
    if (!engine.gameState.gameFlags.underwaterCaveFirstVisit) {
        engine.print('narrative', 'The underwater cave is a marvel of natural beauty. Bioluminescent algae provide an ethereal blue light, revealing ancient structures built by a civilization long forgotten.');
        engine.gameState.gameFlags.underwaterCaveFirstVisit = true;
    }
};

locations[14].onEnter = function(engine) {
    if (!engine.gameState.gameFlags.volcanicCavernFirstVisit) {
        engine.print('narrative', 'The heat in the volcanic cavern is almost unbearable. Rivers of molten lava flow through channels in the floor, and the air shimmers with heat haze. Despite the danger, there\'s a raw beauty to this place.');
        engine.gameState.gameFlags.volcanicCavernFirstVisit = true;
    }
};

locations[18].onEnter = function(engine) {
    if (!engine.gameState.gameFlags.finalBattleTriggered) {
        engine.print('narrative', 'As you enter the Inner Sanctum, the three Crystals of Power begin to glow brightly. Suddenly, the shadows in the center of the room coalesce into a towering figure - the Dark One has awakened!');
        engine.gameState.gameFlags.finalBattleTriggered = true;
        
        // Start the final battle
        game.combat.startCombat(characters.darkOne);
    }
};

// Export locations
game.locations = locations;

