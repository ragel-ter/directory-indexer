const ROOT = process.env.CONTAINER_MOUNT_POINT || '.';

function normalisePath(path) {
    return ROOT + path;
}

module.exports = {
    normalisePath
}