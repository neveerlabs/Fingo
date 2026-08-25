let currentPage = 'home';
let currentCurrency = 'IDR';

function initCommon(page) {
    currentPage = page;
    const base = page === 'home' ? '' : '../';
    const homeHref = page === 'home' ? './' : '../';

    const template = `
        <div class="topbar">
            <div class="greeting" id="greeting-text"></div>
            <div class="top-actions">
                <button class="profile-btn" id="profile-btn" aria-label="Profile">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/></svg>
                </button>
                <button class="menu-btn" id="menu-btn" aria-label="Menu">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="7" x2="19" y2="7"/><line x1="9" y1="17" x2="19" y2="17"/></svg>
                </button>
            </div>
        </div>

        <div class="modal-overlay" id="modal-overlay">
            <div class="modal-card">
                <h2 class="modal-title">Manage & Preferences</h2>
                <a href="#" class="modal-item" data-action="budget"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.21 15.89A10 10 0 1 1 8 2.83"/><path d="M22 12A10 10 0 0 0 12 2v10z"/></svg><span>Budget</span></a>
                <a href="${base}id/wallet.html" class="modal-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="6" width="20" height="14" rx="2"/><path d="M2 10h20"/><path d="M16 15h2"/></svg><span>Wallet</span></a>
                <a href="#" class="modal-item" data-action="debt"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="5" x2="5" y2="19"/><circle cx="6.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/></svg><span>Debt</span></a>
                <a href="#" class="modal-item" data-action="categories"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg><span>Categories</span></a>
                <a href="#" class="modal-item" data-action="currency"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v10"/><path d="M15 9.5c0-1.38-1.34-2.5-3-2.5s-3 1.12-3 2.5 1.34 2.5 3 2.5 3 1.12 3 2.5-1.34 2.5-3 2.5-3-1.12-3-2.5"/></svg><span>Display Currency</span></a>
                <h3 class="modal-section-title">Support</h3>
                <a href="#" class="modal-item" data-action="contact-support"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg><span>Contact Support</span></a>
                <h3 class="modal-section-title">Account</h3>
                <a href="#" class="modal-item" data-action="sign-out"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg><span>Sign Out</span></a>
                <div class="modal-footer"><p class="modal-version">Fingo App v1.3.3-beta</p><p class="modal-powered">Powered By Fingo</p></div>
            </div>
        </div>

        <div class="currency-overlay" id="currency-overlay">
            <div class="currency-modal">
                <h3 class="currency-title">Select your currency</h3>
                <div class="currency-options">
                    <button class="currency-option" data-currency="IDR"><span>Rupiah (Rp)</span></button>
                    <button class="currency-option" data-currency="USD"><span>Dollar ($)</span></button>
                </div>
            </div>
        </div>

        <div class="categories-overlay" id="categories-overlay">
            <div class="categories-modal">
                <div class="categories-header">
                    <h3 class="categories-title">Categories</h3>
                    <button class="all-categories-link" id="all-categories-link">All categories &gt;</button>
                </div>
                <div id="categories-chips" class="categories-chips"></div>
                <div id="categories-subheader" class="categories-subheader hidden">
                    <span class="all-item-label">All Item</span>
                    <button id="reset-categories" class="reset-categories-btn">Reset categories</button>
                </div>
                <div id="categories-all-list" class="categories-all-list hidden"></div>
                <button id="add-category-btn" class="add-category-btn">Add Category</button>
                <div id="category-form" class="category-form hidden">
                    <h4 id="category-form-title">New Category</h4>
                    <input type="text" id="category-name" class="category-input" placeholder="Category name" />
                    <div class="category-select-wrap">
                        <button type="button" class="category-select-trigger" id="category-select-trigger">
                            <span id="category-select-label">Needs</span>
                            <span class="arrow">▾</span>
                        </button>
                        <div class="category-select-options" id="category-select-options">
                            <div class="category-select-option" data-value="Needs">Needs</div>
                            <div class="category-select-option" data-value="Wants">Wants</div>
                            <div class="category-select-option" data-value="Emergency">Emergency</div>
                            <div class="category-select-option" data-value="Savings">Savings</div>
                        </div>
                    </div>
                    <input type="hidden" id="category-group" value="Needs" />
                    <label class="category-color-label">Color</label>
                    <div id="color-picker" class="color-picker"></div>
                    <label class="category-icon-label">Icon</label>
                    <div id="icon-picker" class="icon-picker"></div>
                    <div id="category-preview" class="category-preview"></div>
                    <div class="category-form-actions">
                        <button id="save-category" class="save-category-btn">Save</button>
                        <button id="cancel-category" class="cancel-category-btn">Cancel</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="username-overlay" id="username-overlay">
            <div class="username-modal">
                <h3 class="username-title">Welcome to Fingo</h3>
                <p class="username-subtitle">Enter your username to continue</p>
                <form id="username-form">
                    <input type="text" id="username-input" class="username-input" placeholder="e.g., neverlabs" autocomplete="off" />
                    <ul class="username-rules">
                        <li class="rule-item" data-rule="lowercase"><span class="rule-spinner"></span><svg class="rule-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg><span class="rule-text">Lowercase letters only</span></li>
                        <li class="rule-item" data-rule="symbol"><span class="rule-spinner"></span><svg class="rule-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg><span class="rule-text">No symbols</span></li>
                        <li class="rule-item" data-rule="emoji"><span class="rule-spinner"></span><svg class="rule-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg><span class="rule-text">No emoji/stickers</span></li>
                        <li class="rule-item" data-rule="space"><span class="rule-spinner"></span><svg class="rule-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg><span class="rule-text">No spaces</span></li>
                        <li class="rule-item" data-rule="dot"><span class="rule-spinner"></span><svg class="rule-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg><span class="rule-text">No dots</span></li>
                    </ul>
                    <p class="username-error" id="username-error"></p>
                    <button type="submit" class="username-submit">Continue</button>
                </form>
            </div>
        </div>

        <div class="dev-overlay" id="dev-overlay">
            <div class="dev-modal">
                <p class="dev-text">This section is under development.</p>
                <button class="dev-close-btn" id="dev-close-btn">OK</button>
            </div>
        </div>

        <div class="plus-overlay" id="plus-overlay"></div>

        <div class="signout-overlay" id="signout-overlay">
            <div class="signout-modal">
                <p class="signout-title">Sign Out</p>
                <p class="signout-text">This action will delete all your data stored on this device. Are you sure you want to continue?</p>
                <div class="signout-actions">
                    <button class="signout-cancel" id="signout-cancel">Cancel</button>
                    <button class="signout-confirm" id="signout-confirm">Yes, Sign Out</button>
                </div>
            </div>
        </div>

        <div class="support-overlay" id="support-overlay">
            <div class="support-modal">
                <div class="support-header">
                    <h3 class="support-title">Contact Support</h3>
                    <button class="support-close" id="support-close" aria-label="Close"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>
                </div>
                <div class="support-content">
                    <p class="support-text">If you encounter any issues, bugs, or have suggestions and feature requests, feel free to reach out to us via email.</p>
                    <p class="support-text">When reporting a bug, please include the following details to help us resolve it quickly:</p>
                    <ul class="support-list">
                        <li>Date and time of the issue</li>
                        <li>Device and operating system</li>
                        <li>Detailed description of the problem</li>
                        <li>Steps to reproduce the issue</li>
                    </ul>
                </div>
                <div class="support-footer">
                    <a href="mailto:userlinuxorg@gmail.com" class="support-email-btn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>Send us an Email</a>
                </div>
            </div>
        </div>

        <nav class="bottom-nav">
            <a href="${homeHref}" class="nav-item" data-page="home"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12l9-9 9 9"/><path d="M5 10v10h14V10"/></svg><span>Home</span></a>
            <a href="${base}id/insight.html" class="nav-item" data-page="insight"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg><span>Insight</span></a>
            <div class="nav-item plus" id="plusNavItem">
                <div class="plus-circle" id="plusCircle"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg></div>
                <div class="fab-menu" id="fabMenu">
                    <div class="action-item" id="incomeAction"><div class="circle income"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="17 11 12 16 7 11"/><line x1="12" y1="16" x2="12" y2="4"/></svg></div><span class="action-label">Income</span></div>
                    <div class="action-item" id="expenseAction"><div class="circle expense"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="7 13 12 8 17 13"/><line x1="12" y1="8" x2="12" y2="20"/></svg></div><span class="action-label">Expense</span></div>
                </div>
            </div>
            <a href="${base}id/wallet.html" class="nav-item" data-page="wallet"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="6" width="20" height="14" rx="2"/><path d="M2 10h20"/><path d="M16 15h2"/></svg><span>Wallet</span></a>
            <a href="${base}id/profile.html" class="nav-item" data-page="profile"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/></svg><span>Profile</span></a>
        </nav>
    `;

    try {
        document.body.insertAdjacentHTML('afterbegin', template);
    } catch (error) {
        console.error('Failed to inject template markup:', error);
    }

    const loader = document.getElementById('loading-overlay');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            try { loader.remove(); } catch (error) { /* no-op */ }
        }, 200);
    }
    document.body.classList.remove('loading');

    try {
        setupCommonEvents();
    } catch (error) {
        console.error('Failed to set up common events:', error);
    }

    try {
        setActiveNav(page);
    } catch (error) {
        console.error('Failed to set active nav:', error);
    }

    updateGreeting();

    Promise.resolve().then(async () => {
        try {
            await loadAppData();
        } catch (error) {
            console.error('Failed to load app data:', error);
        }
        updateGreeting();
    });

    initCategoryDropdown();
}

function initCategoryDropdown() {
    const trigger = document.getElementById('category-select-trigger');
    const options = document.getElementById('category-select-options');
    const label = document.getElementById('category-select-label');
    let hiddenSelect = document.getElementById('category-group');

    if (!hiddenSelect) {
        hiddenSelect = document.createElement('input');
        hiddenSelect.type = 'hidden';
        hiddenSelect.id = 'category-group';
        hiddenSelect.value = 'Needs';
        const form = document.getElementById('category-form');
        if (form) form.appendChild(hiddenSelect);
    }

    if (!trigger || !options || !label) return;

    function setSelected(value) {
        label.textContent = value;
        if (hiddenSelect) hiddenSelect.value = value;
        options.querySelectorAll('.category-select-option').forEach(o => {
            o.classList.toggle('selected', o.dataset.value === value);
        });
    }

    const initialVal = hiddenSelect ? hiddenSelect.value : 'Needs';
    setSelected(initialVal);

    trigger.removeEventListener('click', trigger._clickHandler);
    trigger._clickHandler = function(e) {
        e.stopPropagation();
        options.classList.toggle('open');
        trigger.classList.toggle('open');
    };
    trigger.addEventListener('click', trigger._clickHandler);

    options.querySelectorAll('.category-select-option').forEach(opt => {
        opt.removeEventListener('click', opt._clickHandler);
        opt._clickHandler = function() {
            const value = this.dataset.value;
            setSelected(value);
            options.classList.remove('open');
            trigger.classList.remove('open');
        };
        opt.addEventListener('click', opt._clickHandler);
    });

    document.removeEventListener('click', document._dropdownCloseHandler);
    document._dropdownCloseHandler = function(e) {
        if (!e.target.closest('.category-select-wrap')) {
            options.classList.remove('open');
            trigger.classList.remove('open');
        }
    };
    document.addEventListener('click', document._dropdownCloseHandler);
}

function setupCommonEvents() {
    const menuBtn = document.getElementById('menu-btn');
    const overlay = document.getElementById('modal-overlay');
    const currencyOverlay = document.getElementById('currency-overlay');
    const categoriesOverlay = document.getElementById('categories-overlay');
    const signoutOverlay = document.getElementById('signout-overlay');
    const signoutCancel = document.getElementById('signout-cancel');
    const signoutConfirm = document.getElementById('signout-confirm');
    const supportOverlay = document.getElementById('support-overlay');
    const supportClose = document.getElementById('support-close');
    const devOverlay = document.getElementById('dev-overlay');
    const devCloseBtn = document.getElementById('dev-close-btn');

    menuBtn.addEventListener('click', () => overlay.classList.toggle('active'));
    overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.classList.remove('active'); });

    document.querySelectorAll('.modal-item').forEach(item => {
        item.addEventListener('click', (e) => {
            const action = item.dataset.action;
            if (action === 'currency') {
                e.preventDefault();
                overlay.classList.remove('active');
                currencyOverlay.classList.add('active');
            } else if (action === 'categories') {
                e.preventDefault();
                overlay.classList.remove('active');
                categoriesOverlay.classList.add('active');
                renderChips();
                showChipsView();
            } else if (action === 'contact-support') {
                e.preventDefault();
                overlay.classList.remove('active');
                supportOverlay.classList.add('active');
            } else if (action === 'sign-out') {
                e.preventDefault();
                overlay.classList.remove('active');
                signoutOverlay.classList.add('active');
            } else if (action === 'budget' || action === 'debt') {
                e.preventDefault();
                overlay.classList.remove('active');
                devOverlay.classList.add('active');
            } else {
                overlay.classList.remove('active');
            }
        });
    });

    currencyOverlay.addEventListener('click', (e) => { if (e.target === currencyOverlay) currencyOverlay.classList.remove('active'); });
    categoriesOverlay.addEventListener('click', (e) => { if (e.target === categoriesOverlay) { resetCategoryForm(); categoriesOverlay.classList.remove('active'); } });
    supportOverlay.addEventListener('click', (e) => { if (e.target === supportOverlay) supportOverlay.classList.remove('active'); });
    supportClose.addEventListener('click', () => supportOverlay.classList.remove('active'));
    devOverlay.addEventListener('click', (e) => { if (e.target === devOverlay) devOverlay.classList.remove('active'); });
    devCloseBtn.addEventListener('click', () => devOverlay.classList.remove('active'));

    document.querySelectorAll('.currency-option').forEach(btn => {
        btn.addEventListener('click', async () => {
            const currency = btn.dataset.currency;
            currentCurrency = currency;
            try {
                await setData('currency', currency);
            } catch (error) {
                console.error('Failed to save currency:', error);
            }
            document.dispatchEvent(new CustomEvent('currencyChanged', { detail: currency }));
            currencyOverlay.classList.remove('active');
        });
    });

    signoutCancel.addEventListener('click', () => signoutOverlay.classList.remove('active'));
    signoutConfirm.addEventListener('click', async () => {
        try {
            const db = await openDB();
            await new Promise((resolve) => {
                try {
                    const tx = db.transaction('appData', 'readwrite');
                    tx.objectStore('appData').clear();
                    tx.oncomplete = () => resolve();
                    tx.onerror = () => resolve();
                    tx.onabort = () => resolve();
                } catch (error) {
                    console.error('Failed to clear IndexedDB:', error);
                    resolve();
                }
            });
        } catch (error) {
            console.error('Failed to clear IndexedDB:', error);
        }
        localStorage.removeItem('username');
        location.reload();
    });

    const plusCircle = document.getElementById('plusCircle');
    const plusOverlay = document.getElementById('plus-overlay');
    const fabMenu = document.getElementById('fabMenu');
    const incomeAction = document.getElementById('incomeAction');
    const expenseAction = document.getElementById('expenseAction');

    if (plusCircle) {
        plusCircle.addEventListener('click', () => {
            const isActive = plusCircle.classList.contains('active');
            plusCircle.classList.toggle('active', !isActive);
            plusOverlay.classList.toggle('active', !isActive);
            fabMenu.classList.toggle('active', !isActive);
        });
        plusOverlay.addEventListener('click', () => {
            plusCircle.classList.remove('active');
            plusOverlay.classList.remove('active');
            fabMenu.classList.remove('active');
        });
        incomeAction.addEventListener('click', () => {
            plusCircle.classList.remove('active');
            plusOverlay.classList.remove('active');
            fabMenu.classList.remove('active');
        });
        expenseAction.addEventListener('click', () => {
            plusCircle.classList.remove('active');
            plusOverlay.classList.remove('active');
            fabMenu.classList.remove('active');
        });
    }

    const profileBtn = document.getElementById('profile-btn');
    if (profileBtn && devOverlay) {
        profileBtn.addEventListener('click', () => devOverlay.classList.add('active'));
    }

    const usernameOverlay = document.getElementById('username-overlay');
    if (usernameOverlay) {
        const savedUsername = localStorage.getItem('username');
        if (!savedUsername) {
            usernameOverlay.classList.add('active');
            document.getElementById('username-input').focus();
        }
        const usernameForm = document.getElementById('username-form');
        const usernameInput = document.getElementById('username-input');
        const usernameError = document.getElementById('username-error');
        const ruleItems = document.querySelectorAll('.rule-item');

        usernameInput.addEventListener('input', () => {
            const value = usernameInput.value;
            const checks = {
                lowercase: !/[A-Z]/.test(value),
                symbol: !/[^a-z0-9]/.test(value),
                emoji: /^[\x00-\x7F]*$/.test(value),
                space: !/\s/.test(value),
                dot: !/\./.test(value)
            };
            ruleItems.forEach(item => {
                const rule = item.dataset.rule;
                if (checks[rule]) {
                    item.classList.add('valid');
                    item.classList.remove('invalid');
                } else {
                    item.classList.remove('valid');
                    item.classList.add('invalid');
                }
            });
            usernameError.textContent = '';
        });

        usernameForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = usernameInput.value.trim();
            if (/^[a-z0-9]+$/.test(username)) {
                localStorage.setItem('username', username);
                usernameOverlay.classList.remove('active');
                updateGreeting();
            } else {
                usernameError.textContent = 'Only lowercase letters and numbers are allowed.';
            }
        });
    }

    const modalOverlay = document.getElementById('modal-overlay');
    const modalCard = document.querySelector('.modal-card');
    let startX = 0, currentX = 0, isDragging = false;

    if (modalOverlay && modalCard) {
        const onStart = (e) => {
            const touch = e.touches ? e.touches[0] : e;
            startX = touch.clientX;
            isDragging = true;
            modalCard.style.transition = 'none';
        };
        const onMove = (e) => {
            if (!isDragging) return;
            const touch = e.touches ? e.touches[0] : e;
            currentX = touch.clientX;
            const delta = currentX - startX;
            if (modalOverlay.classList.contains('active')) {
                if (delta > 0) {
                    const translate = Math.min(delta, modalCard.offsetWidth);
                    modalCard.style.transform = `translateX(${translate}px)`;
                }
            } else {
                if (delta < 0) {
                    const translate = Math.max(delta, -modalCard.offsetWidth);
                    modalCard.style.transform = `translateX(${translate}px)`;
                    modalOverlay.style.opacity = 0.3 + (1 + translate / modalCard.offsetWidth) * 0.7;
                }
            }
            e.preventDefault();
        };
        const onEnd = () => {
            if (!isDragging) return;
            isDragging = false;
            modalCard.style.transition = 'transform 0.3s ease';
            modalOverlay.style.transition = 'opacity 0.3s';
            if (modalOverlay.classList.contains('active')) {
                const delta = currentX - startX;
                if (delta > modalCard.offsetWidth * 0.3) {
                    modalOverlay.classList.remove('active');
                    modalCard.style.transform = '';
                    modalOverlay.style.opacity = '';
                } else {
                    modalCard.style.transform = '';
                    modalOverlay.style.opacity = '';
                }
            } else {
                const delta = currentX - startX;
                if (delta < -modalCard.offsetWidth * 0.3) {
                    modalOverlay.classList.add('active');
                    modalCard.style.transform = '';
                    modalOverlay.style.opacity = '';
                } else {
                    modalCard.style.transform = '';
                    modalOverlay.style.opacity = '';
                }
            }
        };

        modalCard.addEventListener('mousedown', onStart);
        document.addEventListener('mousemove', onMove);
        document.addEventListener('mouseup', onEnd);
        modalCard.addEventListener('touchstart', onStart, { passive: true });
        document.addEventListener('touchmove', onMove, { passive: false });
        document.addEventListener('touchend', onEnd);
    }
}

function setActiveNav(page) {
    document.querySelectorAll('.nav-item[data-page]').forEach(item => {
        if (item.dataset.page === page) item.classList.add('active');
        else item.classList.remove('active');
    });
}

function updateGreeting() {
    const greeting = document.getElementById('greeting-text');
    if (!greeting) return;

    const pageLabels = { wallet: 'Wallet', insight: 'Insight', profile: 'Profile' };
    if (pageLabels[currentPage]) {
        greeting.textContent = pageLabels[currentPage];
        greeting.classList.add('page-title');
        return;
    }

    greeting.classList.remove('page-title');
    const hour = new Date().getHours();
    let timeOfDay = 'morning';
    if (hour >= 5 && hour < 11) timeOfDay = 'morning';
    else if (hour >= 11 && hour < 15) timeOfDay = 'afternoon';
    else if (hour >= 15 && hour < 19) timeOfDay = 'evening';
    else timeOfDay = 'night';
    const username = localStorage.getItem('username') || 'user';
    greeting.textContent = `Good ${timeOfDay}, ${username}`;
}

const DB_NAME = 'fingo-db';
const DB_VERSION = 1;
let dbPromise;

function openDB() {
    if (!dbPromise) {
        dbPromise = new Promise((resolve, reject) => {
            if (!window.indexedDB) {
                reject(new Error('IndexedDB is not supported in this browser.'));
                return;
            }
            try {
                const request = indexedDB.open(DB_NAME, DB_VERSION);
                request.onupgradeneeded = (event) => {
                    const db = event.target.result;
                    if (!db.objectStoreNames.contains('appData')) db.createObjectStore('appData');
                };
                request.onsuccess = (event) => resolve(event.target.result);
                request.onerror = (event) => reject(event.target.error);
                request.onblocked = () => reject(new Error('IndexedDB open request was blocked.'));
            } catch (error) {
                reject(error);
            }
        }).catch((error) => {
            dbPromise = null;
            throw error;
        });
    }
    return dbPromise;
}

async function getData(key) {
    try {
        const db = await openDB();
        return await new Promise((resolve, reject) => {
            try {
                const tx = db.transaction('appData', 'readonly');
                const store = tx.objectStore('appData');
                const req = store.get(key);
                req.onsuccess = () => resolve(req.result);
                req.onerror = () => reject(req.error);
            } catch (error) {
                reject(error);
            }
        });
    } catch (error) {
        console.error('IndexedDB getData failed for key:', key, error);
        return undefined;
    }
}

async function setData(key, value) {
    try {
        const db = await openDB();
        return await new Promise((resolve, reject) => {
            try {
                const tx = db.transaction('appData', 'readwrite');
                const store = tx.objectStore('appData');
                const req = store.put(value, key);
                req.onsuccess = () => resolve();
                req.onerror = () => reject(req.error);
            } catch (error) {
                reject(error);
            }
        });
    } catch (error) {
        console.error('IndexedDB setData failed for key:', key, error);
        throw error;
    }
}

function getCurrentCurrency() {
    return currentCurrency;
}

async function loadAppData() {
    try {
        const storedCurrency = await getData('currency');
        if (storedCurrency) currentCurrency = storedCurrency;
    } catch (error) {
        console.error('Failed to load currency:', error);
    }
    try {
        const storedCategories = await getData('categories');
        if (storedCategories && Array.isArray(storedCategories)) categories = storedCategories;
    } catch (error) {
        console.error('Failed to load categories:', error);
    }
    try {
        renderChips();
    } catch (error) {
        console.error('Failed to render chips:', error);
    }
    document.dispatchEvent(new CustomEvent('currencyReady', { detail: currentCurrency }));
}

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

let categories = [...defaultCategories];
let selectedIcon = iconOptions[0].id;
let selectedColor = '#22c55e';
let editingCategoryId = null;

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
    document.getElementById('categories-chips').classList.remove('hidden');
    document.getElementById('categories-all-list').classList.add('hidden');
    document.getElementById('categories-subheader').classList.add('hidden');
    document.getElementById('all-categories-link').textContent = 'All categories >';
    document.getElementById('add-category-btn').classList.remove('hidden');
}

function showAllListView() {
    document.getElementById('categories-chips').classList.add('hidden');
    document.getElementById('categories-all-list').classList.remove('hidden');
    document.getElementById('categories-subheader').classList.remove('hidden');
    document.getElementById('all-categories-link').textContent = '< Back';
    document.getElementById('add-category-btn').classList.add('hidden');
    renderAllCategories();
}

function resetCategoryForm() {
    document.getElementById('category-form').classList.add('hidden');
    document.getElementById('all-categories-link').classList.remove('hidden');
    document.getElementById('categories-chips').classList.remove('hidden');
    document.getElementById('categories-all-list').classList.add('hidden');
    document.getElementById('categories-subheader').classList.add('hidden');
    document.getElementById('add-category-btn').classList.remove('hidden');
    document.getElementById('all-categories-link').textContent = 'All categories >';
    editingCategoryId = null;
}

function renderChips() {
    const container = document.getElementById('categories-chips');
    if (!container) return;
    container.innerHTML = '';
    categories.forEach(cat => {
        const chip = document.createElement('div');
        chip.className = 'category-chip';
        chip.style.borderColor = cat.color;
        chip.innerHTML = `<span class="chip-icon" style="color:${cat.color}">${getIconSvg(cat.icon)}</span><span class="chip-name">${cat.name}</span>`;
        container.appendChild(chip);
    });
}

function renderAllCategories() {
    const container = document.getElementById('categories-all-list');
    if (!container) return;
    container.innerHTML = '';
    categories.forEach(cat => {
        const item = document.createElement('div');
        item.className = 'category-item';
        item.style.borderColor = cat.color;
        item.innerHTML = `<span class="category-icon" style="color:${cat.color}">${getIconSvg(cat.icon)}</span><div class="category-info"><span class="category-name">${cat.name}</span><span class="category-group">${cat.group}</span></div><div class="category-actions"><button class="category-edit" data-id="${cat.id}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg></button><button class="category-delete" data-id="${cat.id}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></svg></button></div>`;
        container.appendChild(item);
    });

    container.querySelectorAll('.category-edit').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = e.currentTarget.dataset.id;
            const cat = categories.find(c => c.id === id);
            if (cat) {
                editingCategoryId = id;
                document.getElementById('category-name').value = cat.name;
                const groupInput = document.getElementById('category-group');
                if (groupInput) groupInput.value = cat.group;
                selectedColor = cat.color;
                selectedIcon = cat.icon;
                renderColorPicker();
                renderIconPicker();
                updatePreview();
                document.getElementById('category-form-title').textContent = 'Edit Category';
                document.getElementById('category-form').classList.remove('hidden');
                document.getElementById('categories-all-list').classList.add('hidden');
                document.getElementById('categories-subheader').classList.add('hidden');
                document.getElementById('all-categories-link').classList.add('hidden');
            }
        });
    });

    container.querySelectorAll('.category-delete').forEach(btn => {
        btn.addEventListener('click', async (e) => {
            const id = e.currentTarget.dataset.id;
            categories = categories.filter(c => c.id !== id);
            await setData('categories', categories);
            renderAllCategories();
            renderChips();
        });
    });
}

function renderColorPicker() {
    const picker = document.getElementById('color-picker');
    if (!picker) return;
    picker.innerHTML = '';
    colorOptions.forEach(color => {
        const swatch = document.createElement('button');
        swatch.type = 'button';
        swatch.className = 'color-swatch';
        swatch.style.backgroundColor = color;
        swatch.dataset.color = color;
        if (color === selectedColor) swatch.classList.add('selected');
        swatch.addEventListener('click', () => {
            selectedColor = color;
            renderColorPicker();
            updatePreview();
        });
        picker.appendChild(swatch);
    });
}

function renderIconPicker() {
    const picker = document.getElementById('icon-picker');
    if (!picker) return;
    picker.innerHTML = '';
    iconOptions.forEach(icon => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'icon-option';
        btn.dataset.icon = icon.id;
        btn.innerHTML = icon.svg;
        if (icon.id === selectedIcon) btn.classList.add('selected');
        btn.addEventListener('click', () => {
            selectedIcon = icon.id;
            renderIconPicker();
            updatePreview();
        });
        picker.appendChild(btn);
    });
}

function updatePreview() {
    const nameInput = document.getElementById('category-name');
    const groupSelect = document.getElementById('category-group');
    const preview = document.getElementById('category-preview');

    if (!nameInput || !preview) return;

    const name = nameInput.value.trim() || 'Category name';
    const group = groupSelect ? groupSelect.value : 'Needs';

    preview.innerHTML = `
        <div class="category-preview-box" style="border-color:${selectedColor};">
            <span class="category-icon" style="color:${selectedColor}">${getIconSvg(selectedIcon)}</span>
            <div class="category-info">
                <span class="category-name">${name}</span>
                <span class="category-group">${group}</span>
            </div>
        </div>
    `;
}

document.addEventListener('click', function(e) {
    if (e.target && e.target.id === 'add-category-btn') {
        editingCategoryId = null;
        document.getElementById('category-name').value = '';
        const groupInput = document.getElementById('category-group');
        if (groupInput) groupInput.value = 'Needs';
        selectedColor = '#22c55e';
        selectedIcon = iconOptions[0].id;
        renderColorPicker();
        renderIconPicker();
        updatePreview();
        document.getElementById('category-form-title').textContent = 'New Category';
        document.getElementById('category-form').classList.remove('hidden');
        document.getElementById('categories-chips').classList.add('hidden');
        document.getElementById('categories-all-list').classList.add('hidden');
        document.getElementById('categories-subheader').classList.add('hidden');
        document.getElementById('all-categories-link').classList.add('hidden');
        document.getElementById('add-category-btn').classList.add('hidden');
    }

    if (e.target && e.target.id === 'cancel-category') {
        resetCategoryForm();
        renderColorPicker();
        renderIconPicker();
        updatePreview();
    }

    if (e.target && e.target.id === 'save-category') {
        const name = document.getElementById('category-name').value.trim();
        if (!name) return;
        const groupInput = document.getElementById('category-group');
        const newCategory = {
            id: editingCategoryId || Date.now().toString(),
            name: name,
            group: groupInput ? groupInput.value : 'Needs',
            color: selectedColor,
            icon: selectedIcon
        };
        if (editingCategoryId) {
            categories = categories.map(c => c.id === editingCategoryId ? newCategory : c);
        } else {
            categories.push(newCategory);
        }
        setData('categories', categories);
        resetCategoryForm();
        renderColorPicker();
        renderIconPicker();
        updatePreview();
        renderChips();
    }

    if (e.target && e.target.id === 'reset-categories') {
        categories = [...defaultCategories];
        setData('categories', categories);
        renderAllCategories();
        renderChips();
    }

    if (e.target && e.target.id === 'all-categories-link') {
        if (document.getElementById('categories-all-list').classList.contains('hidden')) {
            showAllListView();
        } else {
            showChipsView();
        }
    }
});

Promise.resolve().then(() => {
    renderColorPicker();
    renderIconPicker();
    updatePreview();
    renderChips();
});