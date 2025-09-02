/**
 * Story - Contains the main storyline and narrative elements
 */

const story = {
    // Game introduction
    intro: `In the land of Eldoria, an ancient prophecy speaks of darkness returning after a thousand years of peace. 
    
The Dark One, a being of pure shadow who was sealed away by the combined power of three magical crystals, stirs in his prison. The seal weakens with each passing day.

You are a traveler who has arrived in the small village of Eldervale, drawn by strange dreams and an inexplicable feeling that your destiny awaits. Little do you know that you are the one spoken of in the prophecy - the one who must find the three Crystals of Power and prevent the Dark One's return.

Your journey begins now...`,
    
    // Major story beats
    storyBeats: {
        // Receiving the quest
        questStart: {
            title: 'The Prophecy Revealed',
            text: `The Elder Sage's eyes widen as you enter his humble abode. "I have been waiting for you," he says, though you've never met before.

He tells you of the ancient prophecy and the three Crystals of Power that must be found before the next full moon. Without them, the Dark One will break free from his prison and plunge the world into eternal darkness.

"The dreams that led you here were no coincidence," the Elder explains. "You are the Chosen One who can find the crystals and stop the Dark One's return."

He hands you an ancient map showing the locations of the three crystals: the Crystal of Earth hidden in the Sacred Grove, the Crystal of Water in the depths of the Misty Lake, and the Crystal of Fire within the Volcanic Caverns.

Your quest has begun.`
        },
        
        // Finding the first crystal
        firstCrystal: {
            title: 'The Crystal of Earth',
            text: `As you enter the Sacred Grove, you feel a profound connection to the natural world around you. The trees seem to whisper ancient secrets, and the ground beneath your feet pulses with energy.

In the center of the grove stands the Ancient Tree, its bark inscribed with symbols that shift and change as you watch. At its base, nestled among the roots, you spot a glowing green crystal - the Crystal of Earth.

As you reach for it, the forest comes alive. Roots and vines move of their own accord, testing your resolve. They are not attacking, but rather judging if you are worthy.

You stand your ground, showing respect for the ancient powers of the forest. The vines retreat, and the Crystal of Earth floats into your outstretched hand.

A voice, like the rustling of leaves, speaks in your mind: "The Earth has chosen you. Two more remain."`
        },
        
        // Finding the second crystal
        secondCrystal: {
            title: 'The Crystal of Water',
            text: `The Misty Lake is shrouded in an unnatural fog that parts before you as if recognizing your purpose. You learn from the fishing village that none who have sought the underwater cave have returned.

With the help of a magical amulet that allows you to breathe underwater, you descend into the depths of the lake. The underwater cave is a marvel of natural beauty, illuminated by bioluminescent algae.

Deep within the cave, you encounter a Shadow Wraith guarding the Crystal of Water. After a fierce battle, you defeat the creature and claim the crystal.

As your fingers close around the blue crystal, you hear a sound like distant waves crashing on a shore. A voice speaks in your mind: "The Water has chosen you. One more remains."`
        },
        
        // Finding the third crystal
        thirdCrystal: {
            title: 'The Crystal of Fire',
            text: `The Volcanic Caverns are a hellish landscape of bubbling lava and searing heat. Without the protective enchantment you acquired, you would be burned alive in seconds.

At the heart of the caverns, you find a Corrupted Guardian - once a protector of the sacred temple, now twisted by dark magic. The battle is grueling, but you emerge victorious.

The Crystal of Fire hovers above a pool of lava, pulsing with inner flames. As you claim it, the heat in the cavern intensifies momentarily before subsiding.

A voice like crackling flames speaks in your mind: "The Fire has chosen you. The three are united once more."`
        },
        
        // Entering the temple
        templeEntry: {
            title: 'The Ancient Temple',
            text: `With all three crystals in your possession, you return to the forest clearing where the hidden path to the Ancient Temple is revealed. The Temple Amulet you found allows you to open the massive stone doors.

Inside, the temple is a marvel of ancient architecture, with towering columns and walls covered in murals depicting the first sealing of the Dark One. The main hall branches into different chambers, including a vast library containing knowledge from a forgotten age.

As you explore, you learn more about the Dark One and the original heroes who sealed him away. You discover that the three crystals must be placed on the altar in the Inner Sanctum to reinforce the seal.

But you also learn a disturbing truth - the Dark One cannot be sealed away permanently. The cycle will continue, and in another thousand years, another chosen one will need to repeat your quest.

Unless...there is another way, hinted at in the most ancient texts. A way to end the cycle forever, though at great risk.`
        },
        
        // Final confrontation
        finalBattle: {
            title: 'Confronting the Darkness',
            text: `As you enter the Inner Sanctum with the three crystals, the air grows thick with malevolence. The shadows in the center of the room coalesce into a towering figure - the Dark One has partially broken through his prison, drawn by the presence of the crystals.

"At last," a voice like the void itself speaks, "the keys to my freedom have arrived."

You have a choice - place the crystals on the altar to reinforce the seal as intended, or attempt the riskier path you discovered in the ancient texts: use the crystals to draw the Dark One fully into this world, then defeat him permanently.

The battle is the most challenging you've ever faced. The Dark One commands shadows and darkness itself, and each strike drains your very life force. But with the power of the three crystals amplifying your abilities, you stand a chance.

As the Dark One weakens, you channel the combined power of Earth, Water, and Fire into a final, devastating attack. The chamber fills with blinding light as darkness and light annihilate each other.`
        },
        
        // Endings
        endings: {
            // If player chooses to seal the Dark One again
            sealEnding: {
                title: 'The Cycle Continues',
                text: `You place the three crystals on the altar, and they rise into the air, forming a triangle of power. Beams of light - green, blue, and red - shoot from the crystals toward the Dark One.

The shadowy figure howls in rage as he is forced back into his prison. The seal is restored, stronger than before, and will hold for another thousand years.

You emerge from the temple a hero. Songs are sung of your bravery, and your name is added to the ancient prophecy for future generations.

Yet as you celebrate with the people of Eldervale, you can't help but wonder about the hero who will stand in your place a thousand years from now, when the Dark One stirs again.

The cycle continues, as it has for millennia.

THE END`
            },
            
            // If player chooses to defeat the Dark One permanently
            trueEnding: {
                title: 'Breaking the Cycle',
                text: `As the light fades, you find yourself still standing. Of the Dark One, there is no sign - not even a shadow remains. You have succeeded where all others failed, ending the cycle of imprisonment and return.

The three crystals, having expended their power, crumble to dust in your hands. Their purpose fulfilled after countless ages.

As you leave the temple, you notice changes in the world around you. Colors seem brighter, the air fresher. Without the Dark One's malevolent presence, even if sealed away, the world can truly flourish.

The Elder Sage meets you at the temple entrance, amazement on his face. "You did not simply seal him away," he says in wonder. "You ended it. After all these millennia, you broke the cycle."

Your name will be remembered not just as a hero who saved the world, but as the one who changed its destiny forever.

THE END`
            },
            
            // If player is defeated by the Dark One
            darkEnding: {
                title: 'Darkness Ascendant',
                text: `Despite your best efforts, the Dark One proves too powerful. As you fall to your knees, the three crystals slip from your grasp, rolling across the floor of the Inner Sanctum.

The Dark One laughs, a sound that chills your very soul. "The prophecy spoke true - you brought the keys to my prison. But it failed to mention your defeat."

With a gesture, he draws the power from the crystals, shattering them in the process. Fully manifested in the world once more, the Dark One steps over your fallen form and exits the temple.

Darkness spreads across the land like a plague. The sun is blotted from the sky, and shadows come alive with malevolent purpose.

Yet a spark of hope remains. As consciousness fades, you hear the Elder Sage's voice in your mind: "This is not the end. Darkness cannot exist without light. Another will rise..."

GAME OVER`
            }
        }
    },
    
    // Side quests
    sideQuests: [
        {
            id: 'missing_blacksmith_tools',
            title: 'The Blacksmith\'s Missing Tools',
            description: 'The village blacksmith has had her specialized tools stolen by bandits. Recover them from the abandoned cabin in the forest.',
            startLocation: 'blacksmith',
            endLocation: 'blacksmith',
            targetItem: 'blacksmith_tools',
            reward: {
                experience: 50,
                items: [items.silverBlade]
            },
            dialogStart: 'Blacksmith: "I can\'t work properly without my specialized tools. Some bandits raided my shop last week and took them. I heard they\'re hiding out in an abandoned cabin in the forest. If you could get my tools back, I\'d make it worth your while."',
            dialogComplete: 'Blacksmith: "My tools! Thank you! As promised, here\'s something special - a silver blade I\'ve been working on. It\'s particularly effective against dark creatures."'
        },
        
        {
            id: 'tavern_rare_ale',
            title: 'The Tavern\'s Rare Ale',
            description: 'The tavern keeper needs a rare mushroom that grows in the Sacred Grove to brew his famous ale.',
            startLocation: 'tavern',
            endLocation: 'tavern',
            targetItem: 'luminous_mushroom',
            reward: {
                experience: 40,
                items: [items.strengthElixir]
            },
            dialogStart: 'Tavern Keeper: "My famous Glowing Ale is requested by travelers from far and wide, but I\'m out of the key ingredient - luminous mushrooms that only grow in the Sacred Grove. Bring me some, and I\'ll make it worth your while."',
            dialogComplete: 'Tavern Keeper: "Excellent! These mushrooms are perfect. Here, take this strength elixir - it\'s made from last season\'s batch. It\'ll give you quite the boost when you need it!"'
        },
        
        {
            id: 'fishing_village_monster',
            title: 'The Lake Monster',
            description: 'The fishing village is being terrorized by a lake monster that\'s destroying their nets and boats.',
            startLocation: 'fishing_village',
            endLocation: 'fishing_village',
            targetEnemy: 'lake_monster',
            reward: {
                experience: 100,
                items: [items.templeAmulet]
            },
            dialogStart: 'Village Elder: "Our village is in peril! A monster has appeared in the lake, destroying our livelihood. We are simple folk and cannot fight such a creature. Please help us!"',
            dialogComplete: 'Village Elder: "You\'ve saved our village! This ancient amulet has been passed down through generations. Legend says it opens the way to the forgotten temple. Take it with our eternal gratitude."'
        }
    ],
    
    // Character backstories
    characterBackstories: {
        elderSage: `The Elder Sage, whose true name has been forgotten even by himself, has lived in Eldervale for as long as anyone can remember. Some whisper that he is immortal, bound to the village to guide each new Chosen One when the time comes.

In his youth, he was a powerful mage who traveled the world seeking knowledge. It was he who discovered the prophecy of the Dark One's return and dedicated his life to preparing for it.

The weight of this knowledge has bent his back and whitened his hair, but his eyes remain sharp and his mind sharper still.`,
        
        mysteriousStranger: `The Mysterious Stranger arrived in Eldervale shortly before you, though few have spoken with them. Those who have report an unsettling feeling, as if the stranger can see right through them.

Unknown to the villagers, the stranger is a former acolyte of the Dark One who has broken free from their master's influence. They seek redemption by guiding the Chosen One subtly, though they dare not reveal their true nature for fear of rejection.

The knowledge they possess could be invaluable, but can they truly be trusted?`,
        
        darkOne: `Once a mortal mage of extraordinary power, the being now known only as the Dark One sought immortality at any cost. Through forbidden rituals, they bound their essence to the shadows themselves, gaining immense power but losing their humanity in the process.

For centuries, they ruled through fear until three heroes wielding the Crystals of Power managed to seal them away. But the seal was imperfect - the Dark One's consciousness remained active, whispering to susceptible minds, spreading corruption even from within their prison.

With each cycle of imprisonment and near-escape, the Dark One has learned and adapted. This time, they are more prepared than ever before.`
    }
};

// Export story
game.story = story;

