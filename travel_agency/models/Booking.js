const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    package: {
        type: mongoose.Schema.ObjectId,
        ref: 'Package',
        required: true
    },
    travelDate: {
        type: Date,
        required: [true, 'Please specify travel date']
    },
    passengers: {
        type: Number,
        default: 1,
        min: 1
    },
    totalPrice: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Confirmed', 'Cancelled'],
        default: 'Confirmed'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Booking', BookingSchema);
