import { TableDataHeader, TableDataValue } from './../models';
import { EChartOption } from 'echarts';

export function mapToBarChartOptions(tableData: TableDataValue[][], tableColumns: TableDataHeader[]): EChartOption {
  return {
    title: {
      text: 'Bar Chart',
    },
    xAxis: {
      data: tableColumns?.map((item) => item?.header),
    },
    series: [{
      type: 'bar',
      data: tableData?.map((column) => Math.max(...column?.map((row) => Number.parseFloat(row?.value)))),
    }],
  };
}
