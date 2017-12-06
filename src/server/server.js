// server script: bootstrap express
import path from 'path';
import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import routes from './routes';

const isDev = process.env.NODE_ENV !== 'production';

const server = express();
const staticPath = isDev ? path.join(process.cwd(), 'build/public') : path.join(process.cwd(), 'public');
// static assets served by express.static() for production
server.use(express.static(staticPath));

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