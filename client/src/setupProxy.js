
const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {
    app.use(
      createProxyMiddleware(["/city", "/weather", "/forecast","/forecast/selected_city","/forecast/:name","/forecast/*"], { target: "https://weather-app-expressjs-server.herokuapp.com" })
    );
  };
  