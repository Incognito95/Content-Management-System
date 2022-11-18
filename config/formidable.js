const parser = require('express-formidable');

module.exports = function (app) {
    app.use(
        parser({
            multiples: true
        })
    );
};