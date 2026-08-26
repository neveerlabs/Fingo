document.addEventListener('DOMContentLoaded', () => {
    initCommon('home');

    const toggleBtn = document.getElementById('toggle-balance');
    const balanceAmount = document.getElementById('balance-amount');
    const eyeOpen = document.getElementById('eye-open');
    const eyeClosed = document.getElementById('eye-closed');
    let balanceVisible = false;

    function getCurrencySymbol() {
        const currency = (typeof getCurrentCurrency === 'function') ? getCurrentCurrency() : 'IDR';
        return currency === 'USD' ? '$' : 'Rp';
    }

    function updateBalanceDisplay() {
        if (!balanceAmount || !eyeOpen || !eyeClosed) return;
        balanceAmount.textContent = balanceVisible ? `${getCurrencySymbol()} 0` : '••••••';
        eyeOpen.classList.toggle('active', balanceVisible);
        eyeClosed.classList.toggle('active', !balanceVisible);
        const walletDetailText = document.getElementById('wallet-detail-text');
        const trafficDetailText = document.getElementById('traffic-detail-text');
        if (walletDetailText) walletDetailText.textContent = `${getCurrencySymbol()} 0`;
        if (trafficDetailText) trafficDetailText.textContent = `${getCurrencySymbol()} 0`;
    }

    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            balanceVisible = !balanceVisible;
            updateBalanceDisplay();
        });
    }

    document.addEventListener('currencyChanged', updateBalanceDisplay);
    document.addEventListener('currencyReady', updateBalanceDisplay);

    updateBalanceDisplay();

    (async function ensureDeviceId() {
        try {
            let deviceId = await getData('deviceId');
            if (!deviceId) {
                deviceId = generateDeviceId();
                await setData('deviceId', deviceId);
            }
        } catch (error) {
            console.error('Failed to ensure device ID:', error);
        }
    })();

    function generateDeviceId() {
        let result = '';
        for (let i = 0; i < 15; i++) {
            result += Math.floor(Math.random() * 10);
        }
        return result;
    }
});