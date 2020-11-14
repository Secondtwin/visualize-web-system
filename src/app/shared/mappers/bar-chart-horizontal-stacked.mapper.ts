import { TableDataHeader, TableDataValue } from './../models';
import { EChartOption } from 'echarts';
import * as XLSX from 'xlsx';

export function mapToBarChartHorizontalStackedOptions(
  tableData: TableDataValue[][],
  rowHeaders: TableDataHeader[],
  columnHeaders: TableDataHeader[],
): EChartOption {
  const legendData = rowHeaders?.map((item) => item?.header);
  const numberOfValues = tableData ? tableData[0]?.length : 0;
  const values = [];
  let exportedData = [];

  for (let i = 0; i < numberOfValues; i++) {
    if (!values[i]) {
      values[i] = [];
    }

    values[i].push(...tableData?.map((column) => column[i]));
  }

  exportedData = tableData?.map((item, i) => [legendData[i], ...item?.map((value) => value?.value)]);

  return {
    title: {
      text: 'Bar Chart Stacked',
    },
    yAxis: {
      data: legendData,
    },
    series: values?.map((value, i) => ({
      name: legendData[i],
      type: 'bar',
      stack: 'barChart',
      data: value?.map((item) => item?.value),
    })),
    toolbox: {
      show: true,
      feature: {
        dataView: {
          title: 'See the displayed data',
          icon: 'image://assets/data-view.svg',
          readOnly: true,
          lang: ['Data View', 'Back', 'Refresh Data'],
          buttonColor: '#673ab7',
          iconStyle: {
            opacity: .5,
          },
          emphasis: {
            iconStyle: {
              color: '#000000',
              opacity: 1,
            },
          },
        },
        saveAsImage: {
          title: 'Save as image',
          icon: 'image://assets/download-img.svg',
          iconStyle: {
            opacity: .5,
          },
          emphasis: {
            iconStyle: {
              color: '#000000',
              opacity: 1,
            },
          },
        },
        mySaveAsFile: {
          show: true,
          title: 'Save as file',
          icon: 'image://assets/download-file.svg',
          iconStyle: {
            opacity: .5,
          },
          emphasis: {
            iconStyle: {
              color: '#000000',
              opacity: 1,
            },
          },
          onclick: () => {
            /* generate worksheet */
            const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(exportedData);

            /* generate workbook and add the worksheet */
            const wb: XLSX.WorkBook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

            /* save to file */
            XLSX.writeFile(wb, 'Data.xlsx');
          },
        },
      }
    },
  };
}
