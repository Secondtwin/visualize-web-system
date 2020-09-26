import { ChangeDetectionStrategy, Component } from '@angular/core';
import { EChartOption } from 'echarts';
import { ChartBaseComponent } from './chart-base.component';
import { getChartConfig } from '../configs/scatter-chart.config';

@Component({
  selector: 'app-scatter-chart',
  template: `
    <div echarts
      class="h-100 w-100"
      [options]="options"
      (chartInit)="onChartInit($event)"
    ></div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScatterChartComponent extends ChartBaseComponent {
  /**
   * Gets chart config options.
   * @returns chart config
   */
  protected getOptions(): EChartOption {
    return getChartConfig(this.theme, this.getChartData());
  }
}
