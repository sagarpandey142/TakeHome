import React, { useState } from 'react';

export default function SegmentEditor({ onEvaluate, loading }) {
  const [text, setText] = useState('price > 1000\nstock_status = instock\non_sale = true');

  const submit = () => {
    onEvaluate(text);
  };

  return (
    <div>
      <textarea value={text} onChange={(e) => setText(e.target.value)} style={{ width: '100%', height: 140 }} />
      <div style={{ marginTop: 8 }}>
        <button onClick={submit} disabled={loading}>{loading ? 'Evaluating...' : 'Evaluate'}</button>
      </div>
    </div>
  );
}
