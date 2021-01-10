const session = require('express-session');

// send messages 
// from one route to another route in the back end

module.exports = function(app) {
    app.use(session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: true
    }));
};
