import express from 'express';

const router = express.Router();

router.get('/demo', (req, res, next) => {
    res.json({
        name: 'demo',
        description: 'This is a rest service demo',
        version: '0.0.1'
    });
});
router.post('/demo', (req, res, next) => {
    console.log(req.body);
    res.json(req.body);
});

export default router;