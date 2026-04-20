const express = require('express');
const router = express.Router();
const Package = require('../models/Package');

// Get generic user injection middleware
const { autoLogin } = require('../middleware/auth');

router.use(autoLogin);

// Home Page
router.get('/', async (req, res) => {
    try {
        const featuredPackages = await Package.find({ featured: true }).limit(3);
        res.render('pages/home', {
            title: 'Travel Agency - Home',
            packages: featuredPackages
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

router.get('/about', (req, res) => {
    res.render('pages/about', { title: 'About Us' });
});

router.get('/contact', (req, res) => {
    res.render('pages/contact', { title: 'Contact Us' });
});

module.exports = router;
