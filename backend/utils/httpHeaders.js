function setStreamResponseHeaders(res) {
    return res.setHeader('Content-Type', 'application/octet-stream');
}

module.exports = {
    setStreamResponseHeaders
}