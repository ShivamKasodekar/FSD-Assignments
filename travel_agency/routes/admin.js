const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const User = require('../models/User');
const Package = require('../models/Package');
const Booking = require('../models/Booking');

// Apply middleware to all admin routes
router.use(protect);
router.use(authorize('admin'));

// Dashboard Stats
router.get('/dashboard', async (req, res) => {
    try {
        const userCount = await User.countDocuments({ role: 'user' });
        const packageCount = await Package.countDocuments();
        const bookingCount = await Booking.countDocuments();
        const recentBookings = await Booking.find().sort({ createdAt: -1 }).limit(5).populate('user package');

        res.render('admin/dashboard', {
            title: 'Admin Dashboard',
            stats: { userCount, packageCount, bookingCount },
            recentBookings
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// GET all packages for Admin
router.get('/packages', async (req, res) => {
    try {
        const packages = await Package.find().sort({ createdAt: -1 });
        res.render('admin/packages/index', { title: 'Manage Packages', packages });
    } catch(err) {
        res.status(500).send('Server Error');
    }
});

// GET add package form
router.get('/packages/new', (req, res) => {
    res.render('admin/packages/new', { title: 'Add Package' });
});

// POST add new package
router.post('/packages', async (req, res) => {
    try {
        req.body.featured = req.body.featured === 'on'; // Checklist formatting
        await Package.create(req.body);
        req.flash('success_msg', 'Package added successfully');
        res.redirect('/admin/packages');
    } catch (err) {
        console.error(err);
        req.flash('error_msg', 'Error adding package');
        res.redirect('/admin/packages/new');
    }
});

// GET edit package form
router.get('/packages/edit/:id', async (req, res) => {
    try {
        const pkg = await Package.findById(req.params.id);
        if(!pkg) return res.redirect('/admin/packages');
        res.render('admin/packages/edit', { title: 'Edit Package', pkg });
    } catch(err) {
        res.status(500).send('Server error');
    }
});

// PUT update package
router.put('/packages/:id', async (req, res) => {
    try {
        req.body.featured = req.body.featured === 'on';
        await Package.findByIdAndUpdate(req.params.id, req.body, { new: true });
        req.flash('success_msg', 'Package updated');
        res.redirect('/admin/packages');
    } catch (err) {
        console.error(err);
        res.redirect('/admin/packages');
    }
});

// DELETE package
router.delete('/packages/:id', async (req, res) => {
    try {
        await Package.findByIdAndDelete(req.params.id);
        req.flash('success_msg', 'Package deleted');
        res.redirect('/admin/packages');
    } catch(err) {
        req.flash('error_msg', 'Error deleting package');
        res.redirect('/admin/packages');
    }
});

// GET all bookings
router.get('/bookings', async (req, res) => {
    try {
        const bookings = await Booking.find().populate('user').populate('package').sort({ createdAt: -1 });
        res.render('admin/bookings', { title: 'All Bookings', bookings });
    } catch(err) {
        res.status(500).send('Server error');
    }
});

// GET all users
router.get('/users', async (req, res) => {
    try {
        const users = await User.find({}).sort({ createdAt: -1 });
        res.render('admin/users', { title: 'Manage Users', users });
    } catch(err) {
        res.status(500).send('Server error');
    }
});

module.exports = router;
