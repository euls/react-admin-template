import express from 'express';
import React from 'react';
import {isAuthenticated} from '../../security';
import {renderToString} from 'react-dom/server';
import Admin from '../../../client/pages/admin';
import {StaticRouter} from 'react-router';


const router = express.Router();

router.get('/', isAuthenticated, (req, res) => {
    const context = {};
    const html = renderToString(<StaticRouter context={context} location={req.url}><Admin></Admin></StaticRouter>);
    
    if (context.url) {
        res.writeHead(301, {
            location: context.url
        });
        res.end();
    } else {
        res.render('home', {
            html: html
        });
    }
});

export default router;