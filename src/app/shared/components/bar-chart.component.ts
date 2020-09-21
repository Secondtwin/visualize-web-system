import { Component } from '@angular/core';
import { EChartOption } from 'echarts';
import { ChartBaseComponent } from './chart-base.component';
import { getChartConfig } from '../configs/bar-chart.config';

@Component({
  selector: 'app-bar-chart',
  template: `
    <div echarts
      class="h-100 w-100"
      [options]="options"
      (chartInit)="onChartInit($event)"
      (chartClick)="setChartClick($event)"
    ></div>
  `,
})
export class BarChartComponent extends ChartBaseComponent<EChartOption.SeriesBar> {
  /**
   * Gets chart config options.
   * @returns chart config
   */
  protected getOptions(): EChartOption<EChartOption.SeriesBar> {
    return getChartConfig(this.theme, this.getChartData());
  }
}
