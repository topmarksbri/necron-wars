// ============================================================
// QUIZ QUESTIONS
// ============================================================
const QUIZ_QUESTIONS = [
  // --- CORE CONCEPTS ---
  {
    id: 1, category: "core", difficulty: "easy",
    question: "How many sides does a standard Warhammer 40k die have?",
    answers: ["4", "6", "8", "10"],
    correct: 1,
    explanation: "Warhammer 40,000 uses six-sided dice (D6) for almost everything. When you see D3, you roll a D6 and halve the result, rounding up."
  },
  {
    id: 2, category: "core", difficulty: "easy",
    question: "What does '3+' mean when referring to a dice roll?",
    answers: ["Roll exactly 3", "Roll 3 or more", "Roll 3 or less", "Re-roll any 3s"],
    correct: 1,
    explanation: "A '3+' means you need a result of 3 or higher to succeed. So a 3, 4, 5, or 6 would all pass."
  },
  {
    id: 3, category: "core", difficulty: "easy",
    question: "What is the 'active player'?",
    answers: ["The player who wins most combats", "The player whose turn it currently is", "The player with more models", "The player who set up terrain"],
    correct: 1,
    explanation: "The active player is the one currently taking their turn. Their opponent is the 'opposing player'. This switches back and forth throughout the game."
  },
  {
    id: 4, category: "core", difficulty: "medium",
    question: "How do you make a Leadership roll?",
    answers: ["Roll 1D6 vs the Ld characteristic", "Roll 2D6 vs the Ld characteristic", "Roll 3D6, pick the lowest", "Roll 1D6 and multiply by 2"],
    correct: 1,
    explanation: "To make a Leadership roll, roll 2D6. If the result equals or beats one or more Ld characteristics in the unit, it succeeds."
  },
  {
    id: 5, category: "core", difficulty: "medium",
    question: "When is a unit 'Battle-Shocked'?",
    answers: ["When it takes any damage", "When it fails a Leadership/Battle-Shock roll", "When half its models are destroyed", "When it falls back"],
    correct: 1,
    explanation: "A unit becomes Battle-Shocked when it fails a Battle-Shock roll. This sets its OC to '-', prevents it being targeted by Stratagems, and stops it performing Actions."
  },
  {
    id: 6, category: "core", difficulty: "hard",
    question: "A unit is Battle-Shocked at the start of the Battle-Shock step. Its Battle-Shock roll succeeds. What happens?",
    answers: ["It stays Battle-Shocked", "It is no longer Battle-Shocked", "It loses D3 models", "It must Fall Back"],
    correct: 1,
    explanation: "If a unit was Battle-Shocked at the start of the Battle-Shock step and its roll succeeds during that step, it is no longer Battle-Shocked. Rolling well gives your troops their nerve back!"
  },

  // --- DATASHEETS ---
  {
    id: 7, category: "datasheets", difficulty: "easy",
    question: "What characteristic shows how fast a model moves?",
    answers: ["Toughness (T)", "Move (M)", "Attacks (A)", "Leadership (Ld)"],
    correct: 1,
    explanation: "The Move (M) characteristic tells you how far a model can move in inches during a Normal Move. Higher is faster!"
  },
  {
    id: 8, category: "datasheets", difficulty: "easy",
    question: "What does the Wounds (W) characteristic represent?",
    answers: ["How many attacks a model makes", "How much damage a model can absorb before dying", "The model's armour rating", "How far the model can see"],
    correct: 1,
    explanation: "Wounds shows how much punishment a model can take. When wounds reach 0 or fewer, the model is destroyed. Single-wound models die in one hit; multi-wound ones are tougher."
  },
  {
    id: 9, category: "datasheets", difficulty: "easy",
    question: "What does OC stand for on a datasheet?",
    answers: ["Offensive Capability", "Objective Control", "Overwatch Counter", "Operative Class"],
    correct: 1,
    explanation: "OC is Objective Control — it determines how effectively a model can claim objectives. Higher OC means you contest and hold objectives more powerfully. If OC is '-', the model can't control objectives at all."
  },
  {
    id: 10, category: "datasheets", difficulty: "medium",
    question: "A model has an Invulnerable Save (InSv) of 4+. What does this mean?",
    answers: ["The model can re-roll saves of 4+", "On a 4+, ignore the weapon's AP — use the InSv instead", "The save always passes on 4+ regardless of armour", "The model ignores mortal wounds on a 4+"],
    correct: 1,
    explanation: "An Invulnerable Save bypasses AP entirely. When you make a save roll, you can choose to use your InSv instead of your normal Sv modified by AP. Great against high-AP weapons!"
  },
  {
    id: 11, category: "datasheets", difficulty: "medium",
    question: "What's the difference between Faction keywords and other keywords?",
    answers: ["Faction keywords are always in red", "Faction keywords determine which army you can include the unit in; both work the same in-game otherwise", "Faction keywords give bonus abilities", "Only Faction keywords can be targeted by rules"],
    correct: 1,
    explanation: "Faction keywords (like NECRONS or IMPERIUM) determine army building and eligibility. Once you're playing, both faction and other keywords work exactly the same way for rules purposes."
  },
  {
    id: 12, category: "datasheets", difficulty: "hard",
    question: "A weapon has Ballistic Skill (BS) of 4+. What is a 'Critical Hit' with this weapon?",
    answers: ["Any hit roll of 4+", "An unmodified roll of 6", "An unmodified roll of 1", "Rolling exactly the BS characteristic"],
    correct: 1,
    explanation: "A Critical Hit is always an unmodified roll of 6 on the hit roll — regardless of BS. An unmodified 1 always fails. These are fixed results that no modifier can change."
  },

  // --- MOVEMENT ---
  {
    id: 13, category: "movement", difficulty: "easy",
    question: "Can a model move through friendly models?",
    answers: ["No, never", "Yes, always", "Only INFANTRY models can", "Only in the Fight phase"],
    correct: 1,
    explanation: "Models can always move through friendly models — your own troops get out of each other's way. However, you cannot move through enemy models (their bases block you)."
  },
  {
    id: 14, category: "movement", difficulty: "easy",
    question: "What is 'Coherency' for a multi-model unit?",
    answers: ["Every model must be touching another", "Each model must be within 2\" horizontally and 5\" vertically of at least one other model, and within 9\" of every other model", "All models must be in the same terrain area", "Models must be in a single straight line"],
    correct: 1,
    explanation: "Coherency keeps your unit together. Every model needs to be within 2\" (horizontal) and 5\" (vertical) of at least one other model, AND within 9\" of every other model in the unit."
  },
  {
    id: 15, category: "movement", difficulty: "easy",
    question: "What is a model's 'Engagement Range'?",
    answers: ["The range of its ranged weapons", "Within 2\" horizontally and 5\" vertically", "Within 1\" of an enemy", "The model's Move characteristic"],
    correct: 1,
    explanation: "Engagement Range is 2\" horizontally and 5\" vertically from a model. While you have friendly models in an enemy's engagement range (and vice versa), those units are 'engaged' with each other."
  },
  {
    id: 16, category: "movement", difficulty: "medium",
    question: "After making an Advance Move, can a unit shoot normally?",
    answers: ["Yes, fully", "No, not at all", "Only with ASSAULT weapons", "Only with HEAVY weapons"],
    correct: 2,
    explanation: "After an Advance Move, a unit can only shoot with [ASSAULT] weapons using Assault Shooting. Normal shooting requires you to not have advanced. HEAVY weapons also cannot benefit from their bonus."
  },
  {
    id: 17, category: "movement", difficulty: "medium",
    question: "What must you do before moving in a Fall-Back move if your unit is NOT battle-shocked?",
    answers: ["Make a hazard roll for each model", "Select 'Ordered Retreat' mode", "Make a Ld roll", "Pay 1 CP"],
    correct: 1,
    explanation: "If not Battle-Shocked, you select 'Ordered Retreat' mode — a controlled withdrawal. If you ARE Battle-Shocked, you must use 'Desperate Escape' and make hazard rolls for each model, possibly losing models."
  },
  {
    id: 18, category: "movement", difficulty: "hard",
    question: "An INFANTRY unit is out of coherency at the End of Turn step. What happens?",
    answers: ["The unit is immediately destroyed", "Models are removed one at a time until coherency is restored, but those removals don't trigger 'on destroyed' rules", "The controlling player makes a Leadership roll", "The unit becomes Battle-Shocked"],
    correct: 1,
    explanation: "Out-of-coherency units lose models one at a time until they're back in coherency. Crucially, models removed this way don't trigger any 'when destroyed' rules — it's a forced correction, not combat casualties."
  },

  // --- MAKING ATTACKS ---
  {
    id: 19, category: "attacks", difficulty: "easy",
    question: "What is the order of the attack sequence?",
    answers: ["Wound → Hit → Save → Damage", "Hit → Wound → Save → Damage", "Save → Hit → Wound → Damage", "Hit → Save → Wound → Damage"],
    correct: 1,
    explanation: "The attack sequence is always: 1. Hit Rolls → 2. Wound Rolls → 3. Save Rolls → 4. Inflict Damage. Remember it as: do you HIT? Do you WOUND? Can they SAVE? Then DAMAGE!"
  },
  {
    id: 20, category: "attacks", difficulty: "easy",
    question: "When does a hit roll automatically FAIL regardless of any bonuses?",
    answers: ["On a roll of 2", "On an unmodified roll of 1", "On a roll below the weapon's BS", "On any even number"],
    correct: 1,
    explanation: "An unmodified hit roll of 1 ALWAYS fails — no ability or modifier can save it. Similarly, an unmodified 6 is always a Critical Hit. These are fixed results."
  },
  {
    id: 21, category: "attacks", difficulty: "medium",
    question: "A weapon has Strength 5. The target has Toughness 5. What roll is needed to wound?",
    answers: ["2+", "3+", "4+", "5+"],
    correct: 2,
    explanation: "When Strength EQUALS Toughness, you wound on a 4+. Remember the chart: S double T = 2+, S > T = 3+, S = T = 4+, S < T = 5+, S half T or less = 6+"
  },
  {
    id: 22, category: "attacks", difficulty: "medium",
    question: "What is a 'Critical Wound'?",
    answers: ["Any wound roll of 5+", "An unmodified wound roll of 6", "A wound that reduces a model to 0 wounds", "A wound inflicted by a Critical Hit"],
    correct: 1,
    explanation: "A Critical Wound is an unmodified wound roll of 6. Some weapon abilities (like [ANTI] weapons) can make lower results count as critical wounds against certain targets."
  },
  {
    id: 23, category: "attacks", difficulty: "medium",
    question: "A weapon has AP -2. A model has a Save of 3+. What save roll does the model need?",
    answers: ["3+", "4+", "5+", "Cannot save at all"],
    correct: 2,
    explanation: "AP modifies the save roll. AP -2 means the player subtracts 2 from their save roll result. So they need to roll a 3+2 = 5+ to save. AP makes armour less effective."
  },
  {
    id: 24, category: "attacks", difficulty: "hard",
    question: "When allocating attacks to an attached unit, which group must come LAST in the allocation order?",
    answers: ["The unit with the lowest Saves", "All CHARACTER groups — no CHARACTER group can be earlier than a non-CHARACTER group", "The bodyguard unit", "The unit with the most wounds"],
    correct: 1,
    explanation: "CHARACTER models are protected by their bodyguard. Non-CHARACTER groups must take wounds first. This represents your characters being shielded by their warriors — a key rule for protecting your Overlord!"
  },
  {
    id: 25, category: "attacks", difficulty: "hard",
    question: "What is a 'Mortal Wound'?",
    answers: ["A wound that kills a model outright", "Special damage that bypasses the save roll entirely and is applied directly as wounds", "Damage dealt by melee attacks only", "Damage that cannot be prevented by Feel No Pain"],
    correct: 1,
    explanation: "Mortal Wounds bypass the normal save roll — they go straight to wounds. Each mortal wound removes 1 wound from a model. They're resolved one at a time on non-CHARACTER models first."
  },
  {
    id: 26, category: "attacks", difficulty: "medium",
    question: "Can a unit target an enemy MONSTER or VEHICLE that is engaged (in close combat) with ranged attacks?",
    answers: ["No, never", "Yes, but subtract 1 from hit rolls", "Yes, with no penalty", "Only with BLAST weapons"],
    correct: 1,
    explanation: "You CAN shoot at engaged MONSTERS and VEHICLES, but -1 to hit (except [CLOSE-QUARTERS] weapons from units already engaged with them). Note: BLAST weapons cannot target engaged units at all."
  },

  // --- BATTLE ROUND & PHASES ---
  {
    id: 27, category: "phases", difficulty: "easy",
    question: "How many phases does a player's turn have?",
    answers: ["3", "4", "5", "6"],
    correct: 2,
    explanation: "Each player's turn has 5 phases: Command → Movement → Shooting → Charge → Fight. Plus a Start of Turn and End of Turn step around them."
  },
  {
    id: 28, category: "phases", difficulty: "easy",
    question: "How many Command Points (CP) does each player gain per turn?",
    answers: ["D3 CP", "1 CP", "2 CP", "D6 CP"],
    correct: 1,
    explanation: "Both players gain 1 Core CP during the Gain Core CP step of the Command phase. You spend CP on Stratagems to create powerful tactical moments."
  },
  {
    id: 29, category: "phases", difficulty: "medium",
    question: "In the Fight phase, which units get to fight FIRST before all others?",
    answers: ["The player who won the roll-off", "Units with the 'Fights First' ability (including units that made a Charge Move that turn)", "The unit with the most models", "MONSTER and VEHICLE units"],
    correct: 1,
    explanation: "Units with the Fights First ability — including all units that made a Charge Move that turn — fight before other units. Players alternate selecting Fights First units, then resolve remaining combats."
  },
  {
    id: 30, category: "phases", difficulty: "medium",
    question: "Can a unit that made an Advance Move declare a charge that same turn?",
    answers: ["Yes", "No", "Only if it has an ASSAULT weapon", "Only if the charge roll is 6+"],
    correct: 1,
    explanation: "No — advancing and charging are mutually exclusive. After an Advance Move, a unit is not eligible to declare a charge until the end of the turn. Choose wisely!"
  },
  {
    id: 31, category: "phases", difficulty: "medium",
    question: "What roll is needed for a Charge Move, and what does it determine?",
    answers: ["1D6 — the maximum inches the unit can move", "2D6 — the maximum distance for the charge move", "3D6 drop the lowest — the charge distance", "D6+Move characteristic"],
    correct: 1,
    explanation: "Roll 2D6 for the Charge Roll — this sets the maximum distance for the charge move. Note: on a double 1 (result of 2), a charge is always impossible since you can't be in Engagement Range (2\") to begin with."
  },
  {
    id: 32, category: "phases", difficulty: "hard",
    question: "After a unit completes a Charge Move, what special ability do all models in that unit gain until end of turn?",
    answers: ["Feel No Pain 6+", "Fights First", "[SUSTAINED HITS 1]", "Deep Strike"],
    correct: 1,
    explanation: "Units that complete a charge gain the Fights First ability until end of turn. This is why charging is powerful — your unit gets to strike before the enemy in the Fight phase!"
  },
  {
    id: 33, category: "phases", difficulty: "medium",
    question: "What is a 'Pile-In Move' and when does it happen?",
    answers: ["A move made in the Shooting phase to get into range", "A 3\" move made in the Fight phase to maximise models in base contact with enemies", "A Fall-Back move made after losing combat", "Moving models from Strategic Reserves"],
    correct: 1,
    explanation: "Pile-In Moves happen at the start of the Fight phase. Eligible units can move up to 3\" to get more models into base contact with enemies, maximising your attacks. Models already in base contact can't move."
  },

  // --- TERRAIN & OBJECTIVES ---
  {
    id: 34, category: "terrain", difficulty: "easy",
    question: "What are the three terrain categories?",
    answers: ["Light, Medium, Heavy", "Exposed, Light, Dense", "Open, Scattered, Blocking", "Clear, Cover, Impassable"],
    correct: 1,
    explanation: "The three terrain categories are: Exposed (craters, debris — little protection), Light (barricades, low walls — some cover), and Dense (ruins, buildings — maximum cover and blocks movement)."
  },
  {
    id: 35, category: "terrain", difficulty: "medium",
    question: "What is the 'Benefit of Cover'?",
    answers: ["The model cannot be targeted", "The BS characteristic of attacks against that unit is worsened by 1", "The model gains +1 to Save rolls", "The unit ignores AP -1 or better"],
    correct: 1,
    explanation: "The Benefit of Cover worsens the BS of attacks against the unit by 1, making them harder to hit. INFANTRY/BEASTS/SWARM in a terrain area automatically get it. Other units get it if they're not fully visible."
  },
  {
    id: 36, category: "terrain", difficulty: "medium",
    question: "When does a model become 'Hidden'?",
    answers: ["When it's inside a building", "When it's INFANTRY/BEASTS/SWARM inside a terrain area with dense terrain, AND didn't shoot this turn or last turn", "Whenever it's in any terrain area", "When the controlling player declares it hidden"],
    correct: 1,
    explanation: "Hidden models are INFANTRY/BEASTS/SWARM within a terrain area containing dense features, who haven't shot this turn or last. Hidden models are only visible to enemies within 15\" (detection range)."
  },
  {
    id: 37, category: "terrain", difficulty: "hard",
    question: "What does the 'Solid' rule do for Dense terrain?",
    answers: ["Models cannot move through it", "Line of sight cannot be drawn through enclosed gaps in the surface that are 3\" or less from ground level", "The terrain cannot be damaged or removed", "Units inside it gain Invulnerable Saves"],
    correct: 1,
    explanation: "The Solid rule means line of sight can't be drawn through ground-floor windows, doors, or gaps in dense terrain (up to 3\" high). This ensures models sheltering on the ground floor are genuinely hidden."
  },
  {
    id: 38, category: "terrain", difficulty: "medium",
    question: "How does a player gain control of an objective?",
    answers: ["By moving a model within 1\" of it", "By having a higher total OC of models within range of the objective than the opponent", "By having more models within 3\" of it", "By spending 1 CP and declaring control"],
    correct: 1,
    explanation: "Add up the OC characteristics of all your models within range of the objective. The player with the higher total controls it. If tied, neither player controls it (unless it's been Secured)."
  },

  // --- STRATAGEMS ---
  {
    id: 39, category: "stratagems", difficulty: "easy",
    question: "What resource do you spend to use Stratagems?",
    answers: ["Action Points", "Command Points (CP)", "Fate Dice", "Victory Points"],
    correct: 1,
    explanation: "Stratagems cost Command Points (CP) to use. You gain 1 CP per turn during the Command phase. Spending CP wisely is a key part of 40k tactics!"
  },
  {
    id: 40, category: "stratagems", difficulty: "medium",
    question: "How many times can you use the same Stratagem in a single phase?",
    answers: ["Unlimited times", "Once per phase per player", "Twice per phase", "Once per turn total"],
    correct: 1,
    explanation: "Each player can only use the same Stratagem once per phase. You also can't target the same unit with more than one Stratagem per phase (unless stated otherwise)."
  },
  {
    id: 41, category: "stratagems", difficulty: "medium",
    question: "What does the 'Fire Overwatch' Stratagem do?",
    answers: ["Lets a unit shoot twice in the Shooting phase", "Used at end of opponent's Movement phase — one unengaged friendly unit shoots using Snap Shooting (only hits on unmodified 6s)", "Adds +1 to all hit rolls for a phase", "Lets a unit Overwatch when charged"],
    correct: 1,
    explanation: "Fire Overwatch (1CP) is used at the end of your opponent's Movement phase. One friendly unengaged unit fires using Snap Shooting — attacks only hit on an unmodified 6, and you can't re-roll. It's reactive but powerful!"
  },
  {
    id: 42, category: "stratagems", difficulty: "hard",
    question: "What does the 'Counteroffensive' Stratagem do and when is it used?",
    answers: ["Used in your Fight phase to fight twice", "Used in your opponent's Fight phase just after an enemy unit resolves attacks — your unit gains Fights First and must fight next (costs 2CP)", "Used in your Charge phase to charge after the enemy charges", "Used to prevent an enemy from fighting"],
    correct: 1,
    explanation: "Counteroffensive (2CP) is used in the opponent's Fight phase, just after an enemy unit attacks. Your unit immediately gets Fights First and MUST be selected to fight next. A great counter-punch!"
  },

  // --- WEAPON ABILITIES ---
  {
    id: 43, category: "weapons", difficulty: "easy",
    question: "What does [ASSAULT] allow a weapon to do?",
    answers: ["Fire twice per turn", "Be fired after an Advance Move using Assault Shooting", "Always hit on a 2+", "Make attacks in the Fight phase"],
    correct: 1,
    explanation: "[ASSAULT] weapons can be fired even after the unit has made an Advance Move, using Assault Shooting. Normally, advancing prevents shooting — [ASSAULT] is the exception."
  },
  {
    id: 44, category: "weapons", difficulty: "easy",
    question: "What does [TORRENT] do?",
    answers: ["The weapon has the maximum range", "Attacks with this weapon automatically hit — no hit roll needed", "The weapon deals D6 damage", "Add 1 to all wound rolls"],
    correct: 1,
    explanation: "[TORRENT] weapons automatically hit their target — no hit roll required. Flamethrowers and similar area-denial weapons often have this ability. Very efficient!"
  },
  {
    id: 45, category: "weapons", difficulty: "medium",
    question: "A weapon has [RAPID FIRE 1] and A2. You target a unit within HALF the weapon's range. How many attack dice do you roll?",
    answers: ["2", "3", "4", "D6+2"],
    correct: 1,
    explanation: "[RAPID FIRE X] adds X extra attack dice when targeting within half range. So [RAPID FIRE 1] with A2 targeting within half range = 2+1 = 3 attack dice. Twice the punch up close!"
  },
  {
    id: 46, category: "weapons", difficulty: "medium",
    question: "What does [DEVASTATING WOUNDS] do on a Critical Wound?",
    answers: ["The attack deals maximum damage", "The attack sequence ends and the target suffers mortal wounds equal to the weapon's Damage characteristic", "The target cannot make Invulnerable Saves", "The weapon ignores all AP modifiers"],
    correct: 1,
    explanation: "[DEVASTATING WOUNDS] on a Critical Wound bypasses the save entirely — the attack sequence ends and the target suffers mortal wounds equal to the weapon's D characteristic. Armour is useless!"
  },
  {
    id: 47, category: "weapons", difficulty: "medium",
    question: "What does [HEAVY] do when used in the Shooting phase?",
    answers: ["Adds D3 extra attacks", "Adds +1 to the hit roll if the unit is unengaged, wasn't set up this turn, and no model moved more than 3\"", "Ignores the benefit of cover", "Can target units out of line of sight"],
    correct: 1,
    explanation: "[HEAVY] rewards stationary shooting — if your unit didn't move more than 3\" and is unengaged, you get +1 to hit. Great for static gunline units. Note: Advancing or moving far negates this bonus."
  },
  {
    id: 48, category: "weapons", difficulty: "hard",
    question: "A [BLAST] weapon with A2 targets a unit with 11 models. How many attack dice are rolled?",
    answers: ["2", "3", "4", "6"],
    correct: 2,
    explanation: "[BLAST] adds 1 extra attack dice per 5 models in the target unit (round down). 11 models ÷ 5 = 2 (rounded down). So 2 extra dice + the base A2 = 4 attack dice total. Blasts punish hordes!"
  },
  {
    id: 49, category: "weapons", difficulty: "medium",
    question: "What does [LETHAL HITS] allow you to do on a Critical Hit?",
    answers: ["Deal maximum damage", "Choose for the attack to automatically wound the target (no wound roll needed)", "Ignore the target's save", "Deal 1 mortal wound in addition to normal damage"],
    correct: 1,
    explanation: "[LETHAL HITS] lets you skip the wound roll on a Critical Hit and automatically wound instead. Note: you don't HAVE to use it — skipping the wound roll means you can't get a Critical Wound, which some abilities rely on."
  },

  // --- NECRONS ---
  {
    id: 50, category: "necrons", difficulty: "easy",
    question: "What faction keyword identifies Necron units?",
    answers: ["UNDEAD", "NECRONS", "AWAKENED", "ANCIENT"],
    correct: 1,
    explanation: "Necron units have the NECRONS faction keyword. This is what links them to your army rules, faction abilities (like Reanimation Protocols), and determines which units can fight alongside each other."
  },
  {
    id: 51, category: "necrons", difficulty: "easy",
    question: "Gauss weapons are known for their ability to wound any target. Which wound roll range best represents their reliable S4 Gauss Flayers against T4 Space Marines?",
    answers: ["2+ (Strength much higher)", "3+ (Strength higher)", "4+ (Strength equals Toughness)", "5+ (Strength lower)"],
    correct: 2,
    explanation: "Gauss Flayers have S4 vs T4 Marines — Strength equals Toughness = wound on 4+. Not spectacular, but Necron Warriors fire 2 shots each, so a full squad of 10 puts out 20 attacks. Volume is the key!"
  },
  {
    id: 52, category: "necrons", difficulty: "medium",
    question: "Necron Warriors have a Save of 4+. Against a weapon with AP-1, what do they need to roll to save?",
    answers: ["4+", "5+", "6+", "They automatically fail"],
    correct: 1,
    explanation: "AP-1 worsens the save by 1. Warriors normally save on 4+, so with AP-1 they need a 5+. If the weapon had AP-2, they'd need 6+. High AP weapons are the Warriors' weakness!"
  },
  {
    id: 53, category: "necrons", difficulty: "medium",
    question: "Your Necron Overlord is in an Attached Unit with Necron Warriors. An enemy targets the unit. Whose Toughness is used when resolving attacks?",
    answers: ["The Overlord's T (as CHARACTER)", "The Warriors' T (as the bodyguard, use highest bodyguard T)", "Whichever is higher between Overlord and Warriors", "The average of all models' T values"],
    correct: 1,
    explanation: "When attacking an attached unit containing bodyguard models, ALWAYS use the highest Toughness of the bodyguard models. Your Overlord hides behind their Warriors' durability — until the Warriors are all gone!"
  },
  {
    id: 54, category: "necrons", difficulty: "hard",
    question: "Necrons are famous for their resurrection ability. When a destroyed model is 'revived' back into a unit, what limitation applies?",
    answers: ["It returns with half its wounds", "The unit cannot exceed its starting strength when models are returned", "The returned model has no weapons", "It cannot act until the following turn"],
    correct: 1,
    explanation: "Revived models return with full wounds and all wargear — but you can NEVER exceed the unit's starting strength. If you started with 10 Warriors and still have 8 alive, you can only revive up to 2 more."
  },
  {
    id: 55, category: "necrons", difficulty: "medium",
    question: "Necron Immortals have T4, Sv3+, and W2. Why are they significantly more durable than Warriors (T4, Sv4+, W1)?",
    answers: ["The T difference makes them harder to wound", "Better armour save AND double wounds — they survive two hits that would kill a Warrior, and their 3+ save fails less often", "They have an Invulnerable Save", "Warriors have lower Leadership"],
    correct: 1,
    explanation: "Immortals are elite for two reasons: 3+ save (Sv3+ means save on 3+, Warriors need 4+) means fewer wounds get through, AND 2 Wounds means they survive hits that kill a Warrior outright. Each Immortal is worth roughly 3-4 Warriors in durability."
  },

  // --- ADVANCED RULES ---
  {
    id: 56, category: "advanced", difficulty: "medium",
    question: "What is 'Deep Strike'?",
    answers: ["A bonus attack in the Fight phase", "An ability allowing a unit to arrive from Strategic Reserves anywhere on the battlefield more than 8\" from enemy units", "Moving through dense terrain without penalty", "A guaranteed charge after falling back"],
    correct: 1,
    explanation: "Deep Strike lets units with this ability arrive from Strategic Reserves ANYWHERE on the battlefield (not just from the edge), as long as they're more than 8\" from all enemies. Perfect for flanking or objective grabbing!"
  },
  {
    id: 57, category: "advanced", difficulty: "medium",
    question: "When can units in Strategic Reserves first arrive on the battlefield?",
    answers: ["Battle Round 1", "Battle Round 2 onwards (unless stated otherwise)", "Battle Round 3 onwards", "Any time"],
    correct: 1,
    explanation: "Strategic Reserves units can only arrive from Battle Round 2 onwards by default. Also: at the end of Battle Round 3, any remaining Strategic Reserve units that haven't arrived are destroyed!"
  },
  {
    id: 58, category: "advanced", difficulty: "hard",
    question: "What percentage of your points limit can you place in Strategic Reserves?",
    answers: ["25%", "50%", "75%", "100%"],
    correct: 1,
    explanation: "By default, Strategic Reserves cannot exceed 50% of your army's points. This prevents players from holding their entire army off the table and deploying it all late-game."
  },
  {
    id: 59, category: "advanced", difficulty: "medium",
    question: "What does 'Feel No Pain X+' do?",
    answers: ["The model ignores mortal wounds on X+", "Each time the model would lose a wound, roll a D6: on X+, that wound is not lost", "The model automatically passes saves on X+", "Attacks against this model wound on X+ at best"],
    correct: 1,
    explanation: "Feel No Pain X+ is a wound-prevention roll. Each time you'd lose a wound, roll a D6 — on X+, the wound is ignored. It applies AFTER failed saves and against mortal wounds. Necron vehicles often have Living Metal (similar concept)!"
  },
  {
    id: 60, category: "advanced", difficulty: "hard",
    question: "A unit has LONE OPERATIVE. What protection does this give?",
    answers: ["The unit cannot be targeted by melee attacks", "The unit is not visible to enemy models unless they are within 12\"", "The unit auto-passes Battle-Shock rolls", "The unit gains Feel No Pain 5+"],
    correct: 1,
    explanation: "Lone Operative makes the unit invisible beyond 12\" — enemy models must be within 12\" to see (and thus target) it. It also can't be targeted by [INDIRECT FIRE] weapons unless the attacker is within 12\". Great for solo characters!"
  }
];

// ============================================================
// RULES REFERENCE
// ============================================================
const RULES_REFERENCE = [
  {
    id: "r01", title: "Core Concepts", icon: "⚙️", category: "core",
    sections: [
      { heading: "Armies, Units & Models", text: "Each player commands an army of units. A unit contains one or more models. Rules referring to 'friendly' units mean yours; 'enemy' means your opponent's." },
      { heading: "Measuring Distances", text: "All distances are in inches (\"). Measure from the closest part of a model's base. You can measure at any time." },
      { heading: "Dice", text: "D6 = six-sided die. D3 = roll D6, halve, round up. 2D6 = roll two D6, add together. 2+ means roll 2 or more. Unmodified 1 always fails. Unmodified 6 is always a Critical Hit." },
      { heading: "Leadership Rolls", text: "Roll 2D6. If result equals or beats one or more Ld values in the unit, it succeeds." },
      { heading: "Battle-Shock", text: "Roll 2D6 vs Leadership. If you fail: OC becomes '-', can't be targeted by Stratagems, can't start Actions. Required for Battle-Shocked units and those at/below half strength each Command phase." }
    ]
  },
  {
    id: "r02", title: "Datasheets", icon: "📋", category: "core",
    sections: [
      { heading: "Model Characteristics", text: "M (Move): Speed in inches. T (Toughness): Resistance to wounds. Sv (Save): Armour, as a dice target (lower = better). InSv (Invulnerable Save): Bypasses AP. W (Wounds): Takes this many wounds to destroy. Ld (Leadership): Morale rating. OC (Objective Control): Ability to hold objectives." },
      { heading: "Weapon Characteristics", text: "R (Range): Max distance to target. A (Attacks): Number of attack dice. BS/WS: Hit roll target number. S (Strength): Used to determine wound rolls. AP (Armour Penetration): Modifier to enemy save rolls. D (Damage): Wounds caused on a successful attack." },
      { heading: "Keywords", text: "Keywords appear in BOLD CAPITALS. Faction keywords (like NECRONS) determine army eligibility. All keywords function the same in-game." }
    ]
  },
  {
    id: "r03", title: "Movement", icon: "👣", category: "movement",
    sections: [
      { heading: "Move Types", text: "Normal Move: up to M\". Advance Move: M\"+D6\", but can't charge or shoot (except [ASSAULT] weapons). Fall-Back: M\", ordered retreat (or desperate escape if Battle-Shocked)." },
      { heading: "Coherency", text: "Each model must be: within 2\" horizontally AND 5\" vertically of at least one other model; AND within 9\" of every model in the unit." },
      { heading: "Engagement Range", text: "2\" horizontally and 5\" vertically. Models within this range of enemies are 'engaged'. Engaged units can't make Normal/Advance moves." },
      { heading: "Moving Through Terrain", text: "Dense terrain: INFANTRY/BEASTS/SWARM can move through horizontally and vertically. Other models must go around sections >2\" tall, or climb over them." }
    ]
  },
  {
    id: "r04", title: "Making Attacks", icon: "🎯", category: "attacks",
    sections: [
      { heading: "Attack Steps", text: "1. Select Weapons  2. Select Targets  3. Resolve Attacks (Hit → Wound → Save → Damage)" },
      { heading: "Hit Rolls", text: "Roll D6 per attack. Unmodified 1 = FAIL. Unmodified 6 = CRITICAL HIT. Equal or beat BS/WS = HIT. Anything else = fail." },
      { heading: "Wound Rolls", text: "S ≥ 2×T: wound on 2+  |  S > T: 3+  |  S = T: 4+  |  S < T: 5+  |  S ≤ T÷2: 6+. Unmodified 1 always fails. Unmodified 6 always Critical Wound." },
      { heading: "Save Rolls", text: "Modify save roll by weapon AP. If equal/beat Sv → attack FAILS. If Invulnerable Save exists and roll beats InSv → also FAILS. Otherwise → DAMAGE." },
      { heading: "Damage", text: "Failed save → model loses wounds equal to weapon's D. If wounds reach 0 → destroyed. CHARACTER models must be last in allocation order." },
      { heading: "Mortal Wounds", text: "Bypass save rolls. Directly remove 1 wound per mortal wound. Applied to non-CHARACTER models first." }
    ]
  },
  {
    id: "r05", title: "Battle Round", icon: "🔄", category: "phases",
    sections: [
      { heading: "Structure", text: "Start of Battle Round → Player 1 Turn → Player 2 Turn → End of Battle Round. Usually 5 battle rounds total." },
      { heading: "A Player's Turn", text: "Start of Turn → Command Phase → Movement Phase → Shooting Phase → Charge Phase → Fight Phase → End of Turn" },
      { heading: "Command Phase", text: "Both players gain 1CP. Active player makes Battle-Shock rolls for units that are currently shocked OR at/below half strength." },
      { heading: "Movement Phase", text: "Move all units (even to remain stationary). Reinforcements from Strategic Reserves arrive." },
      { heading: "Shooting Phase", text: "Eligible units (unengaged, not fallen back) shoot with ranged weapons." },
      { heading: "Charge Phase", text: "Units within 12\" of enemies can declare charges. Roll 2D6 for charge distance. Chargers gain Fights First." },
      { heading: "Fight Phase", text: "Pile In → Fight (Fights First units go first) → Consolidate. Both players fight!" }
    ]
  },
  {
    id: "r06", title: "Terrain", icon: "🏚️", category: "terrain",
    sections: [
      { heading: "Categories", text: "Exposed: craters, debris — doesn't impede movement or provide meaningful cover. Light: barricades, low walls — provides cover. Dense: ruins, buildings — blocks movement and sight." },
      { heading: "Benefit of Cover", text: "Worsens attacker's BS by 1. INFANTRY/BEASTS/SWARM within any terrain area get this automatically. Other models get it if not fully visible." },
      { heading: "Hidden", text: "INFANTRY/BEASTS/SWARM in dense terrain who haven't shot this OR last turn are Hidden. Only visible to enemies within 15\" (detection range)." },
      { heading: "Obscuring", text: "If every line of sight crosses an obscuring terrain area (between two models), they can't see each other." },
      { heading: "Solid", text: "Dense terrain: line of sight can't go through enclosed gaps ≤3\" from ground level. Ground floor windows/doors don't let you see through." }
    ]
  },
  {
    id: "r07", title: "Objectives", icon: "🎯", category: "terrain",
    sections: [
      { heading: "Terrain Objectives", text: "Objectives are terrain areas defined by the mission. To control one, have the highest total OC of models within range." },
      { heading: "Controlling", text: "Add OC of all your models within the objective area. Compare with opponent. Higher total = you control it. Tie = neither controls it." },
      { heading: "Secured Objectives", text: "Some abilities let you 'secure' an objective — it stays yours even if your models leave, until the enemy has higher OC at end of a phase." }
    ]
  },
  {
    id: "r08", title: "Stratagems", icon: "⚡", category: "stratagems",
    sections: [
      { heading: "Core Stratagems", text: "Command Re-roll (1CP): Re-roll any one roll. Epic Challenge (1CP): Fighter phase, CHARACTER gets [PRECISION]. Insane Bravery (1CP): Auto-pass Battle-Shock roll (once per battle). Explosives (1CP): Throw grenades! Fire Overwatch (1CP): Snap shot during opponent's movement. Rapid Ingress (1CP): Deploy reserve unit at end of opponent's Movement. Smokescreen (1CP): Unit gains benefit of cover for a phase. Heroic Intervention (1CP): Charge after opponent's charge phase. Counteroffensive (2CP): Fight after an enemy unit in THEIR Fight phase. Crushing Impact (1CP): Monster/Vehicle causes mortal wounds on charge." },
      { heading: "Rules", text: "Max 1 use per Stratagem per phase. Can't target the same unit with more than 1 Stratagem per phase. Must have enough CP before using." }
    ]
  },
  {
    id: "r09", title: "Weapon Abilities", icon: "⚔️", category: "weapons",
    sections: [
      { heading: "[ANTI-X Y+]", text: "Against targets with keyword X, unmodified wound roll of Y+ = Critical Wound." },
      { heading: "[ASSAULT]", text: "Can shoot after an Advance Move using Assault Shooting." },
      { heading: "[BLAST]", text: "Add 1 extra attack die per 5 models in target unit (round down). Great vs hordes." },
      { heading: "[CLEAVE X]", text: "If targeting only one unit, add X extra attack dice per 5 models (round down). Similar to BLAST but requires single target." },
      { heading: "[CLOSE-QUARTERS] / [PISTOL]", text: "Can shoot while engaged. Functionally identical." },
      { heading: "[DEVASTATING WOUNDS]", text: "Critical Wound → attack sequence ends, target suffers mortal wounds equal to weapon's D characteristic." },
      { heading: "[HAZARDOUS]", text: "After resolving attacks, make a hazard roll for each [HAZARDOUS] weapon used. On 1-2, suffer 1 mortal wound (or 3 if MONSTER/VEHICLE)." },
      { heading: "[HEAVY]", text: "+1 to hit if unit didn't move more than 3\" this turn and is unengaged." },
      { heading: "[IGNORES COVER]", text: "Target cannot benefit from cover against this attack." },
      { heading: "[INDIRECT FIRE]", text: "Can target units not visible to the shooter. Target always gets cover. Hits only on 6+ unless unit is stationary and target is visible to a friendly." },
      { heading: "[LANCE]", text: "+1 to wound roll if the attacking unit made a Charge Move this turn." },
      { heading: "[LETHAL HITS]", text: "Critical Hit → can choose to auto-wound (no wound roll). You may skip this to try for a Critical Wound instead." },
      { heading: "[MELTA X]", text: "+X to Damage characteristic when target is within half range." },
      { heading: "[ONE SHOT]", text: "Can only be used once per battle." },
      { heading: "[PRECISION]", text: "Can direct wounds to visible CHARACTER models in the target unit (they become current allocation group)." },
      { heading: "[PSYCHIC]", text: "Can ignore BS/WS modifiers and hit roll modifiers. Attacks count as psychic attacks." },
      { heading: "[RAPID FIRE X]", text: "+X extra attack dice when target is within half range." },
      { heading: "[SUSTAINED HITS X]", text: "Critical Hit → target suffers X additional hits." },
      { heading: "[TORRENT]", text: "Attacks automatically hit — no hit roll required." },
      { heading: "[TWIN-LINKED]", text: "Can re-roll wound rolls." }
    ]
  },
  {
    id: "r10", title: "Core Abilities", icon: "✨", category: "advanced",
    sections: [
      { heading: "Deadly Demise X", text: "When model destroyed, roll D6: on 6, each unit within 6\" suffers X mortal wounds." },
      { heading: "Deep Strike", text: "Arrives from Strategic Reserves anywhere on battlefield, more than 8\" from enemy." },
      { heading: "Feel No Pain X+", text: "Each time this model would lose a wound, roll D6: on X+, that wound is not lost." },
      { heading: "Fights First", text: "This unit fights before non-Fights First units in the Fight phase. Also gained by charging units." },
      { heading: "Firing Deck X", text: "TRANSPORT: select up to X embarked models to contribute their ranged weapons to the TRANSPORT's shooting." },
      { heading: "Hover", text: "When taking to the skies (FLY), do not subtract 2\" from maximum distance." },
      { heading: "Infiltrators", text: "During deployment, can be set up more than 8\" from enemy deployment zone and enemy units (ignores normal deployment restrictions)." },
      { heading: "Leader / Support", text: "Can join a bodyguard unit to form an Attached Unit. See Attached Units rules." },
      { heading: "Lone Operative", text: "Not visible to enemies beyond 12\" (or X\" if specified). Can't be targeted by [INDIRECT FIRE] from >12\" away." },
      { heading: "Scouts X\"", text: "Before battle begins, can make a scout move of up to X\" within or from your deployment zone." },
      { heading: "Stealth", text: "Every ranged attack targeting this unit applies benefit of cover (BS worsened by 1)." },
      { heading: "Super-Heavy Walker", text: "Can move through models and through sections of terrain ≤4\" tall. Can gain MOBILE keyword to move through dense terrain horizontally." }
    ]
  },
  {
    id: "r11", title: "Necrons Guide", icon: "💚", category: "necrons",
    sections: [
      { heading: "Who Are the Necrons?", text: "Ancient machine-gods of living metal who slept for 60 million years and are now awakening to reclaim their galaxy. Once flesh-and-blood beings (the Necrontyr), they transferred their consciousness into immortal bodies of living metal — at great cost to their souls." },
      { heading: "Necron Warriors", text: "Your rank-and-file troops. T4, Sv4+, W1, OC2. Armed with Gauss Flayers (24\", A2, BS4+, S4, AP0, D1). Cheap and plentiful. Their strength is in numbers — 10 models = 20 shots per turn." },
      { heading: "Necron Immortals", text: "Elite veterans. T4, Sv3+, W2, OC2. Gauss Blasters (24\", A2, BS3+, S5, AP-2, D1) or Tesla Carbines (24\", A3, BS3+, S5, AP0, D1, [SUSTAINED HITS 2]). Far more durable than Warriors." },
      { heading: "Overlord", text: "Your warlord. T5, Sv3+, InSv4+, W4, OC1. Excellent in combat. Can join Warrior or Immortal units to form an Attached Unit, sharing buffs with them." },
      { heading: "Gauss Weapons", text: "The standard Necron weapon type. Gauss Flayers: reliable S4 with volume of fire. Gauss Blasters: better S5 with AP-2 for punching through armour. Gauss Cannons: heavy weapons with even higher Strength." },
      { heading: "Reanimation Protocols", text: "Necrons are famously hard to kill permanently. Their faction ability lets destroyed models return to life! This is why you should always try to keep Warriors as a large squad — more models eligible to come back." },
      { heading: "Playstyle Tips", text: "Keep Warriors in large units for maximum Reanimation value. Use Immortals for precision firepower. Your Overlord buffs nearby units — keep them central. Focus on objectives; Necrons are tough and can outlast opponents." },
      { heading: "Tesla Weapons", text: "Tesla Carbines have [SUSTAINED HITS 2] — Critical Hits generate 2 extra hits! On a BS3+ weapon with 3 attacks each, you'll generate plenty of critical hits to flood enemies with additional attacks." }
    ]
  }
];

// ============================================================
// BATTLE SIMULATOR DATA
// ============================================================
const BATTLE_DATA = {
  scenarios: [
    {
      id: "tutorial",
      name: "First Blood",
      subtitle: "Tutorial — Shooting Only",
      description: "A guided introduction to shooting mechanics. Move up and unleash the power of Gauss weaponry.",
      rounds: 2,
      necrons: {
        units: [
          {
            id: "warriors", name: "Necron Warriors", count: 10, maxCount: 10,
            M: 6, T: 4, Sv: 4, InSv: null, W: 1, Ld: 7, OC: 2,
            weapons: [{ name: "Gauss Flayer", range: 24, A: 2, BS: 4, S: 4, AP: 0, D: 1, abilities: [] }],
            position: 6, keywords: ["INFANTRY", "BATTLELINE", "NECRONS"]
          }
        ]
      },
      marines: {
        units: [
          {
            id: "intercessors", name: "Intercessors", count: 5, maxCount: 5,
            M: 6, T: 4, Sv: 3, InSv: null, W: 2, Ld: 6, OC: 2,
            weapons: [{ name: "Bolt Rifle", range: 24, A: 2, BS: 3, S: 4, AP: -1, D: 1, abilities: [] }],
            position: 30, keywords: ["INFANTRY", "BATTLELINE", "ADEPTUS ASTARTES"]
          }
        ]
      }
    },
    {
      id: "awakening",
      name: "The Awakening",
      subtitle: "Full Battle — All Phases",
      description: "Your Overlord leads Warriors and Immortals against Space Marine defenders. Master all five phases across 3 battle rounds.",
      rounds: 3,
      necrons: {
        units: [
          {
            id: "overlord", name: "Overlord", count: 1, maxCount: 1,
            M: 6, T: 5, Sv: 3, InSv: 4, W: 4, Ld: 7, OC: 1,
            weapons: [
              { name: "Gauss Pistol", range: 12, A: 2, BS: 3, S: 4, AP: -1, D: 1, abilities: ["PISTOL"] },
              { name: "Overlord's Blade", range: "Melee", A: 5, WS: 2, S: 6, AP: -2, D: 2, abilities: [] }
            ],
            position: 6, keywords: ["INFANTRY", "CHARACTER", "OVERLORD", "NECRONS"],
            attached_to: "warriors"
          },
          {
            id: "warriors", name: "Necron Warriors", count: 10, maxCount: 10,
            M: 6, T: 4, Sv: 4, InSv: null, W: 1, Ld: 7, OC: 2,
            weapons: [{ name: "Gauss Flayer", range: 24, A: 2, BS: 4, S: 4, AP: 0, D: 1, abilities: [] }],
            position: 6, keywords: ["INFANTRY", "BATTLELINE", "NECRONS"]
          },
          {
            id: "immortals", name: "Necron Immortals", count: 5, maxCount: 5,
            M: 5, T: 4, Sv: 3, InSv: null, W: 2, Ld: 7, OC: 2,
            weapons: [{ name: "Gauss Blaster", range: 24, A: 2, BS: 3, S: 5, AP: -2, D: 1, abilities: [] }],
            position: 6, keywords: ["INFANTRY", "CORE", "NECRONS"]
          }
        ]
      },
      marines: {
        units: [
          {
            id: "captain", name: "Space Marine Captain", count: 1, maxCount: 1,
            M: 6, T: 4, Sv: 3, InSv: 4, W: 5, Ld: 6, OC: 1,
            weapons: [
              { name: "Bolt Pistol", range: 12, A: 1, BS: 3, S: 4, AP: 0, D: 1, abilities: ["PISTOL"] },
              { name: "Power Sword", range: "Melee", A: 6, WS: 2, S: 4, AP: -2, D: 2, abilities: [] }
            ],
            position: 42, keywords: ["INFANTRY", "CHARACTER", "CAPTAIN", "ADEPTUS ASTARTES"],
            attached_to: "intercessors"
          },
          {
            id: "intercessors", name: "Intercessors", count: 5, maxCount: 5,
            M: 6, T: 4, Sv: 3, InSv: null, W: 2, Ld: 6, OC: 2,
            weapons: [
              { name: "Bolt Rifle", range: 24, A: 2, BS: 3, S: 4, AP: -1, D: 1, abilities: [] },
              { name: "Close Combat Weapon", range: "Melee", A: 3, WS: 4, S: 4, AP: 0, D: 1, abilities: [] }
            ],
            position: 42, keywords: ["INFANTRY", "BATTLELINE", "ADEPTUS ASTARTES"]
          }
        ]
      }
    }
  ]
};

// ============================================================
// ACHIEVEMENTS
// ============================================================
const ACHIEVEMENTS = [
  { id: "first_quiz", title: "First Steps", desc: "Complete your first quiz question", icon: "🎯", xp: 50 },
  { id: "quiz_streak_5", title: "On a Roll", desc: "Answer 5 questions correctly in a row", icon: "🔥", xp: 100 },
  { id: "quiz_master", title: "Codex Scholar", desc: "Answer 25 questions correctly", icon: "📚", xp: 250 },
  { id: "necron_expert", title: "Awakened Mind", desc: "Complete all Necron category questions", icon: "💚", xp: 200 },
  { id: "first_battle", title: "First Awakening", desc: "Complete your first battle scenario", icon: "⚔️", xp: 150 },
  { id: "battle_veteran", title: "Veteran of the Long War", desc: "Complete both battle scenarios", icon: "🏆", xp: 300 },
  { id: "rule_reader", title: "Lore Keeper", desc: "Read 5 different reference sections", icon: "📖", xp: 100 },
  { id: "perfect_quiz", title: "Perfect Protocol", desc: "Complete a 10-question quiz with no mistakes", icon: "⭐", xp: 200 },
  { id: "xp_500", title: "Initiate of the Dynasty", desc: "Earn 500 XP total", icon: "🌟", xp: 0 },
  { id: "xp_1500", title: "Cryptek Apprentice", desc: "Earn 1500 XP total", icon: "💎", xp: 0 },
  { id: "xp_3000", title: "Overlord of Knowledge", desc: "Earn 3000 XP total", icon: "👑", xp: 0 },
  { id: "learner_3", title: "Student of War", desc: "Complete 3 lessons", icon: "🎓", xp: 150 },
  { id: "learner_all", title: "Master of the Codex", desc: "Complete all lessons", icon: "📜", xp: 400 }
];

// ============================================================
// LEVELS & TITLES
// ============================================================
const LEVELS = [
  { level: 1, title: "Dormant Warrior", xpRequired: 0 },
  { level: 2, title: "Reanimated Initiate", xpRequired: 200 },
  { level: 3, title: "Necron Warrior", xpRequired: 500 },
  { level: 4, title: "Immortal Guard", xpRequired: 1000 },
  { level: 5, title: "Cryptek Apprentice", xpRequired: 1750 },
  { level: 6, title: "Necron Overlord", xpRequired: 2750 },
  { level: 7, title: "Royal Warden", xpRequired: 4000 },
  { level: 8, title: "Canoptek Technologist", xpRequired: 5500 },
  { level: 9, title: "Phaeron of the Dynasty", xpRequired: 7500 },
  { level: 10, title: "The Silent King", xpRequired: 10000 }
];
