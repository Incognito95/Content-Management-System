module.exports = function(req, res, next) {
    if(req.session.isLoggedIn) {
        return next();
    } else {
        req.flash('error', 'You do not have access!!!');
        res.redirect('/login');
    }
}