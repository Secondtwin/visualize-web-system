import { TableDataHeader, TableDataValue } from './shared/models';
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AppStorageService {
  private readonly tableData$: BehaviorSubject<TableDataValue[][]> = new BehaviorSubject(undefined);
  private readonly rowHeaders$: BehaviorSubject<TableDataHeader[]> = new BehaviorSubject([]);
  private readonly columnHeaders$: BehaviorSubject<TableDataHeader[]> = new BehaviorSubject([]);
  private readonly columnSliderValue$: BehaviorSubject<number> = new BehaviorSubject(1);
  private readonly rowSliderValue$: BehaviorSubject<number> = new BehaviorSubject(1);
  private readonly selectedChartType$: BehaviorSubject<string> = new BehaviorSubject(undefined);

  public getColumnSliderValue(): number {
    return this.columnSliderValue$?.value;
  }

  public getRowSliderValue(): number {
    return this.rowSliderValue$?.value;
  }

  public getTableData(): TableDataValue[][] {
    return this.tableData$?.value;
  }

  public getRowHeaders(): TableDataHeader[] {
    return this.rowHeaders$?.value;
  }

  public getColumnHeaders(): TableDataHeader[] {
    return this.columnHeaders$?.value;
  }

  public setColumnSliderValue(value: number): void {
    this.columnSliderValue$?.next(value);
  }

  public setRowSliderValue(value: number): void {
    this.rowSliderValue$?.next(value);
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

  public getSelectedChartType(): string {
    return this.selectedChartType$?.value;
  }

  public setSelectedChartType(value: string): void {
    this.selectedChartType$?.next(value);
  }
}
