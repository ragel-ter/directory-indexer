const logger = require('./utils/logger').getLogger('directory-controller');
const fs = require('fs');
const path = require('path');
const { Transform } = require('stream');

const HOST_ROOT_PATH = process.env.HOST_ROOT_PATH || '.';

function readDir(req, res)  {
    DoAuth(req, res);
    SetHeaders(req, res);
    HandleRequest(req, res);
}

function SetHeaders(req, res) {
    res.setHeader('Content-Type', 'application/octet-stream');
}

function DoAuth(req, res) {
    logger.debug('AUTH: Doing auth things...')
}

function normalisePath(path) {
    return HOST_ROOT_PATH + path;
}

function HandleRequest(req, res) {
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
                        console.log(err);
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
            console.log(err);
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

    res.status(206);
    objectTransformStream.pipe(res);
}

module.exports = {
    readDir
}