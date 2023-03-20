const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://purplevery6.cafe24.com:8443',
      changeOrigin: true,
      
    })
  );
};
//http://weare-first.com:8001