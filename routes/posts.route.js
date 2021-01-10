const { posts, showOnePost } = require('../controllers/posts.controller');

module.exports = function(app) {
    app.get('/posts', posts);
    app.get('/read-more/:id', showOnePost)
}