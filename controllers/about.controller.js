const db = require('../config/sql');

exports.showAbout = function(req, res) {
    res.render('about', {'title': 'About'});
}