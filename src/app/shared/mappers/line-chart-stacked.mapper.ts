import { TableDataHeader, TableDataValue } from './../models';
import { EChartOption } from 'echarts';

export function mapToLineChartStackedOptions(
  tableData: TableDataValue[][],
  rowHeaders: TableDataHeader[],
  columnHeaders: TableDataHeader[],
): EChartOption {
  const legendData = rowHeaders?.map((item) => item?.header);
  const xAxisData = columnHeaders?.map((item) => item?.header);

  return {
    title: {
      text: 'Line Chart',
    },
    legend: {
      data: legendData,
    },
    xAxis: {
      data: xAxisData,
    },
    series: tableData?.map((column, i) => ({
      name: legendData[i],
      type: 'line',
      stack: 'lineChart',
      data: column?.map((row) => row?.value),
    })),
  };
}