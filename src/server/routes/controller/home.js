import express from 'express';
import {isAuthenticated} from '../../security';


const router = express.Router();

router.get('/', isAuthenticated, (req, res) => {
    res.render('home');
});

export default router;