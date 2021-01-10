const db = require('../config/sql');

exports.posts = function (req, res) {
    db.query(`SELECT id, image_name, author, title, description, date FROM posts`, function(err, results) {
        if(err) {
            throw err;
        } else {
            console.log(results);
            res.render('posts', {'title': 'Posts', results})
        }
    })
}

exports.showOnePost = function (req, res) {
    db.query(`SELECT image_name, author, title, description, date FROM posts WHERE id = ?`, [req.params.id], function(err, results) {
        if(err) {
            throw err;
        } else {
            console.log(results);
            res.render('read-more', {'title': 'Posts', result: results[0]})
        }
    })
}   