import {Injectable} from '@angular/core';
import {DirectoryListDataService} from "./directory-list-data.service";
import {BehaviorSubject, Observable} from "rxjs";
import {DirectoryListing} from "../models/DirectoryListing";

@Injectable({
  providedIn: 'root'
})
export class DirectoryListService {
  private _currentDirectoryListing: DirectoryListing | undefined;
  private _currentDirectoryListing$: BehaviorSubject<DirectoryListing | undefined> = new BehaviorSubject<DirectoryListing | undefined>(undefined);

  constructor(private directoryListDataService: DirectoryListDataService) {
    this._toRoot()
  }

  private _toRoot(): void {
    this._currentDirectoryListing =
      new DirectoryListing('', '', '', this.directoryListDataService, 'Server Root');

    if (this._currentDirectoryListing$) {
      this._currentDirectoryListing$.next(this._currentDirectoryListing);
    } else {
      this._currentDirectoryListing$ = new BehaviorSubject<DirectoryListing | undefined>(this._currentDirectoryListing);
    }
  }

  changeDirectory(toPath?: string, name?: string) {
    if (this._currentDirectoryListing && this._currentDirectoryListing$ && toPath) {
      this._currentDirectoryListing =
        new DirectoryListing(this._currentDirectoryListing.sourcePath, this._currentDirectoryListing.sourceName, toPath, this.directoryListDataService, name);
      this._currentDirectoryListing$?.next(this._currentDirectoryListing);
    } else {
      this._toRoot();
    }
  }

  get currentDirectoryListing() : Observable<DirectoryListing | undefined> {
    return this._currentDirectoryListing$?.asObservable();
  }
}
