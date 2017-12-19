var path = require('path');

module.exports = {
    // vendor: ["antd"],
    404: path.resolve(__dirname, '..', 'src/client/errors/404.js'),
    500: path.resolve(__dirname, '..', 'src/client/errors/500.js'),
    home: path.resolve(__dirname, '..', 'src/client/home.js'),
    signin: path.resolve(__dirname, '..', 'src/client/signin.js'),
    about: path.resolve(__dirname, '..', 'src/client/about.js')
};