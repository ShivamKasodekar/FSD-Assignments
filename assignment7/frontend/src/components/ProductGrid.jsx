import React from 'react';
import { Star, ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';

const ProductCard = ({ product, onSelect, onAddToCart }) => {
  return (
    <motion.div 
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass-card"
      style={{ display: 'flex', flexDirection: 'column', gap: '1rem', cursor: 'pointer' }}
      onClick={() => onSelect(product)}
    >
      <div style={{ 
        width: '100%', 
        height: '300px', 
        borderRadius: '8px', 
        overflow: 'hidden',
        position: 'relative'
      }}>
        <img 
          src={product.image} 
          alt={product.name} 
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
          onMouseOver={e => e.currentTarget.style.transform = 'scale(1.1)'}
          onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
        />
        <div style={{ 
          position: 'absolute', 
          top: '10px', 
          right: '10px', 
          background: 'rgba(0,0,0,0.6)', 
          padding: '4px 8px', 
          borderRadius: '4px',
          display: 'flex',
          alignItems: 'center',
          gap: '4px'
        }}>
          <Star size={14} fill="var(--primary)" color="var(--primary)" />
          <span style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>{product.rating.toFixed(1)}</span>
        </div>
      </div>

      <div>
        <p style={{ color: 'var(--primary)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px' }}>{product.category}</p>
        <h3 style={{ fontSize: '1.4rem', margin: '0.3rem 0' }}>{product.name}</h3>
        <p style={{ fontSize: '1.2rem', fontWeight: '600', color: 'var(--text-main)' }}>${product.price.toLocaleString()}</p>
      </div>

      <button 
        className="btn-primary" 
        style={{ width: '100%', marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
        onClick={(e) => {
          e.stopPropagation();
          onAddToCart(product);
        }}
      >
        <ShoppingCart size={18} />
        Add to Bag
      </button>
    </motion.div>
  );
};

const ProductGrid = ({ products, onSelect, onAddToCart }) => {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
      gap: '2.5rem'
    }}>
      {products.map(product => (
        <ProductCard 
          key={product._id} 
          product={product} 
          onSelect={onSelect} 
          onAddToCart={onAddToCart} 
        />
      ))}
    </div>
  );
};

export default ProductGrid;
