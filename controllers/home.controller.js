const db = require('../config/sql');

exports.showHome = function(req, res) {
    res.render('home', {'title': 'Home'});
}