const { showDashboard } = require('../controllers/dashboard.controller');
const isAuthorized = require('../middleware/is-Authorized');

module.exports = function(app) {
    app.get('/admin/dashboard', isAuthorized, showDashboard);
    app.get('/admin/dashboard', isAuthorized);
}
