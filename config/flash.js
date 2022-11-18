// bringing the express-flash package in
const flash = require('express-flash');

// exporting the module and using flash
module.exports = function(app) {
    app.use(flash());
};