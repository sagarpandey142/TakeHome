import React from 'react';

export default function ProductCard({ p }) {
  return (
    <div style={{
      width: 260, padding: 12, border: '1px solid #eee', borderRadius: 8, boxShadow: '0 2px 6px rgba(0,0,0,0.02)'
    }}>
      <h3 style={{ margin: 0 }}>{p.title}</h3>
      <div style={{ fontSize: 14, color: '#333', marginTop: 8 }}>
        <div>Price: {p.price}</div>
        <div>Stock: {p.stock_status} {p.stock_quantity !== null ? `(${p.stock_quantity})` : ''}</div>
        <div>Category: {p.category || '-'}</div>
        <div>Tags: {p.tags && p.tags.length ? p.tags.join(', ') : '-'}</div>
        <div>On sale: {String(p.on_sale)}</div>
      </div>
    </div>
  );
}
