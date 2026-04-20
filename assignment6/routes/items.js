const express = require('express');
const router = express.Router();
const Item = require('../models/Item');

// GET all items
router.get('/', async (req, res) => {
    try {
        const { search, category } = req.query;
        let query = {};
        
        if (search) {
            query.title = { $regex: search, $options: 'i' };
        }
        if (category && category !== 'All') {
            query.category = category;
        }

        const items = await Item.find(query).sort({ createdAt: -1 });
        res.render('items/index', { title: 'Browse Postings', items, req });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

// GET new item form
router.get('/new', (req, res) => {
    res.render('items/new', { title: 'Sell an Item' });
});

// POST new item
router.post('/', async (req, res) => {
    try {
        const newItem = new Item(req.body);
        await newItem.save();
        res.redirect(`/items/${newItem._id}`);
    } catch (error) {
        console.error(error);
        res.status(400).render('items/new', { title: 'Sell an Item', error: 'Please fill all required fields correctly.', body: req.body });
    }
});

// GET single item
router.get('/:id', async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if (!item) return res.status(404).render('404', { title: 'Item Not Found' });
        res.render('items/show', { title: item.title, item });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

// GET edit form
router.get('/:id/edit', async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if (!item) return res.status(404).render('404', { title: 'Item Not Found' });
        res.render('items/edit', { title: 'Edit Item', item });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

// PUT update item
router.put('/:id', async (req, res) => {
    try {
        await Item.findByIdAndUpdate(req.params.id, req.body, { runValidators: true });
        res.redirect(`/items/${req.params.id}`);
    } catch (error) {
        console.error(error);
        res.status(400).send('Error updating item');
    }
});

// DELETE item
router.delete('/:id', async (req, res) => {
    try {
        await Item.findByIdAndDelete(req.params.id);
        res.redirect('/items');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error deleting item');
    }
});

module.exports = router;
