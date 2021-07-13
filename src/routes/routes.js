const router = require('express').Router();

router.route('/').all(( req, res ) => {
  res.send({ message : 'This is a top secret operation!' });
});

module.exports = { router };