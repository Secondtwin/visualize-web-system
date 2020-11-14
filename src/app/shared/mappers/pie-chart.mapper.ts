import { TableDataHeader, TableDataValue } from '../models';
import { EChartOption } from 'echarts';
import * as XLSX from 'xlsx';

export function mapToPieChartOptions(
  tableData: TableDataValue[][],
  rowHeaders: TableDataHeader[],
  columnHeaders: TableDataHeader[],
): EChartOption {
  let exportedData = [];

  exportedData = tableData?.map((item, i) => [rowHeaders[i]?.header, Math.max(...item?.map((row) => Number.parseFloat(row?.value)))]);

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
