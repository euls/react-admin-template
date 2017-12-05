import express from 'express';
import CategoryTree from '../../../isomorphic/category-tree';
import {renderToString, renderToStaticMarkup} from 'react-dom/server';
import React from 'react';
const router = express.Router();

router.get('/', function (req, res, next) {
  const html = renderToString(<CategoryTree roots={[]}/>);
  // const html = renderToStaticMarkup(<CategoryTree roots={[]}/>);
  res.render('about', {
    version: '1.0',
    html: html
    // manifest: req.app.locals.getManifest(),
    // publicPath: req.app.locals.publicPath
  });
});

export default router;