/* ============================================================
  DEMO ACADEMY - Jobs Portal (jobs.js)
  ============================================================ */

'use strict';

// ─── Data ────────────────────────────────────────────────────────────────────
const JOBS_DATA = [
  {
    id: 1,
    company: 'Google',
    logo: 'GO',
    logoColor: '#4285F4',
    cardGrad: 'linear-gradient(135deg,#4285F420,#34A85310)',
    role: 'Software Development Engineer',
    type: 'technical',
    driveType: 'active',
    ctc: '₹28 LPA',
    location: 'Hyderabad',
    openings: 30,
    lastDate: '2025-06-20',
    deadline: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000),
    applied: false,
    tags: ['Full-Time', 'On-Campus'],
    description: 'Google is hiring talented Software Development Engineers to work on large-scale distributed systems. The role involves designing, building, and maintaining highly scalable infrastructure and services that power Google products globally.',
    skills: ['Data Structures', 'Algorithms', 'System Design', 'Java / C++', 'Problem Solving'],
    academic: { tenth: '70% & above', twelfth: '70% & above', btech: '7.5 CGPA & above' },
    criteria: [
      { label: 'Batch', value: '2024 / 2025' },
      { label: 'Backlogs', value: 'None' },
      { label: 'Degree', value: 'B.E / B.Tech' },
      { label: 'Branch', value: 'CSE / IT / ECE' },
      { label: 'Mode', value: 'On-Campus' },
    ],
    otherCriteria: ['Strong communication skills', 'Willingness to relocate', 'Valid ID proof required'],
    notes: [
      'Shortlisted candidates will be notified via email within 3 days of application.',
      'Online assessment link will be sent 24 hours before the test.',
      'Carry college ID and government ID on interview day.',
    ],
    timeline: [
      { stage: 'Application Deadline', date: '20 Jun 2025', done: false },
      { stage: 'Online Assessment', date: '25 Jun 2025', done: false },
      { stage: 'Technical Interview', date: '30 Jun 2025', done: false },
      { stage: 'HR Round', date: '05 Jul 2025', done: false },
      { stage: 'Offer Letter', date: '10 Jul 2025', done: false },
    ],
  },
  {
    id: 2,
    company: 'Amazon',
    logo: 'AM',
    logoColor: '#FF9900',
    cardGrad: 'linear-gradient(135deg,#FF990018,#FF660010)',
    role: 'SDE \u2013 I (Backend)',
    type: 'technical',
    driveType: 'active',
    ctc: '₹24 LPA',
    location: 'Bangalore',
    openings: 50,
    lastDate: '2025-06-18',
    deadline: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000),
    applied: false,
    tags: ['Full-Time', 'On-Campus'],
    description: 'Amazon is looking for passionate engineers to join our SDE-I team. You will work on distributed backend services that handle millions of transactions daily across Amazon\'s e-commerce and AWS platforms.',
    skills: ['Java', 'Spring Boot', 'AWS', 'Microservices', 'SQL / NoSQL'],
    academic: { tenth: '65% & above', twelfth: '65% & above', btech: '7.0 CGPA & above' },
    criteria: [
      { label: 'Batch', value: '2025' },
      { label: 'Backlogs', value: 'None' },
      { label: 'Degree', value: 'B.E / B.Tech' },
      { label: 'Branch', value: 'CSE / IT' },
      { label: 'Mode', value: 'On-Campus' },
    ],
    otherCriteria: ['Must have internship or project experience', 'Knowledge of agile methodologies preferred'],
    notes: [
      'Amazon coding test duration: 90 minutes, 2 DSA problems.',
      'Dress code: Business casual for interview rounds.',
      'Bring printed resume (3 copies).',
    ],
    timeline: [
      { stage: 'Application Deadline', date: '18 Jun 2025', done: false },
      { stage: 'Coding Assessment', date: '22 Jun 2025', done: false },
      { stage: 'Technical Round 1', date: '28 Jun 2025', done: false },
      { stage: 'Technical Round 2', date: '01 Jul 2025', done: false },
      { stage: 'Bar Raiser', date: '05 Jul 2025', done: false },
    ],
  },
  {
    id: 3,
    company: 'Infosys',
    logo: 'IN',
    logoColor: '#007CC2',
    cardGrad: 'linear-gradient(135deg,#007CC218,#00B4D810)',
    role: 'Systems Engineer',
    type: 'technical',
    driveType: 'active',
    ctc: '₹4.5 LPA',
    location: 'Multiple Cities',
    openings: 500,
    lastDate: '2025-06-25',
    deadline: new Date(Date.now() + 13 * 24 * 60 * 60 * 1000),
    applied: false,
    tags: ['Full-Time', 'Mass Recruiting'],
    description: 'Infosys is conducting a mass recruitment drive for the role of Systems Engineer. Selected candidates will undergo a 3-month training program at Mysore before being deployed to client projects.',
    skills: ['Core Java', 'Python', 'DBMS', 'OS Concepts', 'Aptitude'],
    academic: { tenth: '60% & above', twelfth: '60% & above', btech: '6.0 CGPA & above' },
    criteria: [
      { label: 'Batch', value: '2023 / 2024 / 2025' },
      { label: 'Backlogs', value: 'Max 1 Active' },
      { label: 'Degree', value: 'B.E / B.Tech / M.Tech / MCA' },
      { label: 'Branch', value: 'Any' },
      { label: 'Mode', value: 'Open Drive' },
    ],
    otherCriteria: ['Must be willing to relocate to Mysore for training', 'Service agreement: 1 year bond'],
    notes: [
      'Test comprises Aptitude, Reasoning, Verbal, and Pseudocode sections.',
      'Carry Infosys registration ID (sent by email).',
    ],
    timeline: [
      { stage: 'Registration Deadline', date: '25 Jun 2025', done: false },
      { stage: 'Online Test', date: '30 Jun 2025', done: false },
      { stage: 'HR Interview', date: '07 Jul 2025', done: false },
      { stage: 'Offer Letter', date: '15 Jul 2025', done: false },
    ],
  },
  {
    id: 4,
    company: 'TCS',
    logo: 'TC',
    logoColor: '#0052CC',
    cardGrad: 'linear-gradient(135deg,#0052CC18,#2684FF10)',
    role: 'Assistant System Engineer',
    type: 'technical',
    driveType: 'closed',
    ctc: '₹3.36 LPA',
    location: 'Pan India',
    openings: 1000,
    lastDate: '2025-05-15',
    deadline: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    applied: true,
    tags: ['Full-Time', 'Mass Recruiting'],
    description: 'TCS NQT drive for freshers across all engineering disciplines. TCS is the world\'s second-largest IT company and offers comprehensive training to all new joiners.',
    skills: ['Aptitude', 'Core Java', 'C / C++', 'DBMS', 'Verbal'],
    academic: { tenth: '60% & above', twelfth: '60% & above', btech: '6.0 CGPA & above' },
    criteria: [
      { label: 'Batch', value: '2025' },
      { label: 'Backlogs', value: 'No Active Backlogs' },
      { label: 'Degree', value: 'B.E / B.Tech' },
      { label: 'Branch', value: 'Any' },
      { label: 'Mode', value: 'Open Drive' },
    ],
    otherCriteria: ['Service agreement: 2 years', 'Join from Jul 2025 onwards'],
    notes: [
      'TCS NQT scores are valid for 2 years.',
      'This drive is now closed.',
    ],
    timeline: [
      { stage: 'Registration', date: '01 May 2025', done: true },
      { stage: 'NQT Test', date: '10 May 2025', done: true },
      { stage: 'Interview', date: '14 May 2025', done: true },
      { stage: 'Offer Letter', date: '20 May 2025', done: true },
    ],
  },
  {
    id: 5,
    company: 'Deloitte',
    logo: 'DE',
    logoColor: '#86BC25',
    cardGrad: 'linear-gradient(135deg,#86BC2518,#A3D93510)',
    role: 'Business Technology Analyst',
    type: 'non-technical',
    driveType: 'active',
    ctc: '₹7.2 LPA',
    location: 'Mumbai',
    openings: 80,
    lastDate: '2025-06-22',
    deadline: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
    applied: false,
    tags: ['Full-Time', 'Consulting'],
    description: 'Deloitte is hiring Business Technology Analysts to work on consulting and digital transformation projects for global enterprise clients. No hardcore coding involved \u2013 focus is on problem-solving, client communication, and technology consulting.',
    skills: ['Problem Solving', 'Communication', 'MS Excel', 'PowerPoint', 'Business Analysis'],
    academic: { tenth: '65% & above', twelfth: '65% & above', btech: '7.0 CGPA & above' },
    criteria: [
      { label: 'Batch', value: '2025' },
      { label: 'Backlogs', value: 'None' },
      { label: 'Degree', value: 'B.E / B.Tech / BBA / MBA' },
      { label: 'Branch', value: 'Any' },
      { label: 'Mode', value: 'On-Campus' },
    ],
    otherCriteria: ['Excellent verbal and written communication', 'Team player with leadership skills'],
    notes: [
      'Case study round will be conducted in groups of 4\u20135.',
      'Group discussion topic will be business-related.',
    ],
    timeline: [
      { stage: 'Application Deadline', date: '22 Jun 2025', done: false },
      { stage: 'Aptitude Test', date: '28 Jun 2025', done: false },
      { stage: 'Group Discussion', date: '03 Jul 2025', done: false },
      { stage: 'Case Study Round', date: '05 Jul 2025', done: false },
      { stage: 'HR Interview', date: '08 Jul 2025', done: false },
    ],
  },
  {
    id: 6,
    company: 'Wipro',
    logo: 'WI',
    logoColor: '#9B59B6',
    cardGrad: 'linear-gradient(135deg,#9B59B618,#C39BD310)',
    role: 'Project Engineer',
    type: 'technical',
    driveType: 'closed',
    ctc: '₹3.5 LPA',
    location: 'Pune',
    openings: 300,
    lastDate: '2025-04-30',
    deadline: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000),
    applied: false,
    tags: ['Full-Time', 'Mass Recruiting'],
    description: 'Wipro WILP (Work Integrated Learning Program) for engineering freshers. Selected candidates will be trained in Wipro technologies and deployed to IT services projects.',
    skills: ['Java', 'Python', 'SQL', 'Linux', 'Networking Basics'],
    academic: { tenth: '60% & above', twelfth: '60% & above', btech: '6.5 CGPA & above' },
    criteria: [
      { label: 'Batch', value: '2024 / 2025' },
      { label: 'Backlogs', value: 'No Active Backlogs' },
      { label: 'Degree', value: 'B.E / B.Tech' },
      { label: 'Branch', value: 'CSE / IT / ECE / EEE' },
      { label: 'Mode', value: 'Open Drive' },
    ],
    otherCriteria: ['Bond: 1 year service agreement', 'Relocation required to Pune / Bangalore'],
    notes: ['Drive is now closed. Next batch registration opens in November 2025.'],
    timeline: [
      { stage: 'Registration', date: '20 Apr 2025', done: true },
      { stage: 'Online Test', date: '26 Apr 2025', done: true },
      { stage: 'Technical Interview', date: '30 Apr 2025', done: true },
      { stage: 'Offer Letter', date: '08 May 2025', done: true },
    ],
  },
  {
    id: 7,
    company: 'Razorpay',
    logo: 'RP',
    logoColor: '#3182CE',
    cardGrad: 'linear-gradient(135deg,#3182CE18,#63B3ED10)',
    role: 'Frontend Engineer Intern',
    type: 'internship',
    driveType: 'active',
    ctc: '₹50K / month',
    location: 'Bangalore (Hybrid)',
    openings: 15,
    lastDate: '2025-06-17',
    deadline: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    applied: false,
    tags: ['Internship', '6 Months'],
    description: 'Razorpay is offering a 6-month paid internship for Frontend Engineers. You will build production-level features on Razorpay\'s payment dashboard, merchant portal, and consumer checkout flow using React and TypeScript.',
    skills: ['React', 'TypeScript', 'HTML/CSS', 'REST APIs', 'Git'],
    academic: { tenth: '70% & above', twelfth: '70% & above', btech: '7.5 CGPA & above' },
    criteria: [
      { label: 'Batch', value: '2026 (Pre-final)' },
      { label: 'Backlogs', value: 'None' },
      { label: 'Degree', value: 'B.E / B.Tech' },
      { label: 'Branch', value: 'CSE / IT' },
      { label: 'Mode', value: 'Hybrid \u2013 Bangalore' },
    ],
    otherCriteria: ['Must have personal project or open-source contribution', 'Laptop with 16GB RAM preferred'],
    notes: [
      'Internship may convert to full-time (PPO) based on performance.',
      'Stipend paid on 1st of every month.',
    ],
    timeline: [
      { stage: 'Application Deadline', date: '17 Jun 2025', done: false },
      { stage: 'Coding Challenge', date: '20 Jun 2025', done: false },
      { stage: 'Technical Interview', date: '25 Jun 2025', done: false },
      { stage: 'HR Discussion', date: '27 Jun 2025', done: false },
      { stage: 'Internship Start', date: '01 Jul 2025', done: false },
    ],
  },
  {
    id: 8,
    company: 'Capgemini',
    logo: 'CG',
    logoColor: '#0070AD',
    cardGrad: 'linear-gradient(135deg,#0070AD18,#00A0DC10)',
    role: 'Associate Consultant',
    type: 'non-technical',
    driveType: 'active',
    ctc: '₹5.0 LPA',
    location: 'Chennai / Pune',
    openings: 200,
    lastDate: '2025-07-01',
    deadline: new Date(Date.now() + 19 * 24 * 60 * 60 * 1000),
    applied: false,
    tags: ['Full-Time', 'Consulting'],
    description: 'Capgemini is hiring Associate Consultants to work across IT consulting, BPO, and digital services. Role involves client engagement, documentation, testing, and delivery support for global clients.',
    skills: ['Communication', 'MS Office', 'Business Acumen', 'Analytical Thinking'],
    academic: { tenth: '55% & above', twelfth: '55% & above', btech: '6.0 CGPA & above' },
    criteria: [
      { label: 'Batch', value: '2025' },
      { label: 'Backlogs', value: 'Max 2 Cleared' },
      { label: 'Degree', value: 'Any Graduate' },
      { label: 'Branch', value: 'Any' },
      { label: 'Mode', value: 'Open Drive' },
    ],
    otherCriteria: ['Proficiency in English is mandatory', '6-month training at Capgemini University'],
    notes: ['Training stipend of ₹15,000/month during training period.'],
    timeline: [
      { stage: 'Application Deadline', date: '01 Jul 2025', done: false },
      { stage: 'Online Test', date: '06 Jul 2025', done: false },
      { stage: 'Interview', date: '12 Jul 2025', done: false },
      { stage: 'Offer Letter', date: '20 Jul 2025', done: false },
    ],
  },
  {
    id: 9,
    company: 'Swiggy',
    logo: 'SW',
    logoColor: '#FC8019',
    cardGrad: 'linear-gradient(135deg,#FC801918,#FFA50010)',
    role: 'Backend Engineer Intern',
    type: 'internship',
    driveType: 'closed',
    ctc: '₹45K / month',
    location: 'Remote',
    openings: 10,
    lastDate: '2025-05-10',
    deadline: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    applied: true,
    tags: ['Internship', '3 Months', 'Remote'],
    description: 'Swiggy offered a fully remote 3-month backend internship to work on food delivery logistics APIs. The role involved Node.js microservices, database optimization, and real-time event processing.',
    skills: ['Node.js', 'MongoDB', 'Redis', 'Kafka', 'REST APIs'],
    academic: { tenth: '65% & above', twelfth: '65% & above', btech: '7.0 CGPA & above' },
    criteria: [
      { label: 'Batch', value: '2025 / 2026' },
      { label: 'Backlogs', value: 'None' },
      { label: 'Degree', value: 'B.E / B.Tech' },
      { label: 'Branch', value: 'CSE / IT' },
      { label: 'Mode', value: 'Remote' },
    ],
    otherCriteria: ['Good internet connection required', 'Mac or Linux preferred for development'],
    notes: ['Drive closed. Results announced on 12 May 2025.'],
    timeline: [
      { stage: 'Application', date: '10 May 2025', done: true },
      { stage: 'Coding Round', date: '14 May 2025', done: true },
      { stage: 'Interview', date: '18 May 2025', done: true },
      { stage: 'Internship Start', date: '01 Jun 2025', done: true },
    ],
  },
];

// ─── Type color map ───────────────────────────────────────────────────────────
const TYPE_COLORS = {
  technical:     { bg: 'rgba(99,179,237,0.15)',  text: '#63B3ED', border: 'rgba(99,179,237,0.3)' },
  'non-technical':{ bg: 'rgba(154,117,234,0.15)', text: '#9A75EA', border: 'rgba(154,117,234,0.3)' },
  internship:    { bg: 'rgba(236,153,75,0.15)',   text: '#EC994B', border: 'rgba(236,153,75,0.3)' },
};

// ─── State ───────────────────────────────────────────────────────────────────
let currentTab = 'all';
let searchQuery = '';
let driveFilter = 'all';
let currentJob = null;
let countdownInterval = null;

// ─── Init ─────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  const saved = localStorage.getItem('demo-theme') || 'dark';
  const toggle = document.getElementById('theme-toggle');
  if (saved === 'light') {
    document.body.classList.add('light-theme');
    if (toggle) toggle.checked = true;
  } else {
    document.body.classList.remove('light-theme');
    if (toggle) toggle.checked = false;
  }
  if (toggle) toggle.addEventListener('change', () => {
    const t = toggle.checked ? 'dark' : 'light';
    if (t === 'light') {
      document.body.classList.add('light-theme');
    } else {
      document.body.classList.remove('light-theme');
    }
    localStorage.setItem('demo-theme', t);
  });

  document.querySelectorAll('.jobs-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.jobs-tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentTab = btn.dataset.tab;
      renderJobsGrid();
    });
  });

  const searchInput = document.getElementById('jobs-search-input');
  if (searchInput) searchInput.addEventListener('input', e => { searchQuery = e.target.value.toLowerCase(); renderJobsGrid(); });

  const driveSelect = document.getElementById('jobs-drive-select');
  if (driveSelect) driveSelect.addEventListener('change', e => { driveFilter = e.target.value; renderJobsGrid(); });

  // Quick filter checkboxes (Active / Closed / Applied)
  const cbActive = document.getElementById('jobs-filter-active');
  const cbClosed = document.getElementById('jobs-filter-closed');
  const cbApplied = document.getElementById('jobs-filter-applied');
  [cbActive, cbClosed, cbApplied].forEach(cb => { if (cb) cb.addEventListener('change', () => renderJobsGrid()); });

  // Jobs filters dropdown toggle (animated like company filters)
  const btnToggleJobsFilters = document.getElementById('btn-toggle-jobs-filters');
  const jobsFiltersDropdown = document.getElementById('jobs-filters-dropdown');

  // Use shared open/close if available (from companies.js), otherwise fallback
  const openDropdownEl = (el) => {
    if (window.demoFilters && typeof window.demoFilters.openDropdown === 'function') {
      return window.demoFilters.openDropdown(el);
    }
    if (!el) return;
    el.classList.remove('hidden');
    requestAnimationFrame(() => el.classList.add('open'));
  };
  const closeDropdownEl = (el) => {
    if (window.demoFilters && typeof window.demoFilters.closeDropdown === 'function') {
      return window.demoFilters.closeDropdown(el);
    }
    if (!el) return;
    el.classList.remove('open');
    const onEnd = () => { el.classList.add('hidden'); el.removeEventListener('transitionend', onEnd); };
    el.addEventListener('transitionend', onEnd);
  };

  if (btnToggleJobsFilters && jobsFiltersDropdown) {
    btnToggleJobsFilters.addEventListener('click', (e) => {
      e.stopPropagation();
      if (jobsFiltersDropdown.classList.contains('hidden')) openDropdownEl(jobsFiltersDropdown);
      else closeDropdownEl(jobsFiltersDropdown);
    });

    document.addEventListener('click', (evt) => {
      const target = evt.target;
      if (!jobsFiltersDropdown.contains(target) && target !== btnToggleJobsFilters) {
        if (!jobsFiltersDropdown.classList.contains('hidden')) closeDropdownEl(jobsFiltersDropdown);
      }
    });
  }

  const termsCb = document.getElementById('jobs-terms-cb');
  if (termsCb) termsCb.addEventListener('change', () => {
    const applyBtn = document.getElementById('jobs-apply-btn');
    if (applyBtn) applyBtn.disabled = !termsCb.checked;
  });

  const applyBtn = document.getElementById('jobs-apply-btn');
  if (applyBtn) applyBtn.addEventListener('click', handleApply);

  renderJobsGrid();
});

// ─── Filter ───────────────────────────────────────────────────────────────────
function getFilteredJobs() {
  return JOBS_DATA.filter(job => {
    if (currentTab === 'applied') return job.applied;
    if (currentTab !== 'all' && job.type !== currentTab) return false;
    if (driveFilter !== 'all' && job.driveType !== driveFilter) return false;
    if (searchQuery) {
      const h = (job.company + ' ' + job.role + ' ' + job.location).toLowerCase();
      if (!h.includes(searchQuery)) return false;
    }

    // Apply quick checkbox filters if any selected
    const cbA = document.getElementById('jobs-filter-active');
    const cbC = document.getElementById('jobs-filter-closed');
    const cbP = document.getElementById('jobs-filter-applied');
    const anyChecked = (cbA && cbA.checked) || (cbC && cbC.checked) || (cbP && cbP.checked);
    if (anyChecked) {
      let matched = false;
      if (cbA && cbA.checked && job.driveType === 'active') matched = true;
      if (cbC && cbC.checked && job.driveType === 'closed') matched = true;
      if (cbP && cbP.checked && job.applied) matched = true;
      if (!matched) return false;
    }
    return true;
  });
}

// ─── Render Grid ──────────────────────────────────────────────────────────────
function renderJobsGrid() {
  const grid = document.getElementById('jobs-grid');
  const countEl = document.getElementById('jobs-count-num');
  const jobs = getFilteredJobs();
  if (countEl) countEl.textContent = jobs.length;
  if (!grid) return;

  if (jobs.length === 0) {
    grid.innerHTML = `
      <div class="jobs-empty-state">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="64" height="64" style="opacity:0.3;">
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
        </svg>
        <p>No drives match your filter.</p>
      </div>`;
    return;
  }

  grid.innerHTML = jobs.map(job => {
    const isActive = job.driveType === 'active';
    const isClosed = job.driveType === 'closed';
    const tc = TYPE_COLORS[job.type] || TYPE_COLORS.technical;
    const tagHTML = job.tags.map(t => `<span class="jobs-card-tag" style="background:${tc.bg};color:${tc.text};border-color:${tc.border};">${t}</span>`).join('');
    const appliedBadge = job.applied ? `<span class="jobs-card-applied-badge">&#10003; Applied</span>` : '';
    const typeBadge = `<span class="jobs-card-type-pill" style="background:${tc.bg};color:${tc.text};border:1px solid ${tc.border};">${capitalise(job.type)}</span>`;

    return `
      <div class="jobs-card" onclick="openJobDetail(${job.id})" id="jobs-card-${job.id}"
           style="border-left: 3px solid ${job.logoColor};">
        <div class="jobs-card-header">
          <div class="jobs-card-logo" style="background:${job.logoColor};color:#fff;">${job.logo}</div>
          <div style="display:flex;flex-direction:column;align-items:flex-end;gap:5px;">
            <div class="jobs-card-status-wrap">
              <span class="jobs-status-dot ${isActive ? 'dot-active' : 'dot-closed'}"></span>
              <span class="jobs-status-label ${isActive ? 'label-active' : 'label-closed'}">${isActive ? 'Active' : 'Closed'}</span>
            </div>
            ${typeBadge}
          </div>
        </div>
        <div class="jobs-card-body">
          <h3 class="jobs-card-company">${job.company}</h3>
          <p class="jobs-card-role">${job.role}</p>
          <div class="jobs-card-tags">${tagHTML}</div>
        </div>
        <div class="jobs-card-ctc-bar" style="border-color:${job.logoColor}30;">
          <div class="jobs-card-ctc-val" style="color:${job.logoColor};">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="14" height="14">
              <line x1="12" y1="1" x2="12" y2="23"/>
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
            </svg>
            ${job.ctc}
          </div>
          <div class="jobs-card-location">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="12" height="12">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
            ${job.location}
          </div>
        </div>
        <div class="jobs-card-footer">
          ${appliedBadge}
          <button class="jobs-card-know-more ${isClosed ? 'btn-closed' : ''}"
                  style="${!isClosed ? 'background:' + job.logoColor + ';' : ''}">
            ${isClosed ? 'View Details' : 'Know More'}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="13" height="13">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </button>
        </div>
      </div>`;
  }).join('');
}

// ─── Open Detail ─────────────────────────────────────────────────────────────
function openJobDetail(id) {
  currentJob = JOBS_DATA.find(j => j.id === id);
  if (!currentJob) return;

  document.getElementById('jobs-list-view').style.display = 'none';
  document.getElementById('jobs-detail-view').style.display = 'block';

  const job = currentJob;
  const isActive = job.driveType === 'active';
  const isClosed = job.driveType === 'closed';

  // Hero logo
  const logo = document.getElementById('jobs-detail-logo');
  logo.textContent = job.logo;
  logo.style.background = job.logoColor;
  logo.style.color = '#fff';

  document.getElementById('jobs-detail-company').textContent = job.company;
  document.getElementById('jobs-detail-role').textContent = job.role;

  const badgesEl = document.getElementById('jobs-detail-badges');
  badgesEl.innerHTML = `
    <span class="jobs-badge ${isActive ? 'jobs-badge-active' : 'jobs-badge-closed'}">${isActive ? 'Active' : 'Closed'}</span>
    <span class="jobs-badge jobs-badge-type">${capitalise(job.type)}</span>
    ${job.applied ? '<span class="jobs-badge jobs-badge-applied">&#10003; Applied</span>' : ''}
  `;

  // Countdown
  const countdownBox = document.getElementById('jobs-countdown-box');
  if (countdownInterval) clearInterval(countdownInterval);
  if (isActive) { countdownBox.style.display = 'flex'; startCountdown(job.deadline); }
  else { countdownBox.style.display = 'none'; }

  // Description
  document.getElementById('jobs-detail-desc').textContent = job.description;

  // ── Academic 3-box section ───────────────────────────────────────
  const acadGrid = document.getElementById('jobs-academic-grid');
  if (acadGrid && job.academic) {
    acadGrid.innerHTML = `
      <div class="jobs-acad-box" style="border-top:3px solid #F6AD55;">
        <div class="jobs-acad-icon" style="background:rgba(246,173,85,0.12);color:#F6AD55;">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18">
            <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
            <path d="M6 12v5c3 3 9 3 12 0v-5"/>
          </svg>
        </div>
        <div class="jobs-acad-info">
          <span class="jobs-acad-label">10th Standard</span>
          <span class="jobs-acad-value">${job.academic.tenth}</span>
        </div>
      </div>
      <div class="jobs-acad-box" style="border-top:3px solid #68D391;">
        <div class="jobs-acad-icon" style="background:rgba(104,211,145,0.12);color:#68D391;">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
            <line x1="16" y1="2" x2="16" y2="6"/>
            <line x1="8" y1="2" x2="8" y2="6"/>
            <line x1="3" y1="10" x2="21" y2="10"/>
          </svg>
        </div>
        <div class="jobs-acad-info">
          <span class="jobs-acad-label">12th / Diploma</span>
          <span class="jobs-acad-value">${job.academic.twelfth}</span>
        </div>
      </div>
      <div class="jobs-acad-box" style="border-top:3px solid ${job.logoColor};">
        <div class="jobs-acad-icon" style="background:${job.logoColor}18;color:${job.logoColor};">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18">
            <circle cx="12" cy="8" r="6"/>
            <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/>
          </svg>
        </div>
        <div class="jobs-acad-info">
          <span class="jobs-acad-label">B.Tech / B.E</span>
          <span class="jobs-acad-value">${job.academic.btech}</span>
        </div>
      </div>`;
  }

  // Criteria grid (without CGPA - now shown in academic section)
  const criteriaGrid = document.getElementById('jobs-criteria-grid');
  criteriaGrid.innerHTML = job.criteria.map(c => `
    <div class="jobs-criteria-item">
      <span class="jobs-criteria-label">${c.label}</span>
      <span class="jobs-criteria-val">${c.value}</span>
    </div>`).join('');

  // Skills
  document.getElementById('jobs-skills-wrap').innerHTML =
    job.skills.map(s => `<span class="jobs-skill-badge">${s}</span>`).join('');

  // Other criteria
  document.getElementById('jobs-other-wrap').innerHTML =
    job.otherCriteria.map(o => `
      <div class="jobs-other-item">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
        ${o}
      </div>`).join('');

  // Notes
  document.getElementById('jobs-notes-list').innerHTML =
    job.notes.map(n => `<li>${n}</li>`).join('');

  // Salary / meta
  document.getElementById('jobs-salary-val').textContent = job.ctc;
  document.getElementById('jobs-location-val').textContent = job.location;
  document.getElementById('jobs-openings-val').textContent = job.openings;
  document.getElementById('jobs-lastdate-val').textContent = formatDate(job.lastDate);

  // Apply state
  const applyBtn = document.getElementById('jobs-apply-btn');
  const termsCb  = document.getElementById('jobs-terms-cb');
  const appliedNote = document.getElementById('jobs-applied-note');
  const termsLabel  = document.getElementById('jobs-terms-label');
  termsCb.checked = false;

  if (isClosed) {
    applyBtn.style.display = 'none'; termsLabel.style.display = 'none'; appliedNote.style.display = 'none';
  } else if (job.applied) {
    applyBtn.style.display = 'none'; termsLabel.style.display = 'none'; appliedNote.style.display = 'flex';
  } else {
    applyBtn.style.display = 'block'; applyBtn.disabled = true;
    termsLabel.style.display = 'flex'; appliedNote.style.display = 'none';
    applyBtn.style.background = `linear-gradient(135deg, ${job.logoColor}, ${job.logoColor}cc)`;
  }

  // Timeline
  document.getElementById('jobs-timeline').innerHTML =
    job.timeline.map((t, i) => `
      <div class="jobs-timeline-item ${t.done ? 'done' : ''}">
        <div class="jobs-tl-dot" ${t.done ? '' : `style="border-color:${job.logoColor}50;"`}>${t.done ? '&#10003;' : (i + 1)}</div>
        <div class="jobs-tl-info">
          <div class="jobs-tl-stage">${t.stage}</div>
          <div class="jobs-tl-date">${t.date}</div>
        </div>
      </div>`).join('');

  document.querySelector('.main-content').scrollTo({ top: 0, behavior: 'smooth' });
}

// ─── Back ─────────────────────────────────────────────────────────────────────
function jobsGoBack() {
  document.getElementById('jobs-detail-view').style.display = 'none';
  document.getElementById('jobs-list-view').style.display = 'block';
  if (countdownInterval) clearInterval(countdownInterval);
  currentJob = null;
}

// ─── Apply ───────────────────────────────────────────────────────────────────
function handleApply() {
  if (!currentJob) return;
  const job = JOBS_DATA.find(j => j.id === currentJob.id);
  if (!job) return;
  job.applied = true;

  document.getElementById('jobs-apply-btn').style.display = 'none';
  document.getElementById('jobs-terms-label').style.display = 'none';
  document.getElementById('jobs-applied-note').style.display = 'flex';

  const badgesEl = document.getElementById('jobs-detail-badges');
  if (!badgesEl.querySelector('.jobs-badge-applied')) {
    const span = document.createElement('span');
    span.className = 'jobs-badge jobs-badge-applied';
    span.textContent = '\u2713 Applied';
    badgesEl.appendChild(span);
  }
  const card = document.getElementById(`jobs-card-${job.id}`);
  if (card) card.classList.add('applied');
}

// ─── Countdown ────────────────────────────────────────────────────────────────
function startCountdown(target) {
  function update() {
    const diff = target - Date.now();
    if (diff <= 0) { clearInterval(countdownInterval); return; }
    const days  = Math.floor(diff / 86400000);
    const hours = Math.floor((diff % 86400000) / 3600000);
    const mins  = Math.floor((diff % 3600000)  / 60000);
    const secs  = Math.floor((diff % 60000)    / 1000);
    document.getElementById('jcd-days').textContent  = String(days).padStart(2,'0');
    document.getElementById('jcd-hours').textContent = String(hours).padStart(2,'0');
    document.getElementById('jcd-mins').textContent  = String(mins).padStart(2,'0');
    document.getElementById('jcd-secs').textContent  = String(secs).padStart(2,'0');
  }
  update();
  countdownInterval = setInterval(update, 1000);
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function capitalise(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).replace('-', ' ');
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}
