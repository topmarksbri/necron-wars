// ============================================================
// LEARN MODE — STRUCTURED LESSONS
// ============================================================

const LESSONS = [
  // ──────────────────────────────────────────────────────────
  // LESSON 1: THE SHAPE OF A GAME
  // ──────────────────────────────────────────────────────────
  {
    id: 'lesson_shape',
    title: 'The Shape of a Game',
    subtitle: 'How a battle unfolds from start to finish',
    icon: '🎲',
    xp: 80,
    steps: [
      {
        type: 'text',
        heading: 'A battle has a beginning, middle, and end',
        body: 'A standard game of Warhammer 40,000 lasts <strong>5 Battle Rounds</strong>. In each round, both players take a full turn. You always know exactly when the game ends — it doesn\'t drag on until someone quits.'
      },
      {
        type: 'callout',
        icon: '🔄',
        heading: 'The Battle Round',
        body: 'Each Battle Round: <strong>Player 1 takes their full turn → Player 2 takes their full turn → Round ends.</strong> Repeat 5 times. The same player always goes first in every round — decided at the start.'
      },
      {
        type: 'text',
        heading: 'Your turn has 5 phases — always in this order',
        body: 'Every player\'s turn follows the same structure. Think of it as a rhythm you\'ll do automatically after a few games.'
      },
      {
        type: 'phases',
        phases: [
          { name: 'Command Phase', icon: '⚙️', desc: 'Gain 1 Command Point. Check if any units are shaken.' },
          { name: 'Movement Phase', icon: '👣', desc: 'Move all your units across the battlefield.' },
          { name: 'Shooting Phase', icon: '🎯', desc: 'Your units fire their ranged weapons.' },
          { name: 'Charge Phase', icon: '⚡', desc: 'Units sprint into melee range.' },
          { name: 'Fight Phase', icon: '⚔️', desc: 'Both players fight in melee — even on your opponent\'s turn.' }
        ]
      },
      {
        type: 'text',
        heading: 'How you actually win',
        body: 'You don\'t win by destroying all enemy models. You win by <strong>controlling objectives</strong> — terrain areas on the table marked as important locations. Hold more objectives than your opponent and you score <strong>Victory Points</strong>. The player with the most VP at the end of Round 5 wins.'
      },
      {
        type: 'example',
        heading: 'Example: Scoring in practice',
        body: 'There are 4 objectives on the table. At the end of your turn, you control 3 of them — you score 3VP. Your opponent controls 1 — they score 1VP. Next round you need to keep that lead while your opponent tries to claw back. This is why destroying every enemy unit is often the wrong goal — positioning matters more.'
      },
      {
        type: 'callout',
        icon: '💚',
        heading: 'Necron advantage',
        body: 'Necrons are tough and can come back from the dead. This makes them excellent at holding objectives — your Warriors park on a point, resist shooting, and if models die, some return via Reanimation Protocols. Play the objectives, not the kill count.'
      }
    ],
    quiz: [
      {
        question: 'How many Battle Rounds does a standard game last?',
        answers: ['3', '4', '5', '7'],
        correct: 2,
        explanation: '5 Battle Rounds. Both players take a turn in each round, so a full game has 10 turns total (5 per player).'
      },
      {
        question: 'What is the correct order of phases in a player\'s turn?',
        answers: [
          'Shooting → Movement → Command → Charge → Fight',
          'Command → Movement → Shooting → Charge → Fight',
          'Movement → Command → Shooting → Fight → Charge',
          'Command → Shooting → Movement → Fight → Charge'
        ],
        correct: 1,
        explanation: 'Command → Movement → Shooting → Charge → Fight. You\'ll learn this by heart after a few games — think of it as escalating from strategic decisions to close-quarters bloodshed.'
      },
      {
        question: 'The main way to win a game of 40k is to...',
        answers: [
          'Destroy all enemy models',
          'Control more objectives to score Victory Points',
          'Keep your warlord alive until the end',
          'Deal the most total damage'
        ],
        correct: 1,
        explanation: 'Objectives win games. Killing enemies is useful because it stops them scoring, but the VP come from controlling terrain areas — not body counts.'
      }
    ]
  },

  // ──────────────────────────────────────────────────────────
  // LESSON 2: READING YOUR NECRONS
  // ──────────────────────────────────────────────────────────
  {
    id: 'lesson_datasheets',
    title: 'Reading Your Necrons',
    subtitle: 'How to decode a datasheet and understand what your models can do',
    icon: '📋',
    xp: 100,
    steps: [
      {
        type: 'text',
        heading: 'Every unit has a datasheet',
        body: 'A datasheet is the stat card for a unit — it tells you everything that unit can do on the battlefield. Once you can read one fluently, you can pick up any army and understand it. Let\'s use your Necron Warriors as the example.'
      },
      {
        type: 'statcard',
        name: 'Necron Warriors',
        faction: 'NECRONS',
        stats: [
          { name: 'M', value: '6"', desc: 'Move — how far they walk each turn' },
          { name: 'T', value: '4', desc: 'Toughness — how hard to wound' },
          { name: 'Sv', value: '4+', desc: 'Save — armour protection (roll this or higher to save)' },
          { name: 'W', value: '1', desc: 'Wounds — takes this many unsaved wounds to die' },
          { name: 'Ld', value: '7+', desc: 'Leadership — morale, rolled when under pressure' },
          { name: 'OC', value: '2', desc: 'Objective Control — ability to claim objectives' }
        ],
        note: '10 models per unit'
      },
      {
        type: 'text',
        heading: 'Breaking down the stats',
        body: '<strong>M (Move):</strong> In your Movement phase, Warriors can move up to 6" in any direction. Simple.\n\n<strong>T (Toughness):</strong> This is compared against attacking weapons to see if they wound. Higher T = harder to kill.\n\n<strong>Sv (Save):</strong> When a Warrior is hit and wounded, roll a D6. On a 4 or more, the armour holds. Lower is better here — a 2+ save is fantastic, 6+ is barely any armour at all.\n\n<strong>W (Wounds):</strong> Warriors have 1 wound. One unsaved hit kills them outright. Your Immortals have 2 — they can survive a hit and keep fighting.\n\n<strong>OC (Objective Control):</strong> Each Warrior counts as 2 when holding an objective. With 10 Warriors on a point, you have OC 20. Very hard for the enemy to contest.'
      },
      {
        type: 'callout',
        icon: '🎯',
        heading: 'Now the weapon',
        body: 'Every model also has weapons. The Gauss Flayer is the standard Warrior gun. Here\'s what each weapon stat means:'
      },
      {
        type: 'weaponcard',
        name: 'Gauss Flayer',
        stats: [
          { name: 'Range', value: '24"', desc: 'Must be within 24" to shoot' },
          { name: 'A', value: '2', desc: 'Attacks — rolls 2 dice to hit per model' },
          { name: 'BS', value: '4+', desc: 'Ballistic Skill — need 4+ on the dice to hit' },
          { name: 'S', value: '4', desc: 'Strength — compared to enemy Toughness to wound' },
          { name: 'AP', value: '0', desc: 'Armour Penetration — 0 means no modifier to enemy saves' },
          { name: 'D', value: '1', desc: 'Damage — each unsaved hit removes 1 wound' }
        ]
      },
      {
        type: 'example',
        heading: 'What does this mean in practice?',
        body: '10 Warriors each fire their Gauss Flayer = <strong>20 attack rolls</strong>. Each needs a 4, 5, or 6 to hit. Roughly 13-14 will hit. Those go on to wound rolls (next lesson). It\'s not the most powerful gun in the galaxy, but 20 shots from a unit that can come back from the dead is very solid.'
      },
      {
        type: 'text',
        heading: 'Immortals vs Warriors — what the numbers mean',
        body: 'Your Immortals have Sv3+ instead of 4+, and W2 instead of 1. Those two differences make them dramatically tougher. A Space Marine bolter will kill a Warrior roughly 1 in 4 times it fires at them. Against an Immortal with a better save and 2 wounds? Much more resilient. That\'s why Immortals cost more points.'
      }
    ],
    quiz: [
      {
        question: 'A Necron Warrior has Save 4+. What does this mean?',
        answers: [
          'Roll a 4+ to avoid being hit',
          'Roll a 4+ when the enemy wounds you — on a success the wound is ignored',
          'The model needs 4 hits to be destroyed',
          'Move 4" per turn'
        ],
        correct: 1,
        explanation: 'Save is your armour roll — made after the enemy successfully wounds you. Roll a D6: on a 4 or higher, the armour holds and no damage is taken. On a 1, 2, or 3, the wound gets through.'
      },
      {
        question: 'A Gauss Flayer has A2 and BS4+. How many hit dice does 1 Warrior roll, and what does each need to hit?',
        answers: [
          '1 die, needing a 4+',
          '2 dice, needing a 4+ on each',
          '4 dice, needing a 2+',
          '2 dice, needing a 2+'
        ],
        correct: 1,
        explanation: 'A (Attacks) = how many dice you roll to hit. BS is what each die needs to score. So 1 Warrior rolls 2 attack dice, each needing a 4, 5, or 6 to count as a hit.'
      },
      {
        question: 'Why is a high OC value (like Warriors\' OC 2) valuable?',
        answers: [
          'It gives the unit more attacks in melee',
          'It means the unit is harder to wound',
          'It makes the unit better at contesting and holding objectives',
          'It improves the unit\'s Leadership rolls'
        ],
        correct: 2,
        explanation: 'OC (Objective Control) is purely about holding objectives. You compare your total OC against the enemy\'s — highest OC controls the point. 10 Warriors = OC 20, which is very hard to out-contest.'
      }
    ]
  },

  // ──────────────────────────────────────────────────────────
  // LESSON 3: MOVING YOUR ARMY
  // ──────────────────────────────────────────────────────────
  {
    id: 'lesson_movement',
    title: 'Moving Your Army',
    subtitle: 'How units move, stay together, and engage the enemy',
    icon: '👣',
    xp: 90,
    steps: [
      {
        type: 'text',
        heading: 'In the Movement phase, every unit must do something',
        body: 'Every single unit in your army must be "selected to move" before the phase ends — even if that means staying still. You go unit by unit, deciding what each one does. There are four options.'
      },
      {
        type: 'move_types',
        moves: [
          {
            name: 'Remain Stationary',
            icon: '⏸️',
            when: 'Any unit',
            effect: 'Don\'t move at all.',
            tradeoff: 'Useful for [HEAVY] weapons (+1 to hit when stationary) or when you\'re already where you want to be.'
          },
          {
            name: 'Normal Move',
            icon: '➡️',
            when: 'Unengaged units',
            effect: 'Move up to your M characteristic in any direction.',
            tradeoff: 'Standard movement. Warriors move up to 6". Can still shoot and charge this turn.'
          },
          {
            name: 'Advance Move',
            icon: '⚡',
            when: 'Unengaged units',
            effect: 'Move up to M + D6" (roll a die for the bonus). Faster than normal.',
            tradeoff: 'After advancing, you can\'t charge or shoot normally. Only [ASSAULT] weapons can fire.'
          },
          {
            name: 'Fall Back',
            icon: '🔙',
            when: 'Engaged units only',
            effect: 'Disengage from melee and move up to M".',
            tradeoff: 'Escapes combat but you can\'t shoot or charge afterwards. Sometimes the right call.'
          }
        ]
      },
      {
        type: 'text',
        heading: 'Keeping your unit together — Coherency',
        body: 'A unit of multiple models can\'t just scatter across the table. After every move, every model in the unit must be:\n\n• Within <strong>2" horizontally</strong> of at least one other model in the unit\n• Within <strong>9"</strong> of every other model in the unit\n\nIf you can\'t maintain coherency after a move, the move doesn\'t happen. If you end a phase out of coherency, models are removed until you are.'
      },
      {
        type: 'example',
        heading: 'Coherency in practice',
        body: 'You\'re moving 10 Warriors through a ruin. You can\'t send half of them sprinting ahead — keep them bunched within 2" of each other. In practice, most units naturally stay in coherency as long as you don\'t try to "stretch" the unit across terrain.'
      },
      {
        type: 'callout',
        icon: '⚠️',
        heading: 'Engagement Range — the 2" bubble',
        body: 'Each model has an engagement range: <strong>2" horizontally and 5" vertically</strong>. While a friendly model is within 2" of an enemy model, both units are <strong>engaged</strong>. Engaged units can\'t make Normal or Advance moves — they\'re locked in combat. To escape, they must Fall Back.'
      },
      {
        type: 'text',
        heading: 'Moving through terrain',
        body: '<strong>Infantry (like your Warriors and Immortals)</strong> can move through ruins and dense terrain freely — they duck through windows and over rubble. This is a significant advantage.\n\n<strong>Vehicles and Monsters</strong> are more restricted by terrain. They often need to go around tall sections or climb over them.\n\nYou can always move through your own models — friendly troops get out of each other\'s way. You can never move through enemy models (their bases physically block your path).'
      }
    ],
    quiz: [
      {
        question: 'After an Advance Move, what can your unit NOT do?',
        answers: [
          'Move in a straight line',
          'Shoot or charge (except with [ASSAULT] weapons)',
          'Hold an objective',
          'Be targeted by enemy shooting'
        ],
        correct: 1,
        explanation: 'Advancing trades shooting and charging for extra movement. You get M + D6" of movement but give up your shooting (except [ASSAULT] weapons) and you can\'t declare a charge.'
      },
      {
        question: 'Your Necron Warriors are engaged with an enemy unit. What move can they make?',
        answers: [
          'Normal Move — away from the enemy',
          'Advance Move — if they have enough movement',
          'Fall Back — disengage and move up to M"',
          'They can\'t move at all'
        ],
        correct: 2,
        explanation: 'Engaged units can only Fall Back. This lets them disengage and move up to their M characteristic — but afterwards they can\'t shoot or charge. Sometimes it\'s still worth it to escape a bad situation.'
      },
      {
        question: 'Which unit type can move through the walls of ruins freely?',
        answers: [
          'VEHICLES only',
          'Any unit with a Move of 6" or more',
          'INFANTRY, BEASTS, and SWARM units',
          'All units can move through all terrain'
        ],
        correct: 2,
        explanation: 'INFANTRY (like Warriors and Immortals), BEASTS, and SWARM can move horizontally through dense terrain like ruins. This is a big deal — your Necrons can position inside buildings and shoot out, while enemy tanks have to go around.'
      }
    ]
  },

  // ──────────────────────────────────────────────────────────
  // LESSON 4: SHOOTING — HIT & WOUND ROLLS
  // ──────────────────────────────────────────────────────────
  {
    id: 'lesson_shooting',
    title: 'Shooting — Hit & Wound Rolls',
    subtitle: 'The first half of the attack sequence: rolling to hit and wound',
    icon: '🎯',
    xp: 120,
    steps: [
      {
        type: 'text',
        heading: 'The attack sequence is always the same four steps',
        body: 'Every time a unit shoots or fights in melee, you follow this exact sequence. It never changes — once you know it, you know it forever.'
      },
      {
        type: 'sequence',
        steps: [
          { num: '1', label: 'Hit Roll', desc: 'Did the shot actually hit?' },
          { num: '2', label: 'Wound Roll', desc: 'Did it hit hard enough to cause damage?' },
          { num: '3', label: 'Save Roll', desc: 'Did the target\'s armour stop it?' },
          { num: '4', label: 'Inflict Damage', desc: 'Remove wounds from the target.' }
        ]
      },
      {
        type: 'text',
        heading: 'Step 1 — Hit Rolls',
        body: 'For every attack a model makes, roll one D6. You need to equal or beat the weapon\'s <strong>BS (Ballistic Skill)</strong>.\n\nGauss Flayer BS 4+ → roll a 4, 5, or 6 to hit. Simple.\n\nTwo special results apply no matter what:\n• <strong>Unmodified 1</strong> always fails — no ability can save it\n• <strong>Unmodified 6</strong> is always a Critical Hit — this can trigger special weapon abilities'
      },
      {
        type: 'example',
        heading: 'Hit roll example: 10 Warriors firing',
        body: '10 Warriors × 2 attacks each = 20 hit dice rolled. BS 4+, so you need 4, 5, or 6. On average, ⅔ of the dice (about 13-14) will hit. Roll them all at once — anything 4+ is a hit, everything else is a miss. Set the hits aside.'
      },
      {
        type: 'text',
        heading: 'Step 2 — Wound Rolls',
        body: 'For each hit, roll another D6. This time you compare the weapon\'s <strong>Strength (S)</strong> against the target\'s <strong>Toughness (T)</strong>. The table below gives you the target number:'
      },
      {
        type: 'wound_table'
      },
      {
        type: 'example',
        heading: 'Wound roll example: Warriors vs Space Marines',
        body: 'Gauss Flayer S4 vs Space Marine T4. Strength equals Toughness → wound on 4+. So of your 13 hits, roughly half (6-7) will wound. Those move on to saves.\n\nNow try Warriors vs T5 Chaos Space Marines: S4 vs T5 — Strength is less than Toughness → wound on 5+. Fewer wounds get through. Numbers like this shape your target priority.'
      },
      {
        type: 'callout',
        icon: '⭐',
        heading: 'Critical Wound',
        body: 'Just like with hit rolls, an <strong>unmodified 6 on a wound roll is a Critical Wound</strong>. Some weapon abilities (like [DEVASTATING WOUNDS]) trigger on a critical wound for devastating effects.'
      },
      {
        type: 'text',
        heading: 'Modifiers to hit rolls',
        body: 'Some situations modify the dice roll itself:\n\n<strong>+1 to hit:</strong> [HEAVY] weapons when your unit didn\'t move more than 3". Standing still rewards patience.\n\n<strong>-1 to hit:</strong> The enemy is in cover (behind terrain, partially hidden). This is called the "Benefit of Cover" — instead of modifying your roll, it worsens the attacker\'s BS by 1.\n\nNo modifier can make an unmodified 1 a success or an unmodified 6 a failure. Those are fixed.'
      }
    ],
    quiz: [
      {
        question: 'A Gauss Blaster has BS 3+. You roll a 1. Does it hit?',
        answers: [
          'Yes — 3+ means 3 or more, and 1 counts because it\'s at least 1',
          'No — an unmodified 1 always fails, regardless of BS',
          'It depends on whether any modifiers apply',
          'Yes — you re-roll 1s automatically'
        ],
        correct: 1,
        explanation: 'An unmodified roll of 1 always fails for hit rolls. No modifier, ability, or re-roll rule can make a 1 a success. This is a fixed result. The Gauss Blaster hits on 3, 4, 5, or 6.'
      },
      {
        question: 'Your weapon has Strength 5. The target has Toughness 4. What do you need to wound?',
        answers: ['2+', '3+', '4+', '5+'],
        correct: 1,
        explanation: 'Strength GREATER than Toughness → wound on 3+. The wound table: S ≥ 2×T = 2+, S > T = 3+, S = T = 4+, S < T = 5+, S ≤ T÷2 = 6+. Immortals\' Gauss Blasters (S5) vs regular Marines (T4) wound on 3+ — a significant advantage.'
      },
      {
        question: 'An INFANTRY unit is within a terrain area. What effect does this have on ranged attacks against it?',
        answers: [
          'The unit cannot be targeted at all',
          'Attackers get +1 to hit',
          'Attacks have the BS worsened by 1 (Benefit of Cover)',
          'The unit\'s Save is improved by 1'
        ],
        correct: 2,
        explanation: 'The Benefit of Cover worsens the attacking weapon\'s BS by 1 — so a BS3+ weapon effectively becomes BS4+ against them. It doesn\'t change the Save, it makes hitting harder in the first place. INFANTRY in terrain get this automatically.'
      }
    ]
  },

  // ──────────────────────────────────────────────────────────
  // LESSON 5: SAVES & DAMAGE
  // ──────────────────────────────────────────────────────────
  {
    id: 'lesson_saves',
    title: 'Saves & Damage',
    subtitle: 'The last steps: armour saves, AP, and removing casualties',
    icon: '🛡️',
    xp: 120,
    steps: [
      {
        type: 'text',
        heading: 'You\'ve hit and wounded — now can the armour stop it?',
        body: 'For every wound that gets through, the target unit\'s controlling player rolls a D6. They need to equal or beat their <strong>Sv (Save)</strong> characteristic. This represents armour, shields, or reflexes deflecting the blow.'
      },
      {
        type: 'callout',
        icon: '🔑',
        heading: 'AP changes what you need to save',
        body: '<strong>AP (Armour Penetration)</strong> modifies the save roll. AP 0 means no change. AP -1 means the saving player subtracts 1 from their roll result. AP -2 means subtract 2, and so on.\n\nExample: Space Marine has Sv 3+. Against a weapon with AP -1, they need to roll 3+1 = <strong>4+ to save</strong>. Against AP -2, they need 5+. High AP weapons punch through armour.'
      },
      {
        type: 'example',
        heading: 'AP vs Necron Warriors (Sv 4+)',
        body: '<strong>AP 0 (Gauss Flayer vs Warriors):</strong> Warriors save on 4+ (no change). About half the wounds get saved.\n\n<strong>AP -1 (Bolt Rifle):</strong> Warriors need 4+1 = 5+ to save. Now only a 5 or 6 saves them. More wounds get through.\n\n<strong>AP -2 (Plasma Gun):</strong> Warriors need 6+ to save. They\'re only saving on a 6. Very few survive.\n\n<strong>AP -3 or worse:</strong> Warriors effectively have no save (you can\'t save on 7+). Every wound kills a model.'
      },
      {
        type: 'text',
        heading: 'Invulnerable Saves — AP doesn\'t matter',
        body: 'Some models have an <strong>Invulnerable Save (InSv)</strong>, like your Overlord\'s 4+ InSv. When making a save roll, you can choose to use the InSv <em>instead</em> of the normal Sv modified by AP.\n\nThis means against high-AP weapons, your Overlord always saves on 4+ regardless of what the weapon does to armour. Invulnerable saves are why certain elite units or characters are so resilient — AP becomes irrelevant to them.'
      },
      {
        type: 'callout',
        icon: '🎲',
        heading: 'Save roll results',
        body: 'Unmodified 1 on a save roll <strong>always fails</strong>. Even with a 2+ save against AP 0, you\'ll lose a model eventually if enough dice are rolled. There is no perfect armour.'
      },
      {
        type: 'text',
        heading: 'Step 4 — Inflict Damage',
        body: 'When an attack gets through the save, the target model loses <strong>wounds equal to the weapon\'s D (Damage)</strong> characteristic.\n\n• Gauss Flayer D1 → model loses 1 wound. Warriors have W1, so they die immediately.\n• A weapon with D2 → model loses 2 wounds. Against a Warrior (W1), this is overkill — the 1 extra damage is wasted. Against an Immortal (W2), one hit kills them outright.\n• D3 weapons → roll a D6, halve, round up. Could be 1, 2, or 3 damage — variance matters.'
      },
      {
        type: 'text',
        heading: 'Allocation — who takes the hits?',
        body: 'When wounds are allocated, you divide the unit into groups. Non-CHARACTER models always absorb wounds before CHARACTER models (your Overlord hiding behind their Warriors). Within non-CHARACTER models, any model that\'s already taken a wound must absorb hits first — partially wounded models soak damage before fresh ones.'
      },
      {
        type: 'example',
        heading: 'Full example: Bolt Rifle vs 10 Warriors',
        body: '5 Intercessors fire 10 Bolt Rifles (A2 each = 10 attacks). BS3+ so roughly 7 hit. S4 vs T4 = 4+ to wound, roughly 3-4 wound. Bolt Rifle is AP -1 so Warriors save on 5+. Of the 3-4 wounds, only about 1 saves. So roughly 2-3 Warriors die per shooting phase from 5 Intercessors. Warriors have 10 to start — they\'ll hold up for several turns. And some may return via Reanimation Protocols.'
      }
    ],
    quiz: [
      {
        question: 'A Necron Warrior (Sv 4+) is hit by a weapon with AP -2. What do they need to roll to save?',
        answers: ['4+', '5+', '6+', 'They automatically fail all saves'],
        correct: 2,
        explanation: 'AP -2 means add 2 to what they need. Warriors need 4+ normally, so with AP -2 they need 6+ (4 + 2 = 6). Only a roll of 6 saves them. AP -2 weapons are a serious threat to Warriors.'
      },
      {
        question: 'Your Overlord (Sv 3+, InSv 4+) is hit by a weapon with AP -3. What save can you use?',
        answers: [
          'No save — AP -3 is too powerful',
          'Only the normal Sv (which becomes 6+ after AP)',
          'The Invulnerable Save of 4+, ignoring AP entirely',
          'Must use whichever save is worse'
        ],
        correct: 2,
        explanation: 'Invulnerable Saves completely bypass AP. You choose to use InSv 4+ instead of normal Sv 3+ modified by AP. Against AP -3, the normal save would need 6+ (3+3=6), so the 4+ InSv is far better. High-AP weapons are specifically designed to punish targets without an InSv.'
      },
      {
        question: 'A weapon has Damage 3. It wounds a Necron Warrior (W1). How many wounds does the Warrior lose?',
        answers: [
          '3 wounds — the full damage value',
          '1 wound — the model only has 1 wound remaining',
          '2 wounds — capped at the target\'s remaining wounds',
          'The damage is split between 3 Warriors'
        ],
        correct: 1,
        explanation: 'The Warrior loses 1 wound — but since it only has W1, that destroys it. The remaining 2 damage is wasted (excess damage doesn\'t carry over to other models in standard attacks). This is why high-damage weapons are inefficient against single-wound hordes like Warriors.'
      }
    ]
  },

  // ──────────────────────────────────────────────────────────
  // LESSON 6: CHARGING & FIGHTING
  // ──────────────────────────────────────────────────────────
  {
    id: 'lesson_melee',
    title: 'Charging & Fighting',
    subtitle: 'Getting into melee and why it can be devastating',
    icon: '⚔️',
    xp: 110,
    steps: [
      {
        type: 'text',
        heading: 'Why bother with melee?',
        body: 'Charging into melee gives your unit a massive bonus: <strong>Fights First</strong>. This means in the Fight phase, your charging unit strikes before any non-charging unit. Against a unit that hasn\'t charged, you get to attack and potentially destroy models before they hit back. Charges can flip entire combats in your favour.'
      },
      {
        type: 'text',
        heading: 'Declaring a charge',
        body: 'In your Charge phase, you can declare a charge with any eligible unit. To declare:\n• The target must be within <strong>12"</strong>\n• Your unit can\'t be already engaged with another unit\n• Your unit can\'t have advanced or fallen back this turn\n\nThen make a <strong>charge roll: 2D6</strong>. The result is how far the unit can move. To succeed, you must be able to end the move within <strong>1"</strong> of the target.'
      },
      {
        type: 'example',
        heading: 'Charge example',
        body: 'Your Warriors are 7" from enemy Intercessors. You declare a charge and roll 2D6 — getting a 5 and a 3 = 8. The maximum distance is 8", which is more than 7", so you move the Warriors to within 1" of the Intercessors. Charge succeeds — Warriors gain Fights First!\n\nIf you\'d rolled a 3 and a 2 = 5, you couldn\'t reach them. The charge fails and the Warriors stay where they were. Failed charges are frustrating but a part of the game — don\'t rely solely on a charge you need to roll high for.'
      },
      {
        type: 'text',
        heading: 'The Fight phase — both players participate',
        body: 'The Fight phase is unique: <strong>both players fight in it</strong>, regardless of whose turn it is. Here\'s the sequence:\n\n<strong>1. Pile In</strong> — All engaged units can move up to 3" to get more models into base contact with enemies. Your models in base contact can\'t move, but others shuffle closer.\n\n<strong>2. Fight</strong> — Units with Fights First go first. Players alternate picking a unit to fight. Select a melee weapon, select a target unit engaged with you, and resolve attacks (same Hit → Wound → Save → Damage sequence as shooting, but using WS instead of BS).\n\n<strong>3. Consolidate</strong> — After fighting, units can move up to 3" to stay engaged, grab objectives, or chase fleeing enemies.'
      },
      {
        type: 'callout',
        icon: '⚡',
        heading: 'Fights First matters a lot',
        body: 'Charging units gain Fights First. Units with the Fights First ability (some units have it innately) also go first. If both players have Fights First units, they alternate — player whose turn it is goes first. Non-Fights First units go after all Fights First units have swung. This is why charging is so powerful: you may kill enough models that the enemy unit hits back with fewer attacks.'
      },
      {
        type: 'statcard',
        name: 'Overlord\'s Blade (Melee)',
        faction: 'NECRONS',
        isWeapon: true,
        stats: [
          { name: 'Range', value: 'Melee', desc: 'Only usable when engaged' },
          { name: 'A', value: '5', desc: '5 attacks per fight' },
          { name: 'WS', value: '2+', desc: 'Weapon Skill — hits on 2+ (elite fighter)' },
          { name: 'S', value: '6', desc: 'Strength 6 — wounds most infantry on 3+' },
          { name: 'AP', value: '-2', desc: 'Cuts through most armour saves' },
          { name: 'D', value: '2', desc: '2 damage per unsaved wound — kills W2 models outright' }
        ],
        note: 'The Overlord is a fearsome melee fighter — 5 attacks at WS2+ with good AP and damage makes them a serious threat to any unit'
      }
    ],
    quiz: [
      {
        question: 'You declare a charge. The target is 9" away. You roll 2D6 and get a total of 7. What happens?',
        answers: [
          'The charge fails — 7 is less than 9',
          'The charge succeeds — you move up to 7" toward the target and engage them',
          'The charge fails — you need to roll exactly 9',
          'The charge partially succeeds — you move 7" but aren\'t engaged'
        ],
        correct: 0,
        explanation: 'The charge roll result must be enough to move the charging unit to within 1" of the target. The target is 9" away — you need a charge roll of at least 9. Rolling 7 isn\'t enough, so the charge fails and the unit stays put.'
      },
      {
        question: 'A unit that successfully completes a charge move gains what special ability until end of turn?',
        answers: [
          'Feel No Pain 6+',
          'Fights First',
          '+1 to all hit rolls',
          'An extra melee attack'
        ],
        correct: 1,
        explanation: 'Charging units gain Fights First — they strike before non-Fights First units in the Fight phase. This is the main reward for charging: potentially destroy or weaken the enemy before they can hit back.'
      },
      {
        question: 'In the Fight phase, your enemy has no charged units. Your Necron Warriors DID charge. What order do things happen?',
        answers: [
          'Enemy fights first because it\'s their turn to fight',
          'Dice off to see who fights first',
          'Your Warriors fight first (Fights First from the charge), then the enemy fights back',
          'Both players fight at the same time and remove casualties simultaneously'
        ],
        correct: 2,
        explanation: 'Fights First units strike before all other units. Your Warriors charged and gained Fights First — so they go first, potentially destroying models that would otherwise swing back at them. The enemy\'s non-Fights First units then fight after.'
      }
    ]
  },

  // ──────────────────────────────────────────────────────────
  // LESSON 7: COMMAND PHASE & STRATAGEMS
  // ──────────────────────────────────────────────────────────
  {
    id: 'lesson_command',
    title: 'Command Phase & Stratagems',
    subtitle: 'Resource management and tactical tricks',
    icon: '⚙️',
    xp: 100,
    steps: [
      {
        type: 'text',
        heading: 'The Command phase is short but important',
        body: 'At the start of every turn, the Command phase handles two key things: gaining resources and checking unit morale.'
      },
      {
        type: 'callout',
        icon: '💎',
        heading: 'Command Points (CP)',
        body: '<strong>Both</strong> players gain 1 CP at the start of each Command phase. So each turn you gain 1 CP regardless of what\'s happening in the battle. You spend CP on Stratagems — tactical interventions that can swing a fight. CP is your most strategic resource: don\'t hoard it, don\'t waste it.'
      },
      {
        type: 'text',
        heading: 'Battle-Shock — when your troops waver',
        body: 'Also in the Command phase, you check if any of your units are shaken. You must make a <strong>Battle-Shock roll</strong> (2D6 vs Leadership) for any unit that:\n• Is currently already Battle-Shocked, OR\n• Is at or below half its starting number of models/wounds\n\nIf the roll equals or beats the unit\'s Leadership, they hold firm. If it fails, the unit becomes Battle-Shocked.'
      },
      {
        type: 'callout',
        icon: '⚠️',
        heading: 'Battle-Shocked effects',
        body: 'A Battle-Shocked unit is in bad shape:\n• Its OC becomes "-" (it can\'t control objectives at all)\n• You can\'t target it with Stratagems\n• It can\'t perform Actions (special mission objectives)\n\nNecron Warriors have Ld 7+, which is average. Half a unit lost (5 Warriors gone) will trigger a Battle-Shock roll. Use Insane Bravery (1CP) to auto-pass if you really need that unit to hold an objective.'
      },
      {
        type: 'text',
        heading: 'Stratagems — tactical power plays',
        body: 'Stratagems are used throughout the game, not just in the Command phase. Each one states exactly WHEN it can be used. You spend the CP cost, then resolve the effect. Key rules:\n• Max once per Stratagem per phase\n• Can\'t target the same unit with two different Stratagems in the same phase'
      },
      {
        type: 'stratagem_cards',
        cards: [
          {
            name: 'Command Re-Roll',
            cost: '1CP',
            when: 'Any phase, just after any roll',
            effect: 'Re-roll one die (or an entire charge roll). Your most flexible tool.',
            tip: 'Save for crucial wound rolls or a charge you really need to make.'
          },
          {
            name: 'Fire Overwatch',
            cost: '1CP',
            when: 'End of enemy\'s Movement phase',
            effect: 'One unengaged unit shoots — but only hits on an unmodified 6.',
            tip: 'Punishes enemies who move into the open. Less useful than it sounds (only 6s hit) but free psychological pressure.'
          },
          {
            name: 'Rapid Ingress',
            cost: '1CP',
            when: 'End of enemy\'s Movement phase',
            effect: 'A unit in Strategic Reserves arrives early (from Round 2).',
            tip: 'Bring in reinforcements at a crucial moment rather than waiting for your own turn.'
          },
          {
            name: 'Insane Bravery',
            cost: '1CP',
            when: 'Before a Battle-Shock roll',
            effect: 'That Battle-Shock roll automatically succeeds. Once per battle.',
            tip: 'Save it for a critical unit holding an objective — use it when losing that unit\'s OC would cost you the game.'
          },
          {
            name: 'Counteroffensive',
            cost: '2CP',
            when: 'Enemy Fight phase, after an enemy unit attacks',
            effect: 'One of your units immediately gains Fights First and fights next.',
            tip: 'Powerful but expensive. Use it when the enemy just killed your Overlord\'s bodyguard — let the Overlord hit back before they finish the job.'
          }
        ]
      }
    ],
    quiz: [
      {
        question: 'How many CP does each player gain per turn during the Command phase?',
        answers: ['D3 CP', '1 CP', '2 CP', 'D6 CP'],
        correct: 1,
        explanation: '1 CP per player per turn, every turn. Both players gain it simultaneously in the Gain Core CP step. Consistent income — plan around having 1-2 CP available each turn.'
      },
      {
        question: 'Your unit of 10 Warriors has 5 models remaining. What must happen in your Command phase?',
        answers: [
          'Nothing — they\'re still functional',
          'The unit is automatically destroyed',
          'You must make a Battle-Shock roll for them',
          'You must immediately fall back'
        ],
        correct: 2,
        explanation: '5 from 10 is exactly half-strength, which triggers a mandatory Battle-Shock roll. Roll 2D6 vs their Leadership of 7+. If the result is 7 or more, they hold. If less, they become Battle-Shocked and lose their OC — potentially costing you an objective.'
      },
      {
        question: 'When can the Counteroffensive stratagem be used?',
        answers: [
          'During your own Fight phase',
          'During the enemy\'s Fight phase, just after an enemy unit resolves its attacks',
          'At the start of the Charge phase',
          'Once per game at any point'
        ],
        correct: 1,
        explanation: 'Counteroffensive (2CP) triggers in the ENEMY\'s Fight phase, right after an enemy unit attacks. Your selected unit immediately gains Fights First and must fight next — a powerful counter-punch that lets you hit back before more enemies can swing.'
      }
    ]
  },

  // ──────────────────────────────────────────────────────────
  // LESSON 8: OBJECTIVES & WINNING
  // ──────────────────────────────────────────────────────────
  {
    id: 'lesson_objectives',
    title: 'Objectives & Winning',
    subtitle: 'How to score Victory Points and actually win games',
    icon: '🏆',
    xp: 100,
    steps: [
      {
        type: 'text',
        heading: 'Objectives are terrain areas you fight to control',
        body: 'Before the game, objectives are placed on the battlefield — usually in terrain areas (inside a ruin, at a crossroads). Your mission tells you where they go and how to score them. A typical game has 4-6 objectives, and they\'re usually roughly symmetrically placed.'
      },
      {
        type: 'text',
        heading: 'Controlling an objective',
        body: 'At the end of each phase (and each turn), check who controls each objective. Add up the OC of all your models <em>within range of the objective</em> (inside the terrain area, or within 3" of the marker). The player with the higher total controls it. A tie means neither player controls it.'
      },
      {
        type: 'example',
        heading: 'OC battle for an objective',
        body: '<strong>Your side:</strong> 5 Warriors in the ruin (OC 2 each = 10 total)\n<strong>Enemy side:</strong> 3 Space Marines in the ruin (OC 2 each = 6 total)\n\nYou control the objective with OC 10 vs OC 6. The Space Marines can\'t contest it without sending more models — or killing some of yours.\n\nIf the enemy sends a Rhino (OC 3) plus 3 Marines (OC 6) = OC 9 total. Still not enough. You hold it.'
      },
      {
        type: 'callout',
        icon: '🚨',
        heading: 'Battle-Shocked units can\'t control objectives',
        body: 'Battle-Shocked units have their OC set to "-" — zero contribution. If your Warriors holding an objective become Battle-Shocked, they immediately lose control of it even if they\'re still standing on it. This is why keeping morale up (and spending CP on Insane Bravery when needed) is tactically crucial.'
      },
      {
        type: 'text',
        heading: 'Scoring — how Victory Points work',
        body: 'Your mission tells you specifically how to score. Common scoring methods:\n\n<strong>At the end of your turn:</strong> Score X VP for each objective you control.\n\n<strong>Hold More:</strong> Score 1VP if you control more objectives than your opponent.\n\n<strong>Progressive vs End-game objectives:</strong> Some VP is scored turn by turn (progressive — score as you go), some only at game end. Don\'t ignore end-game scoring — it often decides close games.'
      },
      {
        type: 'text',
        heading: 'The key mental shift: killing vs scoring',
        body: 'New (and returning) players often focus on destroying enemy models. This is tempting — it\'s satisfying — but it can lose you the game. Ask yourself before every decision:\n\n<strong>"Does this move help me control more objectives?"</strong>\n\nSometimes the answer is kill that unit — they\'re holding an objective you need. Sometimes it\'s let them sit in the open while you move to secure three different points. Position always trumps aggression in 40k missions.'
      },
      {
        type: 'callout',
        icon: '💚',
        heading: 'How Necrons play this',
        body: 'Necrons are built for objective play. Warriors are durable, come back from the dead, and have OC 2 each — excellent holders. Immortals are tougher and can threaten key mid-table objectives. Your Overlord buffs nearby units. Standard Necron gameplan: move Warriors onto your objectives early, use Immortals to contest mid-table, and use your toughness advantage to outlast opponents rather than out-shoot them.'
      }
    ],
    quiz: [
      {
        question: 'You have 4 Warriors (OC 2 each = 8 total) on an objective. The enemy moves a Captain (OC 1) onto the same objective. Who controls it?',
        answers: [
          'The enemy — their Character is more important',
          'You — your OC total (8) is higher than theirs (1)',
          'Neither — Characters always contest objectives',
          'Whoever arrived on the objective first'
        ],
        correct: 1,
        explanation: 'Objective control is purely a numbers game: highest total OC wins. Your 8 vs their 1 — you control it comfortably. The enemy would need to send many more models or kill some of your Warriors to contest it.'
      },
      {
        question: 'Your Warriors on an objective become Battle-Shocked mid-game. What happens to the objective?',
        answers: [
          'Nothing — they still hold it while physically present',
          'The objective becomes contested immediately (neither player controls it)',
          'The enemy automatically gains control of it',
          'The Warriors must Fall Back from the objective'
        ],
        correct: 1,
        explanation: 'Battle-Shocked units have their OC set to "-" (zero). They contribute nothing to objective control. If no other friendly models are in range, the objective becomes uncontrolled — potentially letting the enemy take it without moving a model.'
      },
      {
        question: 'Why is it often wrong to prioritise killing enemies over moving to objectives?',
        answers: [
          'Killing is always wrong — it triggers enemy abilities',
          'Victory Points come from controlling objectives, not kill counts — you can kill many models and still lose',
          'The rules prevent you from targeting enemy models near objectives',
          'Killing enemies costs you Stratagems'
        ],
        correct: 1,
        explanation: 'Games are won by VP, and VP comes from objectives. You can table your opponent (destroy every model) and still lose if they scored more VP from objectives earlier in the game. Always ask: "Does this action help me score?" Sometimes killing is the answer — but not always.'
      }
    ]
  },

  // ──────────────────────────────────────────────────────────
  // LESSON 9: YOUR NECRONS
  // ──────────────────────────────────────────────────────────
  {
    id: 'lesson_necrons',
    title: 'Your Necrons',
    subtitle: 'How to think about your army and play to its strengths',
    icon: '💚',
    xp: 150,
    steps: [
      {
        type: 'text',
        heading: 'Who are the Necrons?',
        body: 'Sixty million years ago, the Necrontyr were a mortal species consumed by jealousy of the immortal Old Ones. They made a deal with the C\'tan — star gods of living metal — and had their consciousnesses transferred into immortal mechanical bodies. They then slept in their tomb worlds for millions of years. Now they are awakening, and they want their galaxy back.'
      },
      {
        type: 'text',
        heading: 'Reanimation Protocols — the key faction ability',
        body: 'Necrons are famous for being nearly impossible to kill permanently. Their faction ability lets destroyed models crawl back to life. The specifics depend on your codex, but the principle is: your Warriors, Immortals, and others can return from the dead under the right conditions.\n\nThis means <strong>never write off a damaged Necron unit as finished</strong>. Keep them on objectives and see if they come back. It also means your opponent can\'t rely on a shooting phase to permanently remove your models.'
      },
      {
        type: 'text',
        heading: 'Your key units and how to use them',
        body: ''
      },
      {
        type: 'unit_guide',
        units: [
          {
            name: 'Necron Warriors',
            icon: '⚡',
            role: 'Objective holders / Frontline scoring',
            strengths: 'OC 2 each (10 Warriors = OC 20), can come back via Reanimation, large unit size means Battle-Shock is delayed',
            weaknesses: 'Sv 4+ is vulnerable to AP -2 or worse weapons, BS4+ shooting is average accuracy',
            howToUse: 'Put them on YOUR objectives early. Let them sit and score. Move them forward only when you need to contest mid-table. Keep the unit large so half-strength Battle-Shock is delayed.'
          },
          {
            name: 'Necron Immortals',
            icon: '🔵',
            role: 'Mid-table fighters / Threat projection',
            strengths: 'Sv 3+ and W2 make them very durable. Gauss Blasters (S5, AP-2) can threaten most infantry. Can hold objectives too.',
            weaknesses: 'Fewer models than Warriors. Won\'t benefit from Reanimation as efficiently.',
            howToUse: 'Use them offensively — move toward the centre, contest enemy objectives, and apply pressure. Their durability means they can trade fire with most infantry units without folding.'
          },
          {
            name: 'Overlord',
            icon: '👑',
            role: 'Leader / Melee threat',
            strengths: 'Excellent melee weapon, InSv 4+ for durability, buffs the unit they lead (Attached Unit — join Warriors or Immortals)',
            weaknesses: 'CHARACTER protection means they won\'t die easily, but if their bodyguard is wiped they become vulnerable. OC only 1.',
            howToUse: 'Attach to Immortals for a tough, hard-hitting unit, or attach to Warriors to buff their durability/ability. Keep them central — their buff aura is wasted if they\'re in a corner.'
          }
        ]
      },
      {
        type: 'text',
        heading: 'Basic Necron gameplan for a returning player',
        body: '<strong>Early game (Rounds 1-2):</strong> Move Warriors onto your home objectives. Advance Immortals towards the centre. Keep the Overlord attached and move as a group.\n\n<strong>Mid game (Rounds 2-3):</strong> Contest the central objectives with Immortals. Use shooting to thin out enemy units that threaten your scoring. Charge only when you\'re confident — the Overlord\'s blade is devastating against infantry.\n\n<strong>Late game (Rounds 4-5):</strong> Focus entirely on objective scoring. Use CP for Command Re-rolls on key rolls and Insane Bravery if a scoring unit is at half strength. Reanimation Protocols bringing back Warriors can swing the VP count significantly.'
      },
      {
        type: 'callout',
        icon: '🎯',
        heading: 'One key rule to remember',
        body: '<strong>Necrons win through attrition, not aggression.</strong> You\'re not trying to table the opponent in 3 turns. You\'re trying to outlast them — stay on objectives, come back from the dead, grind out VP turn by turn. The longer the game goes, the more your resilience pays off.'
      }
    ],
    quiz: [
      {
        question: 'You have 6 Warriors remaining on a home objective (OC 12 total). Your opponent charges them with a unit of 4 Berserkers (OC 1 each = 4). After the fight, 3 Warriors are killed. Do you still control the objective?',
        answers: [
          'No — the Berserkers are engaged so they automatically control it',
          'Yes — 3 Warriors remain (OC 6) vs 4 Berserkers (OC 4). You still have higher OC.',
          'Neither player controls it — engaged units can\'t hold objectives',
          'The Berserkers control it — attackers always win contested objectives'
        ],
        correct: 1,
        explanation: 'Even after losing 3 Warriors, you have 3 Warriors left (OC 2 each = OC 6) vs 4 Berserkers (OC 1 each = OC 4). You still hold the objective. Necron Warriors\' OC 2 makes them very hard to contest even with losses — this is a core strength of the faction.'
      },
      {
        question: 'You want to use your Overlord\'s melee ability. What do you do before the game starts?',
        answers: [
          'Nothing — the Overlord fights alone as a solo model',
          'Attach the Overlord to a bodyguard unit (Warriors or Immortals) to form an Attached Unit',
          'Keep the Overlord in Strategic Reserves until Turn 2',
          'Roll a dice — on a 4+ the Overlord can fight independently'
        ],
        correct: 1,
        explanation: 'Leaders like the Overlord must be attached to a compatible bodyguard unit before the battle. This forms an Attached Unit — they move, shoot, and fight together. The bodyguard protects the CHARACTER (they take wounds first), and the CHARACTER buffs the unit.'
      },
      {
        question: 'It\'s Round 4. You\'re winning on VP but your Warriors are at half strength and Battle-Shocked. You have 1CP left. What\'s the best use of it?',
        answers: [
          'Command Re-Roll — save it for the next hit roll',
          'Fire Overwatch — shoot at the approaching enemy',
          'Insane Bravery — automatically pass the Battle-Shock roll so the Warriors keep holding the objective (OC stays active)',
          'Save the CP for next turn'
        ],
        correct: 2,
        explanation: 'Insane Bravery (1CP) auto-passes a Battle-Shock roll before it\'s made. In this situation, your Warriors holding an objective while Battle-Shocked have OC "-" — they score nothing. Spending the CP keeps their OC active and keeps your scoring objective. This is exactly the situation Insane Bravery is designed for.'
      }
    ]
  }
];

// ============================================================
// LEARN STATE
// ============================================================
const LEARN = {
  currentLessonId: null,
  quizAnswered: {},    // lessonId → array of answered indices
  quizCorrect: {},     // lessonId → correct count
  completedLessons: [] // lesson ids completed
};

function loadLearnState() {
  const saved = localStorage.getItem('necronWars_learn_v1');
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      Object.assign(LEARN, parsed);
    } catch(e) {}
  }
}

function saveLearnState() {
  localStorage.setItem('necronWars_learn_v1', JSON.stringify(LEARN));
}

// ============================================================
// LEARN SCREEN ENTRY
// ============================================================
function showLearnScreen() {
  loadLearnState();
  document.getElementById('learn-list').style.display = 'block';
  document.getElementById('learn-lesson').style.display = 'none';
  renderLessonList();
}

function renderLessonList() {
  const container = document.getElementById('lesson-cards');
  if (!container) return;

  const totalLessons = LESSONS.length;
  const completed = LEARN.completedLessons.length;

  document.getElementById('learn-progress-text').textContent = `${completed} / ${totalLessons} lessons complete`;
  document.getElementById('learn-progress-bar').style.width = `${(completed / totalLessons) * 100}%`;

  container.innerHTML = LESSONS.map((lesson, idx) => {
    const isCompleted = LEARN.completedLessons.includes(lesson.id);
    const isLocked = false; // all unlocked for now
    return `
      <div class="lesson-card ${isCompleted ? 'completed' : ''}" onclick="openLesson('${lesson.id}')">
        <div class="lesson-num">${String(idx + 1).padStart(2, '0')}</div>
        <div class="lesson-card-icon">${lesson.icon}</div>
        <div class="lesson-card-info">
          <div class="lesson-card-title">${lesson.title}</div>
          <div class="lesson-card-sub">${lesson.subtitle}</div>
        </div>
        <div class="lesson-card-right">
          <div class="lesson-xp-badge">+${lesson.xp}XP</div>
          <div class="lesson-status">${isCompleted ? '✅' : '›'}</div>
        </div>
      </div>
    `;
  }).join('');
}

// ============================================================
// LESSON VIEW
// ============================================================
function openLesson(lessonId) {
  const lesson = LESSONS.find(l => l.id === lessonId);
  if (!lesson) return;
  LEARN.currentLessonId = lessonId;
  if (!LEARN.quizAnswered[lessonId]) LEARN.quizAnswered[lessonId] = {};
  if (!LEARN.quizCorrect[lessonId]) LEARN.quizCorrect[lessonId] = 0;

  document.getElementById('learn-list').style.display = 'none';
  const lessonEl = document.getElementById('learn-lesson');
  lessonEl.style.display = 'block';

  // Render lesson
  lessonEl.innerHTML = `
    <div class="lesson-header">
      <button class="header-back" onclick="closeLesson()">← Lessons</button>
      <div class="lesson-header-title">${lesson.icon} ${lesson.title}</div>
    </div>
    <div class="lesson-body">
      ${lesson.steps.map(step => renderStep(step)).join('')}
      <div class="lesson-quiz-section" id="lesson-quiz">
        <div class="quiz-section-title">📝 Check Your Understanding</div>
        <div class="quiz-section-sub">3 quick questions based on what you just read</div>
        ${lesson.quiz.map((q, i) => renderInlineQuiz(q, i, lessonId)).join('')}
      </div>
      <div class="lesson-complete-section" id="lesson-complete-section" style="display:none">
        <div class="lesson-complete-icon">⭐</div>
        <div class="lesson-complete-title">Lesson Complete!</div>
        <div class="lesson-complete-xp">+${lesson.xp} XP earned</div>
        <button class="btn-primary" onclick="closeLesson()">← Back to Lessons</button>
      </div>
    </div>
  `;

  lessonEl.scrollTop = 0;
}

function closeLesson() {
  document.getElementById('learn-list').style.display = 'block';
  document.getElementById('learn-lesson').style.display = 'none';
}

// ============================================================
// STEP RENDERERS
// ============================================================
function renderStep(step) {
  switch(step.type) {
    case 'text': return renderTextStep(step);
    case 'callout': return renderCalloutStep(step);
    case 'example': return renderExampleStep(step);
    case 'phases': return renderPhasesStep(step);
    case 'sequence': return renderSequenceStep(step);
    case 'statcard': return renderStatCard(step);
    case 'weaponcard': return renderWeaponCard(step);
    case 'move_types': return renderMoveTypes(step);
    case 'wound_table': return renderWoundTable();
    case 'stratagem_cards': return renderStratagemCards(step);
    case 'unit_guide': return renderUnitGuide(step);
    default: return '';
  }
}

function renderTextStep(step) {
  const body = step.body.replace(/\n\n/g, '</p><p>').replace(/\n/g, '<br>');
  return `
    <div class="lesson-step lesson-text">
      ${step.heading ? `<h3 class="step-heading">${step.heading}</h3>` : ''}
      <p>${body}</p>
    </div>
  `;
}

function renderCalloutStep(step) {
  return `
    <div class="lesson-step lesson-callout">
      <div class="callout-icon">${step.icon}</div>
      <div class="callout-content">
        <div class="callout-heading">${step.heading}</div>
        <div class="callout-body">${step.body.replace(/\n/g, '<br>')}</div>
      </div>
    </div>
  `;
}

function renderExampleStep(step) {
  return `
    <div class="lesson-step lesson-example">
      <div class="example-label">📐 EXAMPLE</div>
      <div class="example-heading">${step.heading}</div>
      <div class="example-body">${step.body.replace(/\n\n/g, '<br><br>').replace(/\n/g, '<br>')}</div>
    </div>
  `;
}

function renderPhasesStep(step) {
  return `
    <div class="lesson-step">
      <div class="phases-list">
        ${step.phases.map((p, i) => `
          <div class="phase-item">
            <div class="phase-num">${i + 1}</div>
            <div class="phase-icon">${p.icon}</div>
            <div class="phase-info">
              <div class="phase-name">${p.name}</div>
              <div class="phase-desc">${p.desc}</div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function renderSequenceStep(step) {
  return `
    <div class="lesson-step">
      <div class="sequence-row">
        ${step.steps.map((s, i) => `
          <div class="seq-item">
            <div class="seq-num">${s.num}</div>
            <div class="seq-label">${s.label}</div>
            <div class="seq-desc">${s.desc}</div>
          </div>
          ${i < step.steps.length - 1 ? '<div class="seq-arrow">→</div>' : ''}
        `).join('')}
      </div>
    </div>
  `;
}

function renderStatCard(step) {
  if (step.isWeapon) return renderWeaponCard(step);
  return `
    <div class="lesson-step">
      <div class="stat-card-display">
        <div class="scd-header">
          <div class="scd-name">${step.name}</div>
          <div class="scd-faction">${step.faction}</div>
        </div>
        <div class="scd-stats">
          ${step.stats.map(s => `
            <div class="scd-stat">
              <div class="scd-stat-val">${s.value}</div>
              <div class="scd-stat-name">${s.name}</div>
              <div class="scd-stat-desc">${s.desc}</div>
            </div>
          `).join('')}
        </div>
        ${step.note ? `<div class="scd-note">${step.note}</div>` : ''}
      </div>
    </div>
  `;
}

function renderWeaponCard(step) {
  return `
    <div class="lesson-step">
      <div class="weapon-card-display">
        <div class="wcd-name">${step.name}</div>
        <div class="wcd-stats">
          ${step.stats.map(s => `
            <div class="wcd-stat">
              <div class="wcd-stat-name">${s.name}</div>
              <div class="wcd-stat-val">${s.value}</div>
              <div class="wcd-stat-desc">${s.desc}</div>
            </div>
          `).join('')}
        </div>
        ${step.note ? `<div class="scd-note">${step.note}</div>` : ''}
      </div>
    </div>
  `;
}

function renderMoveTypes(step) {
  return `
    <div class="lesson-step">
      ${step.moves.map(m => `
        <div class="move-type-card">
          <div class="mtc-header">
            <span class="mtc-icon">${m.icon}</span>
            <span class="mtc-name">${m.name}</span>
          </div>
          <div class="mtc-when">When: ${m.when}</div>
          <div class="mtc-effect">${m.effect}</div>
          <div class="mtc-tradeoff">💡 ${m.tradeoff}</div>
        </div>
      `).join('')}
    </div>
  `;
}

function renderWoundTable() {
  const rows = [
    { condition: 'Strength ≥ twice Toughness', target: '2+', example: 'S8 vs T4' },
    { condition: 'Strength greater than Toughness', target: '3+', example: 'S5 vs T4' },
    { condition: 'Strength equals Toughness', target: '4+', example: 'S4 vs T4' },
    { condition: 'Strength less than Toughness', target: '5+', example: 'S3 vs T4' },
    { condition: 'Strength ≤ half Toughness', target: '6+', example: 'S2 vs T5' }
  ];
  return `
    <div class="lesson-step">
      <div class="wound-table">
        <div class="wt-title">⚔️ Strength vs Toughness — Wound Roll Required</div>
        ${rows.map(r => `
          <div class="wt-row">
            <div class="wt-condition">${r.condition}</div>
            <div class="wt-target">${r.target}</div>
            <div class="wt-example">${r.example}</div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function renderStratagemCards(step) {
  return `
    <div class="lesson-step">
      ${step.cards.map(c => `
        <div class="strat-card">
          <div class="strat-card-header">
            <span class="strat-name">${c.name}</span>
            <span class="strat-cost">${c.cost}</span>
          </div>
          <div class="strat-when">WHEN: ${c.when}</div>
          <div class="strat-effect">${c.effect}</div>
          <div class="strat-tip">💡 ${c.tip}</div>
        </div>
      `).join('')}
    </div>
  `;
}

function renderUnitGuide(step) {
  return `
    <div class="lesson-step">
      ${step.units.map(u => `
        <div class="unit-guide-card">
          <div class="ugc-header">
            <span class="ugc-icon">${u.icon}</span>
            <span class="ugc-name">${u.name}</span>
            <span class="ugc-role">${u.role}</span>
          </div>
          <div class="ugc-row"><span class="ugc-label">✅ Strengths</span><span>${u.strengths}</span></div>
          <div class="ugc-row"><span class="ugc-label">⚠️ Weaknesses</span><span>${u.weaknesses}</span></div>
          <div class="ugc-row"><span class="ugc-label">🎯 Use them</span><span>${u.howToUse}</span></div>
        </div>
      `).join('')}
    </div>
  `;
}

// ============================================================
// INLINE QUIZ
// ============================================================
function renderInlineQuiz(q, idx, lessonId) {
  const letters = ['A', 'B', 'C', 'D'];
  return `
    <div class="inline-quiz" id="quiz-${lessonId}-${idx}">
      <div class="iq-question">${idx + 1}. ${q.question}</div>
      <div class="iq-answers">
        ${q.answers.map((ans, ai) => `
          <button class="iq-answer-btn" onclick="answerInlineQuiz('${lessonId}', ${idx}, ${ai})">
            <span class="iq-letter">${letters[ai]}</span>
            <span>${ans}</span>
          </button>
        `).join('')}
      </div>
      <div class="iq-explanation" id="iq-exp-${lessonId}-${idx}" style="display:none"></div>
    </div>
  `;
}

function answerInlineQuiz(lessonId, qIdx, answerIdx) {
  if (LEARN.quizAnswered[lessonId][qIdx] !== undefined) return;

  const lesson = LESSONS.find(l => l.id === lessonId);
  const q = lesson.quiz[qIdx];
  const correct = answerIdx === q.correct;

  LEARN.quizAnswered[lessonId][qIdx] = answerIdx;
  if (correct) {
    LEARN.quizCorrect[lessonId] = (LEARN.quizCorrect[lessonId] || 0) + 1;
    STATE.correctAnswers++;
    addXP(25);
  } else {
    addXP(5);
  }
  STATE.totalAnswers++;
  saveLearnState();
  saveState();

  // Update UI
  const container = document.getElementById(`quiz-${lessonId}-${qIdx}`);
  container.querySelectorAll('.iq-answer-btn').forEach((btn, i) => {
    btn.disabled = true;
    if (i === q.correct) btn.classList.add('iq-correct');
    if (i === answerIdx && !correct) btn.classList.add('iq-wrong');
  });

  const expEl = document.getElementById(`iq-exp-${lessonId}-${qIdx}`);
  expEl.style.display = 'block';
  expEl.innerHTML = `${correct ? '✅ Correct!' : '❌ Not quite.'} ${q.explanation}`;
  expEl.className = `iq-explanation ${correct ? 'iq-exp-correct' : 'iq-exp-wrong'}`;

  // Check if all quiz questions answered
  checkLessonCompletion(lessonId);
}

function checkLessonCompletion(lessonId) {
  const lesson = LESSONS.find(l => l.id === lessonId);
  const answered = LEARN.quizAnswered[lessonId];
  const allAnswered = lesson.quiz.every((_, i) => answered[i] !== undefined);

  if (allAnswered && !LEARN.completedLessons.includes(lessonId)) {
    LEARN.completedLessons.push(lessonId);
    addXP(lesson.xp);
    saveLearnState();

    const completeSection = document.getElementById('lesson-complete-section');
    if (completeSection) {
      completeSection.style.display = 'block';
      completeSection.scrollIntoView({ behavior: 'smooth' });
    }

    showToast(`🎓 Lesson complete! +${lesson.xp} XP`, 'gold');

    if (LEARN.completedLessons.length >= 3) unlockAchievement('learner_3');
    if (LEARN.completedLessons.length >= LESSONS.length) unlockAchievement('learner_all');
  }
}
