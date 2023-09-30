class File {
    constructor(name, extension, fullPath, size, createdAt, ownedBy, permissions) {
        this._name = name;
        this._extension = extension;
        this._fullPath = fullPath;
        this._size = size;
        this._createdAt = createdAt;
        this._ownedBy = ownedBy;
        this._permissions = permissions;
    }

    get details() {
        return {
            "name": this._name,
            "extension": this._extension,
            "fullPath": this._fullPath,
            "size": this._size,
            "createdAt": this._createdAt,
            "ownedBy": this._ownedBy,
            "permissions": this._permissions
        };
    }
}

export default File