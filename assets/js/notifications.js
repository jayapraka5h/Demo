document.addEventListener('DOMContentLoaded', () => {
  // Initialize mock notifications in localStorage if not exists
  if (!localStorage.getItem('demo_notifications')) {
    localStorage.setItem('demo_notifications', JSON.stringify([
      {
        id: 1,
        type: 'courses',
        title: 'New Lesson Added',
        desc: 'Spring Boot Security Advanced Concepts has been uploaded.',
        time: '2 hours ago'
      },
      {
        id: 2,
        type: 'jobs',
        title: 'Job Match Alert',
        desc: 'Wipro is hiring Software Engineers. Apply now in Jobs section.',
        time: '4 hours ago'
      },
      {
        id: 3,
        type: 'updates',
        title: 'System Maintenance',
        desc: 'Academy Portal will undergo maintenance tonight at 12 AM.',
        time: '1 day ago'
      },
      {
        id: 4,
        type: 'courses',
        title: 'Assignment Graded',
        desc: 'Your Java OOP Practice Assignment has been graded: 90%.',
        time: '2 days ago'
      },
      {
        id: 5,
        type: 'jobs',
        title: 'New Drive Posted',
        desc: 'Google Summer internship drive is now open for registrations.',
        time: '3 days ago'
      }
    ]));
  }

  const notificationBtn = document.getElementById('btn-notifications');
  const dropdown = document.getElementById('notification-dropdown');
  const threeDotBtn = document.getElementById('btn-notification-3dot');
  const filterMenu = document.getElementById('notification-filter-menu');
  const notificationBody = document.getElementById('notification-body');
  const readAllBtn = document.getElementById('btn-read-all');
  
  let currentFilter = 'all';

  // Toggle notification dropdown
  if (notificationBtn && dropdown) {
    notificationBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      dropdown.classList.toggle('open');
      if (filterMenu) filterMenu.classList.add('hidden'); // Close filter menu if open
    });
  }

  // Toggle 3-dot filter menu
  if (threeDotBtn && filterMenu) {
    threeDotBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      filterMenu.classList.toggle('hidden');
    });
  }

  // Close dropdowns on outside click
  document.addEventListener('click', (e) => {
    if (dropdown && !dropdown.contains(e.target) && e.target !== notificationBtn) {
      dropdown.classList.remove('open');
    }
    if (filterMenu && !filterMenu.contains(e.target) && e.target !== threeDotBtn) {
      filterMenu.classList.add('hidden');
    }
  });

  // Get notifications
  const getNotifications = () => {
    return JSON.parse(localStorage.getItem('demo_notifications')) || [];
  };

  // Save notifications
  const saveNotifications = (list) => {
    localStorage.setItem('demo_notifications', JSON.stringify(list));
    updateBadge();
  };

  // Update notification badge dot (only if there are unread notifications)
  const updateBadge = () => {
    const list = getNotifications();
    const hasUnread = list.some(item => !item.read);
    const badge = document.querySelector('.badge-dot');
    if (badge) {
      if (hasUnread) {
        badge.style.display = 'block';
      } else {
        badge.style.display = 'none';
      }
    }
  };

  // Render notifications in UI
  const renderNotifications = () => {
    if (!notificationBody) return;
    notificationBody.innerHTML = '';
    
    let list = getNotifications();
    if (currentFilter !== 'all') {
      list = list.filter(item => item.type === currentFilter);
    }

    if (list.length === 0) {
      notificationBody.innerHTML = `
        <div style="padding: 24px; text-align: center; color: var(--text-secondary); font-size: 0.85rem;">
          No notifications available.
        </div>
      `;
      return;
    }

    list.forEach(item => {
      const el = document.createElement('div');
      el.className = `notification-item ${item.read ? 'read' : 'unread'}`;
      el.dataset.id = item.id;
      
      const tickAction = item.read 
        ? `<span class="notification-read-status" style="color: var(--accent-green); padding: 4px; display: flex; align-items: center; justify-content: center; margin-top: 2px; flex-shrink: 0;">
             <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" width="16" height="16">
               <polyline points="20 6 9 17 4 12"/>
             </svg>
           </span>`
        : `<button class="notification-tick-btn" aria-label="Mark as read" onclick="dismissNotification(event, ${item.id})">
             <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" width="16" height="16">
               <polyline points="20 6 9 17 4 12"/>
             </svg>
           </button>`;

      el.innerHTML = `
        <div class="notification-item-content">
          <div class="notification-item-title">${item.title}</div>
          <div class="notification-item-desc">${item.desc}</div>
          <div class="notification-item-time">${item.time}</div>
        </div>
        ${tickAction}
      `;
      notificationBody.appendChild(el);
    });
  };

  // Handle individual notification checkmark / tick click
  window.dismissNotification = (event, id) => {
    event.stopPropagation();
    let list = getNotifications();
    const item = list.find(n => n.id === id);
    if (item) {
      item.read = true;
    }
    saveNotifications(list);
    renderNotifications();
  };

  // Handle filter clicks
  if (filterMenu) {
    filterMenu.querySelectorAll('.filter-opt').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        filterMenu.querySelectorAll('.filter-opt').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.dataset.type;
        filterMenu.classList.add('hidden');
        renderNotifications();
      });
    });
  }

  // Handle Read All button click
  if (readAllBtn) {
    readAllBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      let list = getNotifications();
      list.forEach(item => {
        if (currentFilter === 'all' || item.type === currentFilter) {
          item.read = true;
        }
      });
      saveNotifications(list);
      renderNotifications();
    });
  }

  // --- CONSTRUCTION MODAL FOR DEMO FEATURES ---
  const injectConstructionModal = () => {
    if (document.getElementById('demo-construction-modal')) return;

    const modal = document.createElement('div');
    modal.className = 'demo-modal';
    modal.id = 'demo-construction-modal';
    modal.innerHTML = `
      <div class="demo-modal-content">
        <div class="demo-modal-header">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--accent-orange)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-bottom: 8px;">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
            <line x1="12" y1="9" x2="12" y2="13"/>
            <line x1="12" y1="17" x2="12.01" y2="17"/>
          </svg>
          <h3>Under Construction</h3>
        </div>
        <p>This feature is currently under development for Demo Academy. Stay tuned!</p>
        <button class="demo-modal-close-btn" id="btn-close-construction-modal">Okay</button>
      </div>
    `;
    document.body.appendChild(modal);

    const closeBtn = document.getElementById('btn-close-construction-modal');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        modal.classList.remove('open');
      });
    }

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('open');
      }
    });
  };

  const showConstructionModal = () => {
    injectConstructionModal();
    const modal = document.getElementById('demo-construction-modal');
    if (modal) {
      modal.classList.add('open');
    }
  };

  // Attach click events to "QR Scanner", "Bookmarks", "Profile", "Report an Issue"
  const attachDemoListeners = () => {
    // 1. QR Scanner (in header)
    document.querySelectorAll('.action-btn[aria-label="QR Scanner"]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        showConstructionModal();
      });
    });

    // 2. Report an Issue, Profile, Bookmarks (links in sidebar pointing to "#" or "#link")
    document.querySelectorAll('.sidebar .nav-links a[href="#"], .sidebar-footer a[href="#"]').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        showConstructionModal();
      });
    });

    // 3. User Profile Avatar (in top-right header)
    document.querySelectorAll('.user-profile').forEach(avatar => {
      avatar.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        showConstructionModal();
      });
    });
  };

  // Initial runs
  updateBadge();
  renderNotifications();
  injectConstructionModal();
  attachDemoListeners();
});
