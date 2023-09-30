const restify = require('restify');
const server = restify.createServer();
const DocumentController = require('./controllers/directoryController')

server.get('/ping', function(req, res, next) {
    res.send('pong');
    return next();
})

server.get('/:path/ls', DocumentController.getListing);

server.listen(8080, function() {
    console.log('%s listening at %s', server.name, server.url);
});