import express from 'express';
import bodyParser from 'body-parser';
import React from 'react';
import {renderToString} from 'react-dom/server';
import LoginForm from '../../../client/pages/signin';

const router = express.Router();

export default passport => {
    router.get('/signin', (req, res) => {
        const html = renderToString(<LoginForm/>);
        res.render('signin', {
            html: html
        });
    });
    
    router.post('/login', bodyParser.urlencoded({extended: false}), passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/signin',
        failureFlash: true
    }));

    // router.post('/login', bodyParser.urlencoded({extended: false}), (req, res)=>{
    //     console.log(req.body);
    //     res.json({});
    // });
    
    router.get('/signout', (req, res) => {
        req.logout();
        res.redirect('/');
    });

    return router;
};