import React from 'react';
import express from 'express';
import {renderToString} from 'react-dom/server';
import CategoryTree from '../../../isomorphic/category-tree';

const router = express.Router();

router.get('/', (req, res) => {
    const html = renderToString(<CategoryTree roots={[]}/>);
    res.render('about', {
        html: html
    });
});

export default router;