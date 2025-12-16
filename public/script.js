// Auto-dismiss Bootstrap alerts after a few seconds
document.addEventListener('DOMContentLoaded', function () {
    const ALERT_DISPLAY_MS = 4000; // how long alerts remain visible
    const alerts = document.querySelectorAll('.alert');
    alerts.forEach(alert => {
        // set a timeout to fade and remove the alert
        setTimeout(() => {
            // use Bootstrap's fade classes if available
            alert.classList.add('fade');
            alert.classList.remove('show');
            // fully remove from DOM after transition
            setTimeout(() => {
                if (alert.parentNode) alert.parentNode.removeChild(alert);
            }, 350);
        }, ALERT_DISPLAY_MS);
    });
});