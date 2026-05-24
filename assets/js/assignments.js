document.addEventListener('DOMContentLoaded', () => {
  // --- THEME ENGINE ---
  const themeToggle = document.getElementById('theme-toggle');
  const storedTheme = localStorage.getItem('demo_theme') || 'dark';

  if (storedTheme === 'light') {
    document.body.classList.add('light-theme');
    if (themeToggle) themeToggle.checked = true;
  } else {
    document.body.classList.remove('light-theme');
    if (themeToggle) themeToggle.checked = false;
  }

  if (themeToggle) {
    themeToggle.addEventListener('change', () => {
      if (themeToggle.checked) {
        document.body.classList.add('light-theme');
        localStorage.setItem('demo_theme', 'light');
      } else {
        document.body.classList.remove('light-theme');
        localStorage.setItem('demo_theme', 'dark');
      }
    });
  }

  // --- FLOATING DEMO CHAT WIDGET ---
  const chatBubbleBtn = document.getElementById('chat-bubble-btn');
  const chatWindow = document.getElementById('chat-window');
  const chatBody = document.getElementById('chat-body');
  const chatInput = document.getElementById('chat-input');
  const chatSendBtn = document.getElementById('chat-send-btn');

  if (chatBubbleBtn && chatWindow) {
    chatBubbleBtn.addEventListener('click', () => {
      chatWindow.classList.toggle('open');
      if (chatWindow.classList.contains('open') && chatInput) {
        chatInput.focus();
      }
    });
  }

  const appendChatMessage = (sender, text) => {
    if (!chatBody) return;
    const msgDiv = document.createElement('div');
    msgDiv.className = `chat-msg ${sender}`;
    msgDiv.textContent = text;
    chatBody.appendChild(msgDiv);
    chatBody.scrollTop = chatBody.scrollHeight;
  };

  const handleSendMessage = () => {
    if (!chatInput) return;
    const text = chatInput.value.trim();
    if (!text) return;

    appendChatMessage('user', text);
    chatInput.value = '';

    setTimeout(() => {
      let response = "That's an interesting question! I can help you review your modules, check assignment statistics, or track your daily solved count.";
      const lower = text.toLowerCase();
      if (lower.includes('java') || lower.includes('quiz')) {
        response = "Your Java Quiz assignment is 81% completed. Expand Module 1 'Evolution of HLL' to see sub-modules like storage devices and languages!";
      } else if (lower.includes('solved') || lower.includes('attempt')) {
        response = "To mark a question as solved, expand any module, select the submodule tab, and click the blue 'Solve' button. It will instantly update your dashboard metrics!";
      } else if (lower.includes('sql') || lower.includes('html') || lower.includes('css')) {
        response = "Your SQL, HTML, and CSS assignments are marked as Completed! Great job on finishing them.";
      }
      appendChatMessage('demo', response);
    }, 800);
  };

  if (chatSendBtn && chatInput) {
    chatSendBtn.addEventListener('click', handleSendMessage);
    chatInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') handleSendMessage();
    });
  }


  // --- DYNAMIC DATA SEED ENGINE ---
  // Default values matching screenshots
  const subjectMetadata = [
    { id: 'java-quiz', title: 'Java Quiz', level: 'Beginner', modulesCount: 19, totalQuestions: 317, targetSolved: 258, targetAttempted: 259, targetMarks: 338.2, totalMarks: 455, cssClass: 'java-quiz' },
    { id: 'java-scenarios', title: 'Java Coding Scenarios', level: 'Intermediate', modulesCount: 13, totalQuestions: 125, targetSolved: 80, targetAttempted: 85, targetMarks: 615, totalMarks: 1250, cssClass: 'java-scenarios' },
    { id: 'programming', title: 'Programming', level: 'Intermediate', modulesCount: 16, totalQuestions: 253, targetSolved: 58, targetAttempted: 60, targetMarks: 560, totalMarks: 2550, cssClass: 'programming' },
    { id: 'sql', title: 'SQL', level: 'Intermediate', modulesCount: 10, totalQuestions: 202, targetSolved: 202, targetAttempted: 202, targetMarks: 174, totalMarks: 203, cssClass: 'sql', completed: true },
    { id: 'html', title: 'HTML', level: 'Beginner', modulesCount: 6, totalQuestions: 123, targetSolved: 123, targetAttempted: 123, targetMarks: 125.9, totalMarks: 146, cssClass: 'html', completed: true },
    { id: 'css', title: 'CSS', level: 'Beginner', modulesCount: 8, totalQuestions: 160, targetSolved: 160, targetAttempted: 160, targetMarks: 138, totalMarks: 160, cssClass: 'css', completed: true }
  ];

  // Preset module titles for each subject
  const moduleTitlesPreset = {
    'java-quiz': [
      'Evolution of HLL', 'Object Orientation', 'Main Method', 'Pattern Programming', 
      'DataTypes', 'Operators', 'Conditional Statements', 'Looping Statements', 
      'Arrays', 'String Class', 'Methods', 'Constructors', 'Encapsulation', 
      'Inheritance', 'Polymorphism', 'Abstraction', 'Interfaces', 'Packages', 'Exception Handling'
    ],
    'java-scenarios': [
      'Conditional logic scenarios', 'Iteration scenarios', 'Array manipulation coding',
      'Searching algorithms', 'Sorting scenarios', 'Recursion drills', 
      'Class relationship modeling', 'Polymorphic bindings', 'Interface callbacks',
      'Exception propagation scenarios', 'File I/O scenarios', 'Collection processing', 'Concurrency modeling'
    ],
    'programming': [
      'Flowchart tracing', 'Basic Arithmetic algorithms', 'Pattern outputs', 
      'Prime and Fibonacci utilities', 'Array traversal', 'Matrix operations', 
      'String parsing', 'Regular expressions', 'Data structure implementations', 
      'Binary Search Trees', 'Graph representations', 'Greedy algorithms',
      'Dynamic Programming basics', 'Backtracking exercises', 'Bitwise operations', 'Math logic algorithms'
    ],
    'sql': [
      'Introduction to RDBMS', 'Basic SELECT queries', 'Filtering with WHERE',
      'Sorting with ORDER BY', 'Aggregations and GROUP BY', 'Subqueries',
      'INNER and OUTER Joins', 'Self Joins', 'DDL Commands', 'DML Transactions'
    ],
    'html': [
      'Introduction to Basics HTML Tags', 'Multimedia Tags', 'Tables',
      'List and HyperLink', 'Forms', 'Semantic layout tags'
    ],
    'css': [
      'CSS Selectors and Specificity', 'Box Model sizing', 'Typography rules',
      'Flexbox flex containers', 'Grid layout sizing', 'Transitions and animations',
      'Media queries responsiveness', 'Custom variables and dark theme'
    ]
  };

  // Seeding storage database
  const getAssignmentsData = () => {
    const stored = localStorage.getItem('demo_assignments_data');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        // Strict Schema Validation
        const expectedIds = ['java-quiz', 'java-scenarios', 'programming', 'sql', 'html', 'css'];
        let isValid = true;
        
        if (!parsed || typeof parsed !== 'object') {
          isValid = false;
        } else {
          expectedIds.forEach(id => {
            if (!parsed[id] || !parsed[id].modules || !Array.isArray(parsed[id].modules) || parsed[id].modules.length === 0) {
              isValid = false;
            }
          });
          
          // Specific check for HTML seeding correctness (123 questions)
          if (parsed.html && parsed.html.totalQuestions !== 123) {
            isValid = false;
          }
          
          // Specific check for practice module availability details (Module 1 should have 6 available)
          if (parsed.html && parsed.html.modules && parsed.html.modules[0] && parsed.html.modules[0].practiceModulesAvailable !== 6) {
            isValid = false;
          }
        }

        if (isValid) {
          return parsed;
        } else {
          console.warn("Outdated or invalid assignments schema. Re-seeding database.");
        }
      } catch (e) {
        console.error("Error parsing stored assignments data. Re-seeding.", e);
      }
    }

    // Force seed database
    const database = {};

    subjectMetadata.forEach(sub => {
      database[sub.id] = {
        id: sub.id,
        title: sub.title,
        level: sub.level,
        modulesCount: sub.modulesCount,
        totalQuestions: sub.totalQuestions,
        totalMarks: sub.totalMarks,
        cssClass: sub.cssClass,
        completed: sub.completed || false,
        modules: []
      };

      const presetList = moduleTitlesPreset[sub.id] || [];
      
      // Question counter for tracking targets
      let questionsCreated = 0;
      let questionsSolvedCount = 0;
      let questionsAttemptedCount = 0;

      for (let i = 0; i < sub.modulesCount; i++) {
        const modTitle = presetList[i] || `Module ${i + 1}`;
        const moduleObj = {
          id: `${sub.id}-m-${i + 1}`,
          number: i + 1,
          title: modTitle,
          timeTaken: '0m',
          completedDate: '',
          dueDate: '22/12/2025',
          practiceModulesAvailable: 1, // Default fallback
          submodules: []
        };

        // Practice availability counts matching screenshots (Photo 3)
        if (sub.id === 'html') {
          const pmAvailable = [6, 1, 1, 2, 2, 1];
          moduleObj.practiceModulesAvailable = pmAvailable[i] || 1;
        } else if (sub.id === 'java-quiz') {
          const pmAvailable = [6, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
          moduleObj.practiceModulesAvailable = pmAvailable[i] || 1;
        }

        // Determine number of submodules (1 or 2)
        let submodCount = 1;
        if (sub.id === 'java-quiz' && i === 0) {
          submodCount = 2; // Evolution of HLL, Storage Device
        } else if (sub.id === 'html' && i === 0) {
          submodCount = 2; // Day 01, PM1 - Day 01
        }
        
        for (let j = 0; j < submodCount; j++) {
          let submodTitle = modTitle;
          if (sub.id === 'java-quiz' && i === 0) {
            submodTitle = j === 0 ? 'Evolution of HLL' : 'Storage Device';
          } else if (sub.id === 'html' && i === 0) {
            submodTitle = j === 0 ? 'Day 01 [Introduction]' : 'PM1 - Day 01 [Introduction]';
          }

          const submoduleObj = {
            id: `${moduleObj.id}-s-${j + 1}`,
            title: submodTitle,
            questions: []
          };

          // Distribute questions roughly evenly
          let qCount = Math.floor(sub.totalQuestions / sub.modulesCount);
          if (submodCount === 2) {
            qCount = Math.floor(qCount / 2);
          }
          // Handle remainder in the last module
          if (i === sub.modulesCount - 1 && j === submodCount - 1) {
            qCount = sub.totalQuestions - questionsCreated;
          }

          // Generate questions
          for (let k = 0; k < qCount; k++) {
            questionsCreated++;
            
            let isSolved = false;
            let attemptsNum = 0;

            if (sub.completed) {
              isSolved = true;
              attemptsNum = 1;
              questionsSolvedCount++;
              questionsAttemptedCount++;
            } else {
              if (questionsSolvedCount < sub.targetSolved) {
                isSolved = true;
                attemptsNum = 1;
                questionsSolvedCount++;
                questionsAttemptedCount++;
              } else if (questionsAttemptedCount < sub.targetAttempted) {
                isSolved = false;
                attemptsNum = 1;
                questionsAttemptedCount++;
              }
            }

            // Create question title
            let qTitle = `${submodTitle} Exercise ${k + 1}`;
            
            // Java Quiz module 1 questions seeding
            if (sub.id === 'java-quiz' && i === 0 && j === 0) {
              const firstModQuestions = [
                'Computer Languages', 'Copying a File from Hard Disk to RAM', 
                'Nature of Hard Disk', 'Hard Disk Technology', 
                'Transistors and Semiconductor Technology', 'Storage Devices'
              ];
              if (k < firstModQuestions.length) qTitle = firstModQuestions[k];
            }

            // HTML Module 1 PM1 exact seeding (Photo 4)
            let scoreVal = isSolved ? 1.0 : 0.0;
            let maxScoreVal = 1.0;
            let difficultyTier = k % 3 === 0 ? 'Easy' : (k % 3 === 1 ? 'Medium' : 'Hard');

            if (sub.id === 'html' && i === 0 && j === 1) {
              // Exact questions for HTML Module 1 PM1 (Photo 4)
              const htmlQuestionsPreset = [
                { title: 'HTML Multi-line Comment MCQ', diff: 'Medium', attempts: 1, score: 1.0, max: 1.0 },
                { title: 'Application Types MCQ', diff: 'Medium', attempts: 2, score: 0.5, max: 1.0 },
                { title: 'Markup Language for Web Content MCQ', diff: 'Easy', attempts: 1, score: 1.0, max: 1.0 },
                { title: 'Web Development Caching MCQ', diff: 'Medium', attempts: 2, score: 0.5, max: 1.0 },
                { title: 'HTML Release Year MCQ', diff: 'Easy', attempts: 3, score: 0.3, max: 1.0 },
                { title: 'Father of HTML MCQ', diff: 'Easy', attempts: 1, score: 1.0, max: 1.0 },
                { title: 'Root Tag of HTML MCQ', diff: 'Easy', attempts: 1, score: 1.0, max: 1.0 },
                { title: 'Paragraph Element Tag MCQ', diff: 'Easy', attempts: 1, score: 1.0, max: 1.0 },
                { title: 'Line Break Element Tag MCQ', diff: 'Medium', attempts: 2, score: 0.5, max: 1.0 },
                { title: 'HTML Document Title MCQ', diff: 'Easy', attempts: 1, score: 1.0, max: 1.0 }
              ];

              if (k < htmlQuestionsPreset.length) {
                const preset = htmlQuestionsPreset[k];
                qTitle = preset.title;
                difficultyTier = preset.diff;
                attemptsNum = preset.attempts;
                scoreVal = preset.score;
                maxScoreVal = preset.max;
                isSolved = true;
              }
            } else {
              // Calculate weights for all other queries
              if (sub.id === 'java-quiz' && isSolved) {
                scoreVal = 1.31; // Average weight
              } else if (sub.id === 'java-scenarios') {
                scoreVal = 7.6875;
              } else if (sub.id === 'programming') {
                scoreVal = 9.655;
              } else if (sub.id === 'sql') {
                scoreVal = 0.8614;
              } else if (sub.id === 'html') {
                // If HTML, distribute other questions to reach exactly 125.9 Marks Obtained!
                scoreVal = 1.0495;
                maxScoreVal = 1.2233;
              } else if (sub.id === 'css') {
                scoreVal = 0.8625;
              }
            }

            submoduleObj.questions.push({
              id: `${submoduleObj.id}-q-${k + 1}`,
              title: qTitle,
              type: sub.id.includes('scenario') || sub.id === 'programming' ? 'Code' : 'MCQ',
              difficulty: difficultyTier,
              solved: isSolved,
              bookmarked: false,
              attempts: attemptsNum,
              score: isSolved ? parseFloat(scoreVal.toFixed(4)) : 0,
              maxScore: parseFloat(maxScoreVal.toFixed(4))
            });
          }

          moduleObj.submodules.push(submoduleObj);
        }

        // Set completed dates/times for HTML modules (Photo 3)
        if (sub.id === 'html') {
          const htmlTimes = ['10m:13s', '6m:19s', '5m:25s', '15h:23m:29s', '5m:14s', '8m:0s'];
          const htmlDates = ['22/12/2025', '22/12/2025', '22/12/2025', '22/12/2025', '22/12/2025', '22/12/2025'];
          moduleObj.timeTaken = htmlTimes[i] || '10m';
          moduleObj.completedDate = htmlDates[i] || '22/12/2025';
        } else if (sub.id === 'java-quiz') {
          const times = ['1h:0m:44s', '3m:32s', '12m:45s', '3h:30m:38s', '19h:4m:40s'];
          const dates = ['18/12/2025', '18/12/2025', '18/12/2025', '18/12/2025', '21/12/2025'];
          if (i < 5) {
            moduleObj.timeTaken = times[i];
            moduleObj.completedDate = dates[i];
          } else if (i < 15) {
            moduleObj.timeTaken = `${Math.floor(Math.random() * 2) + 1}h:${Math.floor(Math.random() * 59)}m`;
            moduleObj.completedDate = `${15 + i}/12/2025`;
          }
        } else if (sub.completed) {
          moduleObj.timeTaken = '45m';
          moduleObj.completedDate = '28/11/2025';
        }

        database[sub.id].modules.push(moduleObj);
      }
    });

    localStorage.setItem('demo_assignments_data', JSON.stringify(database));
    return database;
  };

  let activeSubject = null;
  let activeSubmoduleTab = 0;
  let assignmentsDb = getAssignmentsData();

  // --- ELEMENT SELECTORS ---
  const catalogView = document.getElementById('assignments-catalog-view');
  const moduleView = document.getElementById('assignments-module-view');
  const gridContainer = document.getElementById('assignments-grid');
  const searchInput = document.getElementById('assignments-search');
  const backBtn = document.getElementById('module-back-btn');
  const accordionContainer = document.getElementById('assignments-accordion-list');

  // --- MATH & METRICS RECALCULATION ENGINE ---
  const recalculateAndSave = () => {
    localStorage.setItem('demo_assignments_data', JSON.stringify(assignmentsDb));
    updateGlobalCounters();
    if (activeSubject) {
      updateSubjectCounters(activeSubject.id);
      renderAccordionList(activeSubject.id);
    }
  };

  const formatNumber = (num) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1).replace('.0', '') + 'k';
    }
    return num.toFixed(1).replace('.0', '');
  };

  const updateGlobalCounters = () => {
    let totalQuestions = 0;
    let solvedQuestions = 0;
    let attemptedQuestions = 0;
    let marksScored = 0;
    let totalMarks = 0;

    Object.keys(assignmentsDb).forEach(key => {
      const sub = assignmentsDb[key];
      if (!sub || !sub.modules) return; // Defensive null check
      sub.modules.forEach(mod => {
        if (!mod || !mod.submodules) return; // Defensive null check
        mod.submodules.forEach(subm => {
          if (!subm || !subm.questions) return; // Defensive null check
          subm.questions.forEach(q => {
            totalQuestions++;
            totalMarks += q.maxScore;
            if (q.solved) {
              solvedQuestions++;
              marksScored += q.score;
            }
            if (q.attempts > 0) {
              attemptedQuestions++;
            }
          });
        });
      });
    });

    const totalQEl = document.getElementById('global-total-questions');
    const solvedQEl = document.getElementById('global-solved-questions');
    const attemptedQEl = document.getElementById('global-attempted-questions');
    const marksEl = document.getElementById('global-marks-obtained');

    if (totalQEl) totalQEl.textContent = totalQuestions;
    if (solvedQEl) solvedQEl.textContent = solvedQuestions;
    if (attemptedQEl) attemptedQEl.textContent = attemptedQuestions;
    if (marksEl) marksEl.textContent = `${formatNumber(marksScored)} / ${formatNumber(totalMarks)}`;
  };

  const updateSubjectCounters = (subjectId) => {
    const sub = assignmentsDb[subjectId];
    if (!sub || !sub.modules) return; // Defensive null check

    let totalQuestions = 0;
    let solvedQuestions = 0;
    let attemptedQuestions = 0;
    let marksScored = 0;
    let totalMarks = 0;

    sub.modules.forEach(mod => {
      if (!mod || !mod.submodules) return; // Defensive null check
      mod.submodules.forEach(subm => {
        if (!subm || !subm.questions) return; // Defensive null check
        subm.questions.forEach(q => {
          totalQuestions++;
          totalMarks += q.maxScore;
          if (q.solved) {
            solvedQuestions++;
            marksScored += q.score;
          }
          if (q.attempts > 0) {
            attemptedQuestions++;
          }
        });
      });
    });

    sub.totalQuestions = totalQuestions;
    sub.totalMarks = totalMarks;

    const subTotalQEl = document.getElementById('subject-total-questions');
    const subSolvedQEl = document.getElementById('subject-solved-questions');
    const subPendingQEl = document.getElementById('subject-pending-questions');
    const circlePercentEl = document.getElementById('progress-circle-percent');

    if (subTotalQEl) subTotalQEl.textContent = totalQuestions;
    if (subSolvedQEl) subSolvedQEl.textContent = solvedQuestions;
    if (subPendingQEl) subPendingQEl.textContent = totalQuestions - solvedQuestions;

    // Update Circular Progress
    const percent = totalQuestions > 0 ? Math.round((solvedQuestions / totalQuestions) * 100) : 0;
    if (circlePercentEl) circlePercentEl.textContent = `${percent}%`;
    
    // Animate SVG circular progress
    const circle = document.getElementById('progress-circle-fill');
    if (circle) {
      const circ = 377; // Circumference
      const offset = circ - (circ * (percent / 100));
      circle.style.strokeDashoffset = offset;
    }
  };

  // --- RENDER VIEW 1: CATALOG CARDS GRID ---
  const renderCatalogGrid = () => {
    if (!gridContainer) return;
    gridContainer.innerHTML = '';

    const query = searchInput ? searchInput.value.toLowerCase() : '';

    Object.keys(assignmentsDb).forEach(key => {
      const sub = assignmentsDb[key];
      if (!sub || !sub.modules) return; // Defensive null check
      
      if (query && !sub.title.toLowerCase().includes(query)) return;

      let totalQ = 0;
      let solvedQ = 0;
      let marksScored = 0;
      let totalM = 0;

      sub.modules.forEach(mod => {
        if (!mod || !mod.submodules) return;
        mod.submodules.forEach(subm => {
          if (!subm || !subm.questions) return;
          subm.questions.forEach(q => {
            totalQ++;
            totalM += q.maxScore;
            if (q.solved) {
              solvedQ++;
              marksScored += q.score;
            }
          });
        });
      });

      const percent = totalQ > 0 ? Math.round((solvedQ / totalQ) * 100) : 0;
      const isCompleted = percent === 100;

      const card = document.createElement('div');
      card.className = `assignment-card ${sub.cssClass}`;
      card.innerHTML = `
        <div>
          <div class="assignment-card-header">
            <div class="assignment-card-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
              </svg>
            </div>
            <div class="assignment-card-title">
              <h3>${sub.title}</h3>
              <span class="assignment-badge ${sub.level.toLowerCase()}">${sub.level}</span>
            </div>
          </div>

          <div class="assignment-card-stats">
            <div class="assignment-stat-row">
              <span>Modules</span>
              <span>${sub.modulesCount}</span>
            </div>
            <div class="assignment-stat-row">
              <span>Questions</span>
              <span>${totalQ}</span>
            </div>
            <div class="assignment-stat-row">
              <span>Marks Scored</span>
              <span>${Math.round(marksScored)} / ${Math.round(totalM)}</span>
            </div>
          </div>
        </div>

        <div class="assignment-progress-section">
          ${isCompleted ? `
            <div class="assignment-completed-row">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <circle cx="12" cy="12" r="10" fill="rgba(16, 185, 129, 0.1)"/>
                <polyline points="9 11 12 14 17 9"/>
              </svg>
              <span>Completed</span>
            </div>
          ` : `
            <div class="assignment-progress-label">${percent}%</div>
            <div class="assignment-progress-track">
              <div class="assignment-progress-bar" style="width: ${percent}%;"></div>
            </div>
          `}
        </div>
      `;

      card.addEventListener('click', () => showModuleView(sub.id));
      gridContainer.appendChild(card);
    });
  };

  // --- RENDER VIEW 2: MODULES ACCORDION LIST ---
  const showModuleView = (subjectId) => {
    activeSubject = assignmentsDb[subjectId];
    if (!activeSubject) return;

    if (catalogView && moduleView) {
      catalogView.style.display = 'none';
      moduleView.style.display = 'block';
    }

    const subTitleEl = document.getElementById('module-subject-title');
    const headerTitleEl = document.getElementById('assignments-header-title');

    if (subTitleEl) subTitleEl.textContent = activeSubject.title;
    if (headerTitleEl) headerTitleEl.textContent = `${activeSubject.title} Modules`;

    updateSubjectCounters(subjectId);
    renderAccordionList(subjectId);
  };

  const showCatalogView = () => {
    activeSubject = null;
    if (catalogView && moduleView) {
      catalogView.style.display = 'block';
      moduleView.style.display = 'none';
    }
    const headerTitleEl = document.getElementById('assignments-header-title');
    if (headerTitleEl) headerTitleEl.textContent = "Assignments Portal";
    renderCatalogGrid();
  };

  if (backBtn) {
    backBtn.addEventListener('click', showCatalogView);
  }

  // --- RENDER MODULE ACCORDIONS ---
  const renderAccordionList = (subjectId) => {
    if (!accordionContainer) return;
    accordionContainer.innerHTML = '';

    const sub = assignmentsDb[subjectId];
    if (!sub) return;

    sub.modules.forEach((mod, modIdx) => {
      let modQuestionsCount = 0;
      let modSolvedCount = 0;
      if (mod && mod.submodules) {
        mod.submodules.forEach(sm => {
          if (sm && sm.questions) {
            sm.questions.forEach(q => {
              modQuestionsCount++;
              if (q.solved) modSolvedCount++;
            });
          }
        });
      }

      const isModCompleted = modQuestionsCount > 0 && modQuestionsCount === modSolvedCount;

      const item = document.createElement('div');
      item.className = 'module-accordion-item';
      item.id = `accordion-${mod.id}`;

      let badgeHtml = '';
      if (isModCompleted) {
        badgeHtml = `<span class="module-completed-badge" style="display: none;">Completed within ${mod.completedDate}</span>`;
      }

      item.innerHTML = `
        <div class="module-accordion-row-header">
          <div class="module-header-left">
            <div class="module-number-badge">${mod.number}</div>
            <div class="module-accordion-title">${mod.title}</div>
          </div>
          <div class="module-header-right">
            <button class="practice-more-btn" onclick="event.stopPropagation(); alert('Launching practice workspace...')">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <line x1="12" y1="5" x2="12" y2="19"/>
                <line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
              Practice More
            </button>

            <span class="module-info-icon" title="Module Details">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="16" x2="12" y2="12"/>
                <line x1="12" y1="8" x2="12.01" y2="8"/>
              </svg>
            </span>

            <span class="module-practice-badge">
              ${mod.practiceModulesAvailable} Practice Module Available
            </span>

            ${mod.timeTaken !== '0m' ? `<span class="module-time-taken">Time Taken: ${mod.timeTaken}</span>` : ''}
            
            <span class="module-due-badge">
              Past Due Date ${mod.dueDate || '22/12/2025'}
            </span>

            <span class="module-chevron-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </span>
          </div>
        </div>
        <div class="module-accordion-body">
          <div class="submodule-tabs-list" id="tabs-list-${mod.id}"></div>
          <div class="submodule-stats-bar" id="stats-bar-${mod.id}"></div>
          <div class="assignments-table-wrapper">
            <table class="assignments-questions-table">
              <thead>
                <tr>
                  <th>Question</th>
                  <th>Company</th>
                  <th>Difficulty</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody id="questions-tbody-${mod.id}"></tbody>
            </table>
          </div>
        </div>
      `;

      const header = item.querySelector('.module-accordion-row-header');
      if (header) {
        header.addEventListener('click', (e) => {
          if (e.target.closest('.module-info-icon') || e.target.closest('.practice-more-btn')) return;

          const isCurrentlyActive = item.classList.contains('active');
          
          document.querySelectorAll('.module-accordion-item').forEach(el => el.classList.remove('active'));

          if (!isCurrentlyActive) {
            item.classList.add('active');
            
            if (subjectId === 'html' && modIdx === 0) {
              activeSubmoduleTab = 1;
            } else {
              activeSubmoduleTab = 0;
            }
            
            renderExpandedModule(subjectId, modIdx);
          }
        });
      }

      accordionContainer.appendChild(item);
    });
  };

  // --- RENDER EXPANDED MODULE (View 3) ---
  const renderExpandedModule = (subjectId, modIdx) => {
    const sub = assignmentsDb[subjectId];
    if (!sub || !sub.modules) return;
    const mod = sub.modules[modIdx];
    if (!mod) return;
    
    const tabsContainer = document.getElementById(`tabs-list-${mod.id}`);
    if (!tabsContainer) return;
    tabsContainer.innerHTML = '';

    if (mod.submodules) {
      mod.submodules.forEach((subm, subIdx) => {
        const tabBtn = document.createElement('button');
        tabBtn.className = `submodule-tab-btn ${subIdx === activeSubmoduleTab ? 'active' : ''}`;
        tabBtn.textContent = subm.title;
        tabBtn.addEventListener('click', () => {
          activeSubmoduleTab = subIdx;
          renderExpandedModule(subjectId, modIdx);
        });
        tabsContainer.appendChild(tabBtn);
      });
    }

    const statsBar = document.getElementById(`stats-bar-${mod.id}`);
    const activeSubm = mod.submodules ? mod.submodules[activeSubmoduleTab] : null;
    if (!statsBar || !activeSubm) return;

    let totalQ = activeSubm.questions ? activeSubm.questions.length : 0;
    let solvedQ = 0;
    let attemptedQ = 0;
    let marksScored = 0;
    let totalMarks = 0;

    if (activeSubm.questions) {
      activeSubm.questions.forEach(q => {
        totalMarks += q.maxScore;
        if (q.solved) {
          solvedQ++;
          marksScored += q.score;
        }
        if (q.attempts > 0) attemptedQ++;
      });
    }

    statsBar.innerHTML = `
      <span>Attempted <strong>${attemptedQ} / ${totalQ}</strong></span>
      <span>Solved <strong>${solvedQ} / ${totalQ}</strong></span>
      <span>Marks Scored <strong>${marksScored.toFixed(1).replace('.0', '')} / ${totalMarks.toFixed(0)}</strong></span>
    `;

    const tbody = document.getElementById(`questions-tbody-${mod.id}`);
    if (!tbody) return;
    tbody.innerHTML = '';

    if (activeSubm.questions) {
      activeSubm.questions.forEach((q, qIdx) => {
        const tr = document.createElement('tr');
        const isBookmarked = q.bookmarked;

        tr.innerHTML = `
          <td>
            <div class="question-title-cell">
              ${q.solved ? `
                <span class="question-check-icon" style="color: var(--accent-green); margin-right: 2px; display: inline-flex; align-items: center;">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <circle cx="12" cy="12" r="10" fill="var(--accent-green)"/>
                    <path d="M9 12l2 2 4-4" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
                  </svg>
                </span>
              ` : `<span style="width: 18px; display: inline-block; margin-right: 2px;"></span>`}
              
              <button class="question-bookmark-btn ${isBookmarked ? 'bookmarked' : ''}" onclick="toggleBookmark('${subjectId}', ${modIdx}, ${activeSubmoduleTab}, ${qIdx})">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="${isBookmarked ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
                </svg>
              </button>

              <div>
                <div class="question-title-text">${q.title}</div>
                <div class="question-badges-list">
                  <span class="question-badge-pill ${q.type === 'MCQ' ? 'mcq-type' : 'code-type'}">${q.type}</span>
                  <span class="question-badge-pill">Score: ${q.solved ? q.score.toFixed(1).replace('.0', '') : '0'}/${q.maxScore.toFixed(0)}</span>
                  <span class="question-badge-pill">Attempts: ${q.attempts}</span>
                </div>
              </div>
            </div>
          </td>
          <td>
            <span style="color: var(--text-secondary); font-size: 0.8rem;">-</span>
          </td>
          <td>
            <span class="diff-pill ${q.difficulty.toLowerCase()}">${q.difficulty}</span>
          </td>
          <td>
            <button class="${q.solved ? 'btn-action-solved' : 'btn-action-solve'}" onclick="toggleQuestionSolved('${subjectId}', ${modIdx}, ${activeSubmoduleTab}, ${qIdx})">
              ${q.solved ? 'Solved' : 'Solve'}
            </button>
          </td>
        `;

        tbody.appendChild(tr);
      });
    }
  };

  // --- ACTIONS HANDLERS ---
  window.toggleQuestionSolved = (subjectId, modIdx, submIdx, qIdx) => {
    const q = assignmentsDb[subjectId].modules[modIdx].submodules[submIdx].questions[qIdx];
    if (!q) return;

    if (q.solved) {
      q.solved = false;
      q.score = 0;
    } else {
      q.solved = true;
      q.attempts = (q.attempts || 0) + 1;
      q.score = q.maxScore;

      const mod = assignmentsDb[subjectId].modules[modIdx];
      let modQuestionsCount = 0;
      let modSolvedCount = 0;
      if (mod && mod.submodules) {
        mod.submodules.forEach(sm => {
          if (sm && sm.questions) {
            sm.questions.forEach(quest => {
              modQuestionsCount++;
              if (quest.solved) modSolvedCount++;
            });
          }
        });
      }

      if (modQuestionsCount === modSolvedCount) {
        const today = new Date();
        const d = String(today.getDate()).padStart(2, '0');
        const m = String(today.getMonth() + 1).padStart(2, '0');
        const y = today.getFullYear();
        mod.completedDate = `${d}/${m}/${y}`;
        if (mod.timeTaken === '0m') {
          mod.timeTaken = '10m';
        }
      }
    }

    recalculateAndSave();
    renderExpandedModule(subjectId, modIdx);
  };

  window.toggleBookmark = (subjectId, modIdx, submIdx, qIdx) => {
    const q = assignmentsDb[subjectId].modules[modIdx].submodules[submIdx].questions[qIdx];
    if (!q) return;

    q.bookmarked = !q.bookmarked;
    recalculateAndSave();
    renderExpandedModule(subjectId, modIdx);
  };

  if (searchInput) {
    searchInput.addEventListener('input', renderCatalogGrid);
  }

  // Initialize
  updateGlobalCounters();
  renderCatalogGrid();
});
