import { TableDataHeader, TableDataValue } from '../models';
import { EChartOption } from 'echarts';
import * as XLSX from 'xlsx';

export function mapToScatterChartOptions(
  tableData: TableDataValue[][],
  rowHeaders: TableDataHeader[],
  columnHeaders: TableDataHeader[],
): EChartOption {
  let exportedData = [];

  exportedData = tableData?.map((item, i) => [
    rowHeaders[i]?.header,
    Math.min(...item?.map((row) => Number.parseFloat(row?.value))),
    Math.max(...item?.map((row) => Number.parseFloat(row?.value))),
]);

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
    toolbox: {
      show: true,
      feature: {
        dataView: {
          title: 'See the displayed data',
          icon: 'image:///assets/data-view.svg',
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
          icon: 'image:///assets/download-img.svg',
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
          icon: 'image:///assets/download-file.svg',
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
