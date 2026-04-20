const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Protect routes
exports.protect = async (req, res, next) => {
    let token;

    if (req.cookies.token) {
        token = req.cookies.token;
    }

    if (!token) {
        req.flash('error_msg', 'Not authorized to access this route. Please log in.');
        return res.redirect('/auth/login');
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = await User.findById(decoded.id);
        
        // Also feed user to locals for views
        res.locals.user = req.user;

        next();
    } catch (err) {
        req.flash('error_msg', 'Not authorized to access this route');
        return res.redirect('/auth/login');
    }
};

// Grant access to specific roles
exports.authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            req.flash('error_msg', `User role ${req.user.role} is not authorized to access this route`);
            return res.redirect('/');
        }
        next();
    };
};

// Middleware to inject user into views regardless of whether route is protected or not
exports.autoLogin = async (req, res, next) => {
    let token;
    if (req.cookies.token) {
        token = req.cookies.token;
    }

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id);
            res.locals.user = req.user;
        } catch(err) {
            res.locals.user = null;
        }
    } else {
        res.locals.user = null;
    }
    next();
};
