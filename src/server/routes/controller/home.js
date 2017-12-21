import express from 'express';
import React from 'react';
import {renderToString} from 'react-dom/server';
import {StaticRouter} from 'react-router-dom';
import Admin from '../../../client/pages/admin';
import {isAuthenticated} from '../../security';

const router = express.Router();

router.get('/', isAuthenticated, (req, res) => {
    const context = {}
    res.render('home', {
        html: renderToString(<StaticRouter location={req.url} contect={context}><Admin></Admin></StaticRouter>)
    });
});

export default router;