import express from 'express';
import fetch from 'isomorphic-fetch';
import config from '../../config';

const router = express.Router();

/* GET category listing. */
router.get('/', (req, res, next) => {
    fetch(config.gateway + 'zfm-commodity-architecture/category').then(function (response) {
        return response.json();
    }).then(function (data) {
        res.json(data);
    });
});

router.get('/:id', (req, res, next) => {
    fetch(config.gateway + 'zfm-commodity-architecture/category/' + req.params.id).then(function (response) {
        return response.json();
    }).then(function (data) {
        res.json(data);
    });
});

router.get('/:id/children', (req, res, next) => {
    fetch(config.gateway + 'zfm-commodity-architecture/category/' + req.params.id + '/children').then(function (response) {
        return response.json();
    }).then(function (data) {
        res.json(data);
    });
});

module.exports = router;