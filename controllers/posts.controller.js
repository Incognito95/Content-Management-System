const db = require('../config/sql');
const fs = require('fs');
const { nextTick } = require('process');

// frontend
exports.showPosts = function(req, res) {
    res.render('posts', {'title': 'Posts'});
}

// read - show post form
exports.showPostForm = function(req, res) {
    res.render('create-post', { 'title' : 'Create Post'});
}

// create - create post
exports.createPost = async function (req, res) {
    // if none of them exist - their was no file that came with the form
    if (!req.files || !req.files.images) {
        return next(new Error('No file exists!'));
    }

    db.query('INSERT INTO posts SET title = ?, author = ?, date = ?, images = ?, text = ?', [req.fields.title, req.fields.author, req.fields.date, req.fields.images, req.fields.text], function (err, result) {
        if (err) {
            throw err;
        } else {
            res.redirect('/admin/posts');
        }
    })
}

// read - show posts
exports.showAdminPosts = function(req, res) {
    db.query('SELECT id, title, author, date, images, text FROM posts', function (err, results) {
        if (err) {
            throw err;
        } else {
            res.render('admin_posts', { 'title' : 'Posts', results});
        }
    })
}

// get - edit post
exports.editPost = function(req, res) {
    db.query('SELECT title, author, date, images, text FROM posts WHERE id = ?', [req.params.id], function (err, results) {
        if (err) {
            throw err;
        } else {
            res.render('edit-post', { 'title' : 'Posts', result: results[0]});
        }
    })
}

// update - update post
exports.updatePost = function(req, res) {
    db.query('UPDATE posts SET title = ?, author = ?, date = ?, text = ?, images = ? WHERE id = ?', [req.fields.title, req.fields.author, req.fields.date, req.fields.text, req.fields.images, req.params.id], function (err, results) {
        if (err) {
            throw err;
        } else {
            req.flash("info", "Post is updated!")
            res.redirect('/admin/posts');
        }
    })
}


// delete - delete post
exports.deletePost = function (req, res) {
    db.query('DELETE FROM posts WHERE id = ?', [req.params.id], function (err) {
        if (err) {
            throw err;
        } else {
            req.flash("info", "You have deleted the post!")
            res.redirect('/admin/posts');
        }
    })
}
