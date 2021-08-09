
const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {
    app.use(
      createProxyMiddleware(["/city", "/weather","/forecast/selected_city", "/forecast", "/forecast/:name"], { target: "http://localhost:8080" }),
      
    );
  };
  