import { equals } from 'ramda';
import { Component, Input } from '@angular/core';
import { EChartOption, ECharts } from 'echarts';
import { getChartConfig } from '../configs/bar-chart-horizontal.config';

@Component({
  selector: 'app-bar-chart-horizontal',
  template: `
    <div echarts
      class="h-100 w-100"
      [options]="options"
    ></div>
  `,
})
export class BarChartHorizontalComponent {
  @Input() public theme: ECharts.Theme;
  @Input() public set chartData(chartData: EChartOption) {
    if (!equals(chartData, this.chartDataValue)) {
      this.chartDataValue = chartData;
      this.clearChart();
      this.setOptions();
    }
  }
  public get chartData(): EChartOption {
    return this.chartDataValue;
  }

  public options: EChartOption;
  private chartInstance: ECharts;
  private chartDataValue: EChartOption;

  /**
   * Gets chart config options.
   * @returns chart config
   */
  protected getOptions(): EChartOption<EChartOption.SeriesBar> {
    return getChartConfig(this.theme, this.getChartData());
  }

  /**
   * Gets chart data copy.
   * @returns chart data
   */
  public getChartData(): EChartOption {
    return this.chartDataValue;
  }

  /**
   * Sets chart options when theme and data come.
   */
  protected setOptions(): void {
    const options = this.getOptions();

    this.options = options;
  }

  /**
   * Clears previous chart.
   */
  private clearChart(): void {
    if (this.chartInstance) {
      this.chartInstance.clear();
    }
  }
}
