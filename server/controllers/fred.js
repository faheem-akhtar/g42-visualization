const axios = require('axios');

const proxy = (req, res, next) => {
  const { API_BASE_URL, API_KEY } = process.env;
  const reqUrl = API_BASE_URL + req.url.substr(1).replace(/^api\//, '').replace(/\?.*/, '');
  const reqMethod = req.method;
  const data = req.body || {};
  const query = {
    ...(req.query || {}),
    api_key: API_KEY,
    file_type: 'json'
  }

  let options = {
    method: reqMethod,
    url: reqUrl,
    timeout: .5 * 30 * 60 * 1000
  };

  switch (reqMethod) {
    case 'POST':
    case 'PATCH':
      options.data = data;
      break;
    case 'GET':
      options.params = query;
      break;
    default:

  }

  axios(options).then(({ data }) => {
      res.json(data);
  }).catch(error => {
    // throw (error.response && error.response.statusText) || 'Server ERROR!';
    const errorMsg = (error.response && error.response.statusText) || 'Server ERROR!';
    const errorStatus = (error.response && error.response.status) || 400;
    res.status(errorStatus).send(errorMsg);
  });

};

module.exports = proxy;
