import {Component, OnInit, ViewChild} from '@angular/core';
import {Observable} from "rxjs";
import {DirectoryListService} from "../../services/directory-list.service";
import {DirectoryListing, DirectoryListingColDefs} from "../../models/DirectoryListing";
import {CellClickedEvent, ColDef} from "ag-grid-community";
import {AgGridAngular} from "ag-grid-angular";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-directory-list',
  templateUrl: './directory-list.component.html',
  styleUrls: ['./directory-list.component.css']
})
export class DirectoryListComponent implements OnInit {
  currentDirectoryListing$ : Observable<DirectoryListing | undefined> | undefined ;

  columnDefs: ColDef[] = new DirectoryListingColDefs().colDefs;

  defaultColDef: ColDef = {
    editable: true,
    enableRowGroup: true,
    enablePivot: true,
    enableValue: true,
    sortable: true,
    resizable: true,
    filter: true,
    flex: 1,
    minWidth: 100,
  };

  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;

  constructor(private directoryListService: DirectoryListService) {}

  ngOnInit(): void {
    this.currentDirectoryListing$ = this.directoryListService.currentDirectoryListing;
  }

  onCellClicked( e: CellClickedEvent): void {
    if (e.data.is_directory) {
      this.changeDirectory(e.data.path, e.data.name)
    }
  }

  changeDirectory(path: string, name?: string): void {
    this.directoryListService.changeDirectory(path, name);
  }
}
