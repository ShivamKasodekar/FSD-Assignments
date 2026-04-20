require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const ejsLayouts = require('express-ejs-layouts');
const methodOverride = require('method-override');
const path = require('path');

const itemRoutes = require('./routes/items');

const app = express();

// Database Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB Connected to Used Items Portal'))
.catch(err => console.log('MongoDB Connection Error:', err));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

// EJS Setup
app.use(ejsLayouts);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.set('layout', 'layout'); // refers to views/layout.ejs

// Routes
app.get('/', (req, res) => {
    res.render('index', { title: 'Welcome to ReUseIt Portal' });
});

app.use('/items', itemRoutes);

// 404 Handler
app.use((req, res) => {
    res.status(404).render('404', { title: 'Page Not Found' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
