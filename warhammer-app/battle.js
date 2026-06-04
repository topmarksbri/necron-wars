// ============================================================
// BATTLE SIMULATOR
// ============================================================
const BATTLE = {
  scenario: null,
  round: 1,
  phase: null,
  turn: 'player',
  log: [],
  manualMode: false,
  diceCount: 0,
  pendingAction: null,
  cp: { player: 0, ai: 0 },
  battleDone: false,
  stats: { playerKills: 0, aiKills: 0, roundsFought: 0 },

  // Live unit state (deep copy from scenario)
  necrons: [],
  marines: []
};

const PHASES = ['command', 'movement', 'shooting', 'charge', 'fight'];
const PHASE_NAMES = {
  command: '⚙️ Command Phase',
  movement: '👣 Movement Phase',
  shooting: '🎯 Shooting Phase',
  charge: '⚡ Charge Phase',
  fight: '⚔️ Fight Phase'
};

// ============================================================
// SETUP
// ============================================================
function showBattleSetup() {
  document.getElementById('battle-setup').style.display = 'block';
  document.getElementById('battle-active').style.display = 'none';
  document.getElementById('battle-victory').style.display = 'none';
  renderScenarioCards();
}

function renderScenarioCards() {
  const container = document.getElementById('scenario-cards');
  if (!container) return;
  container.innerHTML = BATTLE_DATA.scenarios.map(s => `
    <div class="scenario-card" onclick="startBattle('${s.id}')">
      <div class="scenario-name">${s.name}</div>
      <div class="scenario-subtitle">${s.subtitle}</div>
      <div class="scenario-desc">${s.description}</div>
      <div class="scenario-tags">
        <span class="tag">${s.rounds} ROUNDS</span>
        <span class="tag">${s.necrons.units.length} UNIT${s.necrons.units.length > 1 ? 'S' : ''}</span>
        ${s.id === 'tutorial' ? '<span class="tag">RECOMMENDED FIRST</span>' : '<span class="tag">ALL PHASES</span>'}
      </div>
    </div>
  `).join('');
}

function startBattle(scenarioId) {
  const scenario = BATTLE_DATA.scenarios.find(s => s.id === scenarioId);
  if (!scenario) return;

  BATTLE.scenario = scenario;
  BATTLE.round = 1;
  BATTLE.phase = 'command';
  BATTLE.turn = 'player';
  BATTLE.log = [];
  BATTLE.cp = { player: 2, ai: 2 };
  BATTLE.battleDone = false;
  BATTLE.stats = { playerKills: 0, aiKills: 0, roundsFought: 0 };

  // Deep copy units
  BATTLE.necrons = scenario.necrons.units.map(u => ({
    ...u,
    wounds: u.W * u.count,  // total wounds pool (multi-wound units)
    currentWounds: u.W * u.count,
    maxWounds: u.W * u.count,
    moved: false,
    shot: false,
    charged: false,
    fought: false
  }));

  BATTLE.marines = scenario.marines.units.map(u => ({
    ...u,
    currentWounds: u.W * u.count,
    maxWounds: u.W * u.count,
    moved: false,
    shot: false,
    charged: false,
    fought: false
  }));

  document.getElementById('battle-setup').style.display = 'none';
  document.getElementById('battle-active').style.display = 'block';

  logBattle(`🏛️ BATTLE BEGINS: ${scenario.name}`, 'phase-header');
  logBattle(`You command the Necron forces. Your goal: destroy the enemy and win glory for your Dynasty!`, 'info');

  updateBattleUI();
  runPhase();
}

// ============================================================
// PHASE ENGINE
// ============================================================
function runPhase() {
  resetUnitTurnState();
  updateBattleUI();

  const phaseName = PHASE_NAMES[BATTLE.phase];
  logBattle(`\n${phaseName} — Round ${BATTLE.round}`, 'phase-header');

  switch (BATTLE.phase) {
    case 'command': runCommandPhase(); break;
    case 'movement': runMovementPhase(); break;
    case 'shooting': runShootingPhase(); break;
    case 'charge': runChargePhase(); break;
    case 'fight': runFightPhase(); break;
  }
}

function nextPhase() {
  if (checkBattleEnd()) return;

  const idx = PHASES.indexOf(BATTLE.phase);
  if (idx < PHASES.length - 1) {
    BATTLE.phase = PHASES[idx + 1];
  } else {
    // End of player turn — AI turn, then next round
    BATTLE.round++;
    BATTLE.phase = 'command';
    if (BATTLE.round > BATTLE.scenario.rounds) {
      endBattle();
      return;
    }
    BATTLE.stats.roundsFought = BATTLE.round - 1;
    logBattle(`\n═══════════════════════════════`, 'phase-header');
    logBattle(`🔄 BATTLE ROUND ${BATTLE.round} BEGINS`, 'phase-header');
    logBattle(`═══════════════════════════════`, 'phase-header');
  }

  updateBattleUI();
  runPhase();
}

function resetUnitTurnState() {
  [...BATTLE.necrons, ...BATTLE.marines].forEach(u => {
    u.moved = false; u.shot = false; u.charged = false; u.fought = false;
  });
}

// ============================================================
// COMMAND PHASE
// ============================================================
function runCommandPhase() {
  BATTLE.cp.player += 1;
  BATTLE.cp.ai += 1;

  logBattle(`Both players gain 1 CP. You now have ${BATTLE.cp.player} CP.`, 'info');
  logBattle(`Battle-Shock check: all units pass (they're Necrons — fear means nothing).`, 'info');

  setActionPanel(
    'Command Phase Complete',
    `You gained 1 CP (total: ${BATTLE.cp.player} CP). In a full game, you'd also check for Battle-Shocked units here. For now, all your warriors are resolute.`,
    null,
    [{ label: 'Advance to Movement Phase →', action: nextPhase }]
  );
}

// ============================================================
// MOVEMENT PHASE
// ============================================================
function runMovementPhase() {
  const warriors = BATTLE.necrons.find(u => u.id === 'warriors');
  const immortals = BATTLE.necrons.find(u => u.id === 'immortals');
  const overlord = BATTLE.necrons.find(u => u.id === 'overlord');

  const enemyPos = BATTLE.marines[BATTLE.marines.length - 1].position;
  const mainUnit = warriors || immortals || BATTLE.necrons[0];
  const distance = Math.abs(mainUnit.position - enemyPos);

  const canShoot = BATTLE.necrons.some(u => {
    const weapons = u.weapons.filter(w => typeof w.range === 'number');
    return weapons.some(w => distance <= w.range);
  });

  setActionPanel(
    '👣 Movement — Choose Your Approach',
    `Enemy is approximately ${distance}" away. Your Gauss weapons have 24" range. ${canShoot ? 'You can already reach them!' : 'You need to move closer to shoot.'}`,
    null,
    [
      {
        label: '⚡ Advance — Move + D6" extra (can\'t charge)',
        sublabel: `Move ${mainUnit.M}" + advance roll. Great for closing distance.`,
        action: () => doPlayerMovement('advance')
      },
      {
        label: '➡️ Normal Move — Move up to ' + mainUnit.M + '"',
        sublabel: 'Standard movement. Can still shoot and charge this turn.',
        action: () => doPlayerMovement('normal')
      },
      {
        label: '⏸️ Remain Stationary — Stay put for better accuracy',
        sublabel: 'No movement. [HEAVY] weapons get +1 to hit.',
        action: () => doPlayerMovement('stationary')
      }
    ]
  );
}

function doPlayerMovement(type) {
  const mainUnit = BATTLE.necrons.find(u => !u.keywords.includes('CHARACTER')) || BATTLE.necrons[0];
  let moveAmount = 0;
  let advanceRoll = 0;

  if (type === 'advance') {
    advanceRoll = rollDie();
    moveAmount = mainUnit.M + advanceRoll;
    BATTLE.necrons.forEach(u => {
      if (!u.keywords.includes('CHARACTER')) {
        u.position += moveAmount;
        u.moved = true;
        u.advanced = true;
      }
    });
    logBattle(`Your warriors ADVANCE. Advance roll: ${advanceRoll}. Moved ${moveAmount}" closer!`, 'player-action');
  } else if (type === 'normal') {
    moveAmount = mainUnit.M;
    BATTLE.necrons.forEach(u => {
      if (!u.keywords.includes('CHARACTER')) {
        u.position += moveAmount;
        u.moved = true;
        u.advanced = false;
      }
    });
    logBattle(`Your warriors make a Normal Move — ${moveAmount}" forward.`, 'player-action');
  } else {
    logBattle(`Your warriors hold position. No movement made.`, 'player-action');
  }

  // AI movement
  const aiMain = BATTLE.marines.find(u => !u.keywords.includes('CHARACTER')) || BATTLE.marines[0];
  const aiMove = -aiMain.M;
  BATTLE.marines.forEach(u => {
    if (!u.keywords.includes('CHARACTER')) {
      u.position += aiMove;
      u.moved = true;
    }
  });
  logBattle(`The Space Marines advance ${aiMain.M}" toward your lines!`, 'enemy-action');

  updateBattleUI();
  setActionPanel(
    'Movement Complete',
    `Your forces have moved. The battle lines are set. Now bring the wrath of the ancient Necron Empire!`,
    null,
    [{ label: 'Advance to Shooting Phase →', action: nextPhase }]
  );
}

// ============================================================
// SHOOTING PHASE
// ============================================================
function runShootingPhase() {
  const shootableUnits = BATTLE.necrons.filter(u => {
    if (u.keywords.includes('CHARACTER') && !u.id.includes('overlord')) return false;
    const weapons = u.weapons.filter(w => typeof w.range === 'number' && w.range > 0);
    if (weapons.length === 0) return false;
    const target = getNearestMarine(u);
    if (!target) return false;
    const dist = Math.abs(u.position - target.position);
    return weapons.some(w => dist <= w.range);
  });

  if (shootableUnits.length === 0) {
    logBattle(`No units in range to shoot. The enemy is too far!`, 'info');
    // AI shoots
    runAIShooting();
    return;
  }

  const unit = shootableUnits[0];
  const target = getNearestMarine(unit);
  const weapon = unit.weapons.find(w => typeof w.range === 'number');
  const dist = Math.abs(unit.position - target.position);
  const modelsWithWeapon = unit.count;
  const totalAttacks = weapon.A * modelsWithWeapon;
  const inHalfRange = dist <= weapon.range / 2;

  setActionPanel(
    `🎯 Shooting — ${unit.name}`,
    `Target: ${target.name} (${target.count} models). Distance: ~${dist}".
Weapon: ${weapon.name} (${weapon.range}", A${weapon.A}, BS${weapon.BS}+, S${weapon.S}, AP${weapon.AP}, D${weapon.D})
${unit.count} models fire = ${totalAttacks} attacks total.
${inHalfRange ? '⚡ Within half range!' : ''}
Roll your dice! Click ROLL or enable Manual Mode to enter real dice results.`,
    {
      count: totalAttacks,
      label: `Roll ${totalAttacks} Hit Dice (BS${weapon.BS}+)`
    },
    null,
    (rolls) => resolveShootingHits(unit, target, weapon, rolls, totalAttacks)
  );
}

function resolveShootingHits(unit, target, weapon, hitRolls, totalAttacks) {
  const hits = hitRolls.filter(r => r >= weapon.BS).length;
  const crits = hitRolls.filter(r => r === 6).length;

  logBattle(`${unit.name} fires! ${totalAttacks} shots → ${hits} hits${crits > 0 ? ` (${crits} critical!)` : ''}`, 'player-action');

  if (hits === 0) {
    logBattle(`All shots missed! The enemy laughs... for now.`, 'info');
    afterPlayerShooting(unit);
    return;
  }

  setActionPanel(
    `💥 Wound Rolls — ${hits} hits`,
    `Strength ${weapon.S} vs Toughness ${target.T}.
${getWoundExplanation(weapon.S, target.T)}
Roll ${hits} wound dice!`,
    { count: hits, label: `Roll ${hits} Wound Dice (${getWoundTarget(weapon.S, target.T)}+)` },
    null,
    (rolls) => resolveShootingWounds(unit, target, weapon, rolls, hits)
  );
}

function resolveShootingWounds(unit, target, weapon, woundRolls, hits) {
  const woundTarget = getWoundTarget(weapon.S, target.T);
  const wounds = woundRolls.filter(r => r >= woundTarget).length;
  const critWounds = woundRolls.filter(r => r === 6).length;

  logBattle(`${wounds} wounds scored${critWounds > 0 ? ` (${critWounds} critical!)` : ''}`, 'wound');

  if (wounds === 0) {
    logBattle(`No wounds! The enemy is resilient.`, 'info');
    afterPlayerShooting(unit);
    return;
  }

  setActionPanel(
    `🛡️ Save Rolls — Enemy saves ${wounds} wounds`,
    `${target.name} has Sv${target.Sv}+${target.InSv ? `, InSv${target.InSv}+` : ''}.
Weapon AP: ${weapon.AP}. Modified save needed: ${target.Sv}${weapon.AP === 0 ? ' (no modifier)' : ` + ${Math.abs(weapon.AP)} = ${target.Sv + Math.abs(weapon.AP)}`}+
${target.InSv ? `Or InSv${target.InSv}+ (ignores AP!)` : ''}
Enemy rolls ${wounds} save dice. (The AI rolls for them)`,
    null,
    [{ label: `Roll Enemy Saves (AI resolves)`, action: () => resolveEnemySaves(unit, target, weapon, wounds) }]
  );
}

function resolveEnemySaves(unit, target, weapon, wounds) {
  const saveNeeded = target.Sv + Math.abs(weapon.AP);
  const saves = [];
  let failed = 0;

  for (let i = 0; i < wounds; i++) {
    const roll = rollDie();
    saves.push(roll);
    let saved = false;
    if (roll === 1) {
      saved = false; // always fail on 1
    } else if (target.InSv && roll >= target.InSv) {
      saved = true;
    } else if (roll >= saveNeeded) {
      saved = true;
    }
    if (!saved) failed++;
  }

  logBattle(`Enemy saves: [${saves.join(', ')}] → ${failed} wounds get through!`, 'saved');

  if (failed === 0) {
    logBattle(`All saved! The Space Marines weather the storm.`, 'info');
    afterPlayerShooting(unit);
    return;
  }

  // Apply damage
  const dmgPerWound = weapon.D;
  const totalDmg = failed * dmgPerWound;
  applyDamage(target, totalDmg, 'marines');

  const modelsKilled = countModelsKilled(target, failed, weapon.D, target.W);
  logBattle(`${failed} wounds through! ${target.name} takes ${totalDmg} damage${modelsKilled > 0 ? ` — ${modelsKilled} model${modelsKilled > 1 ? 's' : ''} destroyed!` : ''}`, 'destroyed');

  BATTLE.stats.playerKills += modelsKilled;
  updateBattleUI();
  checkBattleEnd();

  afterPlayerShooting(unit);
}

function afterPlayerShooting(unit) {
  // Check if more units can shoot
  const moreUnits = BATTLE.necrons.filter(u => {
    if (u.id === unit.id) return false;
    if (u.keywords.includes('CHARACTER')) return false;
    const weapons = u.weapons.filter(w => typeof w.range === 'number');
    if (weapons.length === 0) return false;
    const target = getNearestMarine(u);
    if (!target) return false;
    const dist = Math.abs(u.position - target.position);
    return weapons.some(w => dist <= w.range);
  });

  if (moreUnits.length > 0) {
    // Shoot with next unit
    logBattle(`More units can shoot!`, 'info');
    runShootingWithUnit(moreUnits[0]);
  } else {
    // AI shoots back
    runAIShooting();
  }
}

function runShootingWithUnit(unit) {
  const target = getNearestMarine(unit);
  const weapon = unit.weapons.find(w => typeof w.range === 'number');
  if (!target || !weapon) { runAIShooting(); return; }

  const dist = Math.abs(unit.position - target.position);
  if (dist > weapon.range) { runAIShooting(); return; }

  const modelsWithWeapon = unit.count;
  const totalAttacks = weapon.A * modelsWithWeapon;

  setActionPanel(
    `🎯 Shooting — ${unit.name}`,
    `${unit.name} also in range! Target: ${target.name} (${target.count} remaining).
${weapon.name}: ${totalAttacks} attacks (A${weapon.A} × ${unit.count} models)`,
    { count: totalAttacks, label: `Roll ${totalAttacks} Hit Dice (BS${weapon.BS}+)` },
    null,
    (rolls) => resolveShootingHits(unit, target, weapon, rolls, totalAttacks)
  );
}

function runAIShooting() {
  // AI shoots back
  const aiShooters = BATTLE.marines.filter(u => {
    const weapons = u.weapons.filter(w => typeof w.range === 'number');
    if (weapons.length === 0) return false;
    const target = getNearestNecron(u);
    if (!target) return false;
    const dist = Math.abs(u.position - target.position);
    return weapons.some(w => dist <= w.range);
  });

  if (aiShooters.length === 0) {
    logBattle(`Space Marines out of range — no shots fired!`, 'enemy-action');
    setActionPanel('Shooting Phase Complete', 'Both sides have fired. Assess the damage and prepare for the next phase.',
      null, [{ label: 'Advance to Charge Phase →', action: nextPhase }]);
    return;
  }

  let aiLogLines = [];
  aiShooters.forEach(shooter => {
    const target = getNearestNecron(shooter);
    const weapon = shooter.weapons.find(w => typeof w.range === 'number');
    if (!target || !weapon) return;

    const totalAttacks = weapon.A * shooter.count;
    const hits = simulateRolls(totalAttacks, weapon.BS);
    const woundTarget = getWoundTarget(weapon.S, target.T);
    const wounds = simulateRolls(hits, woundTarget);
    const saveNeeded = target.Sv + Math.abs(weapon.AP);
    const saves = simulateRolls(wounds, Math.max(saveNeeded, 2));
    const failedSaves = wounds - saves;

    if (failedSaves > 0) {
      applyDamage(target, failedSaves * weapon.D, 'necrons');
      const killed = countModelsKilled(target, failedSaves, weapon.D, target.W);
      BATTLE.stats.aiKills += killed;
      aiLogLines.push(`${shooter.name}: ${totalAttacks} shots → ${hits} hits → ${wounds} wounds → ${failedSaves} through${killed > 0 ? ` (${killed} Necrons DESTROYED!)` : ''}`);
    } else {
      aiLogLines.push(`${shooter.name}: ${totalAttacks} shots → all saved by your Living Metal armour!`);
    }
  });

  aiLogLines.forEach(l => logBattle(l, 'enemy-action'));
  updateBattleUI();

  if (checkBattleEnd()) return;

  setActionPanel(
    'Shooting Phase Complete',
    `The Space Marines have returned fire! ${aiLogLines.length > 0 ? 'Check your forces.' : ''}`,
    null,
    [{ label: 'Advance to Charge Phase →', action: nextPhase }]
  );
}

// ============================================================
// CHARGE PHASE
// ============================================================
function runChargePhase() {
  const necronMain = BATTLE.necrons.find(u => !u.keywords.includes('CHARACTER')) || BATTLE.necrons[0];
  const marineMain = BATTLE.marines.find(u => !u.keywords.includes('CHARACTER')) || BATTLE.marines[0];
  const dist = Math.abs(necronMain.position - marineMain.position);
  const alreadyEngaged = dist <= 2;

  if (alreadyEngaged) {
    logBattle(`Units are already in engagement range — no charge needed!`, 'info');
    // Possibly AI charges
    runAICharge();
    return;
  }

  if (dist > 12) {
    logBattle(`Enemy is more than 12" away — no units eligible to charge.`, 'info');
    runAICharge();
    return;
  }

  setActionPanel(
    '⚡ Charge Phase',
    `The enemy is ${dist.toFixed(1)}" away. You need a charge roll of ${Math.ceil(dist)} or more (rolling 2D6) to reach them.
Charging gives your units FIGHTS FIRST in the Fight phase — a huge advantage!`,
    null,
    [
      {
        label: `⚡ DECLARE CHARGE! Roll 2D6 (need ${Math.ceil(dist)}+)`,
        sublabel: 'Gain Fights First if successful — worth the gamble!',
        action: doPlayerCharge
      },
      {
        label: '⏸️ Hold Position — No charge this turn',
        sublabel: 'Save your units from potential failed charge penalties.',
        action: () => {
          logBattle(`You hold position — no charge declared.`, 'player-action');
          runAICharge();
        }
      }
    ]
  );
}

function doPlayerCharge() {
  const roll1 = rollDie();
  const roll2 = rollDie();
  const total = roll1 + roll2;

  const necronMain = BATTLE.necrons.find(u => !u.keywords.includes('CHARACTER')) || BATTLE.necrons[0];
  const marineMain = BATTLE.marines.find(u => !u.keywords.includes('CHARACTER')) || BATTLE.marines[0];
  const dist = Math.abs(necronMain.position - marineMain.position);

  logBattle(`Charge roll: ${roll1} + ${roll2} = ${total} (needed ${Math.ceil(dist)}+)`, 'player-action');

  if (total >= dist) {
    // Charge succeeds
    BATTLE.necrons.forEach(u => {
      if (!u.keywords.includes('CHARACTER')) {
        u.position = marineMain.position - 1;
        u.charged = true;
        u.fightFirst = true;
      }
    });
    logBattle(`⚡ CHARGE SUCCEEDS! Your warriors slam into the enemy lines! They gain FIGHTS FIRST!`, 'player-action');
  } else {
    logBattle(`Charge FAILED — couldn't cover the distance. Units stay put.`, 'info');
  }

  updateBattleUI();
  runAICharge();
}

function runAICharge() {
  const aiMain = BATTLE.marines.find(u => !u.keywords.includes('CHARACTER')) || BATTLE.marines[0];
  const necronMain = BATTLE.necrons.find(u => !u.keywords.includes('CHARACTER')) || BATTLE.necrons[0];
  const dist = Math.abs(aiMain.position - necronMain.position);

  if (dist <= 2 || dist > 12) {
    setActionPanel('Charge Phase Complete', 'Both sides have committed their charges. Prepare for close combat!',
      null, [{ label: 'Advance to Fight Phase →', action: nextPhase }]);
    return;
  }

  const roll = rollDie() + rollDie();
  logBattle(`Space Marines attempt a charge! Roll: ${roll} (needed ${Math.ceil(dist)}+)`, 'enemy-action');

  if (roll >= dist) {
    BATTLE.marines.forEach(u => {
      if (!u.keywords.includes('CHARACTER')) {
        u.position = necronMain.position + 1;
        u.charged = true;
        u.fightFirst = true;
      }
    });
    logBattle(`⚔️ Space Marines CHARGE! They close to melee range! They gain FIGHTS FIRST!`, 'enemy-action');
  } else {
    logBattle(`Marines charge fails! They couldn't reach you.`, 'info');
  }

  updateBattleUI();
  setActionPanel('Charge Phase Complete', 'The charges have been resolved! Now comes the brutal close-combat Fight Phase.',
    null, [{ label: 'Advance to Fight Phase →', action: nextPhase }]);
}

// ============================================================
// FIGHT PHASE
// ============================================================
function runFightPhase() {
  const necronMain = BATTLE.necrons.find(u => !u.keywords.includes('CHARACTER')) || BATTLE.necrons[0];
  const marineMain = BATTLE.marines.find(u => !u.keywords.includes('CHARACTER')) || BATTLE.marines[0];
  const dist = Math.abs(necronMain.position - marineMain.position);
  const engaged = dist <= 2;

  if (!engaged) {
    logBattle(`No units engaged — no fight this phase.`, 'info');
    setActionPanel('Fight Phase Complete', 'No units in melee range. The enemies circle each other.',
      null, [{ label: 'End Turn →', action: nextPhase }]);
    return;
  }

  const playerFightsFirst = BATTLE.necrons.some(u => u.fightFirst);
  const aiFightsFirst = BATTLE.marines.some(u => u.fightFirst);

  if (playerFightsFirst) {
    logBattle(`⚡ YOUR UNITS FIGHT FIRST (Fights First from Charge)!`, 'player-action');
    runPlayerFight(() => runAIFight(nextPhase));
  } else if (aiFightsFirst) {
    logBattle(`⚔️ Space Marines fight first (they charged)!`, 'enemy-action');
    runAIFight(() => runPlayerFight(nextPhase));
  } else {
    logBattle(`No Fights First — active player (you) fight first.`, 'info');
    runPlayerFight(() => runAIFight(nextPhase));
  }
}

function runPlayerFight(callback) {
  const unit = BATTLE.necrons.find(u => !u.keywords.includes('CHARACTER') && u.count > 0);
  if (!unit) { if (callback) callback(); return; }

  const target = BATTLE.marines.find(u => u.count > 0 && u.currentWounds > 0);
  if (!target) { if (callback) callback(); return; }

  const weapon = unit.weapons.find(w => w.range === 'Melee');
  if (!weapon) { if (callback) callback(); return; }

  const totalAttacks = weapon.A * unit.count;

  setActionPanel(
    `⚔️ Your Turn to Fight — ${unit.name}`,
    `Weapon: ${weapon.name} (A${weapon.A} × ${unit.count} models = ${totalAttacks} attacks)
WS${weapon.WS}+, S${weapon.S}, AP${weapon.AP}, D${weapon.D}
Target: ${target.name} (T${target.T}, Sv${target.Sv}+)
Roll your attack dice!`,
    { count: totalAttacks, label: `Roll ${totalAttacks} Hit Dice (WS${weapon.WS}+)` },
    null,
    (rolls) => {
      const hits = rolls.filter(r => r >= weapon.WS).length;
      const crits = rolls.filter(r => r === 6).length;
      logBattle(`${unit.name} attacks! ${hits} hits${crits > 0 ? ` (${crits} crits!)` : ''}`, 'player-action');

      if (hits === 0) { logBattle('All attacks miss!', 'info'); if (callback) callback(); return; }

      const woundTarget = getWoundTarget(weapon.S, target.T);
      const woundRolls = Array.from({length: hits}, rollDie);
      const wounds = woundRolls.filter(r => r >= woundTarget).length;
      logBattle(`Wound rolls [${woundRolls.join(', ')}] → ${wounds} wounds`, 'wound');

      if (wounds === 0) { logBattle('No wounds!', 'info'); if (callback) callback(); return; }

      const saveNeeded = target.Sv + Math.abs(weapon.AP);
      let failed = 0;
      for (let i = 0; i < wounds; i++) {
        const r = rollDie();
        if (r === 1 || ((!target.InSv || r < target.InSv) && r < saveNeeded)) failed++;
      }
      logBattle(`${failed} wounds unsaved!`, failed > 0 ? 'destroyed' : 'info');

      if (failed > 0) {
        applyDamage(target, failed * weapon.D, 'marines');
        const killed = countModelsKilled(target, failed, weapon.D, target.W);
        BATTLE.stats.playerKills += killed;
        if (killed > 0) logBattle(`${killed} Space Marine${killed > 1 ? 's' : ''} DESTROYED!`, 'destroyed');
        updateBattleUI();
      }

      if (checkBattleEnd()) return;
      if (callback) callback();
    }
  );
}

function runAIFight(callback) {
  const unit = BATTLE.marines.find(u => !u.keywords.includes('CHARACTER') && u.count > 0);
  if (!unit) { if (callback) callback(); return; }

  const target = BATTLE.necrons.find(u => u.count > 0 && u.currentWounds > 0);
  if (!target) { if (callback) callback(); return; }

  const weapon = unit.weapons.find(w => w.range === 'Melee');
  if (!weapon) { if (callback) callback(); return; }

  const totalAttacks = weapon.A * unit.count;
  const hits = simulateRolls(totalAttacks, weapon.WS);
  const woundTarget = getWoundTarget(weapon.S, target.T);
  const wounds = simulateRolls(hits, woundTarget);
  const saveNeeded = target.Sv + Math.abs(weapon.AP);
  const saves = simulateRolls(wounds, Math.max(saveNeeded, 2));
  const failed = wounds - saves;

  logBattle(`⚔️ Space Marines fight back! ${totalAttacks} attacks → ${hits} hits → ${wounds} wounds → ${failed} through`, 'enemy-action');

  if (failed > 0) {
    applyDamage(target, failed * weapon.D, 'necrons');
    const killed = countModelsKilled(target, failed, weapon.D, target.W);
    BATTLE.stats.aiKills += killed;
    if (killed > 0) logBattle(`${killed} Necron${killed > 1 ? 's' : ''} DESTROYED by the enemy!`, 'destroyed');
    updateBattleUI();
  }

  // Reset fight first flags
  BATTLE.necrons.forEach(u => u.fightFirst = false);
  BATTLE.marines.forEach(u => u.fightFirst = false);

  if (checkBattleEnd()) return;
  if (callback) callback();
}

// ============================================================
// DAMAGE & MODEL TRACKING
// ============================================================
function applyDamage(unit, totalDmg, side) {
  unit.currentWounds = Math.max(0, unit.currentWounds - totalDmg);
  const modelsRemaining = Math.ceil(unit.currentWounds / unit.W);
  const oldCount = unit.count;
  unit.count = Math.max(0, modelsRemaining);

  if (unit.count === 0) {
    logBattle(`💀 ${unit.name} WIPED OUT!`, 'destroyed');
  }
}

function countModelsKilled(unit, failedSaves, dmgPerWound, woundsPerModel) {
  const dmgDealt = failedSaves * dmgPerWound;
  const newWounds = Math.max(0, unit.currentWounds - dmgDealt);
  const oldModels = unit.count;
  const newModels = Math.ceil(newWounds / woundsPerModel);
  return Math.max(0, oldModels - newModels);
}

function getNearestMarine(fromUnit) {
  return BATTLE.marines
    .filter(u => u.count > 0 && u.currentWounds > 0)
    .sort((a, b) => Math.abs(fromUnit.position - a.position) - Math.abs(fromUnit.position - b.position))[0] || null;
}

function getNearestNecron(fromUnit) {
  return BATTLE.necrons
    .filter(u => u.count > 0 && u.currentWounds > 0)
    .sort((a, b) => Math.abs(fromUnit.position - a.position) - Math.abs(fromUnit.position - b.position))[0] || null;
}

// ============================================================
// BATTLE END CHECK
// ============================================================
function checkBattleEnd() {
  const necronsDead = BATTLE.necrons.every(u => u.count === 0 || u.currentWounds === 0);
  const marinesDead = BATTLE.marines.every(u => u.count === 0 || u.currentWounds === 0);

  if (necronsDead || marinesDead || BATTLE.round > BATTLE.scenario.rounds) {
    endBattle();
    return true;
  }
  return false;
}

function endBattle() {
  if (BATTLE.battleDone) return;
  BATTLE.battleDone = true;

  const necronsDead = BATTLE.necrons.every(u => u.count === 0);
  const marinesDead = BATTLE.marines.every(u => u.count === 0);

  let victory, title, subtitle, icon;
  if (marinesDead && !necronsDead) {
    victory = true;
    icon = '💚';
    title = 'VICTORY FOR THE DYNASTY!';
    subtitle = 'The Space Marines are dust. Your Dynasty rises again!';
  } else if (necronsDead && !marinesDead) {
    victory = false;
    icon = '💀';
    title = 'DEFEAT... FOR NOW';
    subtitle = 'Your warriors fall, but they will reawaken. The Dynasty is eternal.';
  } else {
    victory = true;
    icon = '⚖️';
    title = 'BATTLE ENDS — PYRRHIC VICTORY';
    subtitle = 'Time has run out. The Dynasty holds the field through attrition.';
  }

  const xpGained = victory ? 200 : 75;
  addXP(xpGained);

  STATE.battlesCompleted.push(BATTLE.scenario.id);
  saveState();
  unlockAchievement('first_battle');
  if (STATE.battlesCompleted.includes('tutorial') && STATE.battlesCompleted.includes('awakening')) {
    unlockAchievement('battle_veteran');
  }

  document.getElementById('battle-active').style.display = 'none';

  const victoryEl = document.getElementById('battle-victory');
  victoryEl.style.display = 'block';
  victoryEl.innerHTML = `
    <div class="victory-icon">${icon}</div>
    <div class="victory-title">${title}</div>
    <div class="victory-subtitle">${subtitle}</div>
    <div class="victory-stats">
      <div class="victory-stat">
        <span class="vs-label">Rounds Fought</span>
        <span class="vs-value">${BATTLE.round - 1} / ${BATTLE.scenario.rounds}</span>
      </div>
      <div class="victory-stat">
        <span class="vs-label">Enemy Models Destroyed</span>
        <span class="vs-value text-green">${BATTLE.stats.playerKills}</span>
      </div>
      <div class="victory-stat">
        <span class="vs-label">Your Losses</span>
        <span class="vs-value text-red">${BATTLE.stats.aiKills}</span>
      </div>
      <div class="victory-stat">
        <span class="vs-label">XP Earned</span>
        <span class="vs-value text-gold">+${xpGained} XP</span>
      </div>
    </div>
    <button class="btn-primary" onclick="showBattleSetup()">⚔️ Fight Again</button>
    <button class="btn-secondary" onclick="showScreen('home')">Return to Sanctum</button>
  `;
}

// ============================================================
// DICE ROLLING
// ============================================================
function rollDie() {
  return Math.floor(Math.random() * 6) + 1;
}

function simulateRolls(count, target) {
  let successes = 0;
  for (let i = 0; i < count; i++) {
    if (rollDie() >= target) successes++;
  }
  return successes;
}

let currentDiceCallback = null;

function setActionPanel(title, desc, diceConfig, tacticOptions, diceCallback) {
  const panel = document.getElementById('battle-action-panel');
  if (!panel) return;

  currentDiceCallback = diceCallback || null;

  let html = `
    <div class="action-title">${title}</div>
    <div class="action-desc">${desc.replace(/\n/g, '<br>')}</div>
  `;

  if (diceConfig) {
    BATTLE.diceCount = diceConfig.count;
    html += `
      <div class="dice-roller">
        <div class="dice-result-row" id="dice-display"></div>
        <button class="btn-roll" id="btn-roll-dice" onclick="doRollDice()">${diceConfig.label}</button>
        <div class="manual-mode-row">
          <div class="toggle-switch" id="manual-toggle" onclick="toggleManualMode()"></div>
          <span>Manual Dice Mode (enter real dice results)</span>
        </div>
        <div class="manual-input-row" id="manual-inputs"></div>
      </div>
    `;
  }

  if (tacticOptions) {
    html += `<div class="tactic-options">`;
    tacticOptions.forEach(opt => {
      html += `
        <button class="tactic-btn" onclick="(${opt.action.toString()})()">
          <div class="tactic-btn-name">${opt.label}</div>
          ${opt.sublabel ? `<div class="tactic-btn-desc">${opt.sublabel}</div>` : ''}
        </button>
      `;
    });
    html += `</div>`;
  }

  panel.innerHTML = html;

  if (BATTLE.manualMode && diceConfig) {
    setupManualInputs(diceConfig.count);
  }

  panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function doRollDice() {
  if (!currentDiceCallback) return;

  const rolls = [];
  const display = document.getElementById('dice-display');
  if (!display) return;

  display.innerHTML = '';

  for (let i = 0; i < BATTLE.diceCount; i++) {
    const r = rollDie();
    rolls.push(r);
    const die = document.createElement('div');
    die.className = `die rolling`;
    die.textContent = r;
    setTimeout(() => {
      die.classList.remove('rolling');
      if (r === 6) die.classList.add('crit');
      else if (r >= 4) die.classList.add('hit');
      else die.classList.add('fail');
    }, 300 + i * 50);
    display.appendChild(die);
  }

  document.getElementById('btn-roll-dice').disabled = true;

  setTimeout(() => {
    currentDiceCallback(rolls);
  }, 600 + BATTLE.diceCount * 50);
}

function toggleManualMode() {
  BATTLE.manualMode = !BATTLE.manualMode;
  const toggle = document.getElementById('manual-toggle');
  if (toggle) toggle.classList.toggle('on', BATTLE.manualMode);

  const rollBtn = document.getElementById('btn-roll-dice');
  const manualInputs = document.getElementById('manual-inputs');

  if (BATTLE.manualMode) {
    if (rollBtn) rollBtn.textContent = 'Submit My Dice Results';
    if (rollBtn) rollBtn.onclick = submitManualDice;
    setupManualInputs(BATTLE.diceCount);
    if (manualInputs) manualInputs.classList.add('visible');
  } else {
    if (rollBtn) rollBtn.textContent = `Roll ${BATTLE.diceCount} Dice`;
    if (rollBtn) rollBtn.onclick = doRollDice;
    if (manualInputs) manualInputs.classList.remove('visible');
  }
}

function setupManualInputs(count) {
  const container = document.getElementById('manual-inputs');
  if (!container) return;
  container.innerHTML = Array.from({length: count}, (_, i) =>
    `<input class="die-input" type="number" min="1" max="6" placeholder="${i + 1}" id="die-manual-${i}">`
  ).join('');
}

function submitManualDice() {
  if (!currentDiceCallback) return;
  const rolls = [];
  for (let i = 0; i < BATTLE.diceCount; i++) {
    const input = document.getElementById(`die-manual-${i}`);
    const val = parseInt(input ? input.value : '') || rollDie();
    rolls.push(Math.min(6, Math.max(1, val)));
  }

  const display = document.getElementById('dice-display');
  if (display) {
    display.innerHTML = rolls.map(r => `
      <div class="die ${r === 6 ? 'crit' : r >= 4 ? 'hit' : 'fail'}">${r}</div>
    `).join('');
  }

  const btn = document.getElementById('btn-roll-dice');
  if (btn) btn.disabled = true;

  setTimeout(() => currentDiceCallback(rolls), 300);
}

// ============================================================
// WOUND TABLE
// ============================================================
function getWoundTarget(S, T) {
  if (S >= T * 2) return 2;
  if (S > T) return 3;
  if (S === T) return 4;
  if (S < T && S > T / 2) return 5;
  return 6;
}

function getWoundExplanation(S, T) {
  const target = getWoundTarget(S, T);
  const ratio = S >= T * 2 ? 'DOUBLE' : S > T ? 'GREATER' : S === T ? 'EQUAL' : S <= T / 2 ? 'HALF' : 'LESS';
  return `S${S} vs T${T}: Strength is ${ratio} Toughness → wound on ${target}+`;
}

// ============================================================
// UI UPDATES
// ============================================================
function updateBattleUI() {
  const round = document.getElementById('battle-round');
  const phase = document.getElementById('battle-phase');
  if (round) round.textContent = `ROUND ${BATTLE.round}`;
  if (phase) phase.textContent = BATTLE.phase ? PHASE_NAMES[BATTLE.phase] : '';

  updateArmyPanel('necron-panel', BATTLE.necrons);
  updateArmyPanel('marine-panel', BATTLE.marines);
  scrollLog();
}

function updateArmyPanel(panelId, units) {
  const panel = document.getElementById(panelId);
  if (!panel) return;

  const unitRows = units.map(u => {
    const pct = u.maxWounds > 0 ? (u.currentWounds / u.maxWounds) : 0;
    const depleted = u.count === 0;
    return `
      <div class="unit-row">
        <div class="unit-name-row">
          <span class="unit-name">${u.name}</span>
          <span class="unit-count ${depleted ? 'depleted' : ''}">${depleted ? 'DESTROYED' : `${u.count}/${u.maxCount}`}</span>
        </div>
        <div class="unit-health-bar">
          <div class="unit-health-fill" style="width:${Math.max(0, pct * 100)}%"></div>
        </div>
      </div>
    `;
  }).join('');

  const existing = panel.querySelectorAll('.unit-row');
  if (existing.length > 0) {
    panel.innerHTML = panel.innerHTML.replace(/(<div class="unit-row">[\s\S]*<\/div>\s*)+$/, '') + unitRows;
  } else {
    panel.innerHTML += unitRows;
  }

  // Simpler: just replace content area
  const contentEl = panel.querySelector('.unit-rows-container');
  if (contentEl) contentEl.innerHTML = unitRows;
}

function logBattle(msg, type = 'info') {
  BATTLE.log.push({ msg, type });
  const log = document.getElementById('battle-log');
  if (!log) return;

  const entry = document.createElement('div');
  entry.className = `log-entry ${type}`;
  entry.textContent = msg;
  log.appendChild(entry);
  scrollLog();
}

function scrollLog() {
  const log = document.getElementById('battle-log');
  if (log) log.scrollTop = log.scrollHeight;
}
