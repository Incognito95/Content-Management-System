const { about } = require('../controllers/about.controller');

module.exports = function(app) {
    app.get('/about', about);
}