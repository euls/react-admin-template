import express from 'express';
import bodyParser from 'body-parser';

const router = express.Router();

export default passport => {
    router.get('/signin', (req, res) => {
        res.render('signin');
    });
    
    router.post('/login', bodyParser.urlencoded({extended: false}), passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/signin',
        failureFlash: true
    }));
    
    router.get('/signout', (req, res) => {
        req.logout();
        res.redirect('/');
    });

    return router;
};