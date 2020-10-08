import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { BehaviorSubject } from 'rxjs';
import { TableDataHeader, TableDataSource, TableDataValue } from 'src/app/shared/models';
import { mapToLineChartOptions, mapToBarChartOptions } from 'src/app/shared/mappers';
import { EChartOption } from 'echarts';

@Component({
  selector: 'app-create-chart-table',
  templateUrl: './create-chart-table.component.html',
  styleUrls: ['./create-chart-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateChartTableComponent implements OnInit {
  @ViewChild('table') public matTable: MatTable<any>;

  private dataSubject: BehaviorSubject<any[]> = new BehaviorSubject([]);
  private columnsValue: BehaviorSubject<any[]> = new BehaviorSubject([]);

  public dataSource: TableDataSource;
  public displayedColumns: string[] = [];
  public columns: TableDataHeader[] = [];
  public tableData: TableDataValue[][] = [];
  public columnSliderValue: number;
  public rowSliderValue: number;
  public lineChartOptions: EChartOption;
  public barChartOptions: EChartOption;

  public constructor() {
    this.dataSource = new TableDataSource(this.dataSubject);
  }

  public ngOnInit(): void {
    this.updateTableData();
  }

  public updateTableData(): void {
    this.columns = this.generateColumns(this.columnSliderValue);
    this.displayedColumns = this.generateHeaders();
    this.tableData = this.generateData(this.columnSliderValue, this.rowSliderValue);

    this.dataSubject.next(this.tableData);
  }

  public generateColumns(tableColumns: number): TableDataHeader[] {
    const columns: TableDataHeader[] = [];
    let innerIndex = 1;
    let columnObj: TableDataHeader;

    do {
      // tslint:disable-next-line: new-parens
      columnObj = new function(): void {
        this.id = (this.columnsValue?.value && this.columnsValue?.value[innerIndex]?.id)
          ? this.columnsValue?.value[innerIndex]?.id
          : innerIndex.toString();
        this.columnDef = (this.columnsValue?.value && this.columnsValue?.value[innerIndex]?.columnDef)
          ? this.columnsValue?.value[innerIndex]?.columnDef
          : innerIndex.toString();
        this.header = (this.columnsValue?.value && this.columnsValue?.value[innerIndex]?.header)
          ? this.columnsValue?.value[innerIndex]?.header
          : innerIndex.toString();
      };

      columns.push(columnObj);
    }
    while (innerIndex++ < tableColumns);

    return columns;
  }

  public generateHeaders(): string[] {
    return this.columns?.map((col: { columnDef: string }) => col?.columnDef);
  }

  public generateData(tableColumns: number, tableRows: number): any[] {
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

  public changeHeader(value: string, column: TableDataHeader): void {
    column.header = value;
    column.columnDef = value;
  }

  public changeRow(inputValue: string, rowId: number): void {
    const tableDataValue: TableDataValue[] = this.tableData.find((parentItem) => parentItem.find((item) => item?.id === rowId));
    const tableDataRowValue: TableDataValue = tableDataValue.find((item) => item?.id === rowId);

    tableDataRowValue.value = inputValue;
  }

  public collectData(): void {
    console.log(this.tableData, this.columns);
    this.lineChartOptions = mapToLineChartOptions(this.tableData, this.columns);
    this.barChartOptions = mapToBarChartOptions(this.tableData, this.columns);
  }

  /**
   * Chart tooltip formatter.
   * @param parameters - chart data
   * @returns html string
   */
  public tooltipLineChartFormatter(parameters: EChartOption.Tooltip.Format): string {
    const [{ name }] = parameters;

    return `
    <div>
      <span>
        <b>${name}</b>
      </span>
      <br>
      <div>
      <span>
        Data:
      </span>
      ${parameters.map(({ data, color }) => `
        <span style="color:${color};">
          ${data}
        </span>
      `)}
      </div>
    </div>
    `;
  }
}
