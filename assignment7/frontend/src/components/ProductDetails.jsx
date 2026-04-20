import React, { useState } from 'react';
import { X, Star, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ProductDetails = ({ product, onClose, onAddToCart, onUpdate }) => {
  const [review, setReview] = useState({ username: '', rating: 5, comment: '' });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const response = await fetch(`http://localhost:5000/api/products/${product._id}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(review)
      });
      if (response.ok) {
        setReview({ username: '', rating: 5, comment: '' });
        onUpdate(); // Refresh products to get the new review
        // In a real app, I'd probably just update the internal state or fetch single product
      }
    } catch (error) {
      console.error('Error submitting review:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.9)',
      zIndex: 2000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      backdropFilter: 'blur(5px)'
    }}>
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="glass"
        style={{
          width: '100%',
          maxHeight: '90vh',
          maxWidth: '1000px',
          borderRadius: '20px',
          overflowY: 'auto',
          position: 'relative',
          padding: '2rem',
          border: '1px solid var(--glass-border)'
        }}
      >
        <button 
          onClick={onClose}
          style={{ position: 'absolute', top: '20px', right: '20px', background: 'transparent', color: 'white' }}
        >
          <X size={32} />
        </button>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', marginTop: '1rem' }}>
          {/* Left: Product Info */}
          <div>
            <img src={product.image} alt={product.name} style={{ width: '100%', borderRadius: '12px', boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }} />
            <div style={{ marginTop: '2rem' }}>
              <h2 style={{ fontSize: '2.5rem' }}>{product.name}</h2>
              <p style={{ color: 'var(--primary)', fontSize: '1.5rem', fontWeight: 'bold', margin: '0.5rem 0' }}>${product.price.toLocaleString()}</p>
              <p style={{ color: 'var(--text-muted)', lineHeight: '1.8' }}>{product.description}</p>
              <button 
                className="btn-primary" 
                style={{ marginTop: '2rem', width: '200px' }}
                onClick={() => onAddToCart(product)}
              >
                Add to Bag
              </button>
            </div>
          </div>

          {/* Right: Reviews & Feedback */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div>
              <h3 className="luxury-font" style={{ fontSize: '1.8rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.5rem' }}>Client Feedback</h3>
              
              <div style={{ maxHeight: '300px', overflowY: 'auto', marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {product.reviews && product.reviews.length > 0 ? (
                  product.reviews.map((rev, idx) => (
                    <div key={idx} className="glass-card" style={{ padding: '1rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                        <span style={{ fontWeight: 'bold', color: 'var(--primary)' }}>{rev.username}</span>
                        <div style={{ display: 'flex', gap: '2px' }}>
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={12} fill={i < rev.rating ? 'var(--primary)' : 'transparent'} color="var(--primary)" />
                          ))}
                        </div>
                      </div>
                      <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{rev.comment}</p>
                    </div>
                  ))
                ) : (
                  <p style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>No reviews yet. Be the first to share your experience.</p>
                )}
              </div>
            </div>

            {/* Review Form */}
            <form onSubmit={handleSubmitReview} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <h4 style={{ fontSize: '1.2rem' }}>Leave a Review</h4>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <input 
                  type="text" 
                  placeholder="Your Name" 
                  required
                  style={{ flex: 1, padding: '10px', background: 'var(--surface)', border: '1px solid var(--glass-border)', color: 'white', borderRadius: '4px' }}
                  value={review.username}
                  onChange={e => setReview({...review, username: e.target.value})}
                />
                <select 
                  style={{ padding: '10px', background: 'var(--surface)', border: '1px solid var(--glass-border)', color: 'white', borderRadius: '4px' }}
                  value={review.rating}
                  onChange={e => setReview({...review, rating: e.target.value})}
                >
                  {[5,4,3,2,1].map(num => <option key={num} value={num}>{num} Stars</option>)}
                </select>
              </div>
              <textarea 
                placeholder="Share your feedback..." 
                required
                rows="4"
                style={{ padding: '10px', background: 'var(--surface)', border: '1px solid var(--glass-border)', color: 'white', borderRadius: '4px', resize: 'none' }}
                value={review.comment}
                onChange={e => setReview({...review, comment: e.target.value})}
              />
              <button 
                type="submit" 
                className="btn-outline" 
                disabled={submitting}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
              >
                {submitting ? 'Submitting...' : <><Send size={18} /> Submit Review</>}
              </button>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProductDetails;
