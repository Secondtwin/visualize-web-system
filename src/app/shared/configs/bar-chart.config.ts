import { EChartOption, ECharts } from 'echarts';
import { identity, mergeDeepLeft, times } from 'ramda';
import { waldenTheme } from 'src/app/theme/chart-theme.config';

/**
 * Gets chart config.
 * @param theme - chart theme
 * @param data - chart data
 * @returns chart config
 */
export function getChartConfig(
  theme: ECharts.Theme = waldenTheme?.theme,
  {
    series = [],
    xAxis = {} as EChartOption.XAxis,
    yAxis = {},
  }: EChartOption<EChartOption.SeriesBar>,
): EChartOption<EChartOption.SeriesBar> {
  const checkForFalse = (value: string): boolean => value && value !== 'false';
  const MIN_VALUE = 999;
  const VALUE_DIVIDER = 1000;
  const xAxisLabel = (xAxis as EChartOption.XAxis).axisLabel
    ? (xAxis as EChartOption.XAxis).axisLabel
    : { rotate: '' };

  const [top, right, bottom, left] = '10 10 30 30'.split(' ');

  return {
    grid: {
      top,
      right,
      bottom,
      left,
    },
    tooltip: {
      trigger: 'item',
      triggerOn: 'mousemove',
      confine: true,
      axisPointer: {
        type: 'line',
        lineStyle: {
          color: theme?.tooltipAxisColor,
          width: 0,
        },
      },
      textStyle: {
        color: theme?.textColor,
        fontSize: 10,
        fontWeight: 700,
      },
      backgroundColor: theme?.markTextColor,
      borderColor: theme?.markTextColor,
      borderWidth: 1,
      extraCssText: 'border-radius: 4px; padding: 5px; box-shadow: 0px 3px 6px rgba(0,0,0,0.25)',
    },
    xAxis: [
      mergeDeepLeft(
        xAxis,
        {
          data: times(identity, Math.max(...series.map(({ data }) => data ? data.length : null))),
          boundaryGap: 10,
          type: 'category',
          silent: false,
          axisLine: {
            show: checkForFalse('true'),
            lineStyle: {
              color: theme?.tooltipAxisColor,
            },
          },
          axisLabel: {
            show: checkForFalse('true'),
            rotate: xAxisLabel.rotate || 0,
            color: theme?.textColor,
            fontSize: 10,
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            show: false,
          },
        },
      ),
    ] as EChartOption.XAxis[],
    yAxis: mergeDeepLeft(
      yAxis,
      {
        type: 'value',
        boundaryGap: undefined,
        data: times(identity, Math.max(...series.map(({ data }) => data ? data.length : null))),
        show: checkForFalse('true'),
        max: 'dataMax',
        minInterval: undefined,
        axisLine: {
          show: false,
        },
        axisLabel: {
          show: true,
          color: theme?.textColor,
          fontSize: 10,
          formatter: (value: number) => Math.abs(value) > MIN_VALUE
            ? (Math.sign(value) * (+(Math.abs(value) / VALUE_DIVIDER).toFixed())).toString() + 'K'
            : Math.sign(value) * Math.abs(value),
        },
        nameTextStyle: {
          color: theme?.textColor,
          fontSize: 10,
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: checkForFalse('true'),
          lineStyle: {
            color: theme?.tooltipAxisColor,
          },
        },
      },
    ),
    series: series.map((seriesItem) => {
      const {
        name = '',
        data,
        stack,
        barGap,
        barCategoryGap,
      } = seriesItem;

      const symbolProportions = '';
      const symbolOffsets = '';

      return {
        type: 'bar',
        name,
        hoverAnimation: checkForFalse('false'),
        data,
        itemStyle: {
          color: theme?.color[0],
        },
        stack,
        barWidth: undefined,
        barMaxWidth: undefined,
        barGap,
        zlevel: 0,
        barCategoryGap,
        symbol: 'circle',
        symbolSize: symbolProportions,
        symbolOffset: symbolOffsets,
        animationDelayUpdate: 0,
        animationEasingUpdate: 'cubicOut',
        animationDurationUpdate: 1000,
      };
    }),
  };
}