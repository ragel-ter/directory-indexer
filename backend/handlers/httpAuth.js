const logger = require('../utils/logger').getLogger('http-auth-handler');
const {unauthorizedResponse} = require("../utils/httpResponse");

const ADMIN_USER = process.env.ADMIN_USER;
const ADMIN_PASS = process.env.ADMIN_PASS;

function doAuth(req, res) {
    logger.debug('AUTH: Doing auth things...')
    const authHeader = req.headers.authorization;

    logger.debug(`Auth header: ${authHeader}`)

    if (!authHeader) {
        const msg = 'Cannot authenticate: No auth header present.'
        logger.error(msg);
        return unauthorizedResponse(res, msg);
    }

    const auth = new Buffer.from(authHeader.split(' ')[1],
        'base64').toString().split(':');
    const user = auth[0];
    const pass = auth[1];

    logger.debug(`${ADMIN_USER};${user}`);
    logger.debug(`${ADMIN_PASS};${pass}`);

    if (!(user === ADMIN_USER && pass === ADMIN_PASS)) {
        const msg = 'Cannot authenticate: Invalid username or password.'
        logger.error(msg);
        return unauthorizedResponse(res, msg);
    }
}

module.exports = {
    doAuth
}