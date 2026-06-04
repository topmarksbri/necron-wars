// ============================================================
// APP STATE & PERSISTENCE
// ============================================================
const STATE = {
  xp: 0,
  level: 1,
  correctAnswers: 0,
  totalAnswers: 0,
  currentStreak: 0,
  bestStreak: 0,
  achievementsUnlocked: [],
  refsRead: [],
  battlesCompleted: [],
  currentScreen: 'home'
};

function loadState() {
  const saved = localStorage.getItem('necronWars_v1');
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      Object.assign(STATE, parsed);
    } catch(e) {}
  }
}

function saveState() {
  localStorage.setItem('necronWars_v1', JSON.stringify(STATE));
}

// ============================================================
// XP & LEVELING
// ============================================================
function addXP(amount) {
  const prevLevel = STATE.level;
  STATE.xp += amount;

  let newLevel = 1;
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (STATE.xp >= LEVELS[i].xpRequired) {
      newLevel = LEVELS[i].level;
      break;
    }
  }
  STATE.level = newLevel;

  if (newLevel > prevLevel) {
    const title = LEVELS[newLevel - 1].title;
    showToast(`⬆️ LEVEL UP! You are now a ${title}`, 'gold');
  }

  checkXPAchievements();
  saveState();
  updateHomeUI();
}

function getCurrentLevelData() {
  return LEVELS[STATE.level - 1];
}

function getNextLevelData() {
  return LEVELS[STATE.level] || null;
}

function getXPProgress() {
  const current = getCurrentLevelData().xpRequired;
  const next = getNextLevelData();
  if (!next) return 1;
  return Math.min((STATE.xp - current) / (next.xpRequired - current), 1);
}

// ============================================================
// ACHIEVEMENTS
// ============================================================
function unlockAchievement(id) {
  if (STATE.achievementsUnlocked.includes(id)) return;
  const ach = ACHIEVEMENTS.find(a => a.id === id);
  if (!ach) return;
  STATE.achievementsUnlocked.push(id);
  if (ach.xp > 0) STATE.xp += ach.xp;
  saveState();
  showToast(`${ach.icon} Achievement: ${ach.title}\n+${ach.xp}XP`, 'gold');
  renderAchievements();
}

function checkXPAchievements() {
  if (STATE.xp >= 500) unlockAchievement('xp_500');
  if (STATE.xp >= 1500) unlockAchievement('xp_1500');
  if (STATE.xp >= 3000) unlockAchievement('xp_3000');
}

function checkQuizAchievements() {
  if (STATE.totalAnswers >= 1) unlockAchievement('first_quiz');
  if (STATE.correctAnswers >= 25) unlockAchievement('quiz_master');
  if (STATE.currentStreak >= 5) unlockAchievement('quiz_streak_5');
}

// ============================================================
// NAVIGATION
// ============================================================
function showScreen(name) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));

  const screen = document.getElementById(`screen-${name}`);
  if (screen) screen.classList.add('active');

  const btn = document.querySelector(`.nav-btn[data-screen="${name}"]`);
  if (btn) btn.classList.add('active');

  STATE.currentScreen = name;

  if (name === 'home') updateHomeUI();
  if (name === 'achievements') renderAchievements();
  if (name === 'reference') renderReferenceList();
  if (name === 'quiz') showQuizSetup();
  if (name === 'battle') showBattleSetup();
  if (name === 'learn') showLearnScreen();
}

// ============================================================
// HOME UI
// ============================================================
function updateHomeUI() {
  const levelData = getCurrentLevelData();
  const nextData = getNextLevelData();
  const progress = getXPProgress();

  const el = (id) => document.getElementById(id);

  if (el('home-level-num')) el('home-level-num').textContent = STATE.level;
  if (el('home-title')) el('home-title').textContent = levelData.title;
  if (el('home-xp')) {
    const nextXP = nextData ? nextData.xpRequired : '∞';
    el('home-xp').textContent = `${STATE.xp} / ${nextXP} XP`;
  }
  if (el('home-xp-bar')) el('home-xp-bar').style.width = `${progress * 100}%`;
  if (el('home-correct')) el('home-correct').textContent = STATE.correctAnswers;
  if (el('home-streak')) el('home-streak').textContent = STATE.bestStreak;
  if (el('home-achievements')) el('home-achievements').textContent = STATE.achievementsUnlocked.length;

  if (el('header-xp')) el('header-xp').textContent = `${STATE.xp} XP`;
}

// ============================================================
// REFERENCE SCREEN
// ============================================================
function renderReferenceList(filter = '') {
  const list = document.getElementById('reference-list');
  if (!list) return;

  const filtered = filter
    ? RULES_REFERENCE.filter(r =>
        r.title.toLowerCase().includes(filter.toLowerCase()) ||
        r.sections.some(s =>
          s.heading.toLowerCase().includes(filter.toLowerCase()) ||
          s.text.toLowerCase().includes(filter.toLowerCase())
        )
      )
    : RULES_REFERENCE;

  list.innerHTML = filtered.map(ref => `
    <div class="ref-card" onclick="showRefDetail('${ref.id}')">
      <div class="ref-icon">${ref.icon}</div>
      <div class="ref-info">
        <div class="ref-title">${ref.title}</div>
        <div class="ref-preview">${ref.sections[0].heading}</div>
      </div>
      <div class="ref-arrow">›</div>
    </div>
  `).join('');
}

function showRefDetail(id) {
  const ref = RULES_REFERENCE.find(r => r.id === id);
  if (!ref) return;

  if (!STATE.refsRead.includes(id)) {
    STATE.refsRead.push(id);
    saveState();
    if (STATE.refsRead.length >= 5) unlockAchievement('rule_reader');
  }

  const detail = document.getElementById('ref-detail');
  const list = document.getElementById('reference-list-container');

  detail.innerHTML = `
    <div class="ref-detail-title">${ref.icon} ${ref.title}</div>
    ${ref.sections.map(s => `
      <div class="ref-section">
        <div class="ref-section-heading">${s.heading}</div>
        <div class="ref-section-text">${s.text}</div>
      </div>
    `).join('')}
    <button class="btn-secondary" onclick="hideRefDetail()">← Back to Reference</button>
  `;

  detail.classList.add('visible');
  list.classList.add('hidden');
}

function hideRefDetail() {
  document.getElementById('ref-detail').classList.remove('visible');
  document.getElementById('reference-list-container').classList.remove('hidden');
}

// ============================================================
// ACHIEVEMENTS SCREEN
// ============================================================
function renderAchievements() {
  const list = document.getElementById('achievements-list');
  if (!list) return;

  list.innerHTML = ACHIEVEMENTS.map(ach => {
    const unlocked = STATE.achievementsUnlocked.includes(ach.id);
    return `
      <div class="achievement-card ${unlocked ? 'unlocked' : ''}">
        <div class="achievement-icon">${ach.icon}</div>
        <div class="achievement-title">${ach.title}</div>
        <div class="achievement-desc">${ach.desc}</div>
        ${ach.xp > 0 ? `<div class="achievement-xp">+${ach.xp} XP</div>` : ''}
      </div>
    `;
  }).join('');
}

// ============================================================
// TOAST NOTIFICATIONS
// ============================================================
function showToast(message, type = 'normal') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast ${type === 'gold' ? 'gold' : ''}`;
  toast.innerHTML = message.replace('\n', '<br>');
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 3200);
}

// ============================================================
// INIT
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  loadState();
  updateHomeUI();

  // Bottom nav
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      showScreen(btn.dataset.screen);
    });
  });

  // Search in reference
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      renderReferenceList(e.target.value);
    });
  }

  showScreen('home');
});
