import { TableDataHeader, TableDataValue } from '../models';
import { EChartOption } from 'echarts';

export function mapToDonutChartOptions(
  tableData: TableDataValue[][],
  rowHeaders: TableDataHeader[],
  columnHeaders: TableDataHeader[],
): EChartOption {
  return {
    title: {
      text: 'Pie Chart',
    },
    xAxis: {
      data: rowHeaders?.map((item) => item?.header),
    },
    series: [{
      type: 'pie',
      radius: ['50%', '80%'],
      label: {
        show: false,
        position: 'center',
      },
      labelLine : {
        show: false,
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 20,
        },
      },
      data: tableData?.map((column, i) => ({
        value: Math.max(...column?.map((row) => Number.parseFloat(row?.value))),
        name: rowHeaders[i]?.header,
      })),
    }],
  };
}
