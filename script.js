// --- Initial Formal Mock Data ---
const defaultUsers = [
  { firstName: 'Student', lastName: 'User', email: 'student@uni.edu.ph', username: 'student_admin', password: 'Password123!', role: 'Student' },
  { firstName: 'Department', lastName: 'Officer', email: 'dept@uni.edu.ph', username: 'dept_officer', password: 'Password123!', role: 'Department' }
];

const defaultItems = [
  { id: 1, name: 'Hydro Flask Tumbler (Midnight Blue)', category: 'Tumbler', location: 'University Gymnasium', department: 'Athletics Department', description: '900ml matte navy container with custom engraving', date: '2026-10-20', status: 'Available', image: null, type: 'Found', postedBy: 'dept_officer' },
  { id: 2, name: 'Automatic Folding Umbrella (Charcoal)', category: 'Payong (Umbrella)', location: 'Science Hall Corridor', department: 'College of Science Dean Office', description: 'Heavy-duty windproof canvas with wooden handle', date: '2026-10-21', status: 'Available', image: null, type: 'Found', postedBy: 'dept_officer' },
  { id: 3, name: 'Parker Ballpoint Pen (Black & Gold)', category: 'Ballpen / Stationary', location: 'Main Library Research Section', department: 'University Library Services', description: 'Fine-point black ink writing instrument in velvet sleeve', date: '2026-10-22', status: 'Available', image: null, type: 'Found', postedBy: 'dept_officer' }
];

let users = JSON.parse(localStorage.getItem('app_users')) || defaultUsers;
let items = JSON.parse(localStorage.getItem('app_items')) || defaultItems;
let currentUser = JSON.parse(localStorage.getItem('app_current_user')) || null;

// Automatically restore session if active user exists
window.addEventListener('DOMContentLoaded', () => {
  if (currentUser) {
    showDashboard();
  }
});

// --- Toast Notification System ---
function showToast(message, type = 'success') {
  const container = document.getElementById('toastContainer');
  if (!container) return;
  const toast = document.createElement('div');
  const bgColor = type === 'success' ? 'bg-slate-900 text-white border-amber-600 dark:bg-slate-800' : 'bg-rose-900 text-white border-rose-600';
  
  toast.className = `${bgColor} px-4 py-3 rounded shadow-lg border-l-4 text-xs font-semibold flex items-center justify-between transition-all transform translate-y-2 opacity-0`;
  toast.innerHTML = `<span>${message}</span>`;
  
  container.appendChild(toast);
  setTimeout(() => toast.classList.remove('translate-y-2', 'opacity-0'), 50);

  setTimeout(() => {
    toast.classList.add('opacity-0', 'translate-y-2');
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// --- Dark/Light Mode Handling ---
function initTheme() {
  const savedTheme = localStorage.getItem('app_theme') || 'light';
  const sunIcon = document.getElementById('sunIcon');
  const moonIcon = document.getElementById('moonIcon');

  if (savedTheme === 'dark') {
    document.documentElement.classList.add('dark');
    if (sunIcon) sunIcon.classList.remove('hidden');
    if (moonIcon) moonIcon.classList.add('hidden');
  } else {
    document.documentElement.classList.remove('dark');
    if (sunIcon) sunIcon.classList.add('hidden');
    if (moonIcon) moonIcon.classList.remove('hidden');
  }
}

function toggleTheme() {
  const sunIcon = document.getElementById('sunIcon');
  const moonIcon = document.getElementById('moonIcon');

  if (document.documentElement.classList.contains('dark')) {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('app_theme', 'light');
    if (sunIcon) sunIcon.classList.add('hidden');
    if (moonIcon) moonIcon.classList.remove('hidden');
  } else {
    document.documentElement.classList.add('dark');
    localStorage.setItem('app_theme', 'dark');
    if (sunIcon) sunIcon.classList.remove('hidden');
    if (moonIcon) moonIcon.classList.add('hidden');
  }
}

initTheme();

// --- Toggle Password Visibility ---
function togglePasswordVisibility(inputId, iconId) {
  const inputField = document.getElementById(inputId);
  const icon = document.getElementById(iconId);
  if (!inputField || !icon) return;

  if (inputField.type === 'password') {
    inputField.type = 'text';
    icon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a10.03 10.03 0 012.042-3.38m2.164-2.162A9.957 9.957 0 0112 5c4.478 0 8.268 2.943 9.542 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3l18 18" />`;
  } else {
    inputField.type = 'password';
    icon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />`;
  }
}

// --- Tab Switching ---
function switchAuthTab(tab) {
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');
  const loginTabBtn = document.getElementById('loginTabBtn');
  const registerTabBtn = document.getElementById('registerTabBtn');

  if (!loginForm || !registerForm) return;

  if (tab === 'login') {
    loginForm.classList.remove('hidden');
    registerForm.classList.add('hidden');
    if (loginTabBtn) loginTabBtn.className = "w-1/2 pb-2 text-center font-semibold border-b-2 border-slate-900 dark:border-slate-100 text-slate-900 dark:text-white text-sm transition";
    if (registerTabBtn) registerTabBtn.className = "w-1/2 pb-2 text-center font-semibold text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 text-sm transition";
  } else {
    loginForm.classList.add('hidden');
    registerForm.classList.remove('hidden');
    if (registerTabBtn) registerTabBtn.className = "w-1/2 pb-2 text-center font-semibold border-b-2 border-slate-900 dark:border-slate-100 text-slate-900 dark:text-white text-sm transition";
    if (loginTabBtn) loginTabBtn.className = "w-1/2 pb-2 text-center font-semibold text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 text-sm transition";
  }
}

function switchStudentTab(tab) {
  const foundSec = document.getElementById('studentFoundSection');
  const lostSec = document.getElementById('studentLostSection');
  const btnFound = document.getElementById('studentTabFound');
  const btnLost = document.getElementById('studentTabLost');

  if (!foundSec || !lostSec) return;

  if (tab === 'found') {
    foundSec.classList.remove('hidden');
    lostSec.classList.add('hidden');
    if (btnFound) btnFound.className = "text-xs font-semibold px-4 py-2 rounded bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 transition";
    if (btnLost) btnLost.className = "text-xs font-semibold px-4 py-2 rounded border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition";
    renderStudentItems();
  } else {
    foundSec.classList.add('hidden');
    lostSec.classList.remove('hidden');
    if (btnLost) btnLost.className = "text-xs font-semibold px-4 py-2 rounded bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 transition";
    if (btnFound) btnFound.className = "text-xs font-semibold px-4 py-2 rounded border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition";
    renderLostItems();
  }
}

// --- Password Strength Checker ---
function validatePasswordStrength(pwd) {
  const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return strongRegex.test(pwd);
}

function checkPasswordStrength(inputId = 'regPassword', barId = 'strengthBar', textId = 'strengthText') {
  const inputEl = document.getElementById(inputId);
  const bar = document.getElementById(barId);
  const text = document.getElementById(textId);
  if (!inputEl || !bar || !text) return;

  const pwd = inputEl.value;

  if (!pwd) {
    bar.style.width = '0%';
    text.innerText = 'Enter security credentials';
    text.className = 'text-xs mt-1 text-slate-500 dark:text-slate-400 font-medium';
    return;
  }

  if (validatePasswordStrength(pwd)) {
    bar.style.width = '100%';
    bar.className = 'h-full bg-emerald-600 transition-all duration-300';
    text.innerText = 'Security standard met';
    text.className = 'text-xs mt-1 text-emerald-600 dark:text-emerald-400 font-semibold';
  } else {
    bar.style.width = '40%';
    bar.className = 'h-full bg-rose-600 transition-all duration-300';
    text.innerText = 'Insufficient complexity requirements';
    text.className = 'text-xs mt-1 text-rose-600 dark:text-rose-400 font-semibold';
  }
}

// --- Settings Menu Handlers ---
function openSettingsModal() {
  if (!currentUser) return;
  document.getElementById('settingsFullName').innerText = `${currentUser.firstName || ''} ${currentUser.lastName || ''}`;
  document.getElementById('settingsEmail').innerText = currentUser.email || 'N/A';
  document.getElementById('settingsUsername').innerText = currentUser.username;
  document.getElementById('settingsRole').innerText = currentUser.role;
  document.getElementById('settingsModal').classList.remove('hidden');
}

function closeSettingsModal() {
  document.getElementById('settingsModal').classList.add('hidden');
}

function handleChangePassword(e) {
  e.preventDefault();
  const newPwdField = document.getElementById('newPassword');
  if (!newPwdField) return;
  const newPwd = newPwdField.value;

  if (!validatePasswordStrength(newPwd)) {
    showToast('Update rejected: New password does not meet institutional strength standards.', 'error');
    return;
  }

  const userIndex = users.findIndex(u => u.username === currentUser.username);
  if (userIndex !== -1) {
    users[userIndex].password = newPwd;
    currentUser.password = newPwd;
    localStorage.setItem('app_users', JSON.stringify(users));
    localStorage.setItem('app_current_user', JSON.stringify(currentUser));
    showToast('Password updated successfully.');
    newPwdField.value = '';
    checkPasswordStrength('newPassword', 'settingsStrengthBar', 'settingsStrengthText');
    closeSettingsModal();
  }
}

function handleResetData() {
  if (confirm('Warning: This will clear all added records and custom user accounts, resetting to default system data. Continue?')) {
    localStorage.removeItem('app_users');
    localStorage.removeItem('app_items');
    localStorage.removeItem('app_current_user');
    users = [...defaultUsers];
    items = [...defaultItems];
    currentUser = null;
    showToast('System storage successfully reset.');
    closeSettingsModal();
    logout();
  }
}

// --- Auth Handlers ---
function handleRegister(e) {
  e.preventDefault();
  const firstName = document.getElementById('regFirstName').value.trim();
  const lastName = document.getElementById('regLastName').value.trim();
  const email = document.getElementById('regEmail').value.trim();
  const username = document.getElementById('regUsername').value.trim();
  const role = document.getElementById('regRole').value;
  const password = document.getElementById('regPassword').value;

  if (!validatePasswordStrength(password)) {
    showToast('Registration rejected: Password does not meet complexity requirements.', 'error');
    return;
  }

  if (users.some(u => u.username === username)) {
    showToast('Registration error: Username already exists in registry.', 'error');
    return;
  }

  const newUser = { firstName, lastName, email, username, password, role };
  users.push(newUser);
  localStorage.setItem('app_users', JSON.stringify(users));
  showToast('Account successfully registered! Please sign in.');
  switchAuthTab('login');
  document.getElementById('registerForm').reset();
  checkPasswordStrength('regPassword', 'strengthBar', 'strengthText');
}

function handleLogin(e) {
  e.preventDefault();
  const username = document.getElementById('loginUsername').value.trim();
  const password = document.getElementById('loginPassword').value;

  const foundUser = users.find(u => u.username === username && u.password === password);

  if (!foundUser) {
    showToast('Authentication failed: Invalid credentials provided.', 'error');
    return;
  }

  currentUser = foundUser;
  localStorage.setItem('app_current_user', JSON.stringify(currentUser));
  showToast(`Welcome back, ${currentUser.firstName}!`);
  showDashboard();
}

function showDashboard() {
  if (!currentUser) return;
  document.getElementById('authSection').classList.add('hidden');
  document.getElementById('userNav').classList.remove('hidden');
  document.getElementById('navUserInfo').innerText = `${currentUser.firstName} ${currentUser.lastName} [${currentUser.role}]`;

  if (currentUser.role === 'Student') {
    document.getElementById('studentDashboard').classList.remove('hidden');
    document.getElementById('departmentDashboard').classList.add('hidden');
    switchStudentTab('found');
  } else {
    document.getElementById('departmentDashboard').classList.remove('hidden');
    document.getElementById('studentDashboard').classList.add('hidden');
    renderDepartmentItems();
  }
}

function logout() {
  currentUser = null;
  localStorage.removeItem('app_current_user');
  document.getElementById('authSection').classList.remove('hidden');
  document.getElementById('userNav').classList.add('hidden');
  document.getElementById('studentDashboard').classList.add('hidden');
  document.getElementById('departmentDashboard').classList.add('hidden');
  document.getElementById('loginForm').reset();
  showToast('Signed out successfully.');
}

// --- Student: Report Lost Item ---
function handleReportLost(e) {
  e.preventDefault();
  const nameEl = document.getElementById('lostName');
  const catEl = document.getElementById('lostCategory');
  const locEl = document.getElementById('lostLocation');
  const descEl = document.getElementById('lostDescription');

  if (!nameEl || !locEl) return;

  const newLost = {
    id: Date.now(),
    name: nameEl.value.trim(),
    category: catEl ? catEl.value : 'Others',
    location: locEl.value.trim(),
    department: `Reported by ${currentUser.firstName} ${currentUser.lastName}`,
    description: descEl ? descEl.value.trim() : '',
    date: new Date().toISOString().split('T')[0],
    status: 'Looking',
    image: null,
    type: 'Lost',
    postedBy: currentUser.username
  };

  items.unshift(newLost);
  localStorage.setItem('app_items', JSON.stringify(items));
  showToast('Lost item notice published.');
  e.target.reset();
  renderLostItems();
}

function renderLostItems() {
  const container = document.getElementById('lostItemsList');
  if (!container) return;
  container.innerHTML = '';
  const lostOnly = items.filter(i => i.type === 'Lost');

  if (lostOnly.length === 0) {
    container.innerHTML = '<p class="text-slate-400 text-sm italic">No active lost property notices.</p>';
    return;
  }

  lostOnly.forEach(item => {
    const div = document.createElement('div');
    div.className = 'border border-slate-200 dark:border-slate-800 p-4 rounded bg-slate-50/50 dark:bg-slate-800/50 flex justify-between items-center';
    div.innerHTML = `
      <div>
        <div class="flex items-center gap-2">
          <h4 class="font-bold text-slate-900 dark:text-white text-sm">${item.name}</h4>
          <span class="text-[10px] bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 px-2 py-0.5 rounded font-semibold">${item.category}</span>
        </div>
        <p class="text-xs text-slate-600 dark:text-slate-400 mt-1"><strong>Last Seen:</strong> ${item.location} &bull; ${item.department}</p>
        <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">${item.description || 'No additional details.'}</p>
        <span class="text-[10px] text-slate-400 mt-1 block">Notice Date: ${item.date}</span>
      </div>
    `;
    container.appendChild(div);
  });
}

// --- Department: Post Item with Photo ---
function handlePostItem(e) {
  e.preventDefault();
  const fileInput = document.getElementById('itemImage');
  
  if (fileInput && fileInput.files && fileInput.files[0]) {
    const reader = new FileReader();
    reader.onload = function(uploadEvent) {
      saveFoundItem(uploadEvent.target.result);
    };
    reader.readAsDataURL(fileInput.files[0]);
  } else {
    saveFoundItem(null);
  }
}

function saveFoundItem(imageData) {
  const nameEl = document.getElementById('itemName');
  const catEl = document.getElementById('itemCategory');
  const locEl = document.getElementById('itemLocation');
  const deptEl = document.getElementById('itemDepartment');
  const descEl = document.getElementById('itemDescription');

  if (!nameEl || !locEl || !deptEl) return;

  const newItem = {
    id: Date.now(),
    name: nameEl.value.trim(),
    category: catEl ? catEl.value : 'Others',
    location: locEl.value.trim(),
    department: deptEl.value.trim(),
    description: descEl ? descEl.value.trim() : '',
    date: new Date().toISOString().split('T')[0],
    status: 'Available',
    image: imageData,
    type: 'Found',
    postedBy: currentUser.username
  };

  items.unshift(newItem);
  localStorage.setItem('app_items', JSON.stringify(items));
  showToast('Property entry successfully logged into the shared institutional registry.');
  
  const formElem = document.querySelector('#departmentDashboard form');
  if (formElem) formElem.reset();
  renderDepartmentItems();
}

function updateItemStatus(id, newStatus) {
  const item = items.find(i => i.id === id);
  if (item) {
    item.status = newStatus;
    localStorage.setItem('app_items', JSON.stringify(items));
    showToast(`Status updated to: ${newStatus}`);
    renderDepartmentItems();
  }
}

function deleteItem(id) {
  if (confirm('Are you sure you want to remove this property entry from active records?')) {
    items = items.filter(item => item.id !== id);
    localStorage.setItem('app_items', JSON.stringify(items));
    showToast('Property entry removed.');
    renderDepartmentItems();
  }
}

function renderDepartmentItems() {
  const container = document.getElementById('deptItemsList');
  if (!container) return;
  container.innerHTML = '';
  const foundOnly = items.filter(i => i.type === 'Found');

  if (foundOnly.length === 0) {
    container.innerHTML = '<p class="text-slate-400 text-sm italic">No active properties currently logged.</p>';
    return;
  }

  foundOnly.forEach(item => {
    const div = document.createElement('div');
    div.className = 'border border-slate-200 dark:border-slate-800 p-4 rounded flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-50/50 dark:bg-slate-800/50';
    div.innerHTML = `
      <div class="flex items-center gap-4">
        ${item.image ? `<img src="${item.image}" class="w-14 h-14 object-cover rounded border border-slate-300 dark:border-slate-700" />` : ''}
        <div>
          <div class="flex items-center gap-2">
            <h4 class="font-bold text-slate-900 dark:text-white text-sm">${item.name}</h4>
            <span class="text-[10px] font-sans bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded font-semibold">${item.category}</span>
            <span class="text-[10px] font-sans px-2 py-0.5 rounded font-bold ${item.status === 'Available' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-rose-100 text-rose-800'}">${item.status}</span>
          </div>
          <p class="text-xs text-slate-600 dark:text-slate-400 mt-1"><strong>Recovered:</strong> ${item.location} &bull; <strong>Office:</strong> ${item.department} <span class="text-[10px] text-slate-400">({logged by @${item.postedBy || 'system'}})</span></p>
          <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">${item.description || 'No supplementary details logged.'}</p>
        </div>
      </div>
      <div class="flex items-center gap-2 shrink-0">
        <select onchange="updateItemStatus(${item.id}, this.value)" class="text-xs border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 rounded px-2 py-1">
          <option value="Available" ${item.status === 'Available' ? 'selected' : ''}>Available</option>
          <option value="Pending Claim" ${item.status === 'Pending Claim' ? 'selected' : ''}>Pending Claim</option>
          <option value="Claimed" ${item.status === 'Claimed' ? 'selected' : ''}>Claimed</option>
        </select>
        <button onclick="deleteItem(${item.id})" class="bg-rose-700 hover:bg-rose-800 text-white text-xs font-semibold px-3 py-1.5 rounded transition">Remove</button>
      </div>
    `;
    container.appendChild(div);
  });
}

// --- Render & Filter Items for Student ---
function filterItems() {
  const searchInput = document.getElementById('searchInput');
  const categoryFilter = document.getElementById('categoryFilter');
  if (!searchInput || !categoryFilter) return;

  const query = searchInput.value.toLowerCase();
  const category = categoryFilter.value;

  const filtered = items.filter(item => {
    if (item.type !== 'Found') return false;
    const matchesQuery = item.name.toLowerCase().includes(query) || 
                         item.description.toLowerCase().includes(query) ||
                         item.location.toLowerCase().includes(query) ||
                         item.department.toLowerCase().includes(query);
    const matchesCategory = category === 'All' || item.category === category;

    return matchesQuery && matchesCategory;
  });

  renderStudentItems(filtered);
}

function renderStudentItems(itemsToRender = items.filter(i => i.type === 'Found')) {
  const grid = document.getElementById('itemsGrid');
  if (!grid) return;
  grid.innerHTML = '';

  if (itemsToRender.length === 0) {
    grid.innerHTML = '<p class="text-slate-400 col-span-full text-center py-12 text-sm italic">No matching property records found in the institutional directory.</p>';
    return;
  }

  itemsToRender.forEach(item => {
    const card = document.createElement('div');
    card.className = 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded p-5 flex flex-col justify-between shadow-sm hover:border-slate-400 dark:hover:border-slate-700 transition';
    card.innerHTML = `
      <div>
        ${item.image ? `<div class="mb-3"><img src="${item.image}" class="w-full h-36 object-cover rounded border border-slate-200 dark:border-slate-700" /></div>` : ''}
        <div class="flex justify-between items-start gap-2 mb-2">
          <h3 class="font-serif font-bold text-slate-900 dark:text-white text-base leading-snug">${item.name}</h3>
          <span class="text-[10px] font-sans font-bold px-2 py-1 rounded border shrink-0 ${item.status === 'Available' ? 'bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-slate-100 text-slate-600 border-slate-200'}">${item.status}</span>
        </div>
        <p class="text-xs text-slate-600 dark:text-slate-400 mb-1.5"><strong>Recovery Point:</strong> ${item.location}</p>
        <p class="text-xs text-slate-600 dark:text-slate-400 mb-3"><strong>Reclamation Office:</strong> <span class="text-slate-900 dark:text-slate-200 font-semibold">${item.department}</span></p>
        <p class="text-xs text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50 p-2.5 rounded border border-slate-100 dark:border-slate-800 mb-4 leading-relaxed">${item.description || 'No descriptive details available.'}</p>
      </div>
      <div class="border-t border-slate-100 dark:border-slate-800 pt-3 flex justify-between items-center text-[11px] text-slate-400">
        <span>Logged: ${item.date}</span>
        <span class="text-slate-900 dark:text-slate-300 font-semibold font-sans tracking-wide">Present ID to Claim</span>
      </div>
    `;
    grid.appendChild(card);
  });
}