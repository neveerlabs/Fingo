window.addEventListener('load', function() {
    setTimeout(function() {
        document.body.classList.remove('loading');
        var loader = document.getElementById('loading-overlay');
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(function() {
                loader.remove();
            }, 300);
        }
    }, 300);
});

function updateGreeting() {
    const hour = new Date().getHours();
    let timeOfDay = 'morning';
    if (hour >= 5 && hour < 11) {
        timeOfDay = 'morning';
    } else if (hour >= 11 && hour < 15) {
        timeOfDay = 'afternoon';
    } else if (hour >= 15 && hour < 19) {
        timeOfDay = 'evening';
    } else {
        timeOfDay = 'night';
    }
    const username = localStorage.getItem('username') || 'user';
    document.getElementById('greeting-text').textContent = `Good ${timeOfDay}, ${username}`;
}
updateGreeting();

let currentCurrency = localStorage.getItem('currency') || 'IDR';

const toggleBtn = document.getElementById('toggle-balance');
const balanceAmount = document.getElementById('balance-amount');
const eyeOpen = document.getElementById('eye-open');
const eyeClosed = document.getElementById('eye-closed');
let balanceVisible = false;

function getCurrencySymbol(currency = currentCurrency) {
    return currency === 'IDR' ? 'Rp' : '$';
}

function formatBalance(amount = 0) {
    return `${getCurrencySymbol()} ${amount}`;
}

function updateBalanceDisplay() {
    balanceAmount.textContent = balanceVisible ? formatBalance(0) : '••••••';
    eyeOpen.classList.toggle('active', balanceVisible);
    eyeClosed.classList.toggle('active', !balanceVisible);
}

toggleBtn.addEventListener('click', () => {
    balanceVisible = !balanceVisible;
    updateBalanceDisplay();
});

updateBalanceDisplay();

const menuBtn = document.getElementById('menu-btn');
const overlay = document.getElementById('modal-overlay');
const currencyOverlay = document.getElementById('currency-overlay');
const categoriesOverlay = document.getElementById('categories-overlay');

menuBtn.addEventListener('click', () => {
    overlay.classList.toggle('active');
});

overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
        overlay.classList.remove('active');
    }
});

document.querySelectorAll('.modal-item').forEach(item => {
    item.addEventListener('click', (e) => {
        if (item.dataset.action === 'currency') {
            e.preventDefault();
            overlay.classList.remove('active');
            currencyOverlay.classList.add('active');
        } else if (item.dataset.action === 'categories') {
            e.preventDefault();
            overlay.classList.remove('active');
            categoriesOverlay.classList.add('active');
            renderChips();
            showChipsView();
        } else {
            overlay.classList.remove('active');
        }
    });
});

currencyOverlay.addEventListener('click', (e) => {
    if (e.target === currencyOverlay) {
        currencyOverlay.classList.remove('active');
    }
});

categoriesOverlay.addEventListener('click', (e) => {
    if (e.target === categoriesOverlay) {
        resetCategoryForm();
        categoriesOverlay.classList.remove('active');
    }
});

document.querySelectorAll('.currency-option').forEach(btn => {
    btn.addEventListener('click', () => {
        currentCurrency = btn.dataset.currency;
        localStorage.setItem('currency', currentCurrency);
        updateBalanceDisplay();
        currencyOverlay.classList.remove('active');
    });
});

const usernameOverlay = document.getElementById('username-overlay');
const usernameForm = document.getElementById('username-form');
const usernameInput = document.getElementById('username-input');
const usernameError = document.getElementById('username-error');
const ruleItems = document.querySelectorAll('.rule-item');

const savedUsername = localStorage.getItem('username');
if (!savedUsername) {
    usernameOverlay.classList.add('active');
    usernameInput.focus();
}

function validateUsername(username) {
    return /^[a-z0-9]+$/.test(username);
}

function updateRules(username) {
    const checks = {
        lowercase: !/[A-Z]/.test(username),
        symbol: !/[^a-z0-9]/.test(username),
        emoji: /^[\x00-\x7F]*$/.test(username),
        space: !/\s/.test(username),
        dot: !/\./.test(username)
    };

    ruleItems.forEach(item => {
        const rule = item.dataset.rule;
        if (checks[rule]) {
            item.classList.add('valid');
            item.classList.remove('invalid', 'loading');
        } else {
            item.classList.remove('valid');
            item.classList.add('invalid');
            item.classList.remove('loading');
        }
    });
}

let ruleTimeout;
usernameInput.addEventListener('input', () => {
    usernameError.textContent = '';
    const value = usernameInput.value;

    if (value.trim() === '') {
        ruleItems.forEach(item => {
            item.classList.remove('loading', 'valid', 'invalid');
        });
        return;
    }

    ruleItems.forEach(item => {
        item.classList.add('loading');
        item.classList.remove('valid', 'invalid');
    });

    clearTimeout(ruleTimeout);
    ruleTimeout = setTimeout(() => {
        updateRules(value);
    }, 500);
});

usernameForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = usernameInput.value.trim();
    if (!validateUsername(username)) {
        usernameError.textContent = 'Please meet all username requirements.';
        updateRules(username);
        return;
    }
    localStorage.setItem('username', username);
    usernameOverlay.classList.remove('active');
    updateGreeting();
});

const defaultCategories = [
    { id: 'c1', name: 'Food', group: 'Needs', color: '#22c55e', icon: 'utensils' },
    { id: 'c2', name: 'Coffee', group: 'Wants', color: '#f59e0b', icon: 'coffee' },
    { id: 'c3', name: 'Transport', group: 'Needs', color: '#3b82f6', icon: 'bus' },
    { id: 'c4', name: 'Billing & Utilities', group: 'Needs', color: '#8b5cf6', icon: 'file-text' },
    { id: 'c5', name: 'Shopping', group: 'Wants', color: '#ec4899', icon: 'bag' },
    { id: 'c6', name: 'Health', group: 'Emergency', color: '#ef4444', icon: 'heart' },
    { id: 'c7', name: 'Other', group: 'Wants', color: '#6b7280', icon: 'tag' }
];

const iconOptions = [
    { id: 'utensils', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/></svg>' },
    { id: 'coffee', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8Z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>' },
    { id: 'bus', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 6v6"/><path d="M15 6v6"/><path d="M2 12h19.6"/><path d="M18 18h3s.5-1.7.8-2.8c.1-.4.2-.8.2-1.2 0-.4-.1-.8-.2-1.2l-1.4-5C20.1 6.8 19.1 6 18 6H4a2 2 0 0 0-2 2v10h3"/><circle cx="7" cy="18" r="2"/><path d="M9 18h5"/><circle cx="16" cy="18" r="2"/></svg>' },
    { id: 'file-text', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>' },
    { id: 'bag', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>' },
    { id: 'heart', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>' },
    { id: 'tag', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2H2v10l9.29 9.29a1 1 0 0 0 1.42 0l8.58-8.58a1 1 0 0 0 0-1.42Z"/><circle cx="7" cy="7" r="1"/></svg>' },
    { id: 'home', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>' },
    { id: 'cart', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>' },
    { id: 'bolt', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>' },
    { id: 'wallet', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"/></svg>' },
    { id: 'gift', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 12 20 22 4 22 4 12"/><rect x="2" y="7" width="20" height="5"/><line x1="12" y1="22" x2="12" y2="7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7Z"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7Z"/></svg>' },
    { id: 'book', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>' },
    { id: 'camera', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2Z"/><circle cx="12" cy="13" r="4"/></svg>' },
    { id: 'music', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>' },
    { id: 'phone', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>' },
    { id: 'clock', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>' },
    { id: 'star', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>' },
    { id: 'airplane', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/></svg>' },
    { id: 'briefcase', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>' },
    { id: 'graduation', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>' },
    { id: 'paw', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="4" r="2"/><circle cx="18" cy="8" r="2"/><circle cx="20" cy="16" r="2"/><circle cx="4" cy="16" r="2"/><circle cx="6" cy="8" r="2"/><path d="M12 20c-3 0-5-2-5-5 0-2 2-3 5-3s5 1 5 3c0 3-2 5-5 5z"/></svg>' },
    { id: 'shirt', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 16 4l-4 2-4-2-4 2 2 14h12L20 6z"/><path d="M8 6v3c0 2 1 3 4 3s4-1 4-3V6"/></svg>' },
    { id: 'laptop', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="12" rx="2"/><path d="M2 20h20"/></svg>' },
    { id: 'gamepad', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 12h4m-2-2v4"/><circle cx="15" cy="10" r="1"/><circle cx="18" cy="13" r="1"/><path d="M6 8h12a4 4 0 0 1 4 4v2a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4v-2a4 4 0 0 1 4-4z"/></svg>' },
    { id: 'dumbbell', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6.5 6.5 17.5 17.5M21 3l-2 2m0 0-4 4m6 0-6-6M3 21l2-2m0 0 4-4m-6 0 6 6"/></svg>' },
    { id: 'fuel', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 22V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v17"/><path d="M3 22h10"/><path d="M15 6h2a2 2 0 0 1 2 2v11h-3"/><path d="M21 9l-3 3"/></svg>' },
    { id: 'hospital', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 6v4m0 0v4m0-4h4m-4 0H8"/><rect x="4" y="2" width="16" height="20" rx="2"/></svg>' },
    { id: 'piggy', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 5c-1.5 0-2.8.4-3.9 1a8.5 8.5 0 0 0-14 5.7A5 5 0 0 0 4 21h6a5 5 0 0 0 5-5v-1a8.5 8.5 0 0 0 4-6z"/><circle cx="15" cy="9" r="1"/></svg>' },
    { id: 'chart', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/></svg>' }
];

let categories = JSON.parse(localStorage.getItem('categories')) || defaultCategories;
if (!localStorage.getItem('categories')) {
    localStorage.setItem('categories', JSON.stringify(defaultCategories));
}

const categoriesChips = document.getElementById('categories-chips');
const categoriesAllList = document.getElementById('categories-all-list');
const categoryForm = document.getElementById('category-form');
const categoryFormTitle = document.getElementById('category-form-title');
const addCategoryBtn = document.getElementById('add-category-btn');
const saveCategoryBtn = document.getElementById('save-category');
const cancelCategoryBtn = document.getElementById('cancel-category');
const categoryName = document.getElementById('category-name');
const categoryGroup = document.getElementById('category-group');
const colorPicker = document.getElementById('color-picker');
const iconPicker = document.getElementById('icon-picker');
const categoryPreview = document.getElementById('category-preview');
const allCategoriesLink = document.getElementById('all-categories-link');
const categoriesSubheader = document.getElementById('categories-subheader');
const resetCategoriesBtn = document.getElementById('reset-categories');

let editingCategoryId = null;
let selectedIcon = iconOptions[0].id;
let selectedColor = '#22c55e';

const colorOptions = [
    '#22c55e', '#f59e0b', '#3b82f6', '#8b5cf6', '#ec4899',
    '#ef4444', '#6b7280', '#14b8a6', '#f97316', '#84cc16',
    '#06b6d4', '#d946ef', '#64748b', '#0ea5e9', '#eab308',
    '#10b981'
];

function getIconSvg(iconId) {
    const icon = iconOptions.find(i => i.id === iconId);
    return icon ? icon.svg : iconOptions[0].svg;
}

function showChipsView() {
    categoriesChips.classList.remove('hidden');
    categoriesAllList.classList.add('hidden');
    categoriesSubheader.classList.add('hidden');
    allCategoriesLink.textContent = 'All categories >';
    addCategoryBtn.classList.remove('hidden');
}

function showAllListView() {
    categoriesChips.classList.add('hidden');
    categoriesAllList.classList.remove('hidden');
    categoriesSubheader.classList.remove('hidden');
    allCategoriesLink.textContent = '< Back';
    addCategoryBtn.classList.add('hidden');
    renderAllCategories();
}

function resetCategoryForm() {
    categoryForm.classList.add('hidden');
    allCategoriesLink.classList.remove('hidden');
    categoriesChips.classList.remove('hidden');
    categoriesAllList.classList.add('hidden');
    categoriesSubheader.classList.add('hidden');
    addCategoryBtn.classList.remove('hidden');
    allCategoriesLink.textContent = 'All categories >';
    editingCategoryId = null;
}

function renderChips() {
    categoriesChips.innerHTML = '';
    categories.forEach(cat => {
        const chip = document.createElement('div');
        chip.className = 'category-chip';
        chip.style.borderColor = cat.color;
        chip.innerHTML = `
            <span class="chip-icon" style="color:${cat.color}">${getIconSvg(cat.icon)}</span>
            <span class="chip-name">${cat.name}</span>
        `;
        categoriesChips.appendChild(chip);
    });
}

function renderAllCategories() {
    categoriesAllList.innerHTML = '';
    categories.forEach(cat => {
        const item = document.createElement('div');
        item.className = 'category-item';
        item.style.borderColor = cat.color;
        item.innerHTML = `
            <span class="category-icon" style="color:${cat.color}">${getIconSvg(cat.icon)}</span>
            <div class="category-info">
                <span class="category-name">${cat.name}</span>
                <span class="category-group">${cat.group}</span>
            </div>
            <div class="category-actions">
                <button class="category-edit" data-id="${cat.id}">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
                </button>
                <button class="category-delete" data-id="${cat.id}">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></svg>
                </button>
            </div>
        `;
        categoriesAllList.appendChild(item);
    });

    document.querySelectorAll('.category-edit').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = e.currentTarget.dataset.id;
            const cat = categories.find(c => c.id === id);
            if (cat) {
                editingCategoryId = id;
                categoryName.value = cat.name;
                categoryGroup.value = cat.group;
                selectedColor = cat.color;
                selectedIcon = cat.icon;
                renderColorPicker();
                renderIconPicker();
                updatePreview();
                categoryFormTitle.textContent = 'Edit Category';
                categoryForm.classList.remove('hidden');
                categoriesAllList.classList.add('hidden');
                categoriesSubheader.classList.add('hidden');
                allCategoriesLink.classList.add('hidden');
            }
        });
    });

    document.querySelectorAll('.category-delete').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = e.currentTarget.dataset.id;
            categories = categories.filter(c => c.id !== id);
            localStorage.setItem('categories', JSON.stringify(categories));
            renderAllCategories();
            renderChips();
        });
    });
}

function renderColorPicker() {
    colorPicker.innerHTML = '';
    colorOptions.forEach(color => {
        const swatch = document.createElement('button');
        swatch.type = 'button';
        swatch.className = 'color-swatch';
        swatch.style.backgroundColor = color;
        swatch.dataset.color = color;
        if (color === selectedColor) {
            swatch.classList.add('selected');
        }
        swatch.addEventListener('click', () => {
            selectedColor = color;
            renderColorPicker();
            updatePreview();
        });
        colorPicker.appendChild(swatch);
    });
}

function renderIconPicker() {
    iconPicker.innerHTML = '';
    iconOptions.forEach(icon => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'icon-option';
        btn.dataset.icon = icon.id;
        btn.innerHTML = icon.svg;
        if (icon.id === selectedIcon) {
            btn.classList.add('selected');
        }
        btn.addEventListener('click', () => {
            selectedIcon = icon.id;
            renderIconPicker();
            updatePreview();
        });
        iconPicker.appendChild(btn);
    });
}

function updatePreview() {
    const name = categoryName.value.trim() || 'Category name';
    const group = categoryGroup.value;
    categoryPreview.innerHTML = `
        <div class="category-preview-box" style="border-color:${selectedColor};">
            <span class="category-icon" style="color:${selectedColor}">${getIconSvg(selectedIcon)}</span>
            <div class="category-info">
                <span class="category-name">${name}</span>
                <span class="category-group">${group}</span>
            </div>
        </div>
    `;
}

categoryName.addEventListener('input', updatePreview);
categoryGroup.addEventListener('change', updatePreview);

resetCategoriesBtn.addEventListener('click', () => {
    categories = [...defaultCategories];
    localStorage.setItem('categories', JSON.stringify(categories));
    renderAllCategories();
    renderChips();
});

allCategoriesLink.addEventListener('click', () => {
    if (categoriesAllList.classList.contains('hidden')) {
        showAllListView();
    } else {
        showChipsView();
    }
});

addCategoryBtn.addEventListener('click', () => {
    editingCategoryId = null;
    categoryName.value = '';
    categoryGroup.value = 'Needs';
    selectedColor = '#22c55e';
    selectedIcon = iconOptions[0].id;
    renderColorPicker();
    renderIconPicker();
    updatePreview();
    categoryFormTitle.textContent = 'New Category';
    categoryForm.classList.remove('hidden');
    categoriesChips.classList.add('hidden');
    categoriesAllList.classList.add('hidden');
    categoriesSubheader.classList.add('hidden');
    allCategoriesLink.classList.add('hidden');
    addCategoryBtn.classList.add('hidden');
});

cancelCategoryBtn.addEventListener('click', () => {
    resetCategoryForm();
    renderColorPicker();
    renderIconPicker();
    updatePreview();
});

saveCategoryBtn.addEventListener('click', () => {
    const name = categoryName.value.trim();
    if (!name) return;
    const newCategory = {
        id: editingCategoryId || Date.now().toString(),
        name,
        group: categoryGroup.value,
        color: selectedColor,
        icon: selectedIcon
    };
    if (editingCategoryId) {
        categories = categories.map(c => c.id === editingCategoryId ? newCategory : c);
    } else {
        categories.push(newCategory);
    }
    localStorage.setItem('categories', JSON.stringify(categories));
    resetCategoryForm();
    renderColorPicker();
    renderIconPicker();
    updatePreview();
    renderChips();
});

renderColorPicker();
renderIconPicker();
updatePreview();
renderChips();