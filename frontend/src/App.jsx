import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from './component/ProductCart';
import SegmentEditor from './component/SegmentEditor';

const PRODUCTS_API = import.meta.env.VITE_PRODUCTS_API || 'http://localhost:4000';
const SEGMENTS_API = import.meta.env.VITE_SEGMENTS_API || 'http://localhost:4100';

export default function App() {
  const [products, setProducts] = useState([]);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    const res = await axios.get(`${PRODUCTS_API}/products`);
    setProducts(res.data);
  };

  useEffect(() => { fetchProducts(); }, []);

  const onEvaluate = async (rulesText) => {
    setLoading(true);
    try {
      const resp = await axios.post(`${SEGMENTS_API}/segments/evaluate`, { rules: rulesText });
      setResult(resp.data);
    } catch (err) {
      setResult({ error: err.response ? err.response.data : err.message });
    } finally { setLoading(false); }
  };

  return (
    <div style={{ padding: 20, fontFamily: 'Arial, sans-serif' }}>
      <h1>Products</h1>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        {products.slice(0,8).map(p => <ProductCard key={p.id} p={p} />)}
      </div>

      <h2 style={{ marginTop: 30 }}>Segment Editor</h2>
      <SegmentEditor onEvaluate={onEvaluate} loading={loading} />
      <h3>Result</h3>
      <pre style={{ background: '#f5f5f5', padding: 12, maxHeight: 400, overflow: 'auto' }}>
        {result ? JSON.stringify(result, null, 2) : 'No result yet'}
      </pre>
    </div>
  );
}
