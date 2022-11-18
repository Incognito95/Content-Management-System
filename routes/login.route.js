const { showLoginForm, loginCheck, logout } = require('../controllers/login.controller');

module.exports = function(app) {
    app.get('/login', showLoginForm);
    app.post('/login', loginCheck);
    app.get('/logout', logout)
}
