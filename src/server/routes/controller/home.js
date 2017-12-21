import express from 'express';
import React from 'react';
import {isAuthenticated} from '../../security';

const router = express.Router();

router.get('/', isAuthenticated, (req, res) => {
    const context = {}
    res.render('home');
});

export default router;