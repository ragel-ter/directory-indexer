const {Transform} = require('stream');
const fs = require('fs');
const path = require('path');
const {normalisePath} = require('../utils/normalisePath');
const {partialContentStreamResponse, notFoundResponse, serverErrorResponse} = require('../utils/httpResponse');
const {setStreamResponseHeaders} = require('../utils/httpHeaders');

const logger = require('../utils/logger').getLogger('read-directory-handler');

function handle(req, res) {
    if (res.headersSent) {
        return;
    }

    setStreamResponseHeaders(res);

    const normalisedPath = normalisePath(req.originalUrl);
    logger.debug(`Normalised path has been set to: ${normalisedPath}\n`);

    const objectTransformStream = new Transform(
        {
            writableObjectMode: true,
            readableObjectMode: true,
            transform(chunk, encoding, callback) {
                logger.debug(`Starting async request to get stats for ${chunk.name}:`)

                fs.stat(chunk.path, (err, stats) => {
                    if (err) {
                        logger.error(err);
                        callback();
                    } else {
                        const direntDetails = {
                            name: chunk.name,
                            path: chunk.path,
                            is_directory: stats.isDirectory(),
                            file_ext: path.extname(chunk.path),
                            file_size: stats.size,
                            file_created: stats.birthtimeMs,
                            file_permissions: '0' + (stats.mode & parseInt('777', 8)).toString(8) // Thanks go to this GitHub issue: https://github.com/nodejs/node-v0.x-archive/issues/3045
                        }
                        this.push(`${JSON.stringify(direntDetails)}\r\n`);
                        callback();
                    }
                })
            }
        });

    fs.opendir(normalisedPath, async (err, dir) => {
        if (err) {
            if (err.code === "ENOENT") {
                notFoundResponse(res, err.message);
            } else {
                serverErrorResponse(res, err.message);
            }
        } else {
            for await (const dirent of dir) {
                objectTransformStream.write(dirent);
            }

            objectTransformStream.end();
        }
    })

    objectTransformStream.on('data', (chunk) => {
        console.log(chunk);
    })

    partialContentStreamResponse(res, objectTransformStream);
}

module.exports = {
    handle
}