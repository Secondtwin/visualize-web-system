import { TableDataHeader, TableDataValue } from './../models';
import { EChartOption } from 'echarts';

export function mapToBarChartHorizontalOptions(
  tableData: TableDataValue[][],
  rowHeaders: TableDataHeader[],
  columnHeaders: TableDataHeader[],
): EChartOption {
  return {
    title: {
      text: 'Bar Chart Horizontal',
    },
    yAxis: {
      data: rowHeaders?.map((item) => item?.header),
    },
    series: [{
      type: 'bar',
      data: tableData?.map((column) => Math.max(...column?.map((row) => Number.parseFloat(row?.value)))),
    }],
  };
}
