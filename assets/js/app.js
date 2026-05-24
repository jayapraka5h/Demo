document.addEventListener('DOMContentLoaded', () => {


  // --- THEME ENGINE ---
  const themeToggle = document.getElementById('theme-toggle');
  const storedTheme = localStorage.getItem('demo_theme') || 'dark';

  if (storedTheme === 'light') {
    document.body.classList.add('light-theme');
    themeToggle.checked = true;
  } else {
    document.body.classList.remove('light-theme');
    themeToggle.checked = false;
  }

  themeToggle.addEventListener('change', () => {
    if (themeToggle.checked) {
      document.body.classList.add('light-theme');
      localStorage.setItem('demo_theme', 'light');
    } else {
      document.body.classList.remove('light-theme');
      localStorage.setItem('demo_theme', 'dark');
    }
  });

  // --- CAROUSEL ENGINE ---
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.dot');
  const prevBtn = document.querySelector('.carousel-arrow.prev');
  const nextBtn = document.querySelector('.carousel-arrow.next');
  let currentSlide = 0;
  let slideInterval;

  const showSlide = (index) => {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    currentSlide = (index + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
  };

  const nextSlide = () => showSlide(currentSlide + 1);
  const prevSlide = () => showSlide(currentSlide - 1);

  const startSlideShow = () => {
    stopSlideShow();
    slideInterval = setInterval(nextSlide, 4000);
  };

  const stopSlideShow = () => clearInterval(slideInterval);

  if (nextBtn && prevBtn) {
    nextBtn.addEventListener('click', () => {
      nextSlide();
      startSlideShow();
    });
    prevBtn.addEventListener('click', () => {
      prevSlide();
      startSlideShow();
    });
  }

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      showSlide(index);
      startSlideShow();
    });
  });

  startSlideShow();

  // --- PROGRESS RINGS ANIMATIONS ---
  const animateDashboardWidgets = () => {
    // 1. Concentric Progress Rings (stroke-dashoffset adjustment)
    // Ring Course (r=70, circumference = 439.8, target = 72%)
    const ringCourse = document.querySelector('.ring-course');
    if (ringCourse) {
      const circ = 439.8;
      const targetPercent = 0.72;
      ringCourse.style.strokeDashoffset = circ - (circ * targetPercent);
    }

    // Ring Assignment (r=55, circumference = 345.5, target = 58%)
    const ringAssignment = document.querySelector('.ring-assignment');
    if (ringAssignment) {
      const circ = 345.5;
      const targetPercent = 0.58;
      ringAssignment.style.strokeDashoffset = circ - (circ * targetPercent);
    }

    // Ring Test (r=40, circumference = 251.3, target = 82%)
    const ringTest = document.querySelector('.ring-test');
    if (ringTest) {
      const circ = 251.3;
      const targetPercent = 0.82;
      ringTest.style.strokeDashoffset = circ - (circ * targetPercent);
    }
  };

  setTimeout(animateDashboardWidgets, 300);

  // --- AUTOMATIC ATTENDANCE DATABASE ENGINE ---
  const monthsList = [
    { name: 'Jan', days: 31 },
    { name: 'Feb', days: 28 }, // Non-leap year default
    { name: 'Mar', days: 31 },
    { name: 'Apr', days: 30 },
    { name: 'May', days: 31 },
    { name: 'Jun', days: 30 },
    { name: 'Jul', days: 31 },
    { name: 'Aug', days: 31 },
    { name: 'Sep', days: 30 },
    { name: 'Oct', days: 31 },
    { name: 'Nov', days: 30 },
    { name: 'Dec', days: 31 }
  ];

  // Initialize localStorage dataset if missing
  const initAttendanceData = () => {
    let stored = localStorage.getItem('demo_attendance_records');
    if (stored) return JSON.parse(stored);

    // Seed data matching screenshot 2 visual layout
    const initialRecords = {
      'Jan': {
        2: 'P', 5: 'P', 6: 'P', 7: 'P', 8: 'P', 9: 'P',
        12: 'P', 13: 'P', 14: 'P', 16: 'P', 19: 'P', 20: 'P'
      },
      'Feb': {
        6: 'A', 10: 'A', 12: 'P', 13: 'P', 16: 'P',
        17: 'A', 18: 'A', 19: 'A', 20: 'A', 23: 'A', 24: 'A', 25: 'P', 26: 'P', 27: 'P'
      },
      'Mar': {
        2: 'P', 3: 'P', 4: 'P', 5: 'P', 6: 'A', 9: 'P', 10: 'P', 11: 'P', 12: 'P',
        13: 'A', 23: 'A', 24: 'A', 25: 'A', 26: 'A', 27: 'A', 28: 'A', 30: 'A', 31: 'A'
      },
      'Apr': {
        1: 'A', 2: 'A', 6: 'A', 7: 'A', 13: 'A', 14: 'A', 15: 'A', 16: 'A', 17: 'A',
        20: 'A', 21: 'A', 22: 'A', 23: 'A', 24: 'A'
      },
      'Dec': {
        9: 'P', 10: 'P', 11: 'P', 12: 'A', 15: 'P', 16: 'P', 17: 'P', 18: 'P', 19: 'P',
        22: 'P', 23: 'P', 24: 'P', 27: 'P', 29: 'P', 30: 'P', 31: 'P'
      }
    };

    // Populate weekends (Week Offs 'W') for all months
    monthsList.forEach(m => {
      if (!initialRecords[m.name]) {
        initialRecords[m.name] = {};
      }
      for (let day = 1; day <= m.days; day++) {
        if ([3, 4, 10, 11, 17, 18, 24, 25, 31].includes(day)) {
          if (!initialRecords[m.name][day]) {
            initialRecords[m.name][day] = 'W';
          }
        }
      }
    });

    localStorage.setItem('demo_attendance_records', JSON.stringify(initialRecords));
    return initialRecords;
  };

  const markTodayPresent = (records) => {
    const today = new Date();
    const currentMonthIndex = today.getMonth();
    const currentMonthName = monthsList[currentMonthIndex].name;
    const currentDay = today.getDate();

    if (!records[currentMonthName]) {
      records[currentMonthName] = {};
    }

    if (records[currentMonthName][currentDay] !== 'W') {
      records[currentMonthName][currentDay] = 'P';
    }

    localStorage.setItem('demo_attendance_records', JSON.stringify(records));
    return records;
  };

  const renderAttendanceGrid = (records) => {
    const tbody = document.getElementById('attendance-tbody');
    if (!tbody) return;

    tbody.innerHTML = '';

    monthsList.forEach(m => {
      const tr = document.createElement('tr');

      const monthTd = document.createElement('td');
      monthTd.className = 'month-label';
      monthTd.textContent = m.name;
      tr.appendChild(monthTd);

      for (let day = 1; day <= 31; day++) {
        const dayTd = document.createElement('td');
        
        if (day > m.days) {
          dayTd.className = 'empty-marker';
        } else {
          const status = records[m.name] ? records[m.name][day] : null;

          if (status === 'P') {
            dayTd.className = 'present-marker';
            dayTd.textContent = '✔';
          } else if (status === 'A') {
            dayTd.className = 'absent-marker';
            dayTd.textContent = '❌';
          } else if (status === 'W') {
            dayTd.className = 'week-off-marker';
          } else {
            dayTd.className = 'empty-marker';
          }
        }
        tr.appendChild(dayTd);
      }
      tbody.appendChild(tr);
    });
  };

  let attendanceRecords = initAttendanceData();
  attendanceRecords = markTodayPresent(attendanceRecords);
  renderAttendanceGrid(attendanceRecords);

  const yearFilter = document.getElementById('year-filter');

  const updateFilters = () => {
    const tempRecords = JSON.parse(JSON.stringify(attendanceRecords));
    
    if (yearFilter && yearFilter.value === '2025') {
      if (tempRecords['Jan']) {
        tempRecords['Jan'][2] = 'A';
        tempRecords['Jan'][5] = 'A';
        tempRecords['Jan'][8] = 'A';
      }
      if (tempRecords['Feb']) {
        tempRecords['Feb'][12] = 'A';
        tempRecords['Feb'][13] = 'A';
      }
    }

    renderAttendanceGrid(tempRecords);
  };

  if (yearFilter) yearFilter.addEventListener('change', updateFilters);

  // --- ASK DEMO CHAT INTERACTIVE LOGIC ---
  const chatBubbleBtn = document.getElementById('chat-bubble-btn');
  const chatWindow = document.getElementById('chat-window');
  const chatBody = document.getElementById('chat-body');
  const chatInput = document.getElementById('chat-input');
  const chatSendBtn = document.getElementById('chat-send-btn');

  const toggleChat = () => {
    chatWindow.classList.toggle('open');
    if (chatWindow.classList.contains('open')) {
      chatInput.focus();
      chatBody.scrollTop = chatBody.scrollHeight;
    }
  };

  if (chatBubbleBtn && chatWindow) {
    chatBubbleBtn.addEventListener('click', toggleChat);
  }

  const appendMessage = (sender, text) => {
    const msgDiv = document.createElement('div');
    msgDiv.className = `chat-msg ${sender}`;
    msgDiv.textContent = text;
    chatBody.appendChild(msgDiv);
    chatBody.scrollTop = chatBody.scrollHeight;
  };

  const getAIResponse = (userText) => {
    const lowerText = userText.toLowerCase();
    
    if (lowerText.includes('attendance') || lowerText.includes('present') || lowerText.includes('absent')) {
      return "Your attendance has been automatically updated for today! Remember, logging in each day marks you present automatically.";
    }
    if (lowerText.includes('course') || lowerText.includes('java') || lowerText.includes('progress')) {
      return "You are currently studying Core Java (Beginner Level). Your syllabus progress is at 72%. Your next topic is Multi-threading!";
    }
    if (lowerText.includes('leaderboard') || lowerText.includes('rank') || lowerText.includes('harsh')) {
      return "The Attendance Leaderboard shows the top performers this month. Harsh is currently leading at 95% attendance, followed by Neha and Deepak.";
    }
    if (lowerText.includes('hi') || lowerText.includes('hello') || lowerText.includes('hey')) {
      return "Hello! I am Demo, your AI Learning Assistant. You can ask me about your course progress, attendance details, or how to check your study modules!";
    }
    
    return "That's an interesting question! I can help you with your Java coursework, check your assignment status, or explain how to improve your daily coding stats. Ask me anything about your academy portal!";
  };

  const handleSendMessage = () => {
    const text = chatInput.value.trim();
    if (!text) return;

    appendMessage('user', text);
    chatInput.value = '';

    setTimeout(() => {
      const response = getAIResponse(text);
      appendMessage('demo', response);
    }, 800);
  };

  if (chatSendBtn && chatInput) {
    chatSendBtn.addEventListener('click', handleSendMessage);
    chatInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        handleSendMessage();
      }
    });
  }
});
