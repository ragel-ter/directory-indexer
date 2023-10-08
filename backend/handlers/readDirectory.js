const fs = require('fs');
const {normalisePath} = require('../utils/normalisePath');
const {partialContentStreamResponse, notFoundResponse, serverErrorResponse} = require('../utils/httpResponse');
const {setStreamResponseHeaders} = require('../utils/httpHeaders');
const {directoryDetailsTransformStream} = require("../streams/directoryDetailsTransformStream");

const logger = require('../utils/logger').getLogger('read-directory-handler');

function handle(req, res) {
    if (res.headersSent) {
        return;
    }

    logger.info('Setting header Content-Type: application/octet-stream');
    setStreamResponseHeaders(res);

    const normalisedPath = normalisePath(req.originalUrl);
    logger.debug(`Normalised path has been set to: ${normalisedPath}\n`);

    logger.debug('Creating transform stream for enriching directory details in opendir() callback');
    const stream = directoryDetailsTransformStream();

    fs.opendir(normalisedPath, async (err, dir) => {
        if (err) {
            if (err.code === "ENOENT") {
                logger.error(err.message);
                notFoundResponse(res, err.message);
            } else {
                logger.error(err.message);
                serverErrorResponse(res, err.message);
            }
        } else {
            for await (const dirent of dir) {
                logger.debug(`Writing ${JSON.stringify(dirent)} to directoryDetailsTransformStream`)
                stream.write(dirent);
            }

            stream.end();
        }
    })

    logger.debug('Piping the readable side of the directoryDetailsTransformStream to the http response stream')
    partialContentStreamResponse(res, stream);
}

module.exports = {
    handle
}