const httpAuthHandler = require ('../handlers/httpAuth');
const readDirectoryHandler = require('../handlers/readDirectory');

function readDir(req, res)  {
    httpAuthHandler.doAuth(req, res);
    readDirectoryHandler.handle(req, res);
}

module.exports = {
    readDir
}