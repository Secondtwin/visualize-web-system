import { TableDataHeader, TableDataValue } from '../models';
import { EChartOption } from 'echarts';

export function mapToScatterChartOptions(
  tableData: TableDataValue[][],
  rowHeaders: TableDataHeader[],
  columnHeaders: TableDataHeader[],
): EChartOption {
  return {
    title: {
      text: 'Scatter Chart',
    },
    series: [{
      type: 'scatter',
      data: tableData?.map((column) => ([
        Math.min(...column?.map((row) => Number.parseFloat(row?.value))),
        Math.max(...column?.map((row) => Number.parseFloat(row?.value))),
      ])),
    }],
  };
}
