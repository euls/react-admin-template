import express from 'express';
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('home', { title: 'Category'});
});

module.exports = router;