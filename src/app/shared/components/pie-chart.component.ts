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
  protected getOptions(): EChartOption {
    return getChartConfig.call(this.chartInstance, this.theme, this.getChartData());
  }

  protected setOptions(): void {
    super.setOptions();
  }
}
