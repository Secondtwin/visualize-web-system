import { EChartOption } from 'echarts';
import { ChangeDetectionStrategy, Component } from '@angular/core';

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
    ]
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
    }]
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
    ]
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
    }]
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
}
