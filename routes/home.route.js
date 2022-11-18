const { showHome } = require('../controllers/home.controller');

module.exports = function(app) {
    app.get('/', showHome);
}
