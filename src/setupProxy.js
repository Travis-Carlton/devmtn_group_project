const proxy = require('http-proxy-middleware');

module.exports = app => {
    app.use('/api', proxy({ target: 'http://localhost:4005' }));
    app.use('/auth/callback', proxy({ target: 'http://localhost:4005' }));
};