import { DataSource } from '@angular/cdk/table';
import { BehaviorSubject, Observable } from 'rxjs';
import { TableDataValue } from './table-data-value.model';

export class TableDataSource extends DataSource<TableDataValue[]> {
  public constructor(public data: BehaviorSubject<TableDataValue[][]>) {
    super();
  }

  public connect(): Observable<TableDataValue[][]> {
    return this.data.asObservable();
  }

  public disconnect(): void {}
}
