import { TableDataHeader, TableDataValue } from './../models';
import { EChartOption } from 'echarts';

export function mapToLineChartOptions(tableData: TableDataValue[][], tableColumns: TableDataHeader[]): EChartOption {
  return {
    title: {
      text: 'Line Chart',
    },
    legend: {
      data: tableColumns?.map((item) => item?.header),
    },
    xAxis: {
      data: tableColumns?.map((item) => item?.header),
    },
    series: tableData?.map((column, i) => ({
      name: tableColumns[i]?.header,
      type: 'line',
      stack: 'lineChart',
      data: column?.map((row) => row?.value),
    })),
  };
}
