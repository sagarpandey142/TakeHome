require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const productsRoute = require('./routes/Product');
const scheduleIngest = require('./cron');
const swagger = require('./swagger');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 4000;
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('MongoDB connection error', err);
});

app.use('/products', productsRoute);
swagger(app);


scheduleIngest(process.env);

app.listen(PORT, () => {
  console.log(`Product service listening on ${PORT}`);
});
