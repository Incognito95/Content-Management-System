require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.set('view engine', 'ejs');

app.use(express.static('public'))


app.use(bodyParser.json());

// middlewares
require('./config/parser')(app);
require('./config/session')(app);
require('./config/flash')(app);

// routes
require('./routes/home.route')(app);
require('./routes/about.route')(app);
require('./routes/login.route')(app);
require('./routes/admin.route')(app);
require('./routes/posts.route')(app);


// 404 Error
app.use(function(req, res) {
    res.status(404).render('error', {'title': 'Page Not Found'});
})

// port
app.listen(3000, () =>  {
console.log(`App is running on port 3000!`);
});