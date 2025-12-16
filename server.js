require("dotenv").config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const flash = require('express-flash')
const session = require('express-session');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const { title } = require('process');

const app = express();
const PORT = process.env.PORT || 3000;

// Parse application/x-www-form-urlencoded and JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// session setup for flash messages
app.use(session({
    secret: 'secretkey',       // any string
    resave: false,             // don’t save session if unmodified
    saveUninitialized: false   // only save session if something stored
}));

// Flash messages setup
app.use(flash());

// make login state available to all views from session
app.use((req, res, next) => {
    res.locals.loggedIn = !!req.session.loggedIn;
    res.locals.dashboardPage = false; // default to false; dashboard will set it to true
    next();
});

app.use((req, res, next) => {
    res.locals.isLoggedIn = !!req.session.user; // true if user session exists
    next();
});

// load admin credentials: prefer environment variables, fallback to config/admin.json
function loadAdminConfig() {
    if (process.env.ADMIN_USERNAME && process.env.ADMIN_PASSWORD_HASH) {
        return { username: process.env.ADMIN_USERNAME, passwordHash: process.env.ADMIN_PASSWORD_HASH };
    }
    const cfgPath = path.join(__dirname, 'config', 'admin.json');
    if (fs.existsSync(cfgPath)) {
        try {
            const raw = fs.readFileSync(cfgPath, 'utf8');
            const parsed = JSON.parse(raw);
            return { username: parsed.username, passwordHash: parsed.passwordHash };
        } catch (err) {
            console.error('Failed to read admin config:', err.message);
            return null;
        }
    }
    return null;
}

// Serve static files from "public" (create this folder for CSS/JS if needed)
app.use(express.static('public'));
app.set('view engine', 'ejs');

// show form
app.get('/', (req, res) => {
    res.render('index', { message: req.flash('error'), loggedIn: false, title: 'Home' });
});

// simple auth middleware
function isAuthenticated(req, res, next) {
    if (req.session && req.session.loggedIn) return next();
    req.flash('error', 'Please login to view the page.');
    return res.redirect('/login');
}


// show dashboard page (protected)
app.get('/dashboard', isAuthenticated, (req, res) => {
    res.render('dashboard', { title: 'Dashboard', dashboardPage: true });
});

// show sidebar
app.get('/sidebar', (req, res) => {
    res.render('sidebar');
});

// contact page
app.get('/contact', (req, res) => {
    res.render('contact', { success: req.flash('success'), error: req.flash('error'), loggedIn: false, title: 'Contact' });
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});

// about page
app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});

// signup page
app.get('/signup', (req, res) => {
    res.render('signup', { message: req.flash('error'), title: 'Sign Up' });
});

// Handle signup form submission
app.post('/signup', (req, res) => {
    const users = [];
    const { username, password } = req.body;

    // Basic validation
    if (!username || !password) {
        req.flash('error', 'Please enter both username and password.');
        return res.redirect('/signup');
    }

    // Check if user already exists
    const existingUser = users.find(user => user.username === username);
    if (existingUser) {
        req.flash('error', 'This user already exists.');
        return res.redirect('/signup');
    }

    // If not, create the user
    users.push({ username, password });
    req.flash('success', 'Account created successfully!');
    res.redirect('/login');
});

// login page
app.get('/login', (req, res) => {
    res.render('login', { message: req.flash('error'), loggedIn: false, title: 'Login' });
})

// Handle form submission
app.post('/login', (req, res) => {
    const admin = loadAdminConfig();
    if (!admin || !admin.passwordHash) {
        req.flash('error', 'Admin credentials not configured. Please set ADMIN_USERNAME and ADMIN_PASSWORD_HASH or create config/admin.json');
        return res.redirect('/login');
    }

    const submittedUser = req.body.username;
    const submittedPass = req.body.password;

    if (!submittedUser || !submittedPass) {
        req.flash('error', 'Provide username and password.');
        return res.redirect('/login');
    }

    if (submittedUser !== admin.username) {
        req.flash('error', 'Invalid credentials.');
        return res.redirect('/login');
    }

    const valid = bcrypt.compareSync(submittedPass, admin.passwordHash);
    if (!valid) {
        req.flash('error', 'Invalid credentials.');
        return res.redirect('/login');
    }

    // success
    req.session.loggedIn = true;
    res.redirect('/dashboard');
});

// logout route (destroy session if present and redirect)
app.get('/logout', (req, res) => {
    if (req.session) {
        req.session.destroy(() => {
            res.clearCookie('connect.sid');
            res.redirect('/');
        });
    } else {
        res.redirect('/');
    }
});

// Handle contact form submission
app.post('/contact/send', (req, res) => {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
        req.flash('error', 'Please fill in all fields before sending.');
        return res.redirect('/contact');
    }

    // TODO: store or send the message (e.g., send email or save to DB)
    req.flash('success', 'Message sent — thanks! We will get back to you shortly.');
    res.redirect('/contact');
});


app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});