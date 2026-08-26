document.addEventListener('DOMContentLoaded', () => {
    initCommon('profile');

    (async function loadProfile() {
        try {
            const deviceId = await getData('deviceId');
            const deviceIdEl = document.getElementById('profile-device-id');
            if (deviceIdEl) {
                deviceIdEl.textContent = deviceId || 'Not available';
            }
        } catch (error) {
            console.error('Failed to load profile:', error);
        }
    })();
});