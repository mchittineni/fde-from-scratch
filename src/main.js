import { experienceLevels } from './data/roadmaps.js';
import { diagnosticPillars, diagnosticQuestions, calculateDiagnosticResult } from './data/diagnostic.js';
import { companyPlaybooks } from './data/companies.js';
import { simulations } from './data/simulations.js';
import { caseStudies } from './data/caseStudies.js';
import { questionBank } from './data/questionBank.js';

// Application State
const state = {
  currentRole: localStorage.getItem('fde_role') || 'mid',
  currentTab: 'roadmaps',
  completedTasks: JSON.parse(localStorage.getItem('fde_tasks') || '{}'),
  activeCompanyId: 'palantir',
  activeSimId: simulations[0].id,
  simProgress: {
    currentStageIndex: 0,
    trust: 70,
    integrity: 85,
    velocity: 80,
    history: [],
    isComplete: false
  },
  quizAnswers: JSON.parse(localStorage.getItem('fde_quiz_answers') || '{}'),
  questionSearchQuery: '',
  selectedQuestionCategory: 'All'
};

// Initialization
document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initRoleSelector();
  renderRoadmap();
  initDiagnostic();
  initSimulation();
  renderCompanies();
  renderCaseStudies();
  renderQuestionBank();
});

/* ==========================================================================
   1. NAVIGATION & TAB ROUTING
   ========================================================================== */
function initNavigation() {
  const tabs = document.querySelectorAll('.nav-tab');
  const footerLinks = document.querySelectorAll('[data-tab-link]');
  const brandBtn = document.getElementById('brandBtn');
  const headerStartBtn = document.getElementById('headerStartBtn');

  function switchTab(tabId) {
    state.currentTab = tabId;

    tabs.forEach(t => {
      if (t.dataset.tab === tabId) t.classList.add('active');
      else t.classList.remove('active');
    });

    document.querySelectorAll('.view-panel').forEach(panel => {
      if (panel.id === `view-${tabId}`) panel.classList.add('active');
      else panel.classList.remove('active');
    });

    window.scrollTo({ top: 380, behavior: 'smooth' });
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => switchTab(tab.dataset.tab));
  });

  footerLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      switchTab(link.dataset.tabLink);
    });
  });

  if (brandBtn) {
    brandBtn.addEventListener('click', () => {
      switchTab('roadmaps');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  if (headerStartBtn) {
    headerStartBtn.addEventListener('click', () => {
      switchTab('diagnostic');
    });
  }
}

/* ==========================================================================
   2. ROLE EXPERIENCE SELECTOR
   ========================================================================== */
function initRoleSelector() {
  const pillGroup = document.getElementById('rolePillGroup');
  const activeRoleBadge = document.getElementById('activeRoleBadge');

  if (!pillGroup) return;
  pillGroup.innerHTML = '';

  Object.values(experienceLevels).forEach(role => {
    const btn = document.createElement('button');
    btn.className = `role-btn ${role.id === state.currentRole ? 'active' : ''}`;
    btn.dataset.role = role.id;
    btn.innerHTML = `
      <span class="role-btn-title">${role.title}</span>
      <span class="role-btn-exp">${role.experience}</span>
    `;

    btn.addEventListener('click', () => {
      state.currentRole = role.id;
      localStorage.setItem('fde_role', role.id);

      document.querySelectorAll('.role-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      if (activeRoleBadge) {
        activeRoleBadge.textContent = role.title;
      }

      renderRoadmap();
    });

    pillGroup.appendChild(btn);
  });

  if (activeRoleBadge && experienceLevels[state.currentRole]) {
    activeRoleBadge.textContent = experienceLevels[state.currentRole].title;
  }
}

/* ==========================================================================
   3. ROADMAP VIEW & TASK COMPLETION TRACKER
   ========================================================================== */
function renderRoadmap() {
  const role = experienceLevels[state.currentRole] || experienceLevels['entry'];
  const heroContainer = document.getElementById('roadmapHero');
  const timelineGrid = document.getElementById('timelineGrid');

  if (!heroContainer || !timelineGrid) return;

  // Calculate completion percentage
  let totalTasks = 0;
  let completedCount = 0;

  role.weeks.forEach(w => {
    w.tasks.forEach(t => {
      totalTasks++;
      if (state.completedTasks[t.id]) completedCount++;
    });
  });

  const percentage = totalTasks > 0 ? Math.round((completedCount / totalTasks) * 100) : 0;

  // Render Hero
  heroContainer.innerHTML = `
    <div class="roadmap-header-top">
      <div>
        <div class="badge badge-cyan" style="margin-bottom: 0.5rem;">${role.experience} Curated Track</div>
        <h2 class="roadmap-title">${role.title}</h2>
      </div>
      <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
        ${role.targetInterviews.map(co => `<span class="badge badge-indigo">${co}</span>`).join('')}
      </div>
    </div>
    <div class="roadmap-tagline">"${role.tagline}"</div>
    <p class="roadmap-desc">${role.overview}</p>

    <!-- Key Strengths to Prove -->
    <div style="margin-top: 1.5rem; display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 0.75rem;">
      ${role.keyStrengthsToProve.map(s => `
        <div style="background: rgba(13, 17, 26, 0.6); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 0.65rem 0.85rem; font-size: 0.84rem; display: flex; align-items: center; gap: 0.5rem;">
          <span style="color: var(--accent-emerald);">✔</span>
          <span>${s}</span>
        </div>
      `).join('')}
    </div>

    <!-- Live Progress Bar -->
    <div class="progress-card">
      <div class="progress-info">
        <div class="progress-percent" id="roadmapPercent">${percentage}%</div>
        <div>
          <div style="font-weight: 700; color: #FFFFFF; font-size: 0.95rem;">Curriculum Milestone Progress</div>
          <div class="progress-lbl" id="roadmapProgressCount">${completedCount} of ${totalTasks} high-leverage milestones cleared</div>
        </div>
      </div>
      <div class="progress-bar-wrap">
        <div class="progress-bar-fill" id="roadmapBarFill" style="width: ${percentage}%;"></div>
      </div>
    </div>
  `;

  // Render Weeks Timeline
  timelineGrid.innerHTML = '';
  role.weeks.forEach(week => {
    const weekEl = document.createElement('div');
    weekEl.className = 'week-card';

    weekEl.innerHTML = `
      <div class="week-top">
        <span class="week-badge">${week.week}</span>
        <span class="badge badge-amber">${week.focus}</span>
      </div>
      <h3 class="week-title">${week.title}</h3>
      <p class="week-summary">${week.summary}</p>

      <div class="task-list">
        ${week.tasks.map(task => {
          const isDone = !!state.completedTasks[task.id];
          return `
            <div class="task-item ${isDone ? 'completed' : ''}" data-task-id="${task.id}">
              <input type="checkbox" class="task-checkbox" ${isDone ? 'checked' : ''} data-task-id="${task.id}">
              <div class="task-content">
                <div class="task-text">${task.text}</div>
                <div class="task-milestone">★ Target Proof: ${task.milestone}</div>
              </div>
            </div>
          `;
        }).join('')}
      </div>

      <div class="resources-footer">
        <span style="font-weight: 600; color: var(--text-muted);">Recommended Field Guides:</span>
        ${week.resources.map(r => `<span class="resource-chip">${r}</span>`).join('')}
      </div>
    `;

    timelineGrid.appendChild(weekEl);
  });

  // Attach Checkbox Handlers
  timelineGrid.querySelectorAll('.task-checkbox').forEach(cb => {
    cb.addEventListener('change', (e) => {
      const taskId = e.target.dataset.taskId;
      toggleTask(taskId, e.target.checked);
    });
  });

  timelineGrid.querySelectorAll('.task-item').forEach(item => {
    item.addEventListener('click', (e) => {
      if (e.target.tagName.toLowerCase() === 'input') return;
      const cb = item.querySelector('.task-checkbox');
      if (cb) {
        cb.checked = !cb.checked;
        toggleTask(cb.dataset.taskId, cb.checked);
      }
    });
  });
}

function toggleTask(taskId, isDone) {
  if (isDone) {
    state.completedTasks[taskId] = true;
  } else {
    delete state.completedTasks[taskId];
  }
  localStorage.setItem('fde_tasks', JSON.stringify(state.completedTasks));

  // Re-render Roadmap progress
  renderRoadmap();
}

/* ==========================================================================
   4. DIAGNOSTIC ASSESSMENT & RADAR CHART
   ========================================================================== */
function initDiagnostic() {
  const container = document.getElementById('quizQuestionsWrap');
  const submitBtn = document.getElementById('submitQuizBtn');
  if (!container) return;

  container.innerHTML = '';

  diagnosticQuestions.forEach((q, idx) => {
    const qBlock = document.createElement('div');
    qBlock.className = 'question-block';

    const savedAnswer = state.quizAnswers[q.id];
    const pillarObj = diagnosticPillars.find(p => p.id === q.pillar);

    qBlock.innerHTML = `
      <div class="question-meta">
        <span class="question-num">QUESTION ${idx + 1} OF ${diagnosticQuestions.length}</span>
        <span class="question-pillar">// ${pillarObj ? pillarObj.name : q.pillar}</span>
      </div>
      <div class="question-text">${q.text}</div>
      <div class="options-group">
        ${q.options.map((opt, optIdx) => {
          const isSelected = savedAnswer === opt.score;
          return `
            <label class="quiz-option ${isSelected ? 'selected' : ''}">
              <input type="radio" name="${q.id}" value="${opt.score}" class="quiz-radio" ${isSelected ? 'checked' : ''}>
              <span class="quiz-option-text">${opt.text}</span>
            </label>
          `;
        }).join('')}
      </div>
    `;

    // Handle radio changes
    qBlock.querySelectorAll('input[type="radio"]').forEach(radio => {
      radio.addEventListener('change', () => {
        state.quizAnswers[q.id] = parseInt(radio.value, 10);
        localStorage.setItem('fde_quiz_answers', JSON.stringify(state.quizAnswers));

        qBlock.querySelectorAll('.quiz-option').forEach(l => l.classList.remove('selected'));
        radio.closest('.quiz-option').classList.add('selected');
      });
    });

    container.appendChild(qBlock);
  });

  if (submitBtn) {
    submitBtn.addEventListener('click', () => {
      calculateAndRenderResults();
    });
  }

  // If previous answers exist, display results
  if (Object.keys(state.quizAnswers).length >= 5) {
    calculateAndRenderResults(false);
  }
}

function calculateAndRenderResults(scroll = true) {
  const result = calculateDiagnosticResult(state.quizAnswers);
  const resultsCard = document.getElementById('resultsCard');
  const diagnosticContainer = document.getElementById('diagnosticContainer');

  if (!resultsCard) return;

  diagnosticContainer.classList.add('has-results');
  resultsCard.style.display = 'block';

  // Generate SVG Radar
  const radarSvg = generateRadarSvg(result.percentages);

  resultsCard.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
      <h3 style="font-family: var(--font-display); font-size: 1.4rem; color: #FFFFFF;">Diagnostic Results</h3>
      <span class="badge badge-emerald">${result.overallScore}% Overall Score</span>
    </div>

    <div class="radar-wrap">
      ${radarSvg}
    </div>

    <!-- Diagnosis Summary -->
    <div style="background: var(--bg-tertiary); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 1.25rem; margin-bottom: 1.5rem;">
      <div style="font-size: 0.8rem; text-transform: uppercase; color: var(--accent-secondary); font-family: var(--font-mono); margin-bottom: 0.35rem;">Field Evaluation</div>
      <p style="font-size: 0.9rem; color: var(--text-main); line-height: 1.55;">${result.diagnosisSummary}</p>
    </div>

    <!-- Primary Strength & Weakness -->
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; margin-bottom: 1.5rem;">
      <div style="background: rgba(16, 185, 129, 0.08); border: 1px solid rgba(16, 185, 129, 0.25); border-radius: var(--radius-md); padding: 0.85rem;">
        <div style="font-size: 0.75rem; color: #6EE7B7; font-weight: 700; text-transform: uppercase;">Top Superpower</div>
        <div style="font-size: 0.92rem; font-weight: 700; color: #FFFFFF; margin-top: 0.2rem;">${result.primaryStrength}</div>
      </div>
      <div style="background: rgba(244, 63, 94, 0.08); border: 1px solid rgba(244, 63, 94, 0.25); border-radius: var(--radius-md); padding: 0.85rem;">
        <div style="font-size: 0.75rem; color: #FDA4AF; font-weight: 700; text-transform: uppercase;">Primary Gap</div>
        <div style="font-size: 0.92rem; font-weight: 700; color: #FFFFFF; margin-top: 0.2rem;">${result.primaryWeakness}</div>
      </div>
    </div>

    <!-- Pillar Breakdown Bars -->
    <div style="margin-bottom: 1.5rem;">
      <div style="font-size: 0.8rem; text-transform: uppercase; color: var(--text-dim); margin-bottom: 0.75rem; font-weight: 700;">Pillar Breakdown</div>
      ${diagnosticPillars.map(p => {
        const pct = result.percentages[p.id] || 0;
        return `
          <div class="pillar-score-row">
            <div class="pillar-score-header">
              <span class="pillar-score-name">${p.name}</span>
              <span class="pillar-score-val">${pct}%</span>
            </div>
            <div class="pillar-bar-bg">
              <div class="pillar-bar-fill" style="width: ${pct}%;"></div>
            </div>
          </div>
        `;
      }).join('')}
    </div>

    <!-- Recommended Roadmap CTA -->
    <button class="btn btn-primary" id="applyRecommendedTrackBtn" style="width: 100%;">
      Switch to Recommended Track (${experienceLevels[result.recommendedLevel]?.title || 'Mid-Level'})
    </button>
  `;

  document.getElementById('applyRecommendedTrackBtn')?.addEventListener('click', () => {
    state.currentRole = result.recommendedLevel;
    localStorage.setItem('fde_role', result.recommendedLevel);
    initRoleSelector();
    renderRoadmap();
    document.querySelector('[data-tab="roadmaps"]')?.click();
  });

  if (scroll) {
    resultsCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function generateRadarSvg(percentages) {
  const size = 300;
  const center = size / 2;
  const radius = 100;
  const count = diagnosticPillars.length;
  const angleStep = (Math.PI * 2) / count;

  // Background concentric polygons
  const levels = [0.25, 0.5, 0.75, 1.0];
  let gridPaths = '';
  levels.forEach(lvl => {
    let pts = [];
    for (let i = 0; i < count; i++) {
      const angle = i * angleStep - Math.PI / 2;
      const x = center + radius * lvl * Math.cos(angle);
      const y = center + radius * lvl * Math.sin(angle);
      pts.push(`${x},${y}`);
    }
    gridPaths += `<polygon points="${pts.join(' ')}" class="radar-grid-line" />`;
  });

  // Axis lines & labels
  let axisLines = '';
  let labelEls = '';
  for (let i = 0; i < count; i++) {
    const angle = i * angleStep - Math.PI / 2;
    const x = center + radius * Math.cos(angle);
    const y = center + radius * Math.sin(angle);
    axisLines += `<line x1="${center}" y1="${center}" x2="${x}" y2="${y}" class="radar-axis" />`;

    // Labels position
    const labelX = center + (radius + 28) * Math.cos(angle);
    const labelY = center + (radius + 18) * Math.sin(angle);
    const pillarName = diagnosticPillars[i].name.split(' ')[0]; // short name
    labelEls += `<text x="${labelX}" y="${labelY}" text-anchor="middle" dominant-baseline="middle" class="radar-label">${pillarName}</text>`;
  }

  // Data Polygon points
  let dataPoints = [];
  let circleMarkers = '';
  for (let i = 0; i < count; i++) {
    const p = diagnosticPillars[i];
    const pct = (percentages[p.id] || 20) / 100;
    const angle = i * angleStep - Math.PI / 2;
    const x = center + radius * pct * Math.cos(angle);
    const y = center + radius * pct * Math.sin(angle);
    dataPoints.push(`${x},${y}`);
    circleMarkers += `<circle cx="${x}" cy="${y}" r="4" class="radar-point" />`;
  }

  return `
    <svg viewBox="0 0 ${size} ${size}" class="radar-svg">
      ${gridPaths}
      ${axisLines}
      <polygon points="${dataPoints.join(' ')}" class="radar-polygon" />
      ${circleMarkers}
      ${labelEls}
    </svg>
  `;
}

/* ==========================================================================
   5. FIELD CLIENT SIMULATION ENGINE
   ========================================================================== */
function initSimulation() {
  const pickerGrid = document.getElementById('simSelectGrid');
  if (!pickerGrid) return;

  pickerGrid.innerHTML = '';

  simulations.forEach(sim => {
    const card = document.createElement('div');
    card.className = `sim-picker-card ${sim.id === state.activeSimId ? 'active' : ''}`;
    card.dataset.simId = sim.id;

    card.innerHTML = `
      <div>
        <div class="sim-tag-row">
          <span class="badge badge-indigo">${sim.companyStyle}</span>
          <span class="badge badge-amber">${sim.difficulty}</span>
        </div>
        <h3 class="sim-title">${sim.title}</h3>
        <div class="sim-client-line">🏢 Client: ${sim.client}</div>
        <p class="sim-stakes">${sim.stakes}</p>
      </div>
      <div>
        <button class="btn btn-secondary btn-sm" style="width: 100%;">
          ${sim.id === state.activeSimId ? 'Current Simulation' : 'Launch Simulation'}
        </button>
      </div>
    `;

    card.addEventListener('click', () => {
      state.activeSimId = sim.id;
      resetSimulation();
      document.querySelectorAll('.sim-picker-card').forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      renderSimulationConsole();
    });

    pickerGrid.appendChild(card);
  });

  renderSimulationConsole();
}

function resetSimulation() {
  state.simProgress = {
    currentStageIndex: 0,
    trust: 70,
    integrity: 85,
    velocity: 80,
    history: [],
    isComplete: false
  };
}

function renderSimulationConsole() {
  const consoleEl = document.getElementById('missionConsole');
  const sim = simulations.find(s => s.id === state.activeSimId) || simulations[0];
  if (!consoleEl) return;

  const currentStage = sim.stages[state.simProgress.currentStageIndex];
  const isFinished = state.simProgress.isComplete;

  consoleEl.innerHTML = `
    <!-- Top Mission Header -->
    <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 1rem; margin-bottom: 1.5rem;">
      <div>
        <div style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--accent-secondary); margin-bottom: 0.25rem;">
          // ON-SITE FIELD ASSIGNMENT
        </div>
        <h2 style="font-family: var(--font-display); font-size: 1.7rem; color: #FFFFFF;">${sim.title}</h2>
        <div style="font-size: 0.88rem; color: var(--text-muted); margin-top: 0.25rem;">
          Role: <strong style="color: #FFFFFF;">${sim.role}</strong> | Client: <strong style="color: var(--accent-secondary);">${sim.client}</strong>
        </div>
      </div>
      <div style="display: flex; gap: 0.5rem;">
        <button class="btn btn-outline btn-sm" id="simResetBtn">🔄 Restart Scenario</button>
      </div>
    </div>

    <!-- Live Telemetry Meters -->
    <div class="meters-bar">
      <div class="meter-item">
        <div class="meter-header">
          <span class="meter-title">Client Trust</span>
          <span class="meter-value" id="valTrust">${state.simProgress.trust}%</span>
        </div>
        <div class="meter-track">
          <div class="meter-fill trust" style="width: ${Math.max(5, state.simProgress.trust)}%;"></div>
        </div>
      </div>

      <div class="meter-item">
        <div class="meter-header">
          <span class="meter-title">Technical Integrity</span>
          <span class="meter-value" id="valIntegrity">${state.simProgress.integrity}%</span>
        </div>
        <div class="meter-track">
          <div class="meter-fill integrity" style="width: ${Math.max(5, state.simProgress.integrity)}%;"></div>
        </div>
      </div>

      <div class="meter-item">
        <div class="meter-header">
          <span class="meter-title">Deployment Velocity</span>
          <span class="meter-value" id="valVelocity">${state.simProgress.velocity}%</span>
        </div>
        <div class="meter-track">
          <div class="meter-fill velocity" style="width: ${Math.max(5, state.simProgress.velocity)}%;"></div>
        </div>
      </div>
    </div>

    <!-- Background Narrative -->
    <div style="background: var(--bg-tertiary); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 1.25rem; margin-bottom: 1.75rem; font-size: 0.92rem; color: var(--text-main); line-height: 1.6;">
      <strong style="color: var(--accent-amber);">Situation Brief:</strong> ${sim.background}
    </div>

    <!-- Active Stage Dilemma or Debrief -->
    ${!isFinished && currentStage ? `
      <div class="stage-dilemma-card">
        <span class="stage-num-badge">STAGE ${currentStage.stageNumber} OF ${sim.stages.length}</span>
        <h3 class="stage-title">${currentStage.title}</h3>
        <p class="stage-dilemma-text">${currentStage.dilemma}</p>

        <div class="sim-options-list" style="margin-top: 1.5rem;">
          ${currentStage.options.map((opt, optIdx) => {
            const letters = ['A', 'B', 'C'];
            return `
              <button class="sim-option-btn" data-opt-idx="${optIdx}">
                <span class="sim-option-letter">${letters[optIdx]}</span>
                <span style="font-size: 0.92rem; line-height: 1.5;">${opt.text}</span>
              </button>
            `;
          }).join('')}
        </div>

        <div id="simFeedbackArea"></div>
      </div>
    ` : `
      <!-- Simulation Completed Debrief -->
      <div class="debrief-card">
        <div class="badge badge-emerald" style="margin-bottom: 0.75rem;">Mission Completed</div>
        <h3 class="debrief-title">Field Masterclass Debrief</h3>
        <p style="font-size: 0.98rem; color: #FFFFFF; margin-bottom: 1.25rem; line-height: 1.6;">
          ${sim.debrief.lesson}
        </p>
        <div style="border-top: 1px solid rgba(255, 255, 255, 0.1); padding-top: 1rem;">
          <div style="font-size: 0.82rem; text-transform: uppercase; color: #A5B4FC; font-weight: 700; margin-bottom: 0.5rem;">
            Core Skills Demonstrated:
          </div>
          <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
            ${sim.debrief.coreSkillsDemonstrated.map(sk => `<span class="badge badge-indigo">${sk}</span>`).join('')}
          </div>
        </div>
      </div>
    `}
  `;

  // Attach button event
  document.getElementById('simResetBtn')?.addEventListener('click', () => {
    resetSimulation();
    renderSimulationConsole();
  });

  // Attach choice events
  consoleEl.querySelectorAll('.sim-option-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const optIdx = parseInt(btn.dataset.optIdx, 10);
      handleSimulationChoice(sim, currentStage, optIdx);
    });
  });
}

function handleSimulationChoice(sim, currentStage, optIdx) {
  const chosenOpt = currentStage.options[optIdx];
  const feedbackArea = document.getElementById('simFeedbackArea');

  // Update telemetry
  state.simProgress.trust = Math.max(0, Math.min(100, state.simProgress.trust + chosenOpt.impact.trust));
  state.simProgress.integrity = Math.max(0, Math.min(100, state.simProgress.integrity + chosenOpt.impact.integrity));
  state.simProgress.velocity = Math.max(0, Math.min(100, state.simProgress.velocity + chosenOpt.impact.velocity));

  const isPositive = chosenOpt.impact.trust >= 0 && chosenOpt.impact.integrity >= 0;

  // Highlight chosen option
  document.querySelectorAll('.sim-option-btn').forEach(b => {
    b.disabled = true;
    b.style.pointerEvents = 'none';
  });
  const selectedBtn = document.querySelector(`[data-opt-idx="${optIdx}"]`);
  selectedBtn?.classList.add('selected-choice');

  // Display feedback box
  if (feedbackArea) {
    feedbackArea.innerHTML = `
      <div class="sim-feedback-box ${isPositive ? 'positive' : 'negative'}">
        <div style="font-weight: 700; margin-bottom: 0.35rem;">
          ${isPositive ? '✔ Tactical Victory' : '⚠ Field Escalation Hazard'}
        </div>
        <div>${chosenOpt.feedback}</div>
        <div style="margin-top: 1rem; display: flex; justify-content: flex-end;">
          <button class="btn btn-primary btn-sm" id="simNextStageBtn">
            ${state.simProgress.currentStageIndex + 1 < sim.stages.length ? 'Proceed to Next Stage →' : 'View Mission Debrief →'}
          </button>
        </div>
      </div>
    `;

    document.getElementById('simNextStageBtn')?.addEventListener('click', () => {
      state.simProgress.currentStageIndex++;
      if (state.simProgress.currentStageIndex >= sim.stages.length) {
        state.simProgress.isComplete = true;
      }
      renderSimulationConsole();
    });
  }
}

/* ==========================================================================
   6. COMPANY INTERVIEW PLAYBOOKS
   ========================================================================== */
function renderCompanies() {
  const tabsContainer = document.getElementById('companyTabs');
  const cardContainer = document.getElementById('companyDetailCard');
  if (!tabsContainer || !cardContainer) return;

  tabsContainer.innerHTML = '';

  companyPlaybooks.forEach(comp => {
    const btn = document.createElement('button');
    btn.className = `company-tab-btn ${comp.id === state.activeCompanyId ? 'active' : ''}`;
    btn.dataset.companyId = comp.id;
    btn.innerHTML = `
      <span class="badge" style="background: ${comp.accentColor}25; color: ${comp.accentColor};">${comp.logoBadge}</span>
      <span>${comp.name}</span>
    `;

    btn.addEventListener('click', () => {
      state.activeCompanyId = comp.id;
      document.querySelectorAll('.company-tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderCompanyDetails();
    });

    tabsContainer.appendChild(btn);
  });

  renderCompanyDetails();
}

function renderCompanyDetails() {
  const card = document.getElementById('companyDetailCard');
  const comp = companyPlaybooks.find(c => c.id === state.activeCompanyId) || companyPlaybooks[0];
  if (!card) return;

  card.innerHTML = `
    <!-- Hero Top -->
    <div class="company-hero-top">
      <div>
        <div class="company-brand-group">
          <span class="company-badge-large" style="background: ${comp.accentColor};">${comp.logoBadge}</span>
          <div>
            <h2 class="company-name-title">${comp.name}</h2>
            <div class="company-role-subtitle">${comp.roleName}</div>
          </div>
        </div>
        <div style="font-size: 1rem; color: #A5B4FC; margin-top: 0.75rem; font-style: italic;">
          "${comp.tagline}"
        </div>
      </div>
      <div>
        <div class="badge badge-emerald" style="font-size: 0.82rem; padding: 0.4rem 0.8rem;">
          Comp: ${comp.compensationTier}
        </div>
      </div>
    </div>

    <!-- Products & Overview -->
    <p style="font-size: 0.95rem; color: var(--text-muted); line-height: 1.6; margin-bottom: 1.5rem;">
      ${comp.overview}
    </p>

    <div style="margin-bottom: 2rem;">
      <div style="font-size: 0.8rem; text-transform: uppercase; color: var(--text-dim); font-weight: 700; margin-bottom: 0.5rem;">
        Core Deployment Products & Platforms:
      </div>
      <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
        ${comp.products.map(p => `<span class="badge badge-indigo">${p}</span>`).join('')}
      </div>
    </div>

    <!-- Interview Loop Stages Timeline -->
    <div class="section-header" style="margin-bottom: 1rem;">
      <div class="section-label">// THE INTERVIEW LOOP</div>
      <h3 style="font-family: var(--font-display); font-size: 1.35rem; color: #FFFFFF;">
        Full Interview Stage Breakdown
      </h3>
    </div>

    <div class="interview-loop-timeline">
      ${comp.interviewStages.map(stg => `
        <div class="loop-stage-card">
          <div class="loop-stage-name">${stg.stage}</div>
          <div class="loop-stage-desc">${stg.details}</div>
        </div>
      `).join('')}
    </div>

    <!-- Decomp Formula -->
    <div class="decomp-box">
      <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.75rem;">
        <span style="font-size: 1.2rem;">📐</span>
        <h4 style="font-family: var(--font-display); font-size: 1.15rem; color: #FFFFFF;">
          The ${comp.name} Decomp & Technical Formula
        </h4>
      </div>
      <div style="margin-bottom: 1rem;">
        ${comp.decompPlaybook.formula.map(f => `
          <div class="decomp-step-item">
            <span class="decomp-step-dot">▶</span>
            <span>${f}</span>
          </div>
        `).join('')}
      </div>
      <div style="border-top: 1px solid rgba(255, 255, 255, 0.1); padding-top: 0.75rem;">
        <div style="font-size: 0.8rem; text-transform: uppercase; color: var(--accent-secondary); font-weight: 700; margin-bottom: 0.35rem;">
          Golden Rules for this Loop:
        </div>
        ${comp.decompPlaybook.goldenRules.map(r => `
          <div style="font-size: 0.88rem; color: var(--text-main); margin-bottom: 0.25rem;">• ${r}</div>
        `).join('')}
      </div>
    </div>

    <!-- Red Flags vs Pass Signals -->
    <div class="comparison-grid">
      <div class="flag-box red">
        <div class="flag-title">
          <span>🚫</span> Instant Red Flags That Reject Candidates
        </div>
        <ul class="flag-list">
          ${comp.redFlags.map(rf => `<li>• ${rf}</li>`).join('')}
        </ul>
      </div>

      <div class="flag-box green">
        <div class="flag-title">
          <span>🎯</span> Verified Interview Sample Questions
        </div>
        <div style="display: flex; flex-direction: column; gap: 0.85rem;">
          ${comp.sampleQuestions.map(sq => `
            <div style="background: rgba(0, 0, 0, 0.25); padding: 0.75rem; border-radius: var(--radius-sm); border: 1px solid rgba(16, 185, 129, 0.2);">
              <div style="font-size: 0.88rem; color: #FFFFFF; font-weight: 600; margin-bottom: 0.35rem;">Q: ${sq.q}</div>
              <div style="font-size: 0.8rem; color: #6EE7B7;">💡 Insider Strategy: ${sq.tip}</div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

/* ==========================================================================
   7. DECOMP & SYSTEM DESIGN CASE STUDIES
   ========================================================================== */
function renderCaseStudies() {
  const container = document.getElementById('casesContainer');
  if (!container) return;

  container.innerHTML = '';

  caseStudies.forEach(cs => {
    const card = document.createElement('div');
    card.className = 'week-card';

    card.innerHTML = `
      <div class="week-top">
        <span class="badge badge-indigo">${cs.category}</span>
        <span class="badge badge-amber">${cs.difficulty}</span>
        <span class="badge badge-cyan">${cs.companyContext}</span>
      </div>
      <h3 class="week-title">${cs.title}</h3>
      <div class="prompt-quote">
        <strong>Problem Statement:</strong> ${cs.problemStatement}
      </div>

      <div style="margin: 1.5rem 0;">
        <h4 style="font-size: 1rem; color: var(--accent-secondary); margin-bottom: 0.75rem; font-family: var(--font-display);">
          Architectural Blueprint & Phases:
        </h4>
        <div style="display: flex; flex-direction: column; gap: 1rem;">
          ${cs.architecturePhases.map(ph => `
            <div style="background: var(--bg-tertiary); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 1.25rem;">
              <div style="font-weight: 700; color: #FFFFFF; font-size: 0.95rem; margin-bottom: 0.35rem;">${ph.phase}</div>
              <p style="font-size: 0.88rem; color: var(--text-muted); margin-bottom: 0.75rem;">${ph.details}</p>
              ${ph.entities ? `
                <div style="font-size: 0.82rem; font-family: var(--font-mono); color: #A5B4FC; background: var(--bg-primary); padding: 0.6rem; border-radius: var(--radius-sm); margin-bottom: 0.5rem;">
                  Entities: ${ph.entities.map(e => `${e.name} (${e.properties.slice(0, 3).join(', ')}...)`).join(' | ')}
                </div>
              ` : ''}
              ${ph.technicalDecisions ? `
                <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.4rem;">
                  ${ph.technicalDecisions.map(td => `
                    <li style="font-size: 0.85rem; color: var(--text-main); display: flex; gap: 0.5rem;">
                      <span style="color: var(--accent-primary);">✓</span>
                      <span>${td}</span>
                    </li>
                  `).join('')}
                </ul>
              ` : ''}
            </div>
          `).join('')}
        </div>
      </div>

      <div style="background: rgba(245, 158, 11, 0.08); border: 1px solid rgba(245, 158, 11, 0.25); border-radius: var(--radius-md); padding: 1rem; margin-bottom: 1.25rem;">
        <div style="font-size: 0.82rem; text-transform: uppercase; color: #FCD34D; font-weight: 700; margin-bottom: 0.5rem;">
          Key Architectural Tradeoffs Justified:
        </div>
        ${cs.tradeoffs.map(t => `
          <div style="font-size: 0.88rem; color: var(--text-main); margin-bottom: 0.4rem;">
            <strong>${t.decision}:</strong> ${t.reasoning}
          </div>
        `).join('')}
      </div>

      <div style="border-top: 1px solid var(--border-subtle); padding-top: 0.75rem; font-size: 0.85rem; color: var(--accent-emerald);">
        💡 <strong>Interview Takeaway:</strong> ${cs.interviewTakeaway}
      </div>
    `;

    container.appendChild(card);
  });
}

/* ==========================================================================
   8. QUESTION BANK & FILTERING
   ========================================================================== */
function renderQuestionBank() {
  const container = document.getElementById('questionsContainer');
  const pillsContainer = document.getElementById('categoryFilterPills');
  const searchInput = document.getElementById('questionSearch');
  if (!container || !pillsContainer) return;

  // Extract categories
  const categories = ['All', ...new Set(questionBank.map(q => q.category))];

  pillsContainer.innerHTML = '';
  categories.forEach(cat => {
    const pill = document.createElement('button');
    pill.className = `filter-pill ${cat === state.selectedQuestionCategory ? 'active' : ''}`;
    pill.textContent = cat;
    pill.addEventListener('click', () => {
      state.selectedQuestionCategory = cat;
      document.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      filterQuestions();
    });
    pillsContainer.appendChild(pill);
  });

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      state.questionSearchQuery = e.target.value.toLowerCase();
      filterQuestions();
    });
  }

  filterQuestions();
}

function filterQuestions() {
  const container = document.getElementById('questionsContainer');
  if (!container) return;

  const filtered = questionBank.filter(q => {
    const matchesCat = state.selectedQuestionCategory === 'All' || q.category === state.selectedQuestionCategory;
    const query = state.questionSearchQuery;
    const matchesSearch = !query ||
      q.title.toLowerCase().includes(query) ||
      q.prompt.toLowerCase().includes(query) ||
      q.company.toLowerCase().includes(query) ||
      q.category.toLowerCase().includes(query);

    return matchesCat && matchesSearch;
  });

  container.innerHTML = '';

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 3rem; color: var(--text-dim);">
        No questions matched your search criteria. Try a different category or keyword.
      </div>
    `;
    return;
  }

  filtered.forEach(q => {
    const card = document.createElement('div');
    card.className = 'question-card';

    card.innerHTML = `
      <button class="question-header-btn">
        <div class="question-header-left">
          <div class="question-tags-row">
            <span class="badge badge-indigo">${q.category}</span>
            <span class="badge badge-cyan">${q.company}</span>
            <span class="badge badge-amber">${q.level}</span>
          </div>
          <div class="question-header-title">${q.title}</div>
        </div>
        <span class="question-expand-icon">▼</span>
      </button>

      <div class="question-body">
        <div class="prompt-quote">
          <strong>The Prompt:</strong> ${q.prompt}
        </div>

        <div class="answer-section">
          <div class="answer-heading">Model Answer & Key Talking Points:</div>
          <div class="answer-text">${q.modelAnswer}</div>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1rem; margin-top: 1rem;">
          <div style="background: rgba(244, 63, 94, 0.08); border: 1px solid rgba(244, 63, 94, 0.25); border-radius: var(--radius-md); padding: 0.85rem;">
            <div style="font-size: 0.75rem; text-transform: uppercase; color: #FDA4AF; font-weight: 700; margin-bottom: 0.35rem;">
              🚫 Common Red Flags:
            </div>
            <div style="font-size: 0.85rem; color: var(--text-main);">${q.redFlags}</div>
          </div>

          <div style="background: rgba(6, 182, 212, 0.08); border: 1px solid rgba(6, 182, 212, 0.25); border-radius: var(--radius-md); padding: 0.85rem;">
            <div style="font-size: 0.75rem; text-transform: uppercase; color: #67E8F9; font-weight: 700; margin-bottom: 0.35rem;">
              🎯 Follow-Up Probe to Anticipate:
            </div>
            <div style="font-size: 0.85rem; color: var(--text-main);">${q.followUp}</div>
          </div>
        </div>
      </div>
    `;

    const headerBtn = card.querySelector('.question-header-btn');
    headerBtn.addEventListener('click', () => {
      card.classList.toggle('open');
    });

    container.appendChild(card);
  });
}
