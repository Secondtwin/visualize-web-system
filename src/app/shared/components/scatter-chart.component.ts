import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { EChartOption, ECharts } from 'echarts';
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
  @Output() public readonly chartInstanceInit: EventEmitter<ECharts> = new EventEmitter();

  public onChartInit(instance: ECharts): void {
    super.onChartInit(instance);
    this.chartInstanceInit.emit(instance);
  }

  protected getOptions(): EChartOption {
    return getChartConfig(this.theme, this.getChartData());
  }
}
