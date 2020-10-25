import { TableDataHeader, TableDataValue } from '../models';
import { EChartOption } from 'echarts';

export function mapToPieChartOptions(
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
      radius: '75%',
      label: {
        position: 'outer',
        alignTo: 'labelLine',
        distanceToLabelLine: 5,
      },
      labelLine : {
        show: true,
      },
      data: tableData?.map((column, i) => ({
        value: Math.max(...column?.map((row) => Number.parseFloat(row?.value))),
        name: rowHeaders[i]?.header,
      })),
    }],
  };
}
