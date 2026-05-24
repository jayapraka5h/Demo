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
      let response = "I can help you review your company interview practice cards, filter questions by status, or mark your favorite companies!";
      const lower = text.toLowerCase();
      if (lower.includes('zoho')) {
        response = "Your Zoho practice module is 100% completed. Great job! It covers Core Java, SQL, and general Programming questions.";
      } else if (lower.includes('agile')) {
        response = "Agile Point practice is currently at 42% completion. Open the details view to solve more challenges!";
      } else if (lower.includes('favorite') || lower.includes('like')) {
        response = "Click the heart outline icon on any company card to save it to your Favorites tab for quick access.";
      } else if (lower.includes('admin') || lower.includes('upload')) {
        response = "Toggle 'Admin Mode' in the detail header to access PDF uploading and challenge addition panels!";
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

  // --- SEED DATABASE ENGINE ---
  const defaultCompanies = [
    { 
      id: 'zoho', 
      name: 'Zoho', 
      initials: 'Z', 
      logoColor: 'linear-gradient(135deg, #ea580c, #f97316)', 
      progress: 100, 
      isFavorite: false,
      items: [
        { id: 'zoho-pdf-1', type: 'pdf', title: 'Zoho Placement Interview Prep Guide', pages: 12, bookmarked: false },
        { id: 'zoho-q-1', type: 'challenge', title: 'Matrix multiplication', attempts: 1, score: 100, bookmarked: false, solved: true, instructions: 'Given two matrices A and B, compute their product. Return the resulting matrix.' },
        { id: 'zoho-q-2', type: 'challenge', title: 'Valid bracket sequences', attempts: 2, score: 100, bookmarked: false, solved: true, instructions: 'Verify if a string of parentheses is balanced. Return true or false.' },
        { id: 'zoho-q-3', type: 'challenge', title: 'Group anagrams in O(N)', attempts: 1, score: 100, bookmarked: false, solved: true, instructions: 'Group an array of strings into sub-lists containing anagrams.' }
      ]
    },
    { 
      id: 'virtusa', 
      name: 'Virtusa', 
      initials: 'V', 
      logoColor: 'linear-gradient(135deg, #2563eb, #3b82f6)', 
      progress: 0, 
      isFavorite: false,
      items: [
        { id: 'virtusa-pdf-1', type: 'pdf', title: 'Virtusa Placement Paper', pages: 10, bookmarked: false },
        { id: 'virtusa-q-1', type: 'challenge', title: 'Check Palindrome string', attempts: 0, score: 0, bookmarked: false, solved: false, instructions: 'Check if a string reads the same backwards. Return boolean.' },
        { id: 'virtusa-q-2', type: 'challenge', title: 'Array duplicate search', attempts: 0, score: 0, bookmarked: false, solved: false, instructions: 'Find if any element appears at least twice in an integer array.' },
        { id: 'virtusa-q-3', type: 'challenge', title: 'CSS grid layout columns', attempts: 0, score: 0, bookmarked: false, solved: false, instructions: 'Determine correct CSS grid properties to render responsive columns.' }
      ]
    },
    { 
      id: 'agilepoint', 
      name: 'Agile Point', 
      initials: 'AP', 
      logoColor: 'linear-gradient(135deg, #0d9488, #14b8a6)', 
      progress: 42, 
      isFavorite: false,
      items: [
        { id: 'agile-pdf-1', type: 'pdf', title: 'Agile Point Mock Syllabus', pages: 7, bookmarked: false },
        { id: 'agile-q-1', type: 'challenge', title: 'Recursion trace permutation', attempts: 2, score: 100, bookmarked: false, solved: true, instructions: 'Output all string permutations using stack recursion.' },
        { id: 'agile-q-2', type: 'challenge', title: 'Validate Binary Tree', attempts: 1, score: 25, bookmarked: false, solved: false, instructions: 'Verify if a binary tree structure qualifies as a BST.' },
        { id: 'agile-q-3', type: 'challenge', title: 'JSON parsing array extraction', attempts: 0, score: 0, bookmarked: false, solved: false, instructions: 'Extract values matching key inside complex nested JSON objects.' }
      ]
    },
    { 
      id: 'baryons', 
      name: 'Baryons', 
      initials: 'B', 
      logoColor: 'linear-gradient(135deg, #7c3aed, #8b5cf6)', 
      progress: 0, 
      isFavorite: false,
      items: [
        { id: 'baryons-pdf-1', type: 'pdf', title: 'Baryons Logical Questions', pages: 3, bookmarked: false },
        { id: 'baryons-q-1', type: 'challenge', title: 'Validate email pattern', attempts: 0, score: 0, bookmarked: false, solved: false, instructions: 'Verify email strings against standard regex formatting.' },
        { id: 'baryons-q-2', type: 'challenge', title: 'Find missing number in array', attempts: 0, score: 0, bookmarked: false, solved: false, instructions: 'Find the single missing integer from sequential range 1 to N.' }
      ]
    },
    { 
      id: 'thoughtscrest', 
      name: 'ThoughtsCrest', 
      initials: 'TC', 
      logoColor: 'linear-gradient(135deg, #db2777, #ec4899)', 
      progress: 0, 
      isFavorite: false,
      items: [
        { id: 'tc-pdf-1', type: 'pdf', title: 'ThoughtsCrest Placement Prep Guide', pages: 4, bookmarked: false },
        { id: 'tc-q-1', type: 'challenge', title: 'Binary Search Tree insert', attempts: 0, score: 0, bookmarked: false, solved: false, instructions: 'Insert key into BST keeping properties correct.' },
        { id: 'tc-q-2', type: 'challenge', title: 'SQL Query grouping', attempts: 0, score: 0, bookmarked: false, solved: false, instructions: 'Select salaries aggregated by department matching condition.' }
      ]
    },
    { 
      id: 'technorishi', 
      name: 'TechnoRishi', 
      initials: 'TR', 
      logoColor: 'linear-gradient(135deg, #e11d48, #f43f5e)', 
      progress: 0, 
      isFavorite: false,
      items: [
        { id: 'tr-pdf-1', type: 'pdf', title: 'TechnoRishi Java Core Syllabus', pages: 6, bookmarked: false },
        { id: 'tr-q-1', type: 'challenge', title: 'Method Overriding Permutations', attempts: 0, score: 0, bookmarked: false, solved: false, instructions: 'Determine override output sequence for inheritance hierarchies.' },
        { id: 'tr-q-2', type: 'challenge', title: 'HTML form serialization', attempts: 0, score: 0, bookmarked: false, solved: false, instructions: 'Collect form inputs and map them into URL query parameter formats.' }
      ]
    },
    { 
      id: 'karplexus', 
      name: 'KARPLEXUS', 
      initials: 'K', 
      logoColor: 'linear-gradient(135deg, #059669, #10b981)', 
      progress: 0, 
      isFavorite: false,
      items: [
        { id: 'kar-pdf-1', type: 'pdf', title: 'KARPLEXUS Prep Sheet', pages: 8, bookmarked: false },
        { id: 'kar-q-1', type: 'challenge', title: 'Linked List Intersection', attempts: 0, score: 0, bookmarked: false, solved: false, instructions: 'Find meeting node of two intersecting linked lists.' },
        { id: 'kar-q-2', type: 'challenge', title: 'SQL Join optimization', attempts: 0, score: 0, bookmarked: false, solved: false, instructions: 'Rewrite slow subqueries into optimized INNER JOINS.' }
      ]
    },
    { 
      id: 'xploria', 
      name: 'XPLORIA', 
      initials: 'X', 
      logoColor: 'linear-gradient(135deg, #0891b2, #06b6d4)', 
      progress: 0, 
      isFavorite: false,
      items: [
        { id: 'xp-pdf-1', type: 'pdf', title: 'XPLORIA Front-End Preparation', pages: 5, bookmarked: false },
        { id: 'xp-q-1', type: 'challenge', title: 'HTML5 video controller', attempts: 0, score: 0, bookmarked: false, solved: false, instructions: 'Trigger play/pause on HTML5 media elements via Javascript.' },
        { id: 'xp-q-2', type: 'challenge', title: 'Flexbox spacing alignments', attempts: 0, score: 0, bookmarked: false, solved: false, instructions: 'Set flex properties to align items symmetrically in columns.' }
      ]
    },
    { 
      id: 'thoughtmakes-ai', 
      name: 'ThoughtMakes AI', 
      initials: 'TA', 
      logoColor: 'linear-gradient(135deg, #4f46e5, #6366f1)', 
      progress: 0, 
      isFavorite: false,
      items: [
        { id: 'tm-pdf-1', type: 'pdf', title: 'Thoughtmakes Technologies', pages: 5, bookmarked: false },
        { id: 'tm-q-1', type: 'challenge', title: 'Valid Password', attempts: 0, score: 0, bookmarked: false, solved: false, instructions: 'Complete password check validating 8+ letters, digits, and symbols.' },
        { id: 'tm-q-2', type: 'challenge', title: 'Repeating Characters', attempts: 0, score: 0, bookmarked: false, solved: false, instructions: 'Extract repeating character sets from parsed strings.' },
        { id: 'tm-q-3', type: 'challenge', title: 'Count of Characters after Each Word', attempts: 0, score: 0, bookmarked: false, solved: false, instructions: 'Measure character splits separating space boundaries in paragraphs.' }
      ]
    }
  ];

  const getCompaniesData = () => {
    const stored = localStorage.getItem('demo_companies_data');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Verify items exist
          if (parsed[0].items) return parsed;
        }
      } catch (e) {
        console.error("Error parsing stored companies. Re-seeding database.", e);
      }
    }
    localStorage.setItem('demo_companies_data', JSON.stringify(defaultCompanies));
    return defaultCompanies;
  };

  const saveCompaniesData = (data) => {
    localStorage.setItem('demo_companies_data', JSON.stringify(data));
  };

  let companies = getCompaniesData();
  let currentTab = 'all'; // 'all' or 'favorites'
  let activeCompanyId = null;
  let activeChallengeId = null;

  // --- DOM SELECTORS ---
  const listViewContainer = document.getElementById('companies-list-view');
  const detailViewContainer = document.getElementById('company-detail-view');
  const gridContainer = document.getElementById('companies-grid');
  const detailListContainer = document.getElementById('company-detail-list');
  const detailTitle = document.getElementById('company-detail-title');
  const btnBack = document.getElementById('btn-back-to-companies');

  const searchInput = document.getElementById('company-search');
  const btnToggleFilters = document.getElementById('btn-toggle-filters');
  const filtersPane = document.getElementById('filters-dropdown-pane');

  const tabAll = document.getElementById('tab-all-companies');
  const tabFav = document.getElementById('tab-fav-companies');

  // Checkboxes
  const chkCompleted = document.getElementById('filter-status-completed');
  const chkProgress = document.getElementById('filter-status-progress');
  const chkNotStarted = document.getElementById('filter-status-notstarted');

  // Admin Elements
  const adminModeToggle = document.getElementById('admin-mode-toggle');
  const adminActionsBanner = document.getElementById('admin-actions-banner');
  const btnAdminUploadPdf = document.getElementById('btn-admin-upload-pdf');
  const btnAdminAddChallenge = document.getElementById('btn-admin-add-challenge');

  // Modals
  const modalViewPdf = document.getElementById('modal-view-pdf');
  const pdfModalTitle = document.getElementById('pdf-modal-title');
  const btnClosePdfModal = document.getElementById('btn-close-pdf-modal');
  const btnDoneViewPdf = document.getElementById('btn-done-view-pdf');

  const modalSolveChallenge = document.getElementById('modal-solve-challenge');
  const challengeModalTitle = document.getElementById('challenge-modal-title');
  const challengeInstructionsText = document.getElementById('challenge-instructions-text');
  const challengeCodeEditor = document.getElementById('challenge-code-editor');
  const compilerOutputBox = document.getElementById('compiler-output-box');
  const btnCloseChallengeModal = document.getElementById('btn-close-challenge-modal');
  const btnRunCode = document.getElementById('btn-run-code');
  const btnSubmitSolution = document.getElementById('btn-submit-solution');

  const modalAdminUpload = document.getElementById('modal-admin-upload');
  const adminPdfTitle = document.getElementById('admin-pdf-title');
  const adminPdfPages = document.getElementById('admin-pdf-pages');
  const adminPdfFileSelector = document.getElementById('admin-pdf-file-selector');
  const adminPdfFileSelectedName = document.getElementById('admin-pdf-file-selected-name');
  const btnCloseUploadModal = document.getElementById('btn-close-upload-modal');
  const btnCancelUpload = document.getElementById('btn-cancel-upload');
  const btnSubmitUpload = document.getElementById('btn-submit-upload');

  const modalAdminChallenge = document.getElementById('modal-admin-challenge');
  const adminChallengeTitle = document.getElementById('admin-challenge-title');
  const adminChallengeInstructions = document.getElementById('admin-challenge-instructions');
  const btnCloseAddChallengeModal = document.getElementById('btn-close-add-challenge-modal');
  const btnCancelChallenge = document.getElementById('btn-cancel-challenge');
  const btnSubmitChallenge = document.getElementById('btn-submit-challenge');

  // Toggle Filters Dropdown Panel with animation
  const openDropdown = (el) => {
    if (!el) return;
    el.classList.remove('hidden');
    // allow next frame to apply open for transition
    requestAnimationFrame(() => el.classList.add('open'));
  };

  const closeDropdown = (el) => {
    if (!el) return;
    el.classList.remove('open');
    const removeHidden = () => {
      el.classList.add('hidden');
      el.removeEventListener('transitionend', removeHidden);
    };
    el.addEventListener('transitionend', removeHidden);
  };

  // expose shared helpers globally so other pages can reuse identical animation
  window.demoFilters = window.demoFilters || {};
  window.demoFilters.openDropdown = openDropdown;
  window.demoFilters.closeDropdown = closeDropdown;

  if (btnToggleFilters && filtersPane) {
    btnToggleFilters.addEventListener('click', (e) => {
      e.stopPropagation();
      if (filtersPane.classList.contains('hidden')) openDropdown(filtersPane);
      else closeDropdown(filtersPane);
    });

    // Close when clicking outside
    document.addEventListener('click', (evt) => {
      const target = evt.target;
      if (!filtersPane.contains(target) && target !== btnToggleFilters) {
        if (!filtersPane.classList.contains('hidden')) closeDropdown(filtersPane);
      }
    });
  }

  // --- RE-CALCULATE PROGRESS ---
  const recalculateProgress = (company) => {
    if (!company.items) return;
    const challenges = company.items.filter(item => item.type === 'challenge');
    if (challenges.length === 0) {
      company.progress = 0;
      return;
    }
    const solvedCount = challenges.filter(c => c.solved).length;
    company.progress = Math.round((solvedCount / challenges.length) * 100);
  };

  // --- VIEW DETAILS FOR A COMPANY ---
  const showCompanyDetails = (companyId) => {
    const comp = companies.find(c => c.id === companyId);
    if (!comp) return;

    activeCompanyId = companyId;
    
    // Set headers
    if (detailTitle) detailTitle.textContent = comp.name;

    // View Swapping
    if (listViewContainer) listViewContainer.style.display = 'none';
    if (detailViewContainer) detailViewContainer.style.display = 'block';

    renderDetailRows();
  };

  if (btnBack) {
    btnBack.addEventListener('click', () => {
      activeCompanyId = null;
      if (listViewContainer) listViewContainer.style.display = 'block';
      if (detailViewContainer) detailViewContainer.style.display = 'none';
      renderCompanies();
    });
  }

  // --- ADMIN MODE TOGGLING ---
  if (adminModeToggle) {
    adminModeToggle.addEventListener('change', () => {
      if (adminModeToggle.checked) {
        if (adminActionsBanner) adminActionsBanner.classList.remove('hidden');
      } else {
        if (adminActionsBanner) adminActionsBanner.classList.add('hidden');
      }
    });
  }

  // --- RENDERING DETAIL ROWS ---
  const renderDetailRows = () => {
    if (!detailListContainer || !activeCompanyId) return;
    detailListContainer.innerHTML = '';

    const comp = companies.find(c => c.id === activeCompanyId);
    if (!comp || !comp.items) return;

    comp.items.forEach(item => {
      const card = document.createElement('div');
      card.className = 'detail-row-card';

      const bookmarkIcon = item.bookmarked 
        ? `<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" class="bookmark-icon-btn bookmarked" data-id="${item.id}"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>`
        : `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" class="bookmark-icon-btn" data-id="${item.id}"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>`;

      if (item.type === 'pdf') {
        // PDF SVG layout (red PDF graphic)
        const pdfSVG = `
          <svg width="34" height="42" viewBox="0 0 42 52" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 6C0 2.68629 2.68629 0 6 0H26L42 16V46C42 49.3137 39.3137 52 36 52H6C2.68629 52 0 49.3137 0 46V6Z" fill="#E11D48"/>
            <path d="M26 0V10C26 13.3137 28.6863 16 32 16H42L26 0Z" fill="#F43F5E"/>
            <text x="50%" y="72%" dominant-baseline="middle" text-anchor="middle" fill="white" font-family="sans-serif" font-weight="900" font-size="10">PDF</text>
          </svg>
        `;

        card.innerHTML = `
          <div class="detail-row-left">
            <div class="detail-row-icon pdf-type">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
                <polyline points="10 9 9 9 8 9"/>
              </svg>
            </div>
            <div>
              <div class="detail-row-title-container">
                <span class="detail-row-title">${item.title}</span>
                ${bookmarkIcon}
              </div>
              <span class="detail-row-info">Pages: ${item.pages}</span>
            </div>
          </div>
          <div class="detail-row-right">
            <div style="margin-right: 12px; display: flex; align-items: center;">${pdfSVG}</div>
            <button class="practice-more-btn btn-view-pdf" data-id="${item.id}" style="padding: 10px 20px; font-weight: 600;">View PDF</button>
          </div>
        `;

      } else {
        // Challenge Row Layout (verified circle check next to title)
        const checkCircleSVG = `
          <span class="verified-gold-icon" title="Approved Challenge">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <circle cx="12" cy="12" r="10" fill="#fbbf24"/>
              <polyline points="8 12 11 15 16 9" fill="none" stroke="#090D16" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </span>
        `;

        card.innerHTML = `
          <div class="detail-row-left">
            <div class="detail-row-icon challenge-type">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="16 18 22 12 16 6"/>
                <polyline points="8 6 2 12 8 18"/>
              </svg>
            </div>
            <div>
              <div class="detail-row-title-container">
                <span class="detail-row-title">${item.title}</span>
                ${checkCircleSVG}
                ${bookmarkIcon}
              </div>
              <span class="detail-row-info">Attempts: ${item.attempts}</span>
            </div>
          </div>
          <div class="detail-row-middle">
            <span class="detail-progress-label">Marks Scored:</span>
            <div class="row-progress-bar-bg">
              <div class="row-progress-bar-fill" style="width: ${item.score}%"></div>
            </div>
            <span class="detail-progress-label" style="font-weight: 600; width: 35px; text-align: right;">${item.score}%</span>
          </div>
          <div class="detail-row-right">
            <button class="practice-more-btn btn-solve-challenge" data-id="${item.id}" style="padding: 10px 20px; font-weight: 600;">Solve Challenge</button>
          </div>
        `;
      }

      // Bookmark action listener
      const btnBkmk = card.querySelector('.bookmark-icon-btn');
      if (btnBkmk) {
        btnBkmk.addEventListener('click', (e) => {
          e.stopPropagation();
          const targetId = btnBkmk.getAttribute('data-id');
          const rowItem = comp.items.find(i => i.id === targetId);
          if (rowItem) {
            rowItem.bookmarked = !rowItem.bookmarked;
            saveCompaniesData(companies);
            renderDetailRows();
          }
        });
      }

      // View PDF listener
      const btnView = card.querySelector('.btn-view-pdf');
      if (btnView) {
        btnView.addEventListener('click', () => {
          if (modalViewPdf) {
            if (pdfModalTitle) pdfModalTitle.textContent = `${item.title}.pdf`;
            modalViewPdf.classList.remove('hidden');
          }
        });
      }

      // Solve Challenge listener
      const btnSolve = card.querySelector('.btn-solve-challenge');
      if (btnSolve) {
        btnSolve.addEventListener('click', () => {
          activeChallengeId = item.id;
          if (modalSolveChallenge) {
            if (challengeModalTitle) challengeModalTitle.textContent = `Solve: ${item.title}`;
            if (challengeInstructionsText) challengeInstructionsText.textContent = item.instructions || 'Implement solution following standard parameters.';
            
            // Seed sample code
            if (challengeCodeEditor) {
              challengeCodeEditor.value = `// Solve Challenge: ${item.title}\n// Language: Java\n\npublic class Solution {\n    public static void main(String[] args) {\n        System.out.println("Processing output...");\n    }\n}`;
            }
            if (compilerOutputBox) {
              compilerOutputBox.textContent = 'Workspace loaded. Ready to run test cases...';
              compilerOutputBox.style.color = '#cbd5e1';
            }
            modalSolveChallenge.classList.remove('hidden');
          }
        });
      }

      detailListContainer.appendChild(card);
    });
  };

  // --- VIEW PDF MODAL ACTIONS ---
  if (btnClosePdfModal) btnClosePdfModal.addEventListener('click', () => modalViewPdf.classList.add('hidden'));
  if (btnDoneViewPdf) btnDoneViewPdf.addEventListener('click', () => modalViewPdf.classList.add('hidden'));

  // --- SOLVE CHALLENGE WORKSPACE ACTIONS ---
  if (btnCloseChallengeModal) btnCloseChallengeModal.addEventListener('click', () => modalSolveChallenge.classList.add('hidden'));

  if (btnRunCode) {
    btnRunCode.addEventListener('click', () => {
      if (compilerOutputBox) {
        compilerOutputBox.textContent = 'Compiling solution files...\nJava compiler triggered (JDK 17)...\nRunning local test cases...';
        compilerOutputBox.style.color = '#fbbf24';

        setTimeout(() => {
          compilerOutputBox.textContent = 'Compiling solution files...\nJava compiler triggered (JDK 17)...\nRunning local test cases...\n\nTest Case 1 (Standard): Passed!\nTest Case 2 (Edge): Passed!\nTest Case 3 (Boundary): Passed!\n\nAll test cases verified. Ready to submit solution!';
          compilerOutputBox.style.color = '#10b981';
        }, 1200);
      }
    });
  }

  if (btnSubmitSolution) {
    btnSubmitSolution.addEventListener('click', () => {
      if (compilerOutputBox) {
        compilerOutputBox.textContent = 'Submitting code structure to DEMO server...\nVerifying all system constraints...\nExecuting test matrix (100 test cases)...\nRunning complexity sweeps...';
        compilerOutputBox.style.color = '#38bdf8';

        setTimeout(() => {
          compilerOutputBox.textContent = 'Submitting code structure to DEMO server...\nVerifying all system constraints...\nExecuting test matrix (100 test cases)...\nRunning complexity sweeps...\n\nAll System Tests Checked (100/100 Passed).\nTime Complexity: O(N) - Optimal.\nScore: 100/100 (100% Complete)\nMarks Scored: 100%';
          compilerOutputBox.style.color = '#10b981';

          // Update data
          const comp = companies.find(c => c.id === activeCompanyId);
          if (comp && comp.items) {
            const ch = comp.items.find(i => i.id === activeChallengeId);
            if (ch) {
              ch.attempts += 1;
              ch.score = 100;
              ch.solved = true;
              recalculateProgress(comp);
              saveCompaniesData(companies);
            }
          }

          setTimeout(() => {
            modalSolveChallenge.classList.add('hidden');
            renderDetailRows();
          }, 1000);

        }, 1500);
      }
    });
  }

  // --- ADMIN MODAL OPENS ---
  if (btnAdminUploadPdf) {
    btnAdminUploadPdf.addEventListener('click', () => {
      if (adminPdfTitle) adminPdfTitle.value = '';
      if (adminPdfPages) adminPdfPages.value = '5';
      if (adminPdfFileSelector) adminPdfFileSelector.value = '';
      if (adminPdfFileSelectedName) adminPdfFileSelectedName.textContent = '';
      if (modalAdminUpload) modalAdminUpload.classList.remove('hidden');
    });
  }

  if (btnAdminAddChallenge) {
    btnAdminAddChallenge.addEventListener('click', () => {
      if (adminChallengeTitle) adminChallengeTitle.value = '';
      if (adminChallengeInstructions) adminChallengeInstructions.value = '';
      if (modalAdminChallenge) modalAdminChallenge.classList.remove('hidden');
    });
  }

  // File selector feedback
  if (adminPdfFileSelector && adminPdfFileSelectedName) {
    adminPdfFileSelector.addEventListener('change', () => {
      if (adminPdfFileSelector.files.length > 0) {
        adminPdfFileSelectedName.textContent = `Selected: ${adminPdfFileSelector.files[0].name}`;
      }
    });
  }

  // Close Admin modals
  if (btnCloseUploadModal) btnCloseUploadModal.addEventListener('click', () => modalAdminUpload.classList.add('hidden'));
  if (btnCancelUpload) btnCancelUpload.addEventListener('click', () => modalAdminUpload.classList.add('hidden'));
  if (btnCloseAddChallengeModal) btnCloseAddChallengeModal.addEventListener('click', () => modalAdminChallenge.classList.add('hidden'));
  if (btnCancelChallenge) btnCancelChallenge.addEventListener('click', () => modalAdminChallenge.classList.add('hidden'));

  // Admin submit PDF
  if (btnSubmitUpload) {
    btnSubmitUpload.addEventListener('click', () => {
      const title = adminPdfTitle ? adminPdfTitle.value.trim() : '';
      const pages = adminPdfPages ? parseInt(adminPdfPages.value, 10) : 5;

      if (!title) {
        alert('Please provide a document title.');
        return;
      }

      const comp = companies.find(c => c.id === activeCompanyId);
      if (comp && comp.items) {
        comp.items.unshift({
          id: 'admin-pdf-' + Date.now(),
          type: 'pdf',
          title: title,
          pages: pages || 5,
          bookmarked: false
        });
        saveCompaniesData(companies);
        modalAdminUpload.classList.add('hidden');
        renderDetailRows();
      }
    });
  }

  // Admin submit Challenge
  if (btnSubmitChallenge) {
    btnSubmitChallenge.addEventListener('click', () => {
      const title = adminChallengeTitle ? adminChallengeTitle.value.trim() : '';
      const instructions = adminChallengeInstructions ? adminChallengeInstructions.value.trim() : '';

      if (!title) {
        alert('Please provide a challenge title.');
        return;
      }

      const comp = companies.find(c => c.id === activeCompanyId);
      if (comp && comp.items) {
        comp.items.push({
          id: 'admin-q-' + Date.now(),
          type: 'challenge',
          title: title,
          attempts: 0,
          score: 0,
          bookmarked: false,
          solved: false,
          instructions: instructions || 'Complete the function requirements.'
        });
        recalculateProgress(comp);
        saveCompaniesData(companies);
        modalAdminChallenge.classList.add('hidden');
        renderDetailRows();
      }
    });
  }

  // --- RENDERING COMPANY CARDS GRID ---
  const renderCompanies = () => {
    if (!gridContainer) return;
    gridContainer.innerHTML = '';

    const searchQuery = searchInput ? searchInput.value.toLowerCase().trim() : '';

    // Extract selected statuses
    const filterStatuses = [];
    if (chkCompleted && chkCompleted.checked) filterStatuses.push('completed');
    if (chkProgress && chkProgress.checked) filterStatuses.push('progress');
    if (chkNotStarted && chkNotStarted.checked) filterStatuses.push('notstarted');

    // Filtering logic
    const filtered = companies.filter(comp => {
      // 1. Tab restriction (Favorites tab only shows favorites)
      if (currentTab === 'favorites' && !comp.isFavorite) {
        return false;
      }

      // 2. Search query filter
      if (searchQuery && !comp.name.toLowerCase().includes(searchQuery)) {
        return false;
      }

      // 3. Status filter
      if (filterStatuses.length > 0) {
        let statusMatch = false;
        filterStatuses.forEach(stat => {
          if (stat === 'completed' && comp.progress === 100) statusMatch = true;
          if (stat === 'progress' && comp.progress > 0 && comp.progress < 100) statusMatch = true;
          if (stat === 'notstarted' && comp.progress === 0) statusMatch = true;
        });
        if (!statusMatch) return false;
      }

      return true;
    });

    if (filtered.length === 0) {
      gridContainer.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 48px; color: var(--text-secondary);">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="margin-bottom: 12px; opacity: 0.5;">
            <circle cx="12" cy="12" r="10"/>
            <line x1="8" y1="12" x2="16" y2="12"/>
          </svg>
          <p style="font-size: 1rem; font-weight: 500;">No company questions found matching current criteria.</p>
        </div>
      `;
      return;
    }

    filtered.forEach(comp => {
      const card = document.createElement('div');
      card.className = 'company-card';
      card.style.cursor = 'pointer';

      // Favorite toggle button markup
      const heartIcon = comp.isFavorite 
        ? `<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>`
        : `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`;

      // Badges
      const badgesHTML = comp.items 
        ? comp.items.filter(i => i.type === 'challenge').slice(0, 3).map(i => `<span class="company-badge">${i.title}</span>`).join('')
        : `<span class="company-badge">Interview Series</span>`;

      // Progress / Action section
      let actionHTML = '';
      if (comp.progress === 0) {
        actionHTML = `<button class="company-get-started-btn" data-id="${comp.id}">
          Get Started
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </button>`;
      } else {
        const isComp = comp.progress === 100;
        actionHTML = `
          <div class="company-progress-container">
            <div class="company-progress-text">
              <span>${isComp ? 'Completed' : 'Practice Progress'}</span>
              <span class="progress-percentage">${comp.progress}%</span>
            </div>
            <div class="company-progress-bar-bg">
              <div class="company-progress-bar-fill ${isComp ? 'completed' : ''}" style="width: ${comp.progress}%"></div>
            </div>
          </div>
        `;
      }

      card.innerHTML = `
        <div class="company-card-header">
          <div class="company-logo-circle" style="background: ${comp.logoColor}">
            ${comp.initials}
          </div>
          <span class="company-card-title">${comp.name}</span>
          <button class="heart-btn ${comp.isFavorite ? 'favorited' : ''}" data-id="${comp.id}" aria-label="Toggle Favorite">
            ${heartIcon}
          </button>
        </div>
        <div class="company-badges-container">
          ${badgesHTML}
        </div>
        <div class="company-card-action">
          ${actionHTML}
        </div>
      `;

      // Event handlers
      // 1. Click card to enter details view
      card.addEventListener('click', () => {
        showCompanyDetails(comp.id);
      });

      // 2. Heart toggle (prevent bubbling details view trigger)
      const btnHeart = card.querySelector('.heart-btn');
      btnHeart.addEventListener('click', (e) => {
        e.stopPropagation();
        const cId = btnHeart.getAttribute('data-id');
        const company = companies.find(c => c.id === cId);
        if (company) {
          company.isFavorite = !company.isFavorite;
          saveCompaniesData(companies);
          renderCompanies();
        }
      });

      gridContainer.appendChild(card);
    });
  };

  // --- FILTER CHANGE TRIGGERS ---
  const handleFilterChange = () => {
    renderCompanies();
  };

  if (searchInput) searchInput.addEventListener('input', handleFilterChange);
  if (chkCompleted) chkCompleted.addEventListener('change', handleFilterChange);
  if (chkProgress) chkProgress.addEventListener('change', handleFilterChange);
  if (chkNotStarted) chkNotStarted.addEventListener('change', handleFilterChange);

  // --- TABS INTERACTIVE SWITCH ---
  if (tabAll && tabFav) {
    tabAll.addEventListener('click', () => {
      if (currentTab !== 'all') {
        currentTab = 'all';
        tabAll.classList.add('active');
        tabFav.classList.remove('active');
        renderCompanies();
      }
    });

    tabFav.addEventListener('click', () => {
      if (currentTab !== 'favorites') {
        currentTab = 'favorites';
        tabFav.classList.add('active');
        tabAll.classList.remove('active');
        renderCompanies();
      }
    });
  }

  // Initial draw
  renderCompanies();
});
