const { showAbout } = require('../controllers/about.controller');

module.exports = function (app) {
    app.get('/about', showAbout);
}