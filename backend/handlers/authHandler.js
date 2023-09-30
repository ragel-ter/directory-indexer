const logger = require('../utils/logger').getLogger('auth-handler');

function handle(req, res, next) {
    logger.info("Doing auth");
    next();
}

module.exports = {
    handle
}