const AuthHandler = require('../handlers/authHandler')
const DirectoryListRequestHandler = require('../handlers/directoryListRequestHandler')
const DirectoryListResponseHandler = require('../handlers/directoryListResponseHandler')

const getListing = [
    DoAuth,
    RequestDirectoryListing,
    SendDirectoryListingResponse
]

function DoAuth(req, res, next) {
    AuthHandler.handle(req, res, next);
    next();
}

function RequestDirectoryListing(req, res, next) {
    DirectoryListRequestHandler.handle(req, res, next)
    next();
}

function SendDirectoryListingResponse(req, res, next) {
    DirectoryListResponseHandler.handle(req, res, next)
    next()
}

module.exports = {
    getListing
}