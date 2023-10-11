export class User {
  private readonly _username: string;
  private readonly _basicAuthToken: string;

  constructor(username: string, password: string) {
    this._username = username;
    this._basicAuthToken = btoa(`${username}:${password}`);
  }

  get basicAuth() : string {
    return this._basicAuthToken;
  }

  get userName() : string {
    return this._username;
  }
}
