require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT;

app.listen(PORT, (req, res) => {
  console.log(`We're live on port ${PORT}`);
});

app.get('/', (req, res) => {
  res.send(`<h1>Hello and welcome to juicebox</h1>`);
});

app.use('/auth', require('./auth/index.js'));
app.use('/api', require('./api/index.js'));