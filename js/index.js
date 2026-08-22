document.addEventListener('DOMContentLoaded', () => {
    initCommon('home');

    const toggleBtn = document.getElementById('toggle-balance');
    const balanceAmount = document.getElementById('balance-amount');
    const eyeOpen = document.getElementById('eye-open');
    const eyeClosed = document.getElementById('eye-closed');
    let balanceVisible = false;

    function getCurrencySymbol() {
        return localStorage.getItem('currency') === 'USD' ? '$' : 'Rp';
    }

    function updateBalanceDisplay() {
        balanceAmount.textContent = balanceVisible ? `${getCurrencySymbol()} 0` : '••••••';
        eyeOpen.classList.toggle('active', balanceVisible);
        eyeClosed.classList.toggle('active', !balanceVisible);
        document.getElementById('wallet-detail-text').textContent = `${getCurrencySymbol()} 0`;
        document.getElementById('traffic-detail-text').textContent = `${getCurrencySymbol()} 0`;
    }

    toggleBtn.addEventListener('click', () => {
        balanceVisible = !balanceVisible;
        updateBalanceDisplay();
    });

    document.addEventListener('currencyChanged', updateBalanceDisplay);

    updateBalanceDisplay();
});