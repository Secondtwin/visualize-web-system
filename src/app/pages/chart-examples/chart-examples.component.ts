import { EChartOption } from 'echarts';
import { Component } from '@angular/core';

@Component({
  selector: 'app-chart-examples',
  templateUrl: './chart-examples.component.html',
  styleUrls: ['./chart-examples.component.scss']
})
export class ChartExamplesComponent {
  public lineChartOption = {
    title: {
      text: 'Line Chart Example'
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
    },
    yAxis: {
      type: 'value'
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
    grid: {
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      data: [120, 200, 150, 80, 70, 110, 130],
      type: 'bar',
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
    <div style="font-size: 12px;">
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
    <div style="font-size: 12px;">
      <span>
        <b>${name}</b>
      </span>
      <br>
      <div>
      <span>
        Data:
      </span>
      ${ parameters.map(({ data, color }) => `
        <span style="color:${color};">
          ${data}
        </span>
      `) }
      </div>
    </div>
    `;
  }
}
