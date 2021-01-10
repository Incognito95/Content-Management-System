const db = require('../config/sql');

exports.about = function(req, res) {
    db.query(`SELECT about_description FROM description`, function(err, results) {
        if(err) {
            throw err;
        } else {
            console.log(results);    
            res.render('about', {'title': 'About', results});
        }
    })
}