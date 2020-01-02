const axios = require('axios');
const path = require('path');
const MemoryFileSystem = require('memory-fs');

const proxy = require('http-proxy-middleware');
const ReactDomServer = require('react-dom/server');

const webpack = require('webpack');
const webpackServerConfig = require('../../config/webpack.server.config');

const getTemplate = () => {
  return new Promise((resolve, reject) => {
    axios
      .get('http://localhost:8000/public/index.html')
      .then(res => {
        resolve(res.data);
      })
      .catch(reject);
  });
};

const Module = module.constructor;

const mfs = new MemoryFileSystem();
const serverCompiler = webpack(webpackServerConfig);
serverCompiler.outputFileSystem = mfs;
let serverBundle;
serverCompiler.watch({}, (err, stats) => {
  if (err) throw err;
  stats = stats.toJson();
  stats.errors.length > 0 && stats.errors.forEarch(err => console.error(err));
  stats.warnings.length > 0 &&
    stats.warnings.forEach(warn => console.warn(warn));

  const bundlePath = path.join(
    webpackServerConfig.output.path,
    webpackServerConfig.output.filename
  );
  const bundle = mfs.readFileSync(bundlePath, 'utf-8');
  const m = new Module();
  m._compile(bundle, 'server-entry.js');
  serverBundle = m.exports.default;
});

module.exports = function handleDevSSR(app) {
  app.use(
    '/public',
    proxy({
      target: 'http://localhost:8000',
    })
  );
  app.get('*', function(req, res) {
    getTemplate().then(template => {
      const content = ReactDomServer.renderToString(serverBundle);
      res.send(template.replace('<!-- app -->', content));
    });
  });
};
