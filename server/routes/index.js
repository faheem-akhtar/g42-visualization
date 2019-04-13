const express = require('express');
const path = require('path');

const fred = require('../controllers/fred');

const router = express.Router();

router.all(
  '/api/*',
  fred
);

router.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../build/index.html'));
});

module.exports = router;
