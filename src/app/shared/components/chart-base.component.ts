import { EventEmitter, Input, Output, Directive } from '@angular/core';
import { EChartOption, ECharts, EChartsResponsiveOption } from 'echarts';
import { compose, equals, flatten, isNil, map, propOr, reject } from 'ramda';

type DataObject = number | { value: number };

@Directive()
export abstract class ChartBaseComponent<S extends EChartOption.Series = EChartOption.Series> {
  private static readonly DEFAULT_DELAY: number = 10;

  @Input() public theme: ECharts.Theme;
  @Input() public tooltipFormatter: EChartOption.Tooltip.Formatter;

  @Input() public set chartData(chartData: EChartOption<S>) {
    if (!equals(chartData, this.chartDataValue)) {
      this.chartDataValue = chartData;
      this.clearChart();
      this.setOptions();
    }
  }

  public get chartData(): EChartOption<S> {
    return this.chartDataValue;
  }

  @Output() public chartClick: EventEmitter<EChartOption> = new EventEmitter();

  public options: EChartOption<S>;
  public noDataOverlay = false;

  protected chartInstance: ECharts;

  private chartDataValue: EChartOption<S>;

  /**
   * Chart ready callback.
   * @param chart - chart instance
   */
  public onChartInit(chart: ECharts): void {
    this.chartInstance = chart;
    setTimeout(() => {
      this.resizeChart();
      this.setOptions();
    }, 100 / 2);
  }

  /**
   * Triggers chart click emitter.
   * @param data - chart data
   */
  public setChartClick(data: EChartOption): void {
    this.chartClick.emit(data);
  }

  /**
   * Resize api method to update chart size after layout changes.
   */
  public resizeChart(): void {
    if (this.chartInstance) {
      this.chartInstance.resize();
    }
  }

  /**
   * Gets chart data copy.
   * @returns chart data
   */
  public getChartData(): EChartOption<S> {
    return this.chartDataValue;
  }

  /**
   * Resets chart data.
   * @param animation - if true animation is applied for series
   * @returns set of original series.
   */
  public resetData(animation: boolean = true): EChartOption.Series[] {
    const options = this.getOptions();

    let series: EChartOption.Series[];

    if (ChartBaseComponent.isChartConfig(options)) {
      series = options.series;

      const emptySeries = series.map((s) => ({
        ...s,
        data: (s.data as []).map((d) => ({ ...(d as Record<string, unknown>), value: 0 } as unknown)),
      }));

      this.chartInstance.setOption({
        series: emptySeries,
        animation,
      });
    }

    return series;
  }

  /**
   * Restores chart data.
   *
   * @param duration - back data apply duration.
   */
  public restoreData(duration: number = 1000): void {
    const series = this.resetData(false);

    setTimeout(() => {
      this.chartInstance.setOption({ series, animation: true });
    }, duration);
  }

  public noDataOverlayShow(): boolean {
    return (this.noDataOverlay =
      this.chartDataValue && !this.getSeriesData().length);
  }

  /**
   * Returns options for chart.
   * @see https://ecomfe.github.io/echarts-doc/public/en/option.html for details
   */
  protected abstract getOptions(): EChartOption<S>;

  /**
   * Sets chart options when theme and data come.
   */
  protected setOptions(): void {
    if (this.chartDataValue) {
      const options = this.getOptions();

      if (ChartBaseComponent.isChartConfig(options)) {
        const { series, tooltip } = options;

        options.animationDelayUpdate = ChartBaseComponent.animationDelay;
        options.animationEasing = 'elasticOut';

        if (tooltip) {
          options.tooltip = {
            ...tooltip,
            formatter: (...params) => this.tooltipFormatter && this.tooltipFormatter(...params),
            position: ChartBaseComponent.position,
          };
        }

        if (series) {
          options.series = series.map((item) => ({
            ...item,
            animationDelay: ChartBaseComponent.animationDelay,
          }));
        }
      }

      this.options = options;
    }
    this.noDataOverlayShow();
  }

  private getSeriesData(): number[] {
    return compose<
      EChartOption<S>,
      S[],
      S[],
      DataObject[][],
      DataObject[],
      number[],
      number[]
    >(
      reject(isNil),
      map((item) => ChartBaseComponent.isValueObject(item) ? item.value : item),
      flatten,
      map(({ data }) => data as DataObject[]),
      reject(isNil),
      propOr({}, 'series'),
    )(this.chartData);
  }

  /**
   * Clears previous chart.
   */
  private clearChart(): void {
    if (this.chartInstance) {
      this.chartInstance.clear();
    }
  }

  /**
   * Positioning tooltip.
   * @param point - tooltip coordinate
   * @param _2 - chart parameters (`unused`)
   * @param _3 - dom element (`unused`)
   * @param _4 - element rectangle (`unused`)
   * @param size - tooltip size data
   * @returns adjusted point
   */
  private static position(
    point: [number, number],
    _2: unknown,
    _3: HTMLElement,
    _4: { x: number, y: number, width: number, height: number },
    size: { contentSize: [number, number], viewSize: [number, number] },
  ): [number, number] {
    const [x, y] = point;
    const [contentWidth, contentHeight] = size.contentSize;
    const [viewWidth, viewHeight] = size.viewSize;

    let xOffset = -10;
    let yOffset = 0;

    if (x + contentWidth > viewWidth) {
      xOffset = contentWidth;

      if (y + contentHeight > viewHeight) {
        yOffset = contentHeight;
      }
    } else if (y + contentHeight > viewHeight) {
      yOffset = contentHeight;
    }

    return [x - xOffset, y - yOffset];
  }

  /**
   * Series animation delay.
   * @param idx - index.
   * @returns number of milliseconds
   */
  private static animationDelay(idx: number): number {
    return idx * ChartBaseComponent.DEFAULT_DELAY;
  }

  /**
   * Chart config predicate.
   * @param config - chart config
   * @returns true if chart config is instance of flat config
   */
  private static isChartConfig(config: EChartOption | EChartsResponsiveOption): config is EChartsResponsiveOption {
    return config && !(config as EChartsResponsiveOption).baseOption;
  }

  /**
   * Check if data object is a complex value.
   * @param data - data object
   * @returns true if data object is a complex value
   */
  private static isValueObject(data: DataObject): data is { value: number } {
    return data && data.hasOwnProperty('value');
  }
}
