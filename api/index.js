const router = require('express').Router();
const express = require('express');

router.use(express.json());

router.get('/', (req, res) => {
  res.send(`<h1>Welcome to the api route</h1>`)
});

router.use('/posts', require('./posts.js'));

module.exports = router;