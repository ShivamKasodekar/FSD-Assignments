const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true,
        enum: ['Car', 'Bike', 'Electronics', 'Furniture', 'Other']
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    condition: {
        type: String,
        required: true,
        enum: ['Like New', 'Excellent', 'Good', 'Fair', 'Needs Repair']
    },
    description: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        default: 'https://images.unsplash.com/photo-1551522435-a13afa10f103?auto=format&fit=crop&q=80&w=600'
    },
    location: {
        type: String,
        required: true
    },
    contactNumber: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Item', itemSchema);
