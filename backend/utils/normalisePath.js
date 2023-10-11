const ROOT = process.env.CONTAINER_MOUNT_POINT || '.';

function normalisePath(path) {
    const strippedPath = path.split('/api/')[1];
    return `${ROOT}/${strippedPath}`;
}

module.exports = {
    normalisePath
}