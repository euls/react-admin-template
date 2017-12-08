var path = require('path');

module.exports = {
    404: path.resolve(__dirname, '..', 'src/client/errors/404.js'),
    500: path.resolve(__dirname, '..', 'src/client/errors/500.js'),
    home: path.resolve(__dirname, '..', 'src/client/home.js'),
    login: path.resolve(__dirname, '..', 'src/client/login.js'),
    about: path.resolve(__dirname, '..', 'src/client/about.js')
};