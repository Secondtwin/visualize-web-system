import { TableDataHeader, TableDataValue } from './../models';
import { EChartOption } from 'echarts';

export function mapToBarChartStackedOptions(
  tableData: TableDataValue[][],
  rowHeaders: TableDataHeader[],
  columnHeaders: TableDataHeader[],
): EChartOption {
  const legendData = rowHeaders?.map((item) => item?.header);
  const numberOfValues = tableData ? tableData[0]?.length : 0;
  const values = [];

  for (let i = 0; i < numberOfValues; i++) {
    if (!values[i]) {
      values[i] = [];
    }

    values[i].push(...tableData?.map((column) => column[i]));
  }

  return {
    title: {
      text: 'Bar Chart Stacked',
    },
    xAxis: {
      data: rowHeaders?.map((item) => item?.header),
    },
    series: values?.map((value, i) => ({
      name: legendData[i],
      type: 'bar',
      stack: 'barChart',
      data: value?.map((item) => item?.value),
    })),
  };
}