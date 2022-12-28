module.exports = function(app) {
    app.set('view engine', 'ejs'); // telling our views what view engine were using
    app.set('views', 'views'); // telling where our views files are located
}