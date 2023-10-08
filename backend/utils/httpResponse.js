function partialContentStreamResponse(res, readableStream) {
    res.status(206);
    readableStream.pipe(res);
}

function serverErrorResponse(res, msg) {
    const data = {
        status: 0,
        message: msg,
    };
    return res.status(500).json(data);
}

function notFoundResponse(res, msg) {
    const data = {
        status: 0,
        message: msg,
    };
    return res.status(404).json(data);
}

function validationErrorResponse (res, msg, data) {
    const resData = {
        status: 0,
        message: msg,
        data: data
    };
    return res.status(400).json(resData);
}

function unauthorizedResponse(res, msg) {
    const data = {
        status: 0,
        message: msg,
    };
    return res.status(401).json(data);
}

module.exports = {
    partialContentStreamResponse,
    serverErrorResponse,
    notFoundResponse,
    validationErrorResponse,
    unauthorizedResponse
}