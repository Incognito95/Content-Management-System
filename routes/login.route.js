const { login, loginCheck } = require('../controllers/login.controller');

module.exports = function(app) {
    app.get('/login', login);
    app.post('/login', loginCheck);
}