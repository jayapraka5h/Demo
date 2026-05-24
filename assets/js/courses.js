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

  // --- COURSES DATABASE ---
  const defaultCourses = [
    {
      id: 'springs',
      title: 'Springs',
      modulesCount: 8,
      duration: '3 Hr 51 mins',
      pages: 96,
      desc: 'Dive into the Springs framework, a powerful tool for building robust and scalable Java enterprise applications.',
      instructor: 'Somanna',
      gradientClass: 'course-banner-gradient-2',
      modules: [
        {
          title: 'Module 1: Springs Introduction',
          lessons: [
            { id: 'spring-1', title: 'Introduction to Spring', length: '12 mins', type: 'video', youtubeId: 'dQw4w9WgXcQ', completed: true },
            { id: 'spring-2', title: 'Tomcat Installation', length: '5 mins', type: 'video', youtubeId: 'JgV1_62B-iI', completed: true },
            { id: 'spring-3', title: 'Connecting Eclipse with Tomcat', length: '5 mins', type: 'video', youtubeId: 'Xp1K-W2p-tU', completed: true },
            { id: 'spring-4', title: 'Downloading Spring JARs', length: '8 mins', type: 'video', youtubeId: 'g4hG9b1i2jU', completed: false },
            { id: 'spring-5', title: 'SPRING_Introduction To Spring - Notes', length: '20 pages', type: 'pdf', completed: true }
          ]
        },
        {
          title: 'Module 2: Inversion of Control',
          lessons: [
            { id: 'spring-6', title: 'What is Inversion of Control?', length: '15 mins', type: 'video', youtubeId: 'c2eW4lG2kOQ', completed: false },
            { id: 'spring-7', title: 'IOC Container Configuration', length: '15 mins', type: 'video', youtubeId: 'E1Gk0nO2kU8', completed: false }
          ]
        },
        {
          title: 'Module 3: Dependency Injection',
          lessons: [
            { id: 'spring-8', title: 'Setter Injection vs Constructor Injection', length: '18 mins', type: 'video', youtubeId: 'dQw4w9WgXcQ', completed: false }
          ]
        }
      ]
    },
    {
      id: 'hibernate',
      title: 'Hibernate',
      modulesCount: 6,
      duration: '7 Hr 39 mins',
      pages: 48,
      desc: 'Master object-relational mapping (ORM) with Hibernate, connecting your Java applications to databases seamlessly.',
      instructor: 'Pradeep Kumar',
      gradientClass: 'course-banner-gradient-1',
      modules: [
        {
          title: 'Module 1: Hibernate Architecture & Config',
          lessons: [
            { id: 'hib-1', title: 'Hibernate Architecture Overview', length: '18 mins', type: 'video', youtubeId: 'Yv2xctJxE-w', completed: true },
            { id: 'hib-2', title: 'Configuration File XML Setup', length: '15 mins', type: 'video', youtubeId: 'dQw4w9WgXcQ', completed: false }
          ]
        },
        {
          title: 'Module 2: SessionFactory & Sessions',
          lessons: [
            { id: 'hib-3', title: 'Understanding SessionFactory & OpenSession', length: '22 mins', type: 'video', youtubeId: 'dQw4w9WgXcQ', completed: false }
          ]
        }
      ]
    },
    {
      id: 'adv-java',
      title: 'Advanced JAVA',
      modulesCount: 3,
      duration: '20 Hr 34 mins',
      pages: 120,
      desc: 'Learn advanced concepts of Core Java including JDBC, Servlet technology, JSP, multi-threading, and memory management.',
      instructor: 'Sanjeev',
      gradientClass: 'course-banner-gradient-3',
      modules: [
        {
          title: 'Module 1: JDBC Connectivity',
          lessons: [
            { id: 'adv-1', title: 'JDBC Architecture & Drivers', length: '30 mins', type: 'video', youtubeId: '2i4t-ChDKJA', completed: true },
            { id: 'adv-2', title: 'Establishing Connection to MySQL', length: '25 mins', type: 'video', youtubeId: 'dQw4w9WgXcQ', completed: false }
          ]
        }
      ]
    },
    {
      id: 'dsa',
      title: 'Data Structure and Algorithm',
      modulesCount: 12,
      duration: '45 Hr 12 mins',
      pages: 200,
      desc: 'Enhance your problem-solving skills by mastering essential Data Structures (Stacks, Trees) and Algorithms (Sorting, Search).',
      instructor: 'Aman Preet',
      gradientClass: 'course-banner-gradient-4',
      modules: [
        {
          title: 'Module 1: Array Operations',
          lessons: [
            { id: 'dsa-1', title: 'Array Insertion & Deletion', length: '20 mins', type: 'video', youtubeId: 'dQw4w9WgXcQ', completed: false }
          ]
        }
      ]
    },
    {
      id: 'html-css',
      title: 'HTML & CSS',
      modulesCount: 5,
      duration: '12 Hr 30 mins',
      pages: 50,
      desc: 'Build gorgeous, mobile-responsive, and pixel-perfect interfaces using HTML5 tags, flexbox grid layouts, and custom CSS.',
      instructor: 'Shruti Sen',
      gradientClass: 'course-banner-gradient-5',
      modules: [
        {
          title: 'Module 1: HTML5 Semantics',
          lessons: [
            { id: 'html-1', title: 'Semantic Tags Overview', length: '15 mins', type: 'video', youtubeId: 'dQw4w9WgXcQ', completed: false }
          ]
        }
      ]
    },
    {
      id: 'python',
      title: 'Python',
      modulesCount: 10,
      duration: '15 Hr 45 mins',
      pages: 90,
      desc: 'Learn scripting, object-oriented concepts, and custom library integrations (Pandas, Numpy) with Python.',
      instructor: 'Somanna',
      gradientClass: 'course-banner-gradient-6',
      modules: [
        {
          title: 'Module 1: Python Basics',
          lessons: [
            { id: 'py-1', title: 'Variables & Data Types', length: '12 mins', type: 'video', youtubeId: 'dQw4w9WgXcQ', completed: false }
          ]
        }
      ]
    }
  ];

  // Load from local storage or seed initial catalog
  const getCourses = () => {
    const stored = localStorage.getItem('demo_courses_catalog');
    if (stored) return JSON.parse(stored);
    localStorage.setItem('demo_courses_catalog', JSON.stringify(defaultCourses));
    return defaultCourses;
  };

  let coursesDatabase = getCourses();

  // --- ELEMENT SELECTORS ---
  const coursesListView = document.getElementById('courses-list-view');
  const coursePlayerView = document.getElementById('course-player-view');
  const coursesGrid = document.getElementById('courses-grid');
  const searchInput = document.getElementById('courses-search');
  const addCourseBtn = document.getElementById('add-course-btn');
  const addCourseCard = document.getElementById('add-course-card');
  
  // Modal Elements
  const addCourseModal = document.getElementById('add-course-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const btnCancel = document.getElementById('btn-cancel');
  const addCourseForm = document.getElementById('add-course-form');

  // Player Elements
  const playerBackBtn = document.getElementById('player-back-btn');
  const playerCourseTitle = document.getElementById('player-course-title');
  const playerIframe = document.getElementById('player-iframe');
  const playerVideoTitle = document.getElementById('player-video-title');
  const playerVideoBadge = document.getElementById('player-video-badge');
  const playerInstructorName = document.getElementById('player-instructor-name');
  const playerSyllabusMeta = document.getElementById('syllabus-stats');
  const playerAccordionList = document.getElementById('module-accordion-list');
  const chatBubbleBtn = document.getElementById('chat-bubble-btn');
  const chatWindow = document.getElementById('chat-window');

  // --- RENDER COURSE GRID LIST ---
  const renderCourseGrid = (filterText = '') => {
    if (!coursesGrid) return;
    coursesGrid.innerHTML = '';

    const filtered = coursesDatabase.filter(c => 
      c.title.toLowerCase().includes(filterText.toLowerCase())
    );

    filtered.forEach(course => {
      const card = document.createElement('div');
      card.className = 'course-card';
      card.innerHTML = `
        <div class="course-banner ${course.gradientClass}">
          <div class="course-banner-title">
            <h3>${course.title.toUpperCase()}</h3>
          </div>
          <div class="course-logo-overlay">
            <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
            </svg>
          </div>
          <div class="course-banner-overlay"></div>
        </div>
        <div class="course-card-details">
          <div>
            <h4 style="font-size: 1.1rem; font-weight: 600; margin-bottom: 8px;">${course.title}</h4>
            <p class="course-card-desc">${course.desc}</p>
          </div>
          <div>
            <div class="course-card-meta">
              <div class="meta-info-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
                <span>${course.modulesCount} modules</span>
              </div>
              <div class="meta-info-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                <span>${course.duration}</span>
              </div>
            </div>
            <div class="course-card-cta">
              <span class="cta-link">Get Started &rarr;</span>
            </div>
          </div>
        </div>
      `;

      card.addEventListener('click', () => {
        openCoursePlayer(course);
      });

      coursesGrid.appendChild(card);
    });

    // Re-append the dotted "+ Add Course" card
    if (addCourseCard) {
      coursesGrid.appendChild(addCourseCard);
    }
  };

  // Search filter
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      renderCourseGrid(e.target.value);
    });
  }

  // --- ADD COURSE MODAL ENGINE ---
  const toggleModal = (show) => {
    if (!addCourseModal) return;
    if (show) {
      addCourseModal.classList.add('open');
    } else {
      addCourseModal.classList.remove('open');
      if (addCourseForm) addCourseForm.reset();
    }
  };

  if (addCourseBtn) addCourseBtn.addEventListener('click', () => toggleModal(true));
  if (addCourseCard) addCourseCard.addEventListener('click', () => toggleModal(true));
  if (modalCloseBtn) modalCloseBtn.addEventListener('click', () => toggleModal(false));
  if (btnCancel) btnCancel.addEventListener('click', () => toggleModal(false));

  if (addCourseForm) {
    addCourseForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const title = document.getElementById('new-course-title').value.trim();
      const duration = document.getElementById('new-course-duration').value.trim();
      const modulesCount = parseInt(document.getElementById('new-course-modules').value) || 1;
      const desc = document.getElementById('new-course-desc').value.trim();
      const instructor = document.getElementById('new-course-instructor').value.trim() || 'Somanna';
      const gradient = document.getElementById('new-course-banner').value || 'course-banner-gradient-1';

      if (!title || !duration) return;

      const newId = title.toLowerCase().replace(/[^a-z0-9]/g, '-');

      // Create dummy syllabus modules
      const generatedModules = [];
      for (let i = 1; i <= modulesCount; i++) {
        generatedModules.push({
          title: `Module ${i}: Foundations`,
          lessons: [
            { id: `${newId}-${i}-1`, title: 'Course Overview & Intro', length: '10 mins', type: 'video', youtubeId: 'dQw4w9WgXcQ', completed: false },
            { id: `${newId}-${i}-2`, title: 'Essential Core Concepts', length: '12 mins', type: 'video', youtubeId: 'dQw4w9WgXcQ', completed: false },
            { id: `${newId}-${i}-3`, title: 'Assignment Exercises', length: '10 pages', type: 'pdf', completed: false }
          ]
        });
      }

      const newCourse = {
        id: newId,
        title,
        modulesCount,
        duration,
        pages: modulesCount * 12,
        desc: desc || 'Customized syllabus path created to optimize career path placements.',
        instructor,
        gradientClass: gradient,
        modules: generatedModules
      };

      coursesDatabase.push(newCourse);
      localStorage.setItem('demo_courses_catalog', JSON.stringify(coursesDatabase));
      
      toggleModal(false);
      renderCourseGrid();
    });
  }

  // --- COURSE PLAYER CONTROLLER ---
  const openCoursePlayer = (course) => {
    if (!coursesListView || !coursePlayerView) return;

    // Set layout view state
    coursesListView.style.display = 'none';
    coursePlayerView.style.display = 'flex';

    // Populate Headers
    if (playerCourseTitle) playerCourseTitle.textContent = course.title;
    if (playerInstructorName) playerInstructorName.textContent = course.instructor;

    // Populate Sidebar Stats
    if (playerSyllabusMeta) {
      playerSyllabusMeta.innerHTML = `
        <span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
          ${course.modulesCount} modules
        </span>
        <span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          ${course.duration}
        </span>
        <span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
          ${course.pages} pages
        </span>
      `;
    }

    // Populate dynamic accordion modules
    renderAccordion(course);

    // Load first video or first lesson automatically
    let firstLesson = null;
    if (course.modules && course.modules[0] && course.modules[0].lessons && course.modules[0].lessons[0]) {
      firstLesson = course.modules[0].lessons[0];
    }

    if (firstLesson) {
      loadLesson(firstLesson, course);
    }
  };

  const closeCoursePlayer = () => {
    if (!coursesListView || !coursePlayerView) return;
    coursesListView.style.display = 'block';
    coursePlayerView.style.display = 'none';
    if (playerIframe) playerIframe.src = '';
  };

  if (playerBackBtn) {
    playerBackBtn.addEventListener('click', closeCoursePlayer);
  }

  // Render collapsible Accordion menu
  const renderAccordion = (course) => {
    if (!playerAccordionList) return;
    playerAccordionList.innerHTML = '';

    course.modules.forEach((mod, modIdx) => {
      const accItem = document.createElement('div');
      accItem.className = `accordion-item ${modIdx === 0 ? 'active' : ''}`;

      // Calculate totals for module
      const totalLessons = mod.lessons.length;
      let totalMins = 0;
      let totalPages = 0;
      mod.lessons.forEach(l => {
        if (l.type === 'video') {
          totalMins += parseInt(l.length) || 10;
        } else {
          totalPages += parseInt(l.length) || 5;
        }
      });

      const metaString = `${totalLessons} lessons • ${totalMins > 0 ? totalMins + ' mins' : ''} ${totalPages > 0 ? totalPages + ' pages' : ''}`;

      accItem.innerHTML = `
        <button class="accordion-header">
          <div class="accordion-title-wrap">
            <h4>${mod.title}</h4>
            <div class="accordion-meta-label">${metaString}</div>
          </div>
          <svg class="accordion-arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </button>
        <div class="accordion-body-list" id="mod-body-${modIdx}">
        </div>
      `;

      const bodyList = accItem.querySelector('.accordion-body-list');
      
      mod.lessons.forEach(lesson => {
        const item = document.createElement('div');
        item.className = `lesson-item ${lesson.completed ? 'completed' : ''}`;
        item.id = `lesson-item-${lesson.id}`;

        const isVideo = lesson.type === 'video';
        const typeIconSvg = isVideo
          ? `<svg class="lesson-type-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16"/></svg>`
          : `<svg class="lesson-type-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>`;

        item.innerHTML = `
          <div class="lesson-item-left">
            ${typeIconSvg}
            <div class="lesson-details-text">
              <h5>${lesson.title}</h5>
              <span class="lesson-length">${lesson.length}</span>
            </div>
          </div>
          <div class="lesson-status-tick">✔</div>
        `;

        item.addEventListener('click', (e) => {
          e.stopPropagation();
          loadLesson(lesson, course);
        });

        // Tick mark click completes lesson toggle
        const tick = item.querySelector('.lesson-status-tick');
        tick.addEventListener('click', (e) => {
          e.stopPropagation();
          lesson.completed = !lesson.completed;
          item.classList.toggle('completed', lesson.completed);
          localStorage.setItem('demo_courses_catalog', JSON.stringify(coursesDatabase));
        });

        bodyList.appendChild(item);
      });

      // Header click toggles active panel
      const btn = accItem.querySelector('.accordion-header');
      btn.addEventListener('click', () => {
        // Toggle active class
        const isActive = accItem.classList.contains('active');
        // Close other items
        document.querySelectorAll('.accordion-item').forEach(item => item.classList.remove('active'));
        if (!isActive) {
          accItem.classList.add('active');
        }
      });

      playerAccordionList.appendChild(accItem);
    });
  };

  // Load lesson details into video view
  const loadLesson = (lesson, course) => {
    // Set active item class
    document.querySelectorAll('.lesson-item').forEach(item => item.classList.remove('active'));
    const activeItem = document.getElementById(`lesson-item-${lesson.id}`);
    if (activeItem) activeItem.classList.add('active');

    // Update Titles
    if (playerVideoTitle) playerVideoTitle.textContent = lesson.title;
    if (playerVideoBadge) playerVideoBadge.textContent = course.title;

    // Load iframe video if it's type video
    if (lesson.type === 'video' && playerIframe) {
      playerIframe.style.display = 'block';
      // Load clean embed URL
      playerIframe.src = `https://www.youtube.com/embed/${lesson.youtubeId}?autoplay=1&rel=0`;
    } else if (playerIframe) {
      // PDF or notes
      playerIframe.src = '';
      playerIframe.style.display = 'none';
      // Render clean text or download prompt
      playerVideoTitle.textContent = `${lesson.title} (PDF Document Notes Opened)`;
    }

    // Set overview text descriptions
    const overviewPanel = document.getElementById('panel-overview');
    if (overviewPanel) {
      overviewPanel.innerHTML = `
        <p style="margin-bottom: 12px;">Welcome to this syllabus module for <strong>${course.title}</strong>, instructed by <strong>${course.instructor}</strong>.</p>
        <p style="margin-bottom: 12px;">This topic focuses on <strong>${lesson.title}</strong>. Study materials, tasks, and assignment exercises are outlined in the accordion content list. Practice locally to complete this task successfully.</p>
        <p>Once completed, tick the checkbox next to the lesson in your syllabus outline to track your learning score statistics.</p>
      `;
    }
  };

  // --- TABS CONTROLLER (Overview, Discussions, Reviews) ---
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel-content');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active classes
      tabButtons.forEach(b => b.classList.remove('active'));
      tabPanels.forEach(p => p.classList.add('hidden'));

      // Set target active
      btn.classList.add('active');
      const targetPanelId = `panel-${btn.id.replace('tab-', '')}`;
      const targetPanel = document.getElementById(targetPanelId);
      if (targetPanel) {
        targetPanel.classList.remove('hidden');
      }
    });
  });

  // --- FLOAT CHAT DEMO ENGINE ---
  const toggleChat = () => {
    if (!chatWindow) return;
    chatWindow.classList.toggle('open');
  };

  if (chatBubbleBtn) {
    chatBubbleBtn.addEventListener('click', toggleChat);
  }

  // Initialize view
  renderCourseGrid();
});
