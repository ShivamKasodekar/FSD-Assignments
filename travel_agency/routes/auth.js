const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res, req, redirectUrl) => {
    // Create token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    });

    const options = {
        expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
        httpOnly: true
    };

    if (process.env.NODE_ENV === 'production') {
        options.secure = true;
    }

    req.flash('success_msg', 'Successfully logged in');
    res
        .status(statusCode)
        .cookie('token', token, options)
        .redirect(redirectUrl);
};

// Render login page
router.get('/login', (req, res) => {
    // If logged in, redirect home
    if(req.cookies.token) return res.redirect('/dashboard');
    res.render('auth/login', { title: 'Login', user: null });
});

// Render register page
router.get('/register', (req, res) => {
    if(req.cookies.token) return res.redirect('/dashboard');
    res.render('auth/register', { title: 'Register', user: null });
});

// Register User
router.post('/register', async (req, res) => {
    const { name, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
        req.flash('error_msg', 'Passwords do not match');
        return res.redirect('/auth/register');
    }

    try {
        let user = await User.findOne({ email });
        if (user) {
            req.flash('error_msg', 'Email already exists');
            return res.redirect('/auth/register');
        }

        user = await User.create({
            name,
            email,
            password
        });

        sendTokenResponse(user, 200, res, req, '/dashboard');
    } catch (err) {
        console.error(err);
        req.flash('error_msg', 'Registration failed. Please check inputs.');
        res.redirect('/auth/register');
    }
});

// Login User
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        req.flash('error_msg', 'Please provide an email and password');
        return res.redirect('/auth/login');
    }

    try {
        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            req.flash('error_msg', 'Invalid credentials');
            return res.redirect('/auth/login');
        }

        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            req.flash('error_msg', 'Invalid credentials');
            return res.redirect('/auth/login');
        }

        // redirect admin to admin panel, user to dashboard
        const redirectUrl = user.role === 'admin' ? '/admin/dashboard' : '/dashboard';
        sendTokenResponse(user, 200, res, req, redirectUrl);

    } catch (err) {
        console.error(err);
        req.flash('error_msg', 'Server error');
        res.redirect('/auth/login');
    }
});

// Logout
router.get('/logout', (req, res) => {
    res.cookie('token', 'none', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true
    });
    req.flash('success_msg', 'Logged out successfully');
    res.redirect('/');
});

module.exports = router;
