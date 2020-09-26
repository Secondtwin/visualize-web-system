import { Component } from '@angular/core';
import { EChartOption } from 'echarts';
import { ChartBaseComponent } from './chart-base.component';
import { getChartConfig } from '../configs/pie-chart.config';

@Component({
  selector: 'app-pie-chart',
  template: `
    <div echarts
      class="h-100 w-100"
      [options]="options"
      (chartInit)="onChartInit($event)"
      (chartClick)="setChartClick($event)"
    ></div>
  `,
})
export class PieChartComponent extends ChartBaseComponent {
  /**
   * Gets chart config options.
   * @returns chart config
   */
  protected getOptions(): EChartOption {
    return getChartConfig.call(this.chartInstance, this.theme, this.getChartData());
  }

  /**
   * Sets chart options.
   */
  protected setOptions(): void {
    super.setOptions();
  }
}
