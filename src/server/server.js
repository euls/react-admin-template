// server script: bootstrap express
import path from 'path';
import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import handlebars from 'express-handlebars';
import routes from './routes';
import initSecurity from './security/config';

const isDev = process.env.NODE_ENV !== 'production';

const server = express();
const staticPath = isDev ? path.join(process.cwd(), 'build/public') : path.join(process.cwd(), 'public');
const viewPath = isDev ? path.join(process.cwd(), 'build/server/views') : path.join(process.cwd(), 'server/views');
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

// initialize security context
const passport = initSecurity(server);

routes(server, passport);

const port = (process.env.PORT || 3000);

// 404
server.use((req, res) => {
    res.type('text/html');
    res.status(404);
    res.render('errors/404');
});

// 500
if (isDev) {
    server.use((err, req, res, next) => {
        console.error(err.stack);
        res.type =('text/html');
        res.status(err.status || 500);
        res.render('errors/500', {
            message: err.message,
            error: err
        });
    });
} else {
    server.use((err, req, res, next) => {
        res.type =('text/html');
        res.status(err.status || 500);
        res.render('errors/500', {
            message: err.message,
            error: {}
        });
    });
}

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