const express = require('express');
const Joi = require('joi');
const axios = require('axios');
const { evaluate } = require('../services/evaluator');

const router = express.Router();

const schema = Joi.object({
  rules: Joi.string().min(1).required()
});

router.post('/evaluate', async (req, res) => {
  const { error, value } = schema.validate(req.body);
  if (error) return res.status(400).json({ error: error.message });

  try {
    const productsResp = await axios.get(process.env.PRODUCTS_SERVICE_URL + '/products');
    const products = productsResp.data;
    const result = evaluate(products, value.rules);
    res.json({ count: result.length, results: result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: String(err) });
  }
});

module.exports = router;
