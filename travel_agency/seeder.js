const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Package = require('./models/Package');
const Booking = require('./models/Booking');

dotenv.config();

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const packages = [
    {
        title: "Maldives Paradise Resort",
        description: "Experience the ultimate luxury in our overwater bungalows. Crystal clear waters, pristine beaches, and world-class dining await you in the heart of the Maldives.",
        price: 1299,
        duration: "5 Days, 4 Nights",
        location: "Male, Maldives",
        imageUrl: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        featured: true
    },
    {
        title: "Kyoto Cultural Tour",
        description: "Immerse yourself in Japan's rich history. Visit ancient temples, participate in traditional tea ceremonies, and explore beautiful bamboo groves in Kyoto.",
        price: 899,
        duration: "7 Days, 6 Nights",
        location: "Kyoto, Japan",
        imageUrl: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        featured: true
    },
    {
        title: "Swiss Alps Adventure",
        description: "For the thrill-seekers! Skiing, snowboarding, and breathtaking mountain views. Relax in a cozy wooden chalet by the fire in the evenings.",
        price: 1499,
        duration: "6 Days, 5 Nights",
        location: "Zermatt, Switzerland",
        imageUrl: "https://images.unsplash.com/photo-1531266752426-aad472b7bbf4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        featured: true
    },
    {
        title: "Santorini Island Getaway",
        description: "Enjoy stunning sunsets, white-washed architecture, and delectable Mediterranean cuisine on the beautiful Greek island of Santorini.",
        price: 1099,
        duration: "5 Days, 4 Nights",
        location: "Santorini, Greece",
        imageUrl: "https://images.unsplash.com/photo-1533105079780-92b9be482077?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        featured: false
    },
    {
        title: "Safari in Serengeti",
        description: "Witness the Great Migration and get up close with wildlife on an unforgettable African safari adventure.",
        price: 2100,
        duration: "8 Days, 7 Nights",
        location: "Serengeti, Tanzania",
        imageUrl: "https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        featured: false
    }
];

const importData = async () => {
    try {
        await User.deleteMany();
        await Package.deleteMany();
        await Booking.deleteMany();

        // Create Admin User
        await User.create({
            name: "Admin User",
            email: "admin@admin.com",
            password: "password123",
            role: "admin"
        });

        // Create Standard User
        await User.create({
            name: "John Doe",
            email: "user@user.com",
            password: "password123",
            role: "user"
        });

        await Package.insertMany(packages);

        console.log('Data Imported successfully! 🟢');
        console.log('Admin Email: admin@admin.com | Password: password123');
        console.log('User Email: user@user.com | Password: password123');
        process.exit();
    } catch (err) {
        console.error(`${err} 🔴`);
        process.exit(1);
    }
};

if (process.argv[2] === '-i') {
    importData();
} else {
    importData(); // default action
}
