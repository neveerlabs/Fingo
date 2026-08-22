document.addEventListener('DOMContentLoaded', () => {
    initCommon('wallet');

    if (history.length <= 1) {
        history.pushState({ wallet: true }, '');
        window.addEventListener('popstate', () => {
            window.location.href = '../';
        });
    }
});