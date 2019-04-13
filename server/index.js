'use strict';

const path = require('path');

require('dotenv').config({path: path.join(__dirname, "../.env")});

const app = require('./app');

const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
