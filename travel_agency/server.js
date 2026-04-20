const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('connect-flash');
const methodOverride = require('method-override');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const connectDB = require('./config/db');

// Load config
dotenv.config();

// Connect to database
connectDB();

const app = express();

// EJS setup
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('layout', 'layouts/main');

// Body parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Cookie parser
app.use(cookieParser());

// Method override
app.use(methodOverride('_method'));

// Static folder
app.use(express.static(path.join(__dirname, 'public')));

// Express session setup
app.use(session({
    secret: 'travel_secret',
    resave: false,
    saveUninitialized: false
}));

// Connect flash
app.use(flash());

// Global variables middleware
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    
    // We'll set res.locals.user via auth middleware later
    next();
});

// Routes
app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));
app.use('/dashboard', require('./routes/dashboard'));
app.use('/admin', require('./routes/admin'));
app.use('/packages', require('./routes/packages')); // Changed base path for cleaner separation

// Global Error Handler
app.use((req, res, next) => {
    res.status(404).render('pages/404', { title: '404 - Not Found', user: req.user || null });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render('pages/500', { title: '500 - Server Error', user: req.user || null });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
