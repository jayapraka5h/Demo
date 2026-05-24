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

  // --- TESTS DATABASE & MOCK QUESTIONS ---
  const defaultTopics = [
    { id: 'hll', title: 'Evolution of HLL', category: 'java-quiz' },
    { id: 'oop', title: 'Object Orientation', category: 'java-quiz' },
    { id: 'main-method', title: 'Main Method', category: 'java-quiz' },
    { id: 'pattern-prog', title: 'Pattern Programming', category: 'programming' },
    { id: 'datatypes', title: 'DataTypes', category: 'java-quiz' },
    { id: 'operators', title: 'Operators', category: 'java-quiz' },
    { id: 'arrays', title: 'Arrays', category: 'programming' },
    { id: 'strings', title: 'Strings', category: 'java-quiz' },
    { id: 'method-overload', title: 'Method overloading', category: 'java-quiz' },
    { id: 'encapsulation', title: 'Encapsulation', category: 'java-quiz' },
    { id: 'constructors', title: 'Constructors', category: 'java-quiz' },
    { id: 'static', title: 'Static', category: 'java-quiz' }
  ];

  const quizQuestions = {
    'datatypes': [
      {
        q: "Which data type is used to create a variable that should store text in Java?",
        options: ["string", "char", "String", "text"],
        answer: 2
      },
      {
        q: "What is the size of double variable in Java?",
        options: ["16 bit", "32 bit", "64 bit", "8 bit"],
        answer: 2
      },
      {
        q: "What is the default value of short variable in Java?",
        options: ["0", "0.0", "null", "undefined"],
        answer: 0
      }
    ],
    'oop': [
      {
        q: "Which of the following is not an OOP concept in Java?",
        options: ["Inheritance", "Polymorphism", "Compilation", "Encapsulation"],
        answer: 2
      },
      {
        q: "What is inheritance?",
        options: ["Creating a new class from an existing class", "Hiding implementation details", "Creating multiple forms", "Allocating memory"],
        answer: 0
      },
      {
        q: "Which keyword is used to inherit a class in Java?",
        options: ["implements", "inherits", "extends", "super"],
        answer: 2
      }
    ]
  };

  // Fallback default questions for topics without explicit databases
  const defaultMockQuestions = [
    {
      q: "What is the primary feature of this topic in Java development?",
      options: ["Memory optimization", "Code reusability", "Syntax efficiency", "All of the above"],
      answer: 3
    },
    {
      q: "Which keyword is primarily associated with this compiler routine?",
      options: ["this", "super", "static", "void"],
      answer: 2
    },
    {
      q: "What is the standard return type for main entry points?",
      options: ["int", "void", "String", "boolean"],
      answer: 1
    }
  ];

  // Load or seed catalog database
  const getTopics = () => {
    const stored = localStorage.getItem('demo_topic_tests_list');
    if (stored) return JSON.parse(stored);
    localStorage.setItem('demo_topic_tests_list', JSON.stringify(defaultTopics));
    return defaultTopics;
  };

  const getAttempts = () => {
    const stored = localStorage.getItem('demo_topic_attempts');
    if (stored) return JSON.parse(stored);
    // Seed some initial attempt history for a realistic look
    const initialAttempts = {
      'hll': [{ attempt: 1, score: 70, date: '2026-05-10 14:30', passed: true }],
      'main-method': [{ attempt: 1, score: 100, date: '2026-05-12 11:15', passed: true }],
      'operators': [{ attempt: 1, score: 80, date: '2026-05-18 16:45', passed: true }]
    };
    localStorage.setItem('demo_topic_attempts', JSON.stringify(initialAttempts));
    return initialAttempts;
  };

  let topicsDatabase = getTopics();
  let attemptsDatabase = getAttempts();

  // --- ELEMENT SELECTORS ---
  const categoriesView = document.getElementById('tests-categories-view');
  const gridView = document.getElementById('tests-grid-view');
  const testsGrid = document.getElementById('tests-grid');
  const categoryJavaCard = document.getElementById('cat-java-quiz');
  const categoryProgCard = document.getElementById('cat-programming');
  const testsBackBtn = document.getElementById('tests-back-btn');
  const testsCategoryTitle = document.getElementById('tests-category-title');

  // Quiz Modal elements
  const quizModal = document.getElementById('quiz-modal');
  const quizModalTitle = document.getElementById('quiz-modal-title');
  const quizPlayPanel = document.getElementById('quiz-play-panel');
  const quizResultPanel = document.getElementById('quiz-result-panel');
  const quizQuestionNumText = document.getElementById('quiz-question-num');
  const quizQuestionText = document.getElementById('quiz-question-text');
  const quizOptionsList = document.getElementById('quiz-options-list');
  
  // Quiz controls
  const btnQuizCancel = document.getElementById('btn-quiz-cancel');
  const btnQuizNext = document.getElementById('btn-quiz-next');
  const btnQuizSubmit = document.getElementById('btn-quiz-submit');
  const btnQuizClose = document.getElementById('btn-quiz-close');
  const quizCloseBtn = document.getElementById('quiz-close-btn');
  const quizResultScore = document.getElementById('quiz-result-score');
  const quizResultFeedback = document.getElementById('quiz-result-feedback');

  // History Modal elements
  const historyModal = document.getElementById('history-modal');
  const historyTableContainer = document.getElementById('history-table-container');
  const historyCloseBtn = document.getElementById('history-close-btn');
  const btnHistoryClose = document.getElementById('btn-history-close');

  let activeCategory = '';
  let activeQuizTopic = null;
  let currentQuestions = [];
  let currentQuestionIndex = 0;
  let userAnswers = [];

  // --- VIEW TOGGLES ---
  const showGridView = (category) => {
    activeCategory = category;
    if (categoriesView && gridView) {
      categoriesView.style.display = 'none';
      gridView.style.display = 'block';
    }

    if (testsCategoryTitle) {
      testsCategoryTitle.textContent = category === 'java-quiz' ? 'Java Quiz Tests' : 'Programming Tests';
    }

    renderTestsGrid();
  };

  const showCategoriesView = () => {
    if (categoriesView && gridView) {
      categoriesView.style.display = 'block';
      gridView.style.display = 'none';
    }
  };

  if (categoryJavaCard) {
    categoryJavaCard.addEventListener('click', () => showGridView('java-quiz'));
  }
  if (categoryProgCard) {
    categoryProgCard.addEventListener('click', () => showGridView('programming'));
  }
  if (testsBackBtn) {
    testsBackBtn.addEventListener('click', showCategoriesView);
  }

  // --- RENDER TOPIC TESTS GRID ---
  const renderTestsGrid = () => {
    if (!testsGrid) return;
    testsGrid.innerHTML = '';

    const filtered = topicsDatabase.filter(t => t.category === activeCategory);

    filtered.forEach(topic => {
      const attempts = attemptsDatabase[topic.id] || [];
      const hasTaken = attempts.length > 0;
      const lastAttempt = hasTaken ? attempts[attempts.length - 1] : null;

      const card = document.createElement('div');
      card.className = 'test-topic-card';

      // Title & Score Badge
      let scoreBadgeHtml = '';
      if (lastAttempt) {
        scoreBadgeHtml = `<div class="test-card-score-badge">Last Score: ${lastAttempt.score}%</div>`;
      }

      card.innerHTML = `
        <div class="test-card-header">
          <div class="test-icon-circle">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
              <line x1="16" y1="13" x2="8" y2="13"/>
              <line x1="16" y1="17" x2="8" y2="17"/>
              <polyline points="10 9 9 9 8 9"/>
            </svg>
          </div>
          <div>
            <h3>${topic.title}</h3>
            ${scoreBadgeHtml}
          </div>
        </div>
        <div class="test-card-actions">
          <button class="btn-outline" onclick="openHistoryModal('${topic.id}')">View History</button>
          <button class="btn-action-fill" onclick="startQuiz('${topic.id}')">
            ${hasTaken ? 'Retake Test' : 'Take Test'}
          </button>
        </div>
      `;

      testsGrid.appendChild(card);
    });
  };

  // --- INTERACTIVE MCQ QUIZ PLAY ---
  window.startQuiz = (topicId) => {
    activeQuizTopic = topicsDatabase.find(t => t.id === topicId);
    if (!activeQuizTopic) return;

    // Load questions (explicit or fallback default)
    currentQuestions = quizQuestions[topicId] || defaultMockQuestions;
    currentQuestionIndex = 0;
    userAnswers = Array(currentQuestions.length).fill(null);

    // Setup modal view
    if (quizModalTitle) quizModalTitle.textContent = `Topic Test: ${activeQuizTopic.title}`;
    if (quizPlayPanel && quizResultPanel) {
      quizPlayPanel.style.display = 'block';
      quizResultPanel.style.display = 'none';
    }

    // Toggle footer control buttons
    if (btnQuizCancel && btnQuizNext && btnQuizSubmit && btnQuizClose) {
      btnQuizCancel.style.display = 'block';
      btnQuizNext.style.display = 'block';
      btnQuizSubmit.style.display = 'none';
      btnQuizClose.style.display = 'none';
    }

    loadQuestion();
    toggleQuizModal(true);
  };

  const loadQuestion = () => {
    if (currentQuestionIndex >= currentQuestions.length) return;
    const qData = currentQuestions[currentQuestionIndex];

    if (quizQuestionNumText) {
      quizQuestionNumText.textContent = `Question ${currentQuestionIndex + 1} of ${currentQuestions.length}`;
    }
    if (quizQuestionText) {
      quizQuestionText.textContent = qData.q;
    }

    if (quizOptionsList) {
      quizOptionsList.innerHTML = '';
      qData.options.forEach((opt, optIdx) => {
        const optionLabel = document.createElement('label');
        optionLabel.className = 'quiz-option-label';
        
        const isChecked = userAnswers[currentQuestionIndex] === optIdx;
        if (isChecked) optionLabel.classList.add('selected');

        optionLabel.innerHTML = `
          <input type="radio" name="quiz-radio-option" value="${optIdx}" ${isChecked ? 'checked' : ''}>
          <span class="quiz-option-text">${opt}</span>
        `;

        optionLabel.addEventListener('click', () => {
          // Select radio
          const radio = optionLabel.querySelector('input[type="radio"]');
          if (radio) radio.checked = true;
          
          // Toggle styling class
          document.querySelectorAll('.quiz-option-label').forEach(lbl => lbl.classList.remove('selected'));
          optionLabel.classList.add('selected');
          
          // Save answer
          userAnswers[currentQuestionIndex] = optIdx;
        });

        quizOptionsList.appendChild(optionLabel);
      });
    }

    // Update buttons at the last question
    if (currentQuestionIndex === currentQuestions.length - 1) {
      if (btnQuizNext) btnQuizNext.style.display = 'none';
      if (btnQuizSubmit) btnQuizSubmit.style.display = 'block';
    } else {
      if (btnQuizNext) btnQuizNext.style.display = 'block';
      if (btnQuizSubmit) btnQuizSubmit.style.display = 'none';
    }
  };

  const toggleQuizModal = (show) => {
    if (!quizModal) return;
    if (show) {
      quizModal.classList.add('open');
    } else {
      quizModal.classList.remove('open');
    }
  };

  if (btnQuizNext) {
    btnQuizNext.addEventListener('click', () => {
      // Validate option selected
      if (userAnswers[currentQuestionIndex] === null) {
        alert("Please select an answer to proceed!");
        return;
      }
      currentQuestionIndex++;
      loadQuestion();
    });
  }

  if (btnQuizSubmit) {
    btnQuizSubmit.addEventListener('click', () => {
      // Validate option selected
      if (userAnswers[currentQuestionIndex] === null) {
        alert("Please select an answer to submit!");
        return;
      }

      // Calculate score percentage
      let correctAnswers = 0;
      currentQuestions.forEach((q, idx) => {
        if (userAnswers[idx] === q.answer) {
          correctAnswers++;
        }
      });
      const score = Math.round((correctAnswers / currentQuestions.length) * 100);
      const passed = score >= 60;

      // Save to localStorage database attempts list
      const topicId = activeQuizTopic.id;
      if (!attemptsDatabase[topicId]) {
        attemptsDatabase[topicId] = [];
      }

      const attemptNum = attemptsDatabase[topicId].length + 1;
      const today = new Date();
      const dateString = today.toISOString().replace('T', ' ').substring(0, 16);

      attemptsDatabase[topicId].push({
        attempt: attemptNum,
        score,
        date: dateString,
        passed
      });

      localStorage.setItem('demo_topic_attempts', JSON.stringify(attemptsDatabase));

      // Show Result screen
      if (quizPlayPanel && quizResultPanel) {
        quizPlayPanel.style.display = 'none';
        quizResultPanel.style.display = 'block';
      }

      if (quizResultScore) quizResultScore.textContent = `${score}%`;
      if (quizResultFeedback) {
        if (passed) {
          quizResultFeedback.textContent = "Congratulations! You passed this topic test successfully.";
          quizResultFeedback.style.color = 'var(--accent-green)';
        } else {
          quizResultFeedback.textContent = "You scored below 60%. Study the lesson guidelines and try again!";
          quizResultFeedback.style.color = 'var(--accent-red)';
        }
      }

      // Toggles button visibility
      if (btnQuizCancel && btnQuizNext && btnQuizSubmit && btnQuizClose) {
        btnQuizCancel.style.display = 'none';
        btnQuizNext.style.display = 'none';
        btnQuizSubmit.style.display = 'none';
        btnQuizClose.style.display = 'block';
      }

      // Update the tests grid catalog
      renderTestsGrid();
    });
  }

  if (btnQuizCancel) btnQuizCancel.addEventListener('click', () => toggleQuizModal(false));
  if (quizCloseBtn) quizCloseBtn.addEventListener('click', () => toggleQuizModal(false));
  if (btnQuizClose) btnQuizClose.addEventListener('click', () => toggleQuizModal(false));

  // --- ATTEMPT HISTORY LOOKUP ENGINE ---
  window.openHistoryModal = (topicId) => {
    const topic = topicsDatabase.find(t => t.id === topicId);
    if (!topic) return;

    if (historyModalTitle) historyModalTitle.textContent = `Attempt History: ${topic.title}`;
    
    const attempts = attemptsDatabase[topicId] || [];

    if (historyTableContainer) {
      if (attempts.length === 0) {
        historyTableContainer.innerHTML = `
          <div style="padding: 24px; text-align: center; color: var(--text-secondary);">
            No attempts recorded for this topic yet. Click "Take Test" to start!
          </div>
        `;
      } else {
        let rowsHtml = '';
        attempts.forEach(a => {
          rowsHtml += `
            <tr>
              <td>Attempt #${a.attempt}</td>
              <td style="font-weight: 700; color: ${a.passed ? 'var(--accent-green)' : 'var(--accent-red)'};">${a.score}%</td>
              <td>${a.date}</td>
              <td>
                <span class="history-status-badge ${a.passed ? 'passed' : 'failed'}">
                  ${a.passed ? 'Passed' : 'Failed'}
                </span>
              </td>
            </tr>
          `;
        });

        historyTableContainer.innerHTML = `
          <table class="history-table">
            <thead>
              <tr>
                <th>Attempt</th>
                <th>Score</th>
                <th>Date/Time</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              ${rowsHtml}
            </tbody>
          </table>
        `;
      }
    }

    toggleHistoryModal(true);
  };

  const toggleHistoryModal = (show) => {
    if (!historyModal) return;
    if (show) {
      historyModal.classList.add('open');
    } else {
      historyModal.classList.remove('open');
    }
  };

  if (historyCloseBtn) historyCloseBtn.addEventListener('click', () => toggleHistoryModal(false));
  if (btnHistoryClose) btnHistoryClose.addEventListener('click', () => toggleHistoryModal(false));

  // --- FLOAT CHAT DEMO ENGINE ---
  const chatBubbleBtn = document.getElementById('chat-bubble-btn');
  const chatWindow = document.getElementById('chat-window');
  if (chatBubbleBtn && chatWindow) {
    chatBubbleBtn.addEventListener('click', () => {
      chatWindow.classList.toggle('open');
    });
  }

  // Initialize view
  showCategoriesView();
});
