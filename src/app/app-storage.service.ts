import { TableDataHeader, TableDataValue } from './shared/models';
import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AppStorageService {
  private readonly tableData$: BehaviorSubject<TableDataValue[][]> = new BehaviorSubject(undefined);
  private readonly rowHeaders$: BehaviorSubject<TableDataHeader[]> = new BehaviorSubject([]);
  private readonly columnHeaders$: BehaviorSubject<TableDataHeader[]> = new BehaviorSubject([]);

  public getTableData(): Observable<TableDataValue[][]> {
    return this.tableData$;
  }

  public getRowHeaders(): Observable<TableDataHeader[]> {
    return this.rowHeaders$;
  }

  public getColumnHeaders(): Observable<TableDataHeader[]> {
    return this.columnHeaders$;
  }

  public setTableData(value: TableDataValue[][]): void {
    this.tableData$.next(value);
  }

  public setRowHeaders(value: TableDataHeader[]): void {
    this.rowHeaders$.next(value);
  }

  public setColumnHeaders(value: TableDataHeader[]): void {
    this.columnHeaders$.next(value);
  }
}
