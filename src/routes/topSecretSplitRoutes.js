const topSecretSplitRouter = require('express').Router();
const { retrieveCompleteMessage, savePartMessage, resetMessage } = require('../controllers');

topSecretSplitRouter.route('/').get((req, res) => {
	retrieveCompleteMessage(req, res);
});

topSecretSplitRouter.route('/:satellite').post((req, res) => {
	savePartMessage(req, res);
});

topSecretSplitRouter.route('/').delete((req, res) => {
	resetMessage(req, res);
});

module.exports = { topSecretSplitRouter };