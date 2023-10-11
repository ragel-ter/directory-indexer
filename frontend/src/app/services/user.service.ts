import { Injectable } from '@angular/core';
import {User} from "../models/User";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  // TODO: Implement an actual user service. For illustration purposes, defaulting to an admin user.
  get loggedInUser(): User {
    return new User('admin', 'admin');
  }
}
