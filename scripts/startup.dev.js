import path from 'path';
import fs from 'fs';
import ncp from 'ncp';
import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../config/webpack.dev.config';
import clientEntries from '../config/client-entries';
import browserSync from 'browser-sync';

const entryPoint = path.resolve(__dirname, '../', 'build/server/server.js');

function format(time) {
    return time.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, '$1');
}

// https://webpack.js.org/configuration/watch/#watchoptions
const watchOptions = {
    // Watching may not work with NFS and machines in VirtualBox
    // Uncomment next line if it is your case (use true or interval in milliseconds)
    // poll: true,
    // Decrease CPU or memory usage in some file systems
    ignored: /node_modules/,
};

let app;
function createCompilationPromise(name, compiler, config) {
    return new Promise((resolve, reject) => {
        let timeStart = new Date();
        compiler.plugin('compile', () => {
            timeStart = new Date();
            console.info(`[${format(timeStart)}] Compiling '${name}'...`);
        });
        compiler.plugin('done', stats => {
            console.info(stats.toString(config.stats));
            const timeEnd = new Date();
            const time = timeEnd.getTime() - timeStart.getTime();
            if (stats.hasErrors()) {
                console.info(
                    `[${format(timeEnd)}] Failed to compile '${name}' after ${time} ms`,
                );
                reject(new Error('Compilation failed!'));
            } else {
                if ('server' === name) {
                    delete require.cache[require.resolve(entryPoint)];
                    app = require(entryPoint).default;
                }
                console.info(
                    `[${format(timeEnd)}] Finished '${name}' compilation after ${
                    time
                    } ms`,
                );
                resolve(stats);
            }
        });
    });
}

async function start() {
    const server = express();
    const hotReloadScript = 'webpack-hot-middleware/client?reload=true';
    for (const key in clientEntries) {
        clientEntries[key] = [clientEntries[key], hotReloadScript];
    }

    const clientConfig = webpackConfig.find(config => 'web' === config.target);
    clientConfig.entry = clientEntries;
    clientConfig.plugins.push(new webpack.HotModuleReplacementPlugin());


    const serverConfig = webpackConfig.find(config => 'node' === config.target);
    serverConfig.output.hotUpdateMainFilename = 'updates/[hash].hot-update.json';
    serverConfig.output.hotUpdateChunkFilename = 'updates/[id].[hash].hot-update.js';
    serverConfig.plugins.push(new webpack.HotModuleReplacementPlugin());


    const clientCompiler = webpack(clientConfig);
    const serverCompiler = webpack(serverConfig);

    server.use(webpackDevMiddleware(clientCompiler, {
        publicPath: clientConfig.output.publicPath,
        quiet: true,
        noInfo: true,
        stats: {
            chunks: false,
            color: true
        },
        watchOptions
    }));

    server.use(webpackHotMiddleware(clientCompiler, {
        log: false
    }));

    const clientPromise = createCompilationPromise(
        'client',
        clientCompiler,
        clientConfig,
    );
    const serverPromise = createCompilationPromise(
        'server',
        serverCompiler,
        serverConfig,
    );

    let appPromise;
    let appPromiseResolve;
    let appPromiseIsResolved = true;
    serverCompiler.plugin('compile', () => {
        if (!appPromiseIsResolved) return;
        appPromiseIsResolved = false;
        appPromise = new Promise(resolve => (appPromiseResolve = resolve));
    });

    server.use((req, res) => {
        appPromise
            .then(() => {
                if (!fs.existsSync(path.join(process.cwd(), 'build/server/views'))) {
                    ncp(path.join(process.cwd(), 'src/server/views'), path.join(process.cwd(), 'build/server/views'), err=>{
                        if (err) {
                            console.log(err);
                        }

                        app.set('views', path.join(process.cwd(), 'build/server/views'));
                        app.handle(req, res);
                    });
                } else {
                    app.set('views', path.join(process.cwd(), 'build/server/views'));
                    app.handle(req, res);
                }
            })
            .catch(error => console.error(error));
    });

    function checkForUpdate(fromUpdate) {
        const hmrPrefix = '[\x1b[35mHMR\x1b[0m] ';
        if (!app.hot) {
            throw new Error(`${hmrPrefix}Hot Module Replacement is disabled.`);
        }
        if (app.hot.status() !== 'idle') {
            return Promise.resolve();
        }
        return app.hot
            .check(true)
            .then(updatedModules => {
                if (!updatedModules) {
                    if (fromUpdate) {
                        console.info(`${hmrPrefix}Update applied.`);
                    }
                    return;
                }
                if (updatedModules.length === 0) {
                    console.info(`${hmrPrefix}Nothing hot updated.`);
                } else {
                    console.info(`${hmrPrefix}Updated modules:`);
                    updatedModules.forEach(moduleId =>
                        console.info(`${hmrPrefix} - ${moduleId}`),
                    );
                    checkForUpdate(true);
                }
            })
            .catch(error => {
                if (['abort', 'fail'].includes(app.hot.status())) {
                    console.warn(`${hmrPrefix}Cannot apply update.`);
                    delete require.cache[entryPoint];
                    // eslint-disable-next-line global-require, import/no-unresolved
                    app = require(entryPoint).default;
                    console.warn(`${hmrPrefix}App has been reloaded.`);
                } else {
                    console.warn(
                        `${hmrPrefix}Update failed: ${error.stack || error.message}`,
                    );
                }
            });
    }

    serverCompiler.watch(watchOptions, (error, stats) => {
        if (app && !error && !stats.hasErrors()) {
            checkForUpdate().then(() => {
                appPromiseIsResolved = true;
                appPromiseResolve();
            });
        }
    });

    await clientPromise;
    await serverPromise;

    const timeStart = new Date();
    console.info(`[${format(timeStart)}] Launching server...`);

    // // Load compiled src/server.js as a middleware
    // // eslint-disable-next-line global-require, import/no-unresolved
    app = require('../build/server/server').default;
    app.set('views', path.join(process.cwd(), 'build/server/views'));
    appPromiseIsResolved = true;
    appPromiseResolve();

    const port = process.env.PORT || 8080;
    const serverInstance = server.listen(port, () => {
        browserSync.init({
            open: false,
            ui: false,
            notify: false,
            proxy: 'localhost:8080',
            files: ['build/server/views/**'],
            port: 3000
        });
        console.log(`Development server is listening on: http://localhost:${port}`);
    });
}

start();