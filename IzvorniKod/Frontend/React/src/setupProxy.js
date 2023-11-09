const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/Test',
    createProxyMiddleware({
      target: 'http://localhost:8080',
      changeOrigin: true, 
    })
  );
};
