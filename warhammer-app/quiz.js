// ============================================================
// QUIZ STATE
// ============================================================
const QUIZ = {
  questions: [],
  currentIndex: 0,
  score: 0,
  answered: false,
  selectedCategory: 'all',
  sessionStreak: 0,
  sessionXP: 0,
  missedNecron: false
};

const CATEGORY_INFO = {
  all:        { name: 'All Rules',   icon: '📚', count: () => QUIZ_QUESTIONS.length },
  core:       { name: 'Core Concepts', icon: '⚙️', count: () => countCat('core') },
  datasheets: { name: 'Datasheets',    icon: '📋', count: () => countCat('datasheets') },
  movement:   { name: 'Movement',      icon: '👣', count: () => countCat('movement') },
  attacks:    { name: 'Attacks',       icon: '🎯', count: () => countCat('attacks') },
  phases:     { name: 'Phases',        icon: '🔄', count: () => countCat('phases') },
  terrain:    { name: 'Terrain',       icon: '🏚️', count: () => countCat('terrain') },
  stratagems: { name: 'Stratagems',    icon: '⚡', count: () => countCat('stratagems') },
  weapons:    { name: 'Weapons',       icon: '⚔️', count: () => countCat('weapons') },
  necrons:    { name: 'Necrons',       icon: '💚', count: () => countCat('necrons') },
  advanced:   { name: 'Advanced',      icon: '🔬', count: () => countCat('advanced') }
};

function countCat(cat) {
  return QUIZ_QUESTIONS.filter(q => q.category === cat).length;
}

// ============================================================
// QUIZ SETUP
// ============================================================
function showQuizSetup() {
  document.getElementById('quiz-setup').style.display = 'block';
  document.getElementById('quiz-active').style.display = 'none';
  document.getElementById('quiz-results').style.display = 'none';
  renderCategoryGrid();
}

function renderCategoryGrid() {
  const grid = document.getElementById('category-grid');
  if (!grid) return;

  const cats = ['all', 'core', 'datasheets', 'movement', 'attacks', 'phases', 'terrain', 'stratagems', 'weapons', 'necrons', 'advanced'];

  grid.innerHTML = cats.map(cat => {
    const info = CATEGORY_INFO[cat];
    const count = typeof info.count === 'function' ? info.count() : info.count;
    const selected = QUIZ.selectedCategory === cat;
    return `
      <div class="category-btn ${selected ? 'selected' : ''}" onclick="selectCategory('${cat}')">
        <span class="cat-icon">${info.icon}</span>
        <span class="cat-name">${info.name}</span>
        <span class="cat-count">${count} questions</span>
      </div>
    `;
  }).join('');
}

function selectCategory(cat) {
  QUIZ.selectedCategory = cat;
  renderCategoryGrid();
}

function startQuiz() {
  let pool = QUIZ.selectedCategory === 'all'
    ? [...QUIZ_QUESTIONS]
    : QUIZ_QUESTIONS.filter(q => q.category === QUIZ.selectedCategory);

  if (pool.length === 0) {
    showToast('No questions in this category yet!');
    return;
  }

  // Shuffle
  pool = pool.sort(() => Math.random() - 0.5).slice(0, Math.min(10, pool.length));

  QUIZ.questions = pool;
  QUIZ.currentIndex = 0;
  QUIZ.score = 0;
  QUIZ.answered = false;
  QUIZ.sessionStreak = 0;
  QUIZ.sessionXP = 0;
  QUIZ.missedNecron = false;

  document.getElementById('quiz-setup').style.display = 'none';
  document.getElementById('quiz-active').style.display = 'block';
  document.getElementById('quiz-results').style.display = 'none';

  renderQuestion();
}

// ============================================================
// QUESTION RENDERING
// ============================================================
function renderQuestion() {
  const q = QUIZ.questions[QUIZ.currentIndex];
  if (!q) { endQuiz(); return; }

  QUIZ.answered = false;

  const total = QUIZ.questions.length;
  const current = QUIZ.currentIndex + 1;

  document.getElementById('quiz-progress-fill').style.width = `${((current - 1) / total) * 100}%`;
  document.getElementById('quiz-current').textContent = `${current} / ${total}`;
  document.getElementById('quiz-streak-display').textContent = QUIZ.sessionStreak > 0 ? `🔥 ${QUIZ.sessionStreak}` : '';
  document.getElementById('quiz-difficulty').textContent = q.difficulty;
  document.getElementById('quiz-difficulty').className = `difficulty-badge ${q.difficulty}`;

  const catInfo = CATEGORY_INFO[q.category];
  document.getElementById('quiz-category').textContent = `${catInfo ? catInfo.icon : ''} ${catInfo ? catInfo.name : q.category}`;
  document.getElementById('quiz-question').textContent = q.question;

  const letters = ['A', 'B', 'C', 'D'];
  const answersHtml = q.answers.map((ans, i) => `
    <button class="answer-btn" onclick="selectAnswer(${i})" id="answer-${i}">
      <span class="answer-letter">${letters[i]}</span>
      <span>${ans}</span>
    </button>
  `).join('');

  document.getElementById('answers-list').innerHTML = answersHtml;
  document.getElementById('explanation-card').classList.remove('visible');
  document.getElementById('explanation-card').textContent = '';
  document.getElementById('btn-next').style.display = 'none';
}

// ============================================================
// ANSWER HANDLING
// ============================================================
function selectAnswer(index) {
  if (QUIZ.answered) return;
  QUIZ.answered = true;

  const q = QUIZ.questions[QUIZ.currentIndex];
  const correct = index === q.correct;

  // Disable all buttons
  document.querySelectorAll('.answer-btn').forEach((btn, i) => {
    btn.disabled = true;
    if (i === q.correct) btn.classList.add('correct');
    if (i === index && !correct) btn.classList.add('wrong');
  });

  // Track stats
  STATE.totalAnswers++;
  if (correct) {
    STATE.correctAnswers++;
    STATE.currentStreak++;
    QUIZ.sessionStreak++;
    if (QUIZ.sessionStreak > STATE.bestStreak) STATE.bestStreak = QUIZ.sessionStreak;
    QUIZ.score++;

    if (q.category === 'necrons') QUIZ.missedNecron = false;
  } else {
    STATE.currentStreak = 0;
    QUIZ.sessionStreak = 0;
    if (q.category === 'necrons') QUIZ.missedNecron = true;
  }

  // XP
  const xpMap = { easy: 15, medium: 25, hard: 40 };
  const xpBase = xpMap[q.difficulty] || 20;
  const xpGained = correct ? (xpBase + (QUIZ.sessionStreak > 2 ? 10 : 0)) : Math.floor(xpBase * 0.2);
  QUIZ.sessionXP += xpGained;
  addXP(xpGained);

  // Show explanation
  const expCard = document.getElementById('explanation-card');
  expCard.innerHTML = `
    <strong>${correct ? '✅ Correct!' : '❌ Incorrect.'}</strong> ${q.explanation}
    <div class="xp-gained">+${xpGained} XP${QUIZ.sessionStreak > 2 ? ` (${QUIZ.sessionStreak}x streak bonus!)` : ''}</div>
  `;
  expCard.classList.add('visible');

  checkQuizAchievements();
  saveState();

  // Show next button
  const nextBtn = document.getElementById('btn-next');
  nextBtn.style.display = 'block';
  nextBtn.textContent = QUIZ.currentIndex < QUIZ.questions.length - 1 ? 'Next Question →' : 'See Results →';
}

function nextQuestion() {
  QUIZ.currentIndex++;
  if (QUIZ.currentIndex >= QUIZ.questions.length) {
    endQuiz();
  } else {
    renderQuestion();
  }
}

// ============================================================
// QUIZ END
// ============================================================
function endQuiz() {
  const total = QUIZ.questions.length;
  const score = QUIZ.score;
  const pct = Math.round((score / total) * 100);

  document.getElementById('quiz-active').style.display = 'none';
  document.getElementById('quiz-results').style.display = 'block';

  document.getElementById('results-score').textContent = `${score}/${total}`;
  document.getElementById('results-xp').textContent = `+${QUIZ.sessionXP} XP`;

  let title, subtitle;
  if (pct === 100) { title = 'PERFECT PROTOCOL'; subtitle = 'Flawless execution. The Phaerons bow to your knowledge.'; }
  else if (pct >= 80) { title = 'OVERLORD GRADE'; subtitle = 'Excellent! You command with authority.'; }
  else if (pct >= 60) { title = 'IMMORTAL STANDARD'; subtitle = 'Solid performance. Keep awakening your knowledge.'; }
  else if (pct >= 40) { title = 'WARRIOR CLASS'; subtitle = 'More study required, Initiate. The Dynasty demands better.'; }
  else { title = 'STILL DORMANT'; subtitle = 'Your mind still slumbers. Return to the tutorials, Initiate.'; }

  document.getElementById('results-title').textContent = title;
  document.getElementById('results-subtitle').textContent = subtitle;

  if (pct === 100) unlockAchievement('perfect_quiz');

  const necronQs = QUIZ.questions.filter(q => q.category === 'necrons');
  if (necronQs.length > 0 && !QUIZ.missedNecron) {
    unlockAchievement('necron_expert');
  }
}
