import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => console.error('❌ MongoDB Connection Error:', err));

// Models
const reviewSchema = new mongoose.Schema({
  username: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
  reviews: [reviewSchema],
  rating: { type: Number, default: 0 }
});

const Product = mongoose.model('Product', productSchema);

// Routes
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/products/:id/reviews', async (req, res) => {
  const { username, rating, comment } = req.body;
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    const review = { username, rating: Number(rating), comment };
    product.reviews.push(review);
    
    // Update average rating
    const totalRating = product.reviews.reduce((sum, item) => sum + item.rating, 0);
    product.rating = totalRating / product.reviews.length;

    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Seed Route (for demonstration)
app.get('/api/seed', async (req, res) => {
  try {
    await Product.deleteMany({});
    const products = [
      {
        name: 'Aurelius Chronograph',
        description: 'A masterpiece of Swiss engineering featuring 18k rose gold and sapphire crystal.',
        price: 12500,
        category: 'Watches',
        image: 'https://images.unsplash.com/photo-1547996160-81cd16489502?q=80&w=1000&auto=format&fit=crop',
        rating: 4.8,
        reviews: [
          { username: 'Julian V.', rating: 5, comment: 'Exquisite craftsmanship.' }
        ]
      },
      {
        name: 'Nocturne Parfum',
        description: 'A deep, mysterious scent with notes of oud, black rose, and warm amber.',
        price: 280,
        category: 'Fragrance',
        image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=1000&auto=format&fit=crop',
        rating: 4.5,
        reviews: []
      },
      {
        name: 'Elysian Silk Scarf',
        description: 'Hand-woven Italian silk with intricate patterns inspired by Renaissance art.',
        price: 450,
        category: 'Accessories',
        image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=1000&auto=format&fit=crop',
        rating: 5,
        reviews: []
      }
    ];
    await Product.insertMany(products);
    res.json({ message: 'Database seeded successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
