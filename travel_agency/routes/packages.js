const express = require('express');
const router = express.Router();
const Package = require('../models/Package');
const { autoLogin } = require('../middleware/auth');

router.use(autoLogin);

// Get all packages
router.get('/', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = 6;
        const skip = (page - 1) * limit;

        // Simple search
        let query = {};
        if (req.query.search) {
            query.title = { $regex: req.query.search, $options: 'i' };
        }

        const count = await Package.countDocuments(query);
        const packages = await Package.find(query).skip(skip).limit(limit);

        res.render('pages/packages', {
            title: 'All Travel Packages',
            packages,
            current: page,
            pages: Math.ceil(count / limit),
            search: req.query.search || ''
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Single package details
router.get('/:id', async (req, res) => {
    try {
        const pkg = await Package.findById(req.params.id);
        if (!pkg) {
            return res.status(404).render('pages/404', { title: 'Not Found' });
        }
        res.render('pages/package-details', {
            title: pkg.title,
            pkg
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
