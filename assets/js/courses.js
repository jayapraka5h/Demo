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
  const trainerBios = {
    'Somanna': {
      specialization: 'Enterprise Java & Spring Framework Expert',
      experience: '8+ Years',
      bio: 'Somanna is a veteran Java developer and system architect. He has trained thousands of students in core backend development, focusing on enterprise architecture, Spring Framework, Spring Boot, and microservices design.'
    },
    'Pradeep Kumar': {
      specialization: 'Senior Database Architect & ORM Specialist',
      experience: '10+ Years',
      bio: 'Pradeep is a database specialist with a focus on high-performance persistence layers. He has extensive experience in Hibernate ORM, SQL optimization, and cloud database migrations for enterprise applications.'
    },
    'Sanjeev': {
      specialization: 'Principal Java Architect & Web Specialist',
      experience: '12+ Years',
      bio: 'Sanjeev specializes in advanced Java features, high-concurrency systems, JDBC APIs, and servlet configurations. He designs architectures that scale to millions of concurrent requests.'
    },
    'Aman Preet': {
      specialization: 'DSA Coach & Competitive Programming Mentor',
      experience: '6+ Years',
      bio: 'Aman Preet is a competitive programmer who has coached students for technical interviews at top-tier product companies. He focuses on algorithmic thinking, memory optimization, and data structures.'
    },
    'Shruti Sen': {
      specialization: 'Lead UI/UX Engineer & Frontend Specialist',
      experience: '7+ Years',
      bio: 'Shruti is a creative front-end engineer specializing in semantic markup, layouts, CSS architectures, and micro-interactions. She focuses on building responsive interfaces that wow users.'
    }
  };

  const getTrainerInfo = (name) => {
    return trainerBios[name] || {
      specialization: 'Technical Trainer & Systems Engineer',
      experience: '5+ Years',
      bio: `${name} is an experienced technical trainer at Demo Academy, specializing in core computer science subjects, modern frameworks, and placement preparation.`
    };
  };

  const generateLearningTopics = (lessonTitle) => {
    const topics = [];
    const titleLower = lessonTitle.toLowerCase();
    
    if (titleLower.includes('intro') || titleLower.includes('overview')) {
      topics.push('Understand the core architecture, purpose, and key advantages.');
      topics.push('Learn the environment setup, dependencies, and configuration basics.');
      topics.push('Build your first hello-world implementation and trace its execution flow.');
    } else if (titleLower.includes('installation') || titleLower.includes('connect')) {
      topics.push('Step-by-step setup guides, installation prerequisites, and directory path setups.');
      topics.push('How to verify the installation and test basic configuration pipelines.');
      topics.push('Troubleshooting common connection errors, port conflicts, and security settings.');
    } else if (titleLower.includes('injection') || titleLower.includes('ioc') || titleLower.includes('control')) {
      topics.push('Understand the Inversion of Control (IoC) paradigm and container lifecycle.');
      topics.push('Compare setter injection and constructor injection architectures.');
      topics.push('Configure bean definitions, scope resolutions, and automatic dependencies.');
    } else if (titleLower.includes('database') || titleLower.includes('sql') || titleLower.includes('jdbc') || titleLower.includes('connection')) {
      topics.push('Understand relational database connectivity and driver architectures.');
      topics.push('How to establish, query, and close database connection streams efficiently.');
      topics.push('Implementing statement executions, prepared queries, and result mappings.');
    } else if (titleLower.includes('array') || titleLower.includes('sorting') || titleLower.includes('dsa') || titleLower.includes('structure')) {
      topics.push('Analyze memory allocation, time complexities (Big O), and element index structures.');
      topics.push('Step-by-step algorithmic dry runs for insertion, deletion, and search loops.');
      topics.push('Optimal approaches to minimize auxiliary space and run time complexity.');
    } else if (titleLower.includes('layout') || titleLower.includes('css') || titleLower.includes('html')) {
      topics.push('Master responsive design containers, alignment properties, and flexbox coordinates.');
      topics.push('Best practices for browser compatibility, semantic tagging, and clean style architectures.');
      topics.push('Debugging layout breaks, spacing properties, and media query breakpoints.');
    } else {
      topics.push(`Deep dive into the core properties and functions of ${lessonTitle}.`);
      topics.push('Step-by-step logic tracing, variable tracking, and clean implementation guidelines.');
      topics.push('Common pitfalls, edge cases, and optimization strategies to write production-ready code.');
    }
    return topics;
  };

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

    // Set overview panel with Trainer Details
    const overviewPanel = document.getElementById('panel-overview');
    if (overviewPanel) {
      const trainerInfo = getTrainerInfo(course.instructor);
      overviewPanel.innerHTML = `
        <div class="trainer-details-card" style="display: flex; gap: 16px; align-items: start; margin-top: 8px;">
          <div class="trainer-avatar-large" style="width: 48px; height: 48px; border-radius: 50%; background: linear-gradient(135deg, var(--accent-blue), var(--accent-cyan)); display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 1.25rem; flex-shrink: 0;">
            ${course.instructor.charAt(0)}
          </div>
          <div>
            <h4 style="color: var(--text-primary); font-weight: 600; margin-bottom: 2px;">${course.instructor}</h4>
            <p style="color: var(--accent-blue); font-size: 0.82rem; font-weight: 500; margin-bottom: 8px;">${trainerInfo.specialization} (${trainerInfo.experience} Exp)</p>
            <p style="color: var(--text-secondary); font-size: 0.88rem; line-height: 1.5; margin: 0;">${trainerInfo.bio}</p>
          </div>
        </div>
      `;
    }

    // Set discussions panel with What We Learn
    const topicsPanel = document.getElementById('panel-discussions');
    if (topicsPanel) {
      const topics = generateLearningTopics(lesson.title);
      topicsPanel.innerHTML = `
        <div class="learning-topics-container" style="margin-top: 8px;">
          <h4 style="color: var(--text-primary); font-size: 0.95rem; font-weight: 600; margin-bottom: 12px;">What you will learn in this video:</h4>
          <ul style="list-style: none; padding: 0; display: flex; flex-direction: column; gap: 10px;">
            ${topics.map(topic => `
              <li style="display: flex; gap: 10px; align-items: start; color: var(--text-secondary); font-size: 0.88rem; line-height: 1.4;">
                <span style="color: var(--accent-green); font-weight: bold; flex-shrink: 0; margin-top: 1px;">✔</span>
                <span>${topic}</span>
              </li>
            `).join('')}
          </ul>
        </div>
      `;
    }
  };

  // --- TABS CONTROLLER (Overview, Discussions) ---
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
