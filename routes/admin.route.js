const { admin, showPosts, createPostForm, createPost, deletePost, editPost, updatePost, users, editUser, updateUser, deleteUser, createUserForm, createUser, showUploadForm, uploadImage, imageList, deleteImage, editImage, updateImage } = require('../controllers/admin.controller');
const isAuthorized = require('../middleware/is-Authorized');

module.exports = function (app) {
    app.get('/admin', isAuthorized, admin);
    app.get('/admin/dashboard', isAuthorized);
    app.get('/admin/posts', showPosts);
    app.get('/create_post', createPostForm);
    app.post('/create', createPost)
    app.get('/edit/:id', editPost);
    app.get('/delete/:id', deletePost);
    app.post('/edit/:id', updatePost);
    app.get('/admin/users', users);
    app.get('/edit-user/:id', editUser);
    app.post('/edit-user/:id', updateUser);
    app.get('/delete-user/:id', deleteUser);
    app.get('/create-user', createUserForm);
    app.post('/create-user', createUser);
    app.get('/admin/image_upload', showUploadForm);
    app.post('/admin/image_upload', uploadImage);
    app.get('/list-images', imageList);
    app.get('/delete-image/:id', deleteImage);
    app.get('/edit-image/:id', editImage);
    app.post('/edit-image/:id', updateImage);
}