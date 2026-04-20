import React from 'react';
import { ShoppingBag, Search, User, Menu } from 'lucide-react';

const Navbar = ({ cartCount }) => {
  return (
    <nav className="glass" style={{ 
      position: 'fixed', 
      top: 0, 
      width: '100%', 
      zIndex: 1000, 
      padding: '1.2rem 2rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <Menu size={24} style={{ cursor: 'pointer' }} />
        <h1 className="luxury-font" style={{ fontSize: '1.8rem', letterSpacing: '2px', color: 'var(--primary)' }}>
          LUXEMART
        </h1>
      </div>

      <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          <Search size={20} style={{ opacity: 0.6 }} />
        </div>
        <User size={20} style={{ cursor: 'pointer' }} />
        <div style={{ position: 'relative', cursor: 'pointer' }}>
          <ShoppingBag size={24} />
          {cartCount > 0 && (
            <span style={{
              position: 'absolute',
              top: '-8px',
              right: '-8px',
              background: 'var(--primary)',
              color: 'var(--on-primary)',
              borderRadius: '50%',
              width: '18px',
              height: '18px',
              fontSize: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold'
            }}>
              {cartCount}
            </span>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
