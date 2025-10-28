const express = require('express');
const Product = require('../models/Product');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const products = await Product.find().lean().sort({ created_at: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
});

module.exports = router;
