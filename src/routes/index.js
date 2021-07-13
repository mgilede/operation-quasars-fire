const { router } = require('./routes');
const { topSecretRouter }  = require('./topSecretRoutes');
const { topSecretSplitRouter }  = require('./topSecretSplitRoutes');

module.exports = { router, topSecretRouter, topSecretSplitRouter };
