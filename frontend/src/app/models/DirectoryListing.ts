import {DirectoryEntryResponse} from "./DirectoryEntryResponse";
import {Observable} from "rxjs";
import {DirectoryListDataService} from "../services/directory-list-data.service";
import {ColDef} from "ag-grid-community";

export class DirectoryListing {
  private readonly _previousPath: string;
  private readonly _previousName: string;
  private readonly _sourcePath: string;
  private readonly _sourceName: string;
  private readonly _entries: Observable<DirectoryEntryResponse[]>;

  // TODO: Previous path logic is buggy as it toggles rather than traversing back up the path.
  //  This will need to be addressed in a future iteration.

  constructor(previousPath: string, previousName: string, sourcePath: string, private directoryListDataService: DirectoryListDataService, sourceName?: string) {
    this._previousPath = previousPath;
    this._previousName = previousName;
    this._sourceName = sourceName ?? sourcePath;
    this._sourcePath = sourcePath;
    this._entries = this.directoryListDataService.get(sourcePath);
  }

  get previousPath() : string {
    return this._previousPath;
  }

  get previousName() : string {
    return this._previousName;
  }

  get sourceName() : string {
    return this._sourceName;
  }

  get sourcePath() : string {
    return this._sourcePath;
  }

  get entries() : Observable<DirectoryEntryResponse[]> {
    return this._entries;
  }
}

export class DirectoryListingColDefs {
  colDefs: ColDef[] = [
    {field: 'is_directory', sortable: true, sort: 'desc'},
    {field: 'name', sortable: true},
    {field: 'path', sortable: true},
    {field: 'file_ext', sortable: true},
    {field: 'file_size', sortable: true},
    {field: 'file_created', sortable: true},
    {field: 'file_permissions', sortable: true}
  ];
}
