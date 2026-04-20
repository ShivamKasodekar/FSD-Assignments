import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import ProductDetails from './components/ProductDetails';
import { ShoppingBag } from 'lucide-react';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/products');
      const data = await response.json();
      setProducts(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false);
    }
  };

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  return (
    <div className="app">
      <Navbar cartCount={cart.length} />
      <Hero />
      
      <main className="container" style={{ padding: '4rem 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '2.5rem', borderLeft: '4px solid var(--primary)', paddingLeft: '1rem' }}>Curated Collection</h2>
          {loading && <p>Loading luxury items...</p>}
        </div>

        <ProductGrid 
          products={products} 
          onSelect={setSelectedProduct} 
          onAddToCart={addToCart} 
        />
      </main>

      {selectedProduct && (
        <ProductDetails 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)}
          onAddToCart={addToCart}
          onUpdate={fetchProducts}
        />
      )}

      <footer className="glass" style={{ padding: '4rem 2rem', marginTop: '4rem', textAlign: 'center' }}>
        <p className="luxury-font" style={{ fontSize: '1.5rem', color: 'var(--primary)' }}>LuxeMart</p>
        <p style={{ color: 'var(--text-muted)', marginTop: '1rem' }}>&copy; 2026 LuxeMart Global. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default App;
