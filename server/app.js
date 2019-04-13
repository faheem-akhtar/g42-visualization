const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const routes = require('./routes');

const app = express();
const corsOptions = {
  origin: 'http://localhost:3000'
};

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false , limit: '1mb'}));
app.use(bodyParser.json({limit: '1mb'}));

// Serve static files from the React app
app.use(
  express.static(path.join(__dirname, '../build'), {
    setHeaders: function(res, path, stat) {
      const isHtml = path.indexOf('.html') !== -1;

      if(!isHtml) {
       res.setHeader('Cache-Control', 'public, max-age=365d')
      }
    },
  }),
)

app.use(routes);

module.exports = app;
