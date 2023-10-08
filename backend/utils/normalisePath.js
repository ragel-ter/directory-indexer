const HOST_ROOT_PATH = process.env.HOST_ROOT_PATH || '.';

function normalisePath(path) {
    return HOST_ROOT_PATH + path;
}

module.exports = {
    normalisePath
}