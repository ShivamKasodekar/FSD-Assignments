const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const Booking = require('../models/Booking');
const Package = require('../models/Package');

router.use(protect);

// Get User Dashboard (Booking History)
router.get('/', async (req, res) => {
    try {
        const bookings = await Booking.find({ user: req.user.id }).populate('package');
        res.render('user/dashboard', {
            title: 'My Dashboard',
            bookings
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Book a package
router.post('/book/:packageId', async (req, res) => {
    try {
        const pkg = await Package.findById(req.params.packageId);
        if (!pkg) {
            req.flash('error_msg', 'Package not found');
            return res.redirect('/packages');
        }

        const passengers = req.body.passengers || 1;
        const booking = await Booking.create({
            user: req.user.id,
            package: pkg._id,
            travelDate: req.body.travelDate,
            passengers,
            totalPrice: pkg.price * passengers,
            status: 'Confirmed'
        });

        req.flash('success_msg', 'Successfully booked your trip!');
        res.redirect('/dashboard');

    } catch (err) {
        console.error(err);
        req.flash('error_msg', 'Booking failed, ensure you picked a valid date.');
        res.redirect(`/packages/${req.params.packageId}`);
    }
});

module.exports = router;
