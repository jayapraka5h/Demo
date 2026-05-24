/* ============================================================
   DEMO ACADEMY – common.js
   Shared logic: Theme toggle, Chat widget, Page transitions
   Loaded on every page AFTER notifications.js
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── PAGE ENTRY ANIMATION ─────────────────────────────────── */
  const mainContent = document.querySelector('.main-content');
  if (mainContent) {
    mainContent.classList.add('page-entering');
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        mainContent.classList.add('page-entered');
      });
    });
  }

  /* ── THEME ENGINE ─────────────────────────────────────────── */
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
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
  }

  /* ── SIDEBAR NAV TRANSITION ANIMATION ─────────────────────── */
  // Add smooth page-out animation before navigation
  document.querySelectorAll('.nav-item a[href]').forEach(link => {
    const href = link.getAttribute('href');
    if (!href || href === '#' || href.startsWith('javascript')) return;

    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = link.getAttribute('href');
      if (mainContent) {
        mainContent.classList.add('page-leaving');
        setTimeout(() => {
          window.location.href = target;
        }, 280);
      } else {
        window.location.href = target;
      }
    });
  });

  /* ── CHAT WIDGET ─────────────────────────────────────────── */
  const chatBubbleBtn = document.getElementById('chat-bubble-btn');
  const chatWindow    = document.getElementById('chat-window');
  const chatBody      = document.getElementById('chat-body');
  const chatInput     = document.getElementById('chat-input');
  const chatSendBtn   = document.getElementById('chat-send-btn');

  if (chatBubbleBtn && chatWindow) {
    const toggleChat = () => {
      chatWindow.classList.toggle('open');
      if (chatWindow.classList.contains('open') && chatInput) {
        chatInput.focus();
        if (chatBody) chatBody.scrollTop = chatBody.scrollHeight;
      }
    };
    chatBubbleBtn.addEventListener('click', toggleChat);
  }

  const appendMessage = (sender, text) => {
    if (!chatBody) return;
    const msgDiv = document.createElement('div');
    msgDiv.className = `chat-msg ${sender}`;
    msgDiv.textContent = text;
    chatBody.appendChild(msgDiv);
    chatBody.scrollTop = chatBody.scrollHeight;
  };

  const getAIResponse = (userText) => {
    const lowerText = userText.toLowerCase();
    if (lowerText.includes('attendance') || lowerText.includes('present') || lowerText.includes('absent')) {
      return 'Your attendance has been automatically updated for today! Remember, logging in each day marks you present automatically.';
    }
    if (lowerText.includes('course') || lowerText.includes('java') || lowerText.includes('progress')) {
      return 'You are currently studying Core Java (Beginner Level). Your syllabus progress is at 72%. Your next topic is Multi-threading!';
    }
    if (lowerText.includes('job') || lowerText.includes('drive') || lowerText.includes('placement')) {
      return 'Check the Jobs Portal for active placement drives from Google, Amazon, Infosys, and more! Filter by Technical, Non-Technical, or Internship.';
    }
    if (lowerText.includes('assignment') || lowerText.includes('quiz') || lowerText.includes('question')) {
      return 'Head to Assignments to track your subject-wise progress. You can solve questions under each topic module!';
    }
    if (lowerText.includes('leaderboard') || lowerText.includes('rank') || lowerText.includes('harsh')) {
      return 'The Attendance Leaderboard shows the top performers this month. Harsh is currently leading at 95% attendance, followed by Neha and Deepak.';
    }
    if (lowerText.includes('hi') || lowerText.includes('hello') || lowerText.includes('hey')) {
      return 'Hello! I am Demo, your AI Learning Assistant. Ask me about your courses, assignments, jobs, or attendance!';
    }
    return "That's an interesting question! I can help with your Java coursework, assignment progress, placement drives, or attendance tracking. Ask me anything!";
  };

  const handleSendMessage = () => {
    if (!chatInput) return;
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
      if (e.key === 'Enter') handleSendMessage();
    });
  }

  /* ── APPLY SUCCESS TOAST (Jobs page) ─────────────────────── */
  // Expose global helper so jobs.js can trigger a toast notification
  window.showApplySuccessToast = (companyName) => {
    let toast = document.getElementById('demo-apply-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'demo-apply-toast';
      toast.className = 'demo-apply-toast';
      document.body.appendChild(toast);
    }
    toast.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="20" height="20">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
        <polyline points="22 4 12 14.01 9 11.01"/>
      </svg>
      <span>Successfully applied to <strong>${companyName}</strong>!</span>
    `;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 4000);
  };

});
