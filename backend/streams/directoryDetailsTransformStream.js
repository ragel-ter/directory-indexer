const {Transform} = require('stream');
const fs = require("fs");
const path = require("path");

const logger = require('../utils/logger').getLogger('directory-details-transform-stream');

function directoryDetailsTransformStream() {
    return new Transform(
        {
            writableObjectMode: true,
            readableObjectMode: true,
            transform(chunk, encoding, callback) {
                logger.debug(`Starting async request to get stats for ${chunk.name}:`)

                fs.stat(chunk.path, (err, stats) => {
                    if (err) {
                        logger.warn(err);
                        callback();
                    } else {
                        const direntDetails = {
                            name: chunk.name,
                            path: chunk.path,
                            is_directory: stats.isDirectory(),
                            file_ext: path.extname(chunk.path),
                            file_size: stats.size,
                            file_created: stats.birthtime,
                            file_permissions: '0' + (stats.mode & parseInt('777', 8)).toString(8) // Thanks go to this GitHub issue: https://github.com/nodejs/node-v0.x-archive/issues/3045
                        }
                        this.push(`${JSON.stringify(direntDetails)}\r\n`);
                        callback();
                    }
                })
            }
        });
}

module.exports = {
    directoryDetailsTransformStream
}