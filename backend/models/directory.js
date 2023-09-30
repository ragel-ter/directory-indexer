class Directory {
    constructor(name, fullPath, size, createdAt, ownedBy, permissions) {
        this._name = name;
        this._fullPath = fullPath;
        this._size = size;
        this._createdAt = createdAt;
        this._ownedBy = ownedBy;
        this._permissions = permissions;
    }

    get details() {
        return {
            "name": this._name,
            "fullPath": this._fullPath,
            "size": this._size,
            "createdAt": this._createdAt,
            "ownedBy": this._ownedBy,
            "permissions": this._permissions
        };
    }
}

export default Directory;