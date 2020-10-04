import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { Injectable, OnDestroy } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TableStorageService implements OnDestroy {
  private tableChartData$: BehaviorSubject<any> = new BehaviorSubject(undefined);
  private dirtyTableChartData$: BehaviorSubject<any> = new BehaviorSubject(undefined);

  private tableSub: Subscription;

  public constructor() {
    this.tableChartData$.subscribe(this.dirtyTableChartData$);
  }

  public ngOnDestroy(): void {
    this.tableSub.unsubscribe();
  }

  public getTableChartData(): Observable<any> {
    return this.dirtyTableChartData$;
  }

  public setTableChartData(value): any {
    this.dirtyTableChartData$.next(value);
  }
}
