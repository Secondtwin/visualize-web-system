import { EChartOption } from 'echarts';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-chart-examples',
  templateUrl: './chart-examples.component.html',
  styleUrls: ['./chart-examples.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartExamplesComponent {
  public lineChartOption = {
    title: {
      text: 'Line Chart Example'
    },
    legend: {
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
    },
    xAxis: {
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
    },
    series: [
      {
        name: 'Mon',
        type: 'line',
        data: [120, 132, 101, 134, 90, 230, 210]
      },
      {
        name: 'Tue',
        type: 'line',
        data: [220, 182, 191, 234, 290, 330, 310]
      },
      {
        name: 'Wed',
        type: 'line',
        data: [150, 232, 201, 154, 190, 330, 410]
      },
      {
        name: 'Thu',
        type: 'line',
        data: [320, 332, 301, 334, 390, 330, 320]
      },
      {
        name: 'Fri',
        type: 'line',
        data: [820, 932, 901, 934, 1290, 1330, 1320]
      }
    ],
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
          onclick: () => this.exportLineChart(),
        },
      }
    },
  };
  public lineChartStackedOption = {
    title: {
      text: 'Line Chart Stacked Example'
    },
    legend: {
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
    },
    xAxis: {
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
    },
    series: [
      {
        name: 'Mon',
        type: 'line',
        stack: 'week',
        data: [120, 132, 101, 134, 90, 230, 210]
      },
      {
        name: 'Tue',
        type: 'line',
        stack: 'week',
        data: [220, 182, 191, 234, 290, 330, 310]
      },
      {
        name: 'Wed',
        type: 'line',
        stack: 'week',
        data: [150, 232, 201, 154, 190, 330, 410]
      },
      {
        name: 'Thu',
        type: 'line',
        stack: 'week',
        data: [320, 332, 301, 334, 390, 330, 320]
      },
      {
        name: 'Fri',
        type: 'line',
        stack: 'week',
        data: [820, 932, 901, 934, 1290, 1330, 1320]
      }
    ],
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
          onclick: () => this.exportLineChart(),
        },
      }
    },
  };
  public lineAreaChartOption = {
    title: {
      text: 'Line Area Chart Stacked Example'
    },
    legend: {
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
    },
    xAxis: {
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
    },
    series: [
      {
        name: 'Mon',
        type: 'line',
        stack: 'week',
        areaStyle: {
          opacity: 0.5,
        },
        data: [120, 132, 101, 134, 90, 230, 210]
      },
      {
        name: 'Tue',
        type: 'line',
        stack: 'week',
        areaStyle: {
          opacity: 0.5,
        },
        data: [220, 182, 191, 234, 290, 330, 310]
      },
      {
        name: 'Wed',
        type: 'line',
        stack: 'week',
        areaStyle: {
          opacity: 0.5,
        },
        data: [150, 232, 201, 154, 190, 330, 410]
      },
      {
        name: 'Thu',
        type: 'line',
        stack: 'week',
        areaStyle: {
          opacity: 0.5,
        },
        data: [320, 332, 301, 334, 390, 330, 320]
      },
      {
        name: 'Fri',
        type: 'line',
        stack: 'week',
        areaStyle: {
          opacity: 0.5,
        },
        data: [820, 932, 901, 934, 1290, 1330, 1320]
      }
    ],
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
          onclick: () => this.exportLineChart(),
        },
      }
    },
  };
  public barChartOption = {
    title: {
      text: 'Bar Chart Example'
    },
    xAxis: {
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    series: [{
      data: [120, 200, 150, 80, 70, 110, 130],
      type: 'bar',
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
          onclick: () => this.exportBarChart(),
        },
      }
    },
  };
  public barChartStackedOption = {
    title: {
      text: 'Bar Chart Stacked Example'
    },
    xAxis: {
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    series: [
      {
        type: 'bar',
        stack: 'barChart',
        data: [120, 200, 150, 80, 70, 110, 130],
      },
      {
        type: 'bar',
        stack: 'barChart',
        data: [125, 210, 165, 30, 40, 105, 90],
      },
      {
        type: 'bar',
        stack: 'barChart',
        data: [40, 50, 30, 30, 50, 60, 100],
      }
    ],
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
          onclick: () => this.exportBarChartStacked(),
        },
      }
    },
  };
  public barChartHorizontalOption = {
    title: {
      text: 'Bar Chart Horizontal Example'
    },
    yAxis: {
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    series: [{
      data: [120, 200, 150, 80, 70, 110, 130],
      type: 'bar',
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
          onclick: () => this.exportBarChart(),
        },
      }
    },
  };
  public barChartHorizontalStackedOption = {
    title: {
      text: 'Bar Chart Horizontal Stacked Example'
    },
    yAxis: {
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    series: [
      {
        type: 'bar',
        stack: 'barChart',
        data: [120, 200, 150, 80, 70, 110, 130],
      },
      {
        type: 'bar',
        stack: 'barChart',
        data: [125, 210, 165, 30, 40, 105, 90],
      },
      {
        type: 'bar',
        stack: 'barChart',
        data: [40, 50, 30, 30, 50, 60, 100],
      }
    ],
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
          onclick: () => this.exportBarChartStacked(),
        },
      }
    },
  };
  public pieChartOption = {
    title: {
      text: 'Pie Chart Example'
    },
    legend: {
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
    },
    series: [
      {
        name: 'pieChart',
        type: 'pie',
        data: [
          { value: 335, name: 'Mon' },
          { value: 310, name: 'Tue' },
          { value: 234, name: 'Wed' },
          { value: 135, name: 'Thu' },
          { value: 1548, name: 'Fri' }
        ],
      }
    ],
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
          onclick: () => this.exportPieChart(),
        },
      }
    },
  };
  public donutChartOption = {
    title: {
      text: 'Pie Chart Example With Empty Center'
    },
    legend: {
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
    },
    series: [
      {
        name: 'pieChart',
        type: 'pie',
        radius: ['50%', '70%'],
        label: {
          show: false,
          position: 'center',
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 20,
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          { value: 335, name: 'Mon' },
          { value: 310, name: 'Tue' },
          { value: 234, name: 'Wed' },
          { value: 135, name: 'Thu' },
          { value: 1548, name: 'Fri' }
        ],
      }
    ],
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
          onclick: () => this.exportPieChart(),
        },
      }
    },
  };
  public scatterChartOption = {
    title: {
      text: 'Scatter Chart Example'
    },
    series: [{
      data: [
        [10.0, 8.04],
        [8.0, 6.95],
        [13.0, 7.58],
        [9.0, 8.81],
        [11.0, 8.33],
        [14.0, 9.96],
        [6.0, 7.24],
        [4.0, 4.26],
        [12.0, 10.84],
        [7.0, 4.82],
        [5.0, 5.68]
      ],
      type: 'scatter'
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
      }
    },
  };

  /**
   * Chart tooltip formatter.
   * @param parameters - chart data
   * @returns html string
   */
  public tooltipBarChartFormatter(parameters: EChartOption.Tooltip.Format): string {
    const { value, name, color } = parameters;

    return `
    <div>
      <span style="color:${color};">
        <b>${name}</b>
      </span>
      <br>
      <div>
      <span>
        Value:
      </span>
      <span>
        ${value}
      </span>
      </div>
    </div>
    `;
  }

  /**
   * Chart tooltip formatter.
   * @param parameters - chart data
   * @returns html string
   */
  public tooltipLineChartFormatter(parameters: EChartOption.Tooltip.Format): string {
    const [{ name }] = parameters;

    return `
    <div>
      <span>
        <b>${name}</b>
      </span>
      <br>
      <div>
      <span>
        Data:
      </span>
      ${parameters.map(({ data, color }) => `
        <span style="color:${color};">
          ${data}
        </span>
      `)}
      </div>
    </div>
    `;
  }

  /**
   * Chart tooltip formatter.
   * @param parameters - chart data
   * @returns html string
   */
  public tooltipScatterChartFormatter(parameters: EChartOption.Tooltip.Format): string {
    const { data, color } = parameters;

    return `
    <div>
      <span style="color:${color};">
        Data:
      </span>
      <span>
        ${data.join(', ')}
      </span>
    </div>
    `;
  }

  public exportBarChart(): void {
    /* generate worksheet */
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet([
      ['Mon', 120],
      ['Tue', 200],
      ['Wed', 150],
      ['Thu', 80],
      ['Fri', 70],
      ['Sat', 110],
      ['Sun', 130],
    ]);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, 'Example.xlsx');
  }

  public exportBarChartStacked(): void {
    /* generate worksheet */
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet([
      ['Mon', 120, 125, 40],
      ['Tue', 200, 210, 50],
      ['Wed', 150, 165, 30],
      ['Thu', 80, 30, 30],
      ['Fri', 70, 40, 50],
      ['Sat', 110, 105, 60],
      ['Sun', 130, 90, 100],
    ]);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, 'Example.xlsx');
  }

  public exportLineChart(): void {
    /* generate worksheet */
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet([
      ['Mon', 120, 220, 150, 320, 820],
      ['Tue', 132, 182, 232, 332, 932],
      ['Wed', 101, 191, 201, 301, 901],
      ['Thu', 134, 234, 154, 334, 934],
      ['Fri', 90, 290, 190, 390, 1290],
    ]);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, 'Example.xlsx');
  }

  public exportPieChart(): void {
    /* generate worksheet */
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet([
      ['Mon', 335],
      ['Tue', 310],
      ['Wed', 234],
      ['Thu', 135],
      ['Fri', 1548],
    ]);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, 'Example.xlsx');
  }
}
