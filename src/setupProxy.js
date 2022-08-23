const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://210.114.1.28:8001',
      changeOrigin: true,
      
    })
  );
};
//https://mern-back-ten.vercel.app