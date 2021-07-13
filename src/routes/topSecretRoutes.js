const topSecretRouter = require('express').Router();
const { decodeSignal } = require('../controllers');

topSecretRouter.route('/').post((req, res) => {
	decodeSignal(req, res);
});

module.exports = { topSecretRouter };