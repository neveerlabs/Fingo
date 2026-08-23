const MAX_WALLET_SLOTS = 12;
const USD_TO_IDR_RATE = 17000;

const WALLET_TYPE_ICONS = {
    bank: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 22h18"/><path d="M6 18v-7"/><path d="M10 18v-7"/><path d="M14 18v-7"/><path d="M18 18v-7"/><path d="M12 2 3 7h18Z"/></svg>',
    ewallet: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>',
    cash: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01"/><path d="M18 12h.01"/></svg>',
    creditcard: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>'
};

const WALLET_TYPE_LABELS = {
    bank: 'Bank',
    ewallet: 'E-wallet',
    cash: 'Cash',
    creditcard: 'Credit card'
};

const WALLET_PROVIDERS = {
    bank: [
        {
            group: 'Indonesia',
            items: [
                { name: 'BCA', domain: 'bca.co.id' },
                { name: 'Bank Mandiri', domain: 'bankmandiri.co.id' },
                { name: 'BRI', domain: 'bri.co.id' },
                { name: 'BNI', domain: 'bni.co.id' },
                { name: 'CIMB Niaga', domain: 'cimbniaga.co.id' },
                { name: 'Bank Danamon', domain: 'danamon.co.id' },
                { name: 'Permata Bank', domain: 'permatabank.com' },
                { name: 'BTN', domain: 'btn.co.id' },
                { name: 'OCBC NISP', domain: 'ocbcnisp.com' },
                { name: 'Maybank Indonesia', domain: 'maybank.co.id' },
                { name: 'Bank Jago', domain: 'jago.com' },
                { name: 'SeaBank', domain: 'seabank.co.id' },
                { name: 'Bank Neo Commerce', domain: 'bankneocommerce.co.id' },
                { name: 'Allo Bank', domain: 'allobank.com' },
                { name: 'Bank Syariah Indonesia', domain: 'bankbsi.co.id' },
                { name: 'Bank Mega', domain: 'bankmega.com' },
                { name: 'Bank Bukopin', domain: 'bankbukopin.co.id' },
                { name: 'Bank BTPN', domain: 'btpn.com' },
                { name: 'Bank Sinarmas', domain: 'banksinarmas.com' },
                { name: 'Bank Ganesha', domain: 'bankganesha.co.id' }
            ]
        },
        {
            group: 'Philippines',
            items: [
                { name: 'BDO', domain: 'bdo.com.ph' },
                { name: 'BPI', domain: 'bpi.com.ph' },
                { name: 'Metrobank', domain: 'metrobank.com.ph' },
                { name: 'Landbank', domain: 'landbank.com' },
                { name: 'PNB', domain: 'pnb.com.ph' },
                { name: 'UnionBank', domain: 'unionbankph.com' },
                { name: 'Security Bank', domain: 'securitybank.com' },
                { name: 'RCBC', domain: 'rcbc.com' },
                { name: 'Chinabank', domain: 'chinabank.ph' },
                { name: 'EastWest Bank', domain: 'eastwestbanker.com' },
                { name: 'AUB', domain: 'aub.com.ph' },
                { name: 'PSBank', domain: 'psbank.com.ph' }
            ]
        }
    ],
    ewallet: [
        {
            group: 'Philippines',
            items: [
                { name: 'GCash', domain: 'gcash.com' },
                { name: 'Maya', domain: 'maya.ph' },
                { name: 'ShopeePay', domain: 'shopeepay.com' },
                { name: 'GrabPay', domain: 'grab.com' },
                { name: 'Coins.ph', domain: 'coins.ph' },
                { name: 'PayMaya', domain: 'paymaya.com' }
            ]
        },
        {
            group: 'Indonesia',
            items: [
                { name: 'GoPay', domain: 'gopay.co.id' },
                { name: 'DANA', domain: 'dana.id' },
                { name: 'OVO', domain: 'ovo.id' },
                { name: 'ShopeePay', domain: 'shopeepay.co.id' },
                { name: 'LinkAja', domain: 'linkaja.id' },
                { name: 'Jenius', domain: 'jenius.com' },
                { name: 'Sakuku', domain: 'sakuku.com' }
            ]
        }
    ],
    creditcard: [
        {
            group: 'Indonesia',
            items: [
                { name: 'BCA Credit Card', domain: 'bca.co.id' },
                { name: 'Mandiri Credit Card', domain: 'bankmandiri.co.id' },
                { name: 'BNI Credit Card', domain: 'bni.co.id' },
                { name: 'CIMB Niaga Credit Card', domain: 'cimbniaga.co.id' },
                { name: 'Citibank', domain: 'citibank.co.id' },
                { name: 'HSBC', domain: 'hsbc.co.id' },
                { name: 'Standard Chartered', domain: 'sc.com' },
                { name: 'UOB', domain: 'uob.co.id' },
                { name: 'OCBC NISP Credit Card', domain: 'ocbcnisp.com' },
                { name: 'American Express', domain: 'americanexpress.com' },
                { name: 'Bank Danamon Credit Card', domain: 'danamon.co.id' },
                { name: 'BRI Credit Card', domain: 'bri.co.id' }
            ]
        },
        {
            group: 'Philippines',
            items: [
                { name: 'BDO Credit Card', domain: 'bdo.com.ph' },
                { name: 'BPI Credit Card', domain: 'bpi.com.ph' },
                { name: 'Metrobank Credit Card', domain: 'metrobank.com.ph' },
                { name: 'RCBC Credit Card', domain: 'rcbc.com' },
                { name: 'Security Bank Credit Card', domain: 'securitybank.com' },
                { name: 'UnionBank Credit Card', domain: 'unionbankph.com' },
                { name: 'American Express', domain: 'americanexpress.com' },
                { name: 'Citibank PH', domain: 'citibank.com.ph' },
                { name: 'PNB Credit Card', domain: 'pnb.com.ph' }
            ]
        }
    ]
};

const WALLET_BADGE_COLORS = ['#22c55e', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#14b8a6', '#f97316', '#6366f1', '#f472b6'];

let wallets = [];
let wizard = { type: null, provider: null };
let selectedWalletId = null;
let pendingConfirmAction = null;
let toastTimer = null;
let walletDataReady = false;

function escapeHtml(str) {
    return String(str == null ? '' : str).replace(/[&<>"']/g, (ch) => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[ch]));
}

function showOverlay(id) {
    const el = document.getElementById(id);
    if (el) el.classList.add('active');
}

function hideOverlay(id) {
    const el = document.getElementById(id);
    if (el) el.classList.remove('active');
}

function showToast(message) {
    const toast = document.getElementById('wp-toast');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2500);
}

function safeCurrency() {
    try {
        return (typeof getCurrentCurrency === 'function') ? (getCurrentCurrency() || 'IDR') : 'IDR';
    } catch (error) {
        console.error('Failed to read currency:', error);
        return 'IDR';
    }
}

function convertToBase(amount, fromCurrency) {
    if (fromCurrency === 'USD') {
        return amount * USD_TO_IDR_RATE;
    }
    return amount;
}

function convertFromBase(amount, toCurrency) {
    if (toCurrency === 'USD') {
        return amount / USD_TO_IDR_RATE;
    }
    return amount;
}

function formatCurrency(amount) {
    const currency = safeCurrency();
    const safeAmount = Number.isFinite(amount) ? amount : 0;
    const converted = convertFromBase(safeAmount, currency);
    const locale = currency === 'USD' ? 'en-US' : 'id-ID';
    let formatted;
    try {
        formatted = converted.toLocaleString(locale, { maximumFractionDigits: currency === 'USD' ? 2 : 0 });
    } catch (error) {
        formatted = String(Math.round(converted));
    }
    return currency === 'USD' ? `$ ${formatted}` : `Rp ${formatted}`;
}

function formatNumberLive(value) {
    const currency = safeCurrency();
    const locale = currency === 'USD' ? 'en-US' : 'id-ID';
    const num = parseFloat(value);
    if (!isNaN(num)) {
        try {
            return num.toLocaleString(locale);
        } catch (error) {
            return String(num);
        }
    }
    return '';
}

function updateCurrencyUnitLabels() {
    const currency = safeCurrency();
    const label = currency === 'USD' ? 'USD' : 'IDR';
    document.querySelectorAll('.wp-field-unit').forEach((el) => {
        el.textContent = label;
    });
}

function applyFallbackBadge(wrap, label, domain) {
    const source = String(label || '?').trim();
    const text = source ? source.charAt(0).toUpperCase() : '?';
    let hash = 0;
    for (let i = 0; i < source.length; i++) hash = (hash * 31 + source.charCodeAt(i)) >>> 0;
    const color = WALLET_BADGE_COLORS[hash % WALLET_BADGE_COLORS.length];
    wrap.innerHTML = '';
    wrap.style.background = color;
    wrap.style.color = '#ffffff';
    wrap.style.fontSize = '18px';
    wrap.style.fontWeight = '700';
    wrap.textContent = text;
}

function buildIconEl(className, domain, fallbackLabel, typeSvg) {
    const wrap = document.createElement('div');
    wrap.className = className;
    if (domain) {
        const img = document.createElement('img');
        img.loading = 'lazy';
        img.alt = fallbackLabel || '';
        img.referrerPolicy = 'no-referrer';
        img.addEventListener('error', function() {
            applyFallbackBadge(wrap, fallbackLabel, domain);
        }, { once: true });
        try {
            img.src = `https://logo.clearbit.com/${domain}`;
        } catch (error) {
            applyFallbackBadge(wrap, fallbackLabel, domain);
            return wrap;
        }
        wrap.appendChild(img);
    } else if (typeSvg) {
        wrap.innerHTML = typeSvg;
        wrap.style.background = '#f3f4f6';
        wrap.style.color = '#6b7280';
        wrap.style.fontSize = 'inherit';
    } else {
        applyFallbackBadge(wrap, fallbackLabel, domain);
    }
    return wrap;
}

function buildWalletIcon(wallet, className) {
    if (!wallet) {
        const wrap = document.createElement('div');
        wrap.className = className;
        applyFallbackBadge(wrap, '?', null);
        return wrap;
    }
    if (wallet.type === 'cash') {
        const wrap = document.createElement('div');
        wrap.className = className;
        wrap.style.background = '#4b5563';
        wrap.style.color = '#ffffff';
        wrap.innerHTML = WALLET_TYPE_ICONS.cash;
        return wrap;
    }
    return buildIconEl(className, wallet.domain, wallet.providerName || wallet.name, WALLET_TYPE_ICONS[wallet.type]);
}

async function persistWallets() {
    try {
        await setData('wallets', wallets);
    } catch (error) {
        console.error('Failed to save wallets:', error);
        showToast('Failed to save changes. Please try again.');
    }
}

async function initWalletPage() {
    try {
        const stored = await getData('wallets');
        wallets = Array.isArray(stored) ? stored.filter((w) => w && typeof w === 'object' && w.id) : [];
    } catch (error) {
        console.error('Failed to load wallets:', error);
        wallets = [];
        showToast('Could not load saved wallets. Starting fresh.');
    }
    walletDataReady = true;
    bindWalletEvents();
    renderWalletUI();
}

function renderProgress(containerId, step, total, label) {
    const el = document.getElementById(containerId);
    if (!el) return;
    let dots = '';
    for (let i = 1; i <= total; i++) {
        if (i < step) dots += '<span class="wp-progress-dot done"></span>';
        else if (i === step) dots += '<span class="wp-progress-dot current"></span>';
        else dots += '<span class="wp-progress-dot"></span>';
    }
    el.innerHTML = `<div class="wp-progress-dots">${dots}</div><span class="wp-progress-text">${step} of ${total} · ${escapeHtml(label)}</span>`;
}

function openTypeModal() {
    if (!walletDataReady) return;
    const active = wallets.filter((w) => !w.archived);
    if (active.length >= MAX_WALLET_SLOTS) {
        showToast(`Maximum of ${MAX_WALLET_SLOTS} wallets reached.`);
        return;
    }
    wizard = { type: null, provider: null };
    showOverlay('wp-type-overlay');
}

function selectType(type) {
    if (!WALLET_TYPE_LABELS[type]) return;
    wizard.type = type;
    if (type === 'cash') {
        wizard.provider = { name: 'Cash', domain: null };
        hideOverlay('wp-type-overlay');
        openDetailsStep(2, 2);
    } else {
        const searchInput = document.getElementById('wp-provider-search');
        if (searchInput) searchInput.value = '';
        renderProviderList(type, '');
        renderProgress('wp-provider-progress', 2, 3, 'Provider');
        hideOverlay('wp-type-overlay');
        showOverlay('wp-provider-overlay');
    }
}

function selectProvider(provider) {
    wizard.provider = provider;
    hideOverlay('wp-provider-overlay');
    openDetailsStep(3, 3);
}

function openDetailsStep(step, total) {
    renderProgress('wp-details-progress', step, total, 'Details');
    const nameInput = document.getElementById('wp-name-input');
    const balanceInput = document.getElementById('wp-balance-input');
    if (nameInput) nameInput.value = wizard.provider ? wizard.provider.name : '';
    if (balanceInput) {
        balanceInput.value = '';
        balanceInput._rawValue = '';
    }
    updateCurrencyUnitLabels();
    showOverlay('wp-details-overlay');
    if (nameInput) {
        setTimeout(() => {
            try { nameInput.focus(); } catch (error) { /* no-op */ }
        }, 200);
    }
}

function renderProviderList(type, filterText) {
    const container = document.getElementById('wp-provider-list');
    if (!container) return;
    container.innerHTML = '';
    const groups = WALLET_PROVIDERS[type] || [];
    const query = (filterText || '').trim().toLowerCase();
    let anyMatch = false;

    groups.forEach((group) => {
        const items = group.items.filter((it) => !query || it.name.toLowerCase().includes(query));
        if (!items.length) return;
        anyMatch = true;
        const label = document.createElement('div');
        label.className = 'wp-provider-group-label';
        label.textContent = group.group;
        container.appendChild(label);
        items.forEach((item) => {
            const row = document.createElement('div');
            row.className = 'wp-provider-item';
            row.appendChild(buildIconEl('wp-provider-icon', item.domain, item.name, WALLET_TYPE_ICONS[type]));
            const name = document.createElement('span');
            name.className = 'wp-provider-name';
            name.textContent = item.name;
            row.appendChild(name);
            row.addEventListener('click', () => selectProvider(item));
            container.appendChild(row);
        });
    });

    if (!anyMatch) {
        const empty = document.createElement('p');
        empty.className = 'wp-provider-empty';
        empty.textContent = 'No providers found.';
        container.appendChild(empty);
    }

    if (query) {
        const customBtn = document.createElement('button');
        customBtn.type = 'button';
        customBtn.className = 'wp-custom-provider-btn';
        customBtn.textContent = `Use "${filterText.trim()}" as custom name`;
        customBtn.addEventListener('click', () => selectProvider({ name: filterText.trim(), domain: null }));
        container.appendChild(customBtn);
    }
}

function setupLiveFormatting(inputEl) {
    if (!inputEl) return;
    inputEl.addEventListener('input', function() {
        const raw = this.value.replace(/[^0-9.]/g, '');
        this._rawValue = raw;
        this.value = raw;
    });
    inputEl.addEventListener('blur', function() {
        const raw = this._rawValue || '';
        const num = parseFloat(raw);
        if (!isNaN(num) && raw.length > 0) {
            const formatted = formatNumberLive(raw);
            this.value = formatted;
        } else {
            this.value = '';
            this._rawValue = '';
        }
    });
    inputEl.addEventListener('focus', function() {
        const raw = this._rawValue || '';
        if (raw.length > 0) {
            this.value = raw;
            this.select();
        }
    });
}

async function saveWallet(forceZeroBalance) {
    if (!wizard.type) return;
    const active = wallets.filter((w) => !w.archived);
    if (active.length >= MAX_WALLET_SLOTS) {
        showToast(`Maximum of ${MAX_WALLET_SLOTS} wallets reached.`);
        hideOverlay('wp-details-overlay');
        return;
    }

    const nameInput = document.getElementById('wp-name-input');
    const balanceInput = document.getElementById('wp-balance-input');
    const providerName = wizard.provider ? wizard.provider.name : (WALLET_TYPE_LABELS[wizard.type] || 'Wallet');
    const rawName = nameInput ? nameInput.value.trim() : '';
    const name = (rawName || providerName).slice(0, 60);

    let balanceRaw = 0;
    if (!forceZeroBalance && balanceInput) {
        const rawVal = balanceInput._rawValue || balanceInput.value;
        const parsed = parseFloat(rawVal.replace(/[^0-9.]/g, ''));
        balanceRaw = Number.isFinite(parsed) ? parsed : 0;
    }

    const currency = safeCurrency();
    const balanceInBase = convertToBase(balanceRaw, currency);

    const newWallet = {
        id: `w_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
        type: wizard.type,
        providerName,
        domain: wizard.provider ? wizard.provider.domain : null,
        name,
        balance: balanceInBase,
        isSavings: false,
        archived: false,
        createdAt: Date.now()
    };

    wallets.push(newWallet);
    await persistWallets();
    hideOverlay('wp-details-overlay');
    wizard = { type: null, provider: null };
    renderWalletUI();
    showToast('Wallet added.');
}

function openActionModal(id) {
    const wallet = wallets.find((w) => w.id === id);
    if (!wallet) return;
    selectedWalletId = id;

    const summary = document.getElementById('wp-action-summary');
    if (summary) {
        summary.innerHTML = '';
        summary.appendChild(buildWalletIcon(wallet, 'wp-item-icon'));
        const info = document.createElement('div');
        info.innerHTML = `<span class="wp-action-name">${escapeHtml(wallet.name)}</span><span class="wp-action-balance">${escapeHtml(formatCurrency(wallet.balance))}</span>`;
        summary.appendChild(info);
    }

    const savingsBtn = document.getElementById('wp-mark-savings-btn');
    if (savingsBtn) savingsBtn.textContent = wallet.isSavings ? 'Unmark as savings' : 'Mark as savings';

    showOverlay('wp-action-overlay');
}

function openEditBalance(id) {
    const wallet = wallets.find((w) => w.id === id);
    if (!wallet) return;
    selectedWalletId = id;
    const label = document.getElementById('wp-editbalance-name');
    if (label) label.textContent = wallet.name;
    const input = document.getElementById('wp-editbalance-input');
    if (input) {
        const displayVal = convertFromBase(wallet.balance, safeCurrency());
        const raw = String(displayVal);
        input._rawValue = raw;
        input.value = formatNumberLive(raw);
    }
    updateCurrencyUnitLabels();
    showOverlay('wp-editbalance-overlay');
}

async function saveEditBalance() {
    const wallet = wallets.find((w) => w.id === selectedWalletId);
    if (!wallet) return;
    const input = document.getElementById('wp-editbalance-input');
    const rawVal = input ? (input._rawValue || input.value) : '0';
    const parsed = parseFloat(rawVal.replace(/[^0-9.]/g, ''));
    const displayCurrency = safeCurrency();
    const balanceInBase = convertToBase(Number.isFinite(parsed) ? parsed : 0, displayCurrency);
    wallet.balance = balanceInBase;
    await persistWallets();
    hideOverlay('wp-editbalance-overlay');
    renderWalletUI();
    showToast('Balance updated.');
}

function openConfirm(title, text, onConfirm) {
    const titleEl = document.getElementById('wp-confirm-title');
    const textEl = document.getElementById('wp-confirm-text');
    if (titleEl) titleEl.textContent = title;
    if (textEl) textEl.textContent = text;
    pendingConfirmAction = typeof onConfirm === 'function' ? onConfirm : null;
    showOverlay('wp-confirm-overlay');
}

async function archiveWallet(id) {
    const wallet = wallets.find((w) => w.id === id);
    if (!wallet) return;
    wallet.archived = true;
    wallet.isSavings = false;
    await persistWallets();
    renderWalletUI();
    showToast('Wallet archived.');
}

async function restoreWallet(id) {
    const wallet = wallets.find((w) => w.id === id);
    if (!wallet) return;
    const active = wallets.filter((w) => !w.archived);
    if (active.length >= MAX_WALLET_SLOTS) {
        showToast(`Maximum of ${MAX_WALLET_SLOTS} wallets reached.`);
        return;
    }
    wallet.archived = false;
    await persistWallets();
    renderWalletUI();
    renderArchivedList();
    showToast('Wallet restored.');
}

async function deleteWalletPermanently(id) {
    wallets = wallets.filter((w) => w.id !== id);
    await persistWallets();
    renderWalletUI();
    renderArchivedList();
    showToast('Wallet deleted.');
}

function renderArchivedList() {
    const container = document.getElementById('wp-archived-list');
    if (!container) return;
    const archived = wallets.filter((w) => w.archived);
    container.innerHTML = '';
    if (!archived.length) {
        container.innerHTML = '<p class="wp-empty">No archived wallets.</p>';
        return;
    }
    archived.forEach((w) => {
        const row = document.createElement('div');
        row.className = 'wp-archived-item';
        row.appendChild(buildWalletIcon(w, 'wp-item-icon'));

        const info = document.createElement('div');
        info.className = 'wp-item-info';
        info.innerHTML = `<span class="wp-item-name">${escapeHtml(w.name)}</span><span class="wp-item-type">${escapeHtml(WALLET_TYPE_LABELS[w.type] || '')}</span>`;
        row.appendChild(info);

        const actions = document.createElement('div');
        actions.className = 'wp-archived-actions';

        const restoreBtn = document.createElement('button');
        restoreBtn.type = 'button';
        restoreBtn.textContent = 'Restore';
        restoreBtn.addEventListener('click', () => restoreWallet(w.id));

        const deleteBtn = document.createElement('button');
        deleteBtn.type = 'button';
        deleteBtn.className = 'wp-delete-btn';
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', () => {
            openConfirm('Delete wallet?', 'This will permanently delete this wallet and cannot be undone.', () => deleteWalletPermanently(w.id));
        });

        actions.appendChild(restoreBtn);
        actions.appendChild(deleteBtn);
        row.appendChild(actions);
        container.appendChild(row);
    });
}

function buildWalletRow(wallet) {
    const row = document.createElement('div');
    row.className = 'wp-item' + (wallet.isSavings ? ' savings' : '');
    row.dataset.id = wallet.id;
    row.appendChild(buildWalletIcon(wallet, 'wp-item-icon'));

    const info = document.createElement('div');
    info.className = 'wp-item-info';
    info.innerHTML = `<span class="wp-item-name">${escapeHtml(wallet.name)}</span><span class="wp-item-type">${escapeHtml(WALLET_TYPE_LABELS[wallet.type] || '')}</span>`;
    row.appendChild(info);

    const right = document.createElement('div');
    right.className = 'wp-item-right';
    right.innerHTML = `<span class="wp-item-balance">${escapeHtml(formatCurrency(wallet.balance))}</span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 6 15 12 9 18"/></svg>`;
    row.appendChild(right);

    row.addEventListener('click', () => openActionModal(wallet.id));
    return row;
}

function renderWalletUI() {
    try {
        const active = wallets.filter((w) => !w.archived);
        const displayCurrency = safeCurrency();
        let total = 0;
        active.forEach((w) => {
            const val = Number.isFinite(w.balance) ? w.balance : 0;
            total += convertFromBase(val, displayCurrency);
        });
        const emergency = active.filter((w) => w.isSavings).reduce((sum, w) => {
            const val = Number.isFinite(w.balance) ? w.balance : 0;
            return sum + convertFromBase(val, displayCurrency);
        }, 0);

        const totalEl = document.getElementById('wp-total-amount');
        if (totalEl) {
            const currency = safeCurrency();
            const locale = currency === 'USD' ? 'en-US' : 'id-ID';
            let formatted;
            try {
                formatted = total.toLocaleString(locale, { maximumFractionDigits: currency === 'USD' ? 2 : 0 });
            } catch (error) {
                formatted = String(Math.round(total));
            }
            totalEl.textContent = currency === 'USD' ? `$ ${formatted}` : `Rp ${formatted}`;
        }

        const slotsEl = document.getElementById('wp-slots-text');
        if (slotsEl) slotsEl.textContent = `${active.length} of ${MAX_WALLET_SLOTS} slots`;

        const listEl = document.getElementById('wp-list');
        if (listEl) {
            listEl.innerHTML = '';
            if (!active.length) {
                listEl.innerHTML = '<p class="wp-empty">No wallets yet. Add one to get started.</p>';
            } else {
                const fragment = document.createDocumentFragment();
                active.forEach((w) => fragment.appendChild(buildWalletRow(w)));
                listEl.appendChild(fragment);
            }
        }

        const emergencyAmountEl = document.getElementById('wp-emergency-amount');
        if (emergencyAmountEl) {
            const currency = safeCurrency();
            const locale = currency === 'USD' ? 'en-US' : 'id-ID';
            let formatted;
            try {
                formatted = emergency.toLocaleString(locale, { maximumFractionDigits: currency === 'USD' ? 2 : 0 });
            } catch (error) {
                formatted = String(Math.round(emergency));
            }
            emergencyAmountEl.textContent = currency === 'USD' ? `$ ${formatted}` : `Rp ${formatted}`;
        }

        const emergencyDescEl = document.getElementById('wp-emergency-desc');
        if (emergencyDescEl) {
            emergencyDescEl.textContent = emergency > 0
                ? 'Funds marked as savings across your wallets.'
                : 'Mark part of a wallet as savings to start your fund.';
        }

        const archivedCount = wallets.filter((w) => w.archived).length;
        const archivedLink = document.getElementById('wp-archived-link');
        if (archivedLink) archivedLink.classList.toggle('hidden', archivedCount === 0);

        const atLimit = active.length >= MAX_WALLET_SLOTS;
        const addBtn = document.getElementById('wp-add-btn');
        const addSlotBtn = document.getElementById('wp-add-slot-btn');
        if (addBtn) addBtn.classList.toggle('disabled', atLimit);
        if (addSlotBtn) addSlotBtn.classList.toggle('disabled', atLimit);
    } catch (error) {
        console.error('Failed to render wallet UI:', error);
        showToast('Something went wrong while rendering. Please reload.');
    }
}

function bindWalletEvents() {
    const addBtn = document.getElementById('wp-add-btn');
    const addSlotBtn = document.getElementById('wp-add-slot-btn');
    if (addBtn) addBtn.addEventListener('click', () => { if (!addBtn.classList.contains('disabled')) openTypeModal(); });
    if (addSlotBtn) addSlotBtn.addEventListener('click', () => { if (!addSlotBtn.classList.contains('disabled')) openTypeModal(); });

    document.querySelectorAll('.wp-type-card').forEach((card) => {
        card.addEventListener('click', () => selectType(card.dataset.type));
    });

    document.querySelectorAll('[data-wp-close]').forEach((btn) => {
        btn.addEventListener('click', () => hideOverlay(btn.dataset.wpClose));
    });

    document.querySelectorAll('.wp-overlay').forEach((overlay) => {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) overlay.classList.remove('active');
        });
    });

    const providerSearch = document.getElementById('wp-provider-search');
    if (providerSearch) {
        providerSearch.addEventListener('input', () => {
            if (wizard.type) renderProviderList(wizard.type, providerSearch.value);
        });
    }

    const balanceInput = document.getElementById('wp-balance-input');
    if (balanceInput) setupLiveFormatting(balanceInput);

    const editBalanceInput = document.getElementById('wp-editbalance-input');
    if (editBalanceInput) setupLiveFormatting(editBalanceInput);

    const saveWalletBtn = document.getElementById('wp-save-wallet-btn');
    if (saveWalletBtn) saveWalletBtn.addEventListener('click', () => saveWallet(false));

    const skipWalletBtn = document.getElementById('wp-skip-wallet-btn');
    if (skipWalletBtn) skipWalletBtn.addEventListener('click', () => saveWallet(true));

    const saveEditBtn = document.getElementById('wp-save-editbalance-btn');
    if (saveEditBtn) saveEditBtn.addEventListener('click', () => saveEditBalance());

    const transferBtn = document.getElementById('wp-transfer-btn');
    if (transferBtn) transferBtn.addEventListener('click', () => {
        hideOverlay('wp-action-overlay');
        showOverlay('dev-overlay');
    });

    const editBalanceBtn = document.getElementById('wp-editbalance-action-btn');
    if (editBalanceBtn) editBalanceBtn.addEventListener('click', () => {
        hideOverlay('wp-action-overlay');
        if (selectedWalletId) openEditBalance(selectedWalletId);
    });

    const markSavingsBtn = document.getElementById('wp-mark-savings-btn');
    if (markSavingsBtn) markSavingsBtn.addEventListener('click', async () => {
        const wallet = wallets.find((w) => w.id === selectedWalletId);
        if (!wallet) return;
        wallet.isSavings = !wallet.isSavings;
        await persistWallets();
        hideOverlay('wp-action-overlay');
        renderWalletUI();
        showToast(wallet.isSavings ? 'Marked as savings.' : 'Removed from savings.');
    });

    const archiveBtn = document.getElementById('wp-archive-btn');
    if (archiveBtn) archiveBtn.addEventListener('click', () => {
        hideOverlay('wp-action-overlay');
        openConfirm('Archive wallet?', 'This wallet will be moved to archive and excluded from your totals. You can restore it anytime.', () => archiveWallet(selectedWalletId));
    });

    const archivedLink = document.getElementById('wp-archived-link');
    if (archivedLink) archivedLink.addEventListener('click', () => {
        renderArchivedList();
        showOverlay('wp-archived-overlay');
    });

    const confirmOkBtn = document.getElementById('wp-confirm-ok-btn');
    if (confirmOkBtn) confirmOkBtn.addEventListener('click', () => {
        const action = pendingConfirmAction;
        pendingConfirmAction = null;
        hideOverlay('wp-confirm-overlay');
        if (typeof action === 'function') action();
    });

    const confirmCancelBtn = document.getElementById('wp-confirm-cancel-btn');
    if (confirmCancelBtn) confirmCancelBtn.addEventListener('click', () => {
        pendingConfirmAction = null;
        hideOverlay('wp-confirm-overlay');
    });

    document.addEventListener('currencyChanged', () => {
        updateCurrencyUnitLabels();
        renderWalletUI();
    });
    document.addEventListener('currencyReady', () => {
        updateCurrencyUnitLabels();
        renderWalletUI();
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initCommon('wallet');

    if (history.length <= 1) {
        history.pushState({ wallet: true }, '');
        window.addEventListener('popstate', () => {
            window.location.href = '../';
        });
    }

    initWalletPage();
});

window.addEventListener('error', (event) => {
    console.error('Wallet page error:', event && (event.error || event.message));
});

window.addEventListener('unhandledrejection', (event) => {
    console.error('Wallet page unhandled rejection:', event && event.reason);
});