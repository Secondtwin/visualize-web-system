import { AppStorageService } from './../../app-storage.service';
import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { BehaviorSubject } from 'rxjs';
import { TableDataHeader, TableDataSource, TableDataValue } from 'src/app/shared/models';
import { mapToLineChartOptions } from 'src/app/shared/mappers';
import { EChartOption } from 'echarts';

@Component({
  selector: 'app-create-chart-table',
  templateUrl: './create-chart-table.component.html',
  styleUrls: ['./create-chart-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateChartTableComponent implements OnInit {
  @ViewChild('table') public matTable: MatTable<TableDataValue[][]>;

  private dataSubject: BehaviorSubject<TableDataValue[][]> = new BehaviorSubject([]);

  public dataSource: TableDataSource;
  public displayedColumns: string[] = [];
  public displayedRows: TableDataHeader[] = [];
  public displayedRowsChanges: TableDataHeader[] = [];
  public displayedColumnsChanges: TableDataHeader[] = [];
  public columns: TableDataHeader[] = [];
  public tableData: TableDataValue[][] = [];
  public columnSliderValue: number;
  public rowSliderValue: number;
  public lineChartOptions: EChartOption;

  public constructor(private store: AppStorageService) {
    this.dataSource = new TableDataSource(this.dataSubject);
  }

  public ngOnInit(): void {
    this.updateTableData();
  }

  public updateTableData(): void {
    this.columns = this.generateColumns(this.columnSliderValue);
    this.displayedColumns = this.generateHeaders();
    this.tableData = this.generateData(this.columnSliderValue, this.rowSliderValue);
    this.displayedRows = this.generateRowHeaders(this.rowSliderValue);

    this.dataSubject.next(this.tableData);
  }

  public generateColumns(tableColumns: number): TableDataHeader[] {
    const columns: TableDataHeader[] = [];
    let innerIndex = 1;
    let columnObj: TableDataHeader;

    do {
      columnObj = {
        id: innerIndex.toString(),
        columnDef: innerIndex.toString(),
        header: innerIndex.toString(),
      };

      columns.push(columnObj);
    }
    while (innerIndex++ < tableColumns);

    return columns;
  }

  public generateHeaders(): string[] {
    this.displayedColumnsChanges = this.columns;

    return this.columns?.map((col: { columnDef: string }) => col?.columnDef);
  }

  public generateRowHeaders(rows: number): TableDataHeader[] {
    const generatedRows = [...Array(rows).keys()].map((_, i) => ({
      id: this.displayedRowsChanges[i] ? this.displayedRowsChanges[i]?.id : (i + 1).toString(),
      columnDef: this.displayedRowsChanges[i] ? this.displayedRowsChanges[i]?.columnDef : (i + 1).toString(),
      header: this.displayedRowsChanges[i] ? this.displayedRowsChanges[i]?.header : (i + 1).toString(),
    }));

    this.displayedRowsChanges = generatedRows;

    return generatedRows;
  }

  public generateData(tableColumns: number, tableRows: number): TableDataValue[][] {
    let innerIndex = 1;
    let outerIndex = 0;
    let value: number;
    let tableRow: TableDataValue[] = [];
    const tableData: TableDataValue[][] = [];

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

  public changeRow(inputValue: string, rowId: number): void {
    const tableDataValue: TableDataValue[] = this.tableData.find((parentItem) => parentItem.find((item) => item?.id === rowId));
    const tableDataRowValue: TableDataValue = tableDataValue.find((item) => item?.id === rowId);

    tableDataRowValue.value = inputValue;
  }

  public changeHeader(inputValue: string, columnId: string): void {
    const columnHeader = this.displayedColumnsChanges.find((item) => item?.id === columnId);

    if (columnHeader) {
      columnHeader.id = inputValue;
      columnHeader.columnDef = inputValue;
      columnHeader.header = inputValue;
    }
  }

  public changeHeaderRow(inputValue: string, header: TableDataHeader): void {
    const rowHeader = this.displayedRowsChanges.find((item) => item?.id === header?.id);

    if (rowHeader) {
      rowHeader.id = inputValue;
      rowHeader.columnDef = inputValue;
      rowHeader.header = inputValue;
    }
  }

  public collectData(): void {
    console.log(this.tableData, this.displayedRows, this.displayedColumnsChanges);
    this.store.setTableData(this.tableData);
    this.store.setRowHeaders(this.displayedRows);
    this.store.setColumnHeaders(this.displayedColumnsChanges);
    this.lineChartOptions = mapToLineChartOptions(this.tableData, this.displayedRows, this.displayedColumnsChanges);
  }
}
