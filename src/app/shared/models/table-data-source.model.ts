import { DataSource } from '@angular/cdk/table';
import { BehaviorSubject, Observable } from 'rxjs';

export class TableDataSource extends DataSource<any> {
  public constructor(public data: BehaviorSubject<any[]>) {
    super();
  }

  public connect(): Observable<any> {
    return this.data.asObservable();
  }

  public disconnect(): void {}
}
