require('dotenv').config();
const express = require('express');
const app = express();

app.use(express.static('public'));


app.set('view engine', 'ejs');

// middleware
require('./config/formidable')(app);
require('./config/session')(app);
require('./config/flash')(app);
require('./config/views')(app);


// routes
require('./routes/home.route')(app);
require('./routes/about.route')(app);
require('./routes/dashboard.route')(app);
require('./routes/posts.route')(app);
require('./routes/login.route')(app);



// 404 Error
app.use(function(req, res) {
    res.status(404).render('error', {'title': 'Page Not Found'});
})

// port
app.listen(3000, () => {
    console.log('App is running!');
})