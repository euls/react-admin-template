// server script: bootstrap express
import path from 'path';
import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import handlebars from 'express-handlebars';
import routes from './routes';

const server = express();

const isDev = process.env.NODE_ENV !== 'production';
const staticPath = isDev ? path.join(process.cwd(), 'build/public') : path.join(process.cwd(), 'public');
const viewPath = isDev ? path.join(process.cwd(), 'build/server/views') : path.join(process.cwd(), 'server/views');
console.info('Served static path is: ', staticPath);
console.info('Served view path is: ', viewPath);
// static assets served by express.static() for production
server.use(express.static(staticPath));

// view engine setup
server.engine('.hbs', handlebars({ extname: '.hbs' }));
server.set('view engine', '.hbs');
server.set('views', viewPath);

const logger = require('morgan');
// uncomment after placing your favicon in /static
// server.use(favicon(path.join(__dirname, 'static', 'favicon.ico')));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));
server.use(cookieParser());

routes(server);

const port = (process.env.PORT || 3000);

if (!module.hot) {
    server.listen(port, function () {
        console.info(`Production server listening at http://localhost:${port}`);
    });
}

if (module.hot) {
    server.hot = module.hot;
    module.hot.accept('./routes');
}

export default server;