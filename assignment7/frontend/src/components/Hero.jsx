import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section style={{ 
      height: '90vh', 
      position: 'relative', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      overflow: 'hidden',
      paddingTop: '80px'
    }}>
      {/* Background Image with Overlay */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: 'url("https://images.unsplash.com/photo-1614165939092-458ca699dcc3?q=80&w=2000&auto=format&fit=crop")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        zIndex: -1,
        filter: 'brightness(0.4)'
      }} />

      <div className="container" style={{ textAlign: 'center', zIndex: 1 }}>
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          style={{ fontSize: '5rem', marginBottom: '1rem', letterSpacing: '4px' }}
        >
          Define Your <span style={{ color: 'var(--primary)' }}>Legacy</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          style={{ fontSize: '1.2rem', color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto 2.5rem' }}
        >
          Discover a world where craftsmanship meets sophistication. Our curated collection bringing you the finest in luxury fashion, watches, and scents.
        </motion.p>

        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ duration: 1, delay: 0.6 }}
           style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}
        >
          <button className="btn-primary">Shop Collection</button>
          <button className="btn-outline">Our Heritage</button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
