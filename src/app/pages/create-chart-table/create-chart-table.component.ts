import { DataSource } from '@angular/cdk/table';
import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { BehaviorSubject, Observable } from 'rxjs';

interface TableDataValue {
  id: number;
  value: string;
}

@Component({
  selector: 'app-create-chart-table',
  templateUrl: './create-chart-table.component.html',
  styleUrls: ['./create-chart-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateChartTableComponent implements OnInit {
  @ViewChild('table') public matTable: MatTable<any>;

  private dataSubject: BehaviorSubject<any[]> = new BehaviorSubject([]);

  public dataSource: TableDataSource;
  public displayedColumns: string[] = [];
  public columns: object[] = [];
  public tableData: TableDataValue[][] = [];
  public columnSliderValue: number;
  public rowSliderValue: number;

  public constructor() {
    this.dataSource = new TableDataSource(this.dataSubject);
  }

  public ngOnInit(): void {
    this.updateTableData();
  }

  public updateTableData(): void {
    this.displayedColumns = this.generateHeaders(this.columnSliderValue);
    this.columns = this.generateColumns(this.columnSliderValue);
    this.tableData = this.generateData(this.columnSliderValue, this.rowSliderValue);

    this.dataSubject.next(this.tableData);
  }

  public generateHeaders(tableColumns: number): string[] {
    const displayedColumns: string[] = [];
    let innerIndex = 1;

    do {
      displayedColumns.push(innerIndex.toString());
    }
    while (innerIndex++ < tableColumns);

    return displayedColumns;
  }

  public generateColumns(tableColumns: number): object[] {
    const columns: object[] = [];
    let innerIndex = 1;
    let columnObj: object;

    do {
      // tslint:disable-next-line: new-parens
      columnObj = new function(): void {
        this.id = innerIndex.toString();
        this.columnDef = innerIndex.toString();
        this.header = innerIndex.toString();
        this.cell = [];
      };

      columns.push(columnObj);

    }
    while (innerIndex++ < tableColumns);

    return columns;
  }

  public generateData(tableColumns: number, tableRows: number): any[] {
    let innerIndex = 1;
    let outerIndex = 0;
    let value: number;
    let tableRow: object[] = [];
    const tableData: any[] = [];

    do {
      innerIndex = 1;
      do {
        const tableDataValue: TableDataValue[] = this.tableData?.find((parentItem) =>
          parentItem?.find((item) => item?.id === outerIndex * 10 + innerIndex));
        const tableDataRowValue: TableDataValue = tableDataValue?.find((item) => item?.id === outerIndex * 10 + innerIndex);

        value = 0;
        tableRow.push({
          id: outerIndex * 10 + innerIndex,
          value: tableDataRowValue ? tableDataRowValue?.value : value.toString(),
        });
      }
      while (innerIndex++ < tableColumns);

      tableData.push(tableRow);
      tableRow = [];
    }
    while (outerIndex++ < tableRows - 1);

    return tableData;
  }

  public changeHeader(value: string, column: object): void {
    (column as { header: string }).header = value;
    (column as { columnDef: string }).columnDef = value;
  }

  public changeRow(inputValue: string, rowId: number): void {
    const tableDataValue: TableDataValue[] = this.tableData.find((parentItem) => parentItem.find((item) => item?.id === rowId));
    const tableDataRowValue: TableDataValue = tableDataValue.find((item) => item?.id === rowId);

    tableDataRowValue.value = inputValue;
  }

  public collectData(): void {
    console.log(this.tableData, this.columns);
  }
}

export class TableDataSource extends DataSource<any> {
  public constructor(public data: BehaviorSubject<any[]>) {
    super();
  }

  public connect(): Observable<any> {
    return this.data.asObservable();
  }

  public disconnect(): void {}
}
