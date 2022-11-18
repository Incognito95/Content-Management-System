const db = require('../config/sql');
const { compareSync } = require('bcryptjs');

exports.showLoginForm = function(req, res) {
        res.render('login', {'title': 'Login'});
}

exports.loginCheck = function(req, res) {
        db.query(`SELECT id, password FROM users WHERE username = ?`, [req.fields.username],function(err, results) {
            if (err) {
                throw err;
            } else {
                if (results.length === 1) { // check if theirs a user
                    // console.log(results.length[1]);
                    // true or false depending on the typed password matches with what we have in the database
                    if (compareSync(req.fields.password, results[0].password)) {
                        // create session
                        req.session.isLoggedIn = true;
                        res.redirect('/admin/dashboard');
                    } else {
                        req.flash('error', 'Username and password you typed is incorrect!');
                        res.redirect('/login');
                    }
                } else {
                    req.flash('error', 'Username and password you typed is incorrect!');
                    res.redirect('/login');
                }
            }
        })
}

exports.logout = function (req, res) {
    delete req.session.isLoggedIn;
    delete req.session.user;
    res.redirect('/login');
}