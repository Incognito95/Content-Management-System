const { showPosts, showAdminPosts, showPostForm, createPost, deletePost, editPost, updatePost, postDetail } = require('../controllers/posts.controller');

module.exports = function(app) {
    app.get('/admin/posts', showAdminPosts)
    app.get('/posts', showPosts);
    app.get('/create-post', showPostForm);
    app.get('/edit-post/:id', editPost);
    app.post('/create-post', createPost);
    app.get('/delete-post/:id', deletePost);
    app.post('/edit-post/:id', updatePost);
    app.get('/post-detail/:id', postDetail);
}
