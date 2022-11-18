const db = require('../config/sql');

// read
exports.showDashboard = function (req, res) {
    db.query(`SELECT username FROM users`, function (err, results) {
        if (err) {
            throw err;
        } else {
            console.table(results);
            res.render('dashboard', { 'title': 'Dashboard', results });
        }
    })
}
