const axios = require('axios');
const Product = require('../models/Product');

const mapProduct = (wc) => {
  return {
    id: wc.id,
    title: wc.name,
    price: wc.price,
    stock_status: wc.stock_status,
    stock_quantity: wc.stock_quantity === null ? null : wc.stock_quantity,
    category: (wc.categories && wc.categories[0] && wc.categories[0].name) ? wc.categories[0].name : null,
    tags: (wc.tags || []).map(t => t.name),
    on_sale: !!wc.on_sale,
    created_at: wc.date_created
  };
};

async function ingestAll({ base, key, secret }) {
  const perPage = 100;
  let page = 1;
  let totalFetched = 0;
  while (true) {
    const url = `${base}/wp-json/wc/v3/products?per_page=${perPage}&page=${page}&consumer_key=${key}&consumer_secret=${secret}`;
    const resp = await axios.get(url);
    const products = resp.data;
    if (!products || products.length === 0) break;
    const ops = products.map(p => mapProduct(p));
    for (const op of ops) {
      await Product.updateOne({ id: op.id }, { $set: op }, { upsert: true });
    }
    totalFetched += ops.length;
    if (products.length < perPage) break;
    page += 1;
  }
  return totalFetched;
}

module.exports = { ingestAll, mapProduct };
