import { Component } from '@angular/core';
import { EChartOption } from 'echarts';
import { ChartBaseComponent } from './chart-base.component';
import { getChartConfig, getMultiAxisChartConfig } from '../configs/line-chart.config';

@Component({
  selector: 'app-line-chart',
  template: `
    <div echarts
      class="echarts h-100 w-100"
      [options]="options"
      (chartInit)="onChartInit($event)"
    ></div>
  `,
})
export class LineChartComponent extends ChartBaseComponent<EChartOption.SeriesLine> {
  /**
   * Gets chart config options.
   * @returns chart config
   */
  protected getOptions(): EChartOption<EChartOption.SeriesLine> {
    const chartData = this.getChartData();

    if (Array.isArray(chartData.xAxis) && Array.isArray(chartData.yAxis)) {
      return getMultiAxisChartConfig(this.theme, chartData);
    }

    return getChartConfig(this.theme, chartData);
  }
}
