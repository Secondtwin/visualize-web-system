import { TableDataHeader, TableDataValue } from './../models';
import { EChartOption } from 'echarts';

export function mapToBarChartOptions(
  tableData: TableDataValue[][],
  rowHeaders: TableDataHeader[],
  columnHeaders: TableDataHeader[],
): EChartOption {
  return {
    title: {
      text: 'Bar Chart',
    },
    xAxis: {
      data: rowHeaders?.map((item) => item?.header),
    },
    series: [{
      type: 'bar',
      data: tableData?.map((column) => Math.max(...column?.map((row) => Number.parseFloat(row?.value)))),
    }],
  };
}
