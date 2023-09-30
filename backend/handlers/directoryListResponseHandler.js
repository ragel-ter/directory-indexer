const logger = require('../utils/logger').getLogger('directory-listing-response-handler');

function handle(req, res, next) {
    logger.info("sending results");
    res.send(req.params.path)
    next();
}

module.exports = {
    handle
}