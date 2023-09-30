const logger = require('../utils/logger').getLogger('directory-listing-request-handler');

function handle(req, res, next) {
    logger.debug("reading results");
    next();
}

module.exports = {
    handle
}