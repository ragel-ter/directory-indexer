import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, map} from "rxjs";
import {DirectoryEntryResponse} from "../models/DirectoryEntryResponse";
import {UserService} from "./user.service";

@Injectable({
  providedIn: 'root'
})
export class DirectoryListDataService {
  API_BASE_URL: string = '/api/'
  headers: HttpHeaders | undefined;

  constructor(
    private httpClient: HttpClient,
    private userService: UserService
  ) {
    const token = this.userService.loggedInUser.basicAuth;
    this.headers = new HttpHeaders().set('Authorization', `Basic ${token}`);
  }

  get(path?: string) : Observable<DirectoryEntryResponse[]> {
    return this.httpClient.get(`${this.API_BASE_URL}${path ?? ''}`, {headers: this.headers, responseType: "text"})
      .pipe(map((response) => {
        const responseStringArray = response.toString().split('\r\n');
        let responseDirectoryEntryArray: DirectoryEntryResponse[] = [];

        // @ts-ignore
        responseStringArray.forEach(dirEnt => {
          try {
            let direntTmp = JSON.parse(dirEnt) as DirectoryEntryResponse;
            direntTmp.path = direntTmp.path.split('/tmp')[1] ?? "";
            responseDirectoryEntryArray.push(direntTmp);
          } catch (err) {
            console.warn(`Error parsing HTTP response to JSON: ${err}`);
          }
        })
        return responseDirectoryEntryArray;
    }))
  }
}
