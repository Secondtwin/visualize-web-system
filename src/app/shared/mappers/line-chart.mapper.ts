import { TableDataHeader, TableDataValue } from './../models';
import { EChartOption } from 'echarts';

export function mapToLineChartOptions(
  tableData: TableDataValue[][],
  rowHeaders: TableDataHeader[],
  columnHeaders: TableDataHeader[],
): EChartOption {
  const legendData = rowHeaders?.map((item) => item?.header);

  return {
    title: {
      text: 'Line Chart',
    },
    legend: {
      data: legendData,
    },
    xAxis: {
      data: legendData,
    },
    series: tableData?.map((column, i) => ({
      name: legendData[i],
      type: 'line',
      stack: 'lineChart',
      data: column?.map((row) => row?.value),
    })),
  };
}
