const db = require('../config/sql');
const fs = require('fs');

exports.admin = function (req, res) {
    res.render('admin', {'title': 'Dashboard'});
}

// ========================= POSTS ========================== //

// form
exports.createPostForm = function(req, res) {
    res.render('create_post', {'title': 'Create Posts'});
}

// create
exports.createPost = function(req, res) {
    db.query('INSERT INTO posts SET author = ?, title = ?, description = ?, date = ?', [req.fields.author, req.fields.title, req.fields.description, req.fields.date], function(err, results) {
        if(err) {
            throw err;
        } else {
            console.log(results);
            req.flash('info', 'You have created a post!');
            res.redirect('/create_post');
        }
    })
}

// read
exports.showPosts = function(req, res) {
    db.query('SELECT * FROM posts', function(err, results) {
        console.log(results);
        res.render('admin_posts', {'title': 'Post', results});
    })
}

// get
exports.editPost = function (req, res) {
    db.query('SELECT author, title, description, date FROM posts WHERE id = ?', [req.params.id], function(err, results) {
        console.log(results);
        res.render('edit_post', {'title': 'Edit Post', result: results[0]});
    })
}

// update
exports.updatePost = function (req, res) {
    db.query(`UPDATE posts SET author = ?, title = ?, description = ?, date = ? WHERE id = ?`, [req.fields.author, req.fields.title, req.fields.description, req.fields.date, req.params.id], function(err, results) {
        if(err) {
            throw err;
        } else {
            console.log(results);
            req.flash('info', 'Post updated!')
            res.redirect('/admin/posts');
        }
    })
}

// delete
exports.deletePost = function(req, res) {
    db.query(`DELETE FROM posts WHERE id = ?`, [req.params.id], function(err, results) {
        if(err) {
            throw err;
        } else {
            console.log(results);
            req.flash('info', 'Post deleted!');
            res.redirect('/admin/posts');
        }
    })
}


// ========================= USERS ========================== //

// create user form
exports.createUserForm = function (req, res) {
    res.render('create-user', {'title': 'Create User'});
}

// create
exports.createUser = function (req, res) {
    db.query(`INSERT INTO users SET user_name = ?, first_name = ?, last_name = ?, email = ?`, [req.fields.user_name, req.fields.first_name, req.fields.last_name, req.fields.email], function(err, results) {
        if(err) {
            throw err;
        } else {
            console.log(results);
            req.flash('info', 'You have created a user!');
            res.redirect('/create-user');
        }
    })
}

// read
exports.users = function(req, res) {
    db.query(`SELECT id, user_name, first_name, last_name, email FROM users`, function(err, results) {
        if(err) {
            throw err;
        } else {
            console.table(results);
            res.render('admin_users', {'title': 'Users', results});
        }
    })
}

// get
exports.editUser = function(req, res) {
    db.query(`SELECT user_name, first_name, last_name, email FROM users WHERE id = ?`, [req.params.id], function(err, results) {
        if(err) {
            throw err;
        } else {
            console.table(results);
            res.render('edit_user', {'title': 'Edit User', result: results[0]});
        }
    })
}

// update
exports.updateUser = function(req, res) {
    db.query(`UPDATE users SET user_name = ?, first_name = ?, last_name = ?, email = ? WHERE id = ?`, [req.fields.user_name, req.fields.first_name, req.fields.last_name, req.fields.email, req.params.id], function(err, results) {
        if(err) {
            throw err;
        } else {
            console.table(results);
            req.flash('info', 'You have updated a user!');
            res.redirect('/admin/users');
        }
    })
}

// delete
exports.deleteUser = function (req, res) {
    db.query(`DELETE FROM users WHERE id = ?`, [req.params.id], function(err, results) {
        if(err) {
            throw err;
        } else {
            console.log(results);
            req.flash('info', 'You have deleted a user!');
            res.redirect('/admin/users')
        }
    })
}

// ========================= IMAGE UPLOAD ========================== //

exports.showUploadForm = function (req, res) {
    res.render('image_upload', {'title': 'Image Upload'})
}

// create - insert image into database
exports.uploadImage = async function (req, res, next) {
    if(!/image/.test(req.files.image.type)) {
        return res.send('The file you uploaded is not an image!');
    }
    try {
        const uploadDir = './public/uploads/';
        const data = fs.readFileSync(req.files.image.path);
        const newFileName = Date.now() + '_' + req.files.image.name;
        fs.writeFileSync(uploadDir + newFileName, data);
        const result = await db.query('INSERT INTO posts SET image_name = ?', [newFileName]);
        res.redirect('/uploads/' + newFileName);  
    } catch (error) {
        return next(error);
    }
}

// read - show images
exports.imageList = function (req, res) {
    db.query(`SELECT id, image_name FROM posts`, function (err, results) {
        if(err) {
            throw err;
        } else {
            console.log(results);
            res.render('image-list', {'title': 'Image List', results});
        }
    })
}

// get - show one image
exports.editImage = function (req, res) {
    db.query(`SELECT image_name FROM posts WHERE id = ?`, [req.params.id], function (err, results) {
        if(err) {
            throw err;
        } else {
            console.log(results);
            res.render('edit-image', {'title': 'Edit Image', result: results[0]});
        }
    })
}

// update - replace the uploaded image
exports.updateImage = function (req, res) {
    db.query(`UPDATE posts SET image_name = ? WHERE id = ?`, [req.fields.image_name, req.params.id], function(err, results) {
        if(err) {
            throw err;
        } else {
            console.log(results);
            req.flash('info', 'Image is updated!');
            res.redirect('/list-images');
        }
    })
}


// delete - delete image
exports.deleteImage = function (req, res) {
    db.query(`DELETE FROM posts WHERE id = ?`, [req.params.id], function (err, results) {
        if(err) {
            throw err;
        } else {
            req.flash('info', 'You have deleted an image!');
            res.redirect('/list-images');
        }
    })
}