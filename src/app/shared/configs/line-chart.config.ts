import { EChartOption } from 'echarts';
import { is } from 'ramda';
import { waldenTheme } from '../../theme/chart-theme.config';
/**
 * Gets chart config.
 * @param theme - theme settings
 * @param data - chart data
 * @returns chart config
 */
export function getChartConfig(
  theme = waldenTheme?.theme,
  {
    grid,
    series = [],
    xAxis = {} as EChartOption.XAxis,
    yAxis = {},
    legend,
    animation,
    animationDuration,
    animationDurationUpdate,
    animationEasing,
    dataZoom,
  }: EChartOption<EChartOption.SeriesLine>,
): EChartOption<EChartOption.SeriesLine> {
  const xAxisData = xAxis as EChartOption.XAxis;
  const yAxisData = yAxis as EChartOption.YAxis;
  const [top, right, bottom, left] = '10 10 30 40'.split(' ');
  const defaultSymbolSize = 5;

  return {
    grid: grid || { top, right, bottom, left },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'line',
        lineStyle: {
          color: theme?.tooltipAxisColor,
          width: 0,
        },
      },
      confine: true,
      textStyle: {
        color: theme?.textColor,
        fontSize: 10,
        fontWeight: 'bold',
      },
      backgroundColor: theme?.markTextColor,
      borderColor: theme?.markTextColor,
      borderWidth: 0,
      extraCssText: 'border-radius: 4px; padding: 5px; box-shadow: 0px 3px 6px rgba(0,0,0,0.25)',
    },
    xAxis: [
      {
        name: xAxisData.name,
        nameLocation: xAxisData.nameLocation || 'middle',
        nameGap: xAxisData.nameGap,
        nameRotate: yAxisData.nameRotate,
        type: getValue(xAxisData.type, 'category'),
        data: xAxisData.data,
        silent: false,
        nameTextStyle: {
          fontSize: 10,
          color: theme?.textColor,
        },
        axisLine: {
          show: getShowableValue(xAxisData.axisLine, true),
          lineStyle: {
            color: theme?.tooltipAxisColor,
          },
        },
        axisLabel: {
          ...xAxisData.axisLabel,
          show: getShowableValue(yAxisData.axisLabel, true),
          color: theme?.textColor,
          fontSize: 10,
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: getShowableValue(xAxisData.splitLine, false),
          lineStyle: {
            color: theme?.tooltipAxisColor,
          },
        },
        boundaryGap: false,
      },
    ],
    yAxis: {
      name: yAxisData.name,
      type: getValue(yAxisData.type, 'value'),
      data: yAxisData.data,
      splitNumber: yAxisData.splitNumber,
      nameLocation: yAxisData.nameLocation,
      nameGap: yAxisData.nameGap,
      nameRotate: yAxisData.nameRotate,
      position: yAxisData.position || 'left',
      axisLine: {
        show: getShowableValue(yAxisData.axisLine, true),
        lineStyle: {
          color: theme?.tooltipAxisColor,
        },
      },
      axisLabel: {
        ...(yAxisData.axisLabel || {}),
        show: getShowableValue(yAxisData.axisLabel, true),
        fontSize: 10,
        color: theme?.textColor,
      },
      nameTextStyle: {
        fontSize: 10,
        color: theme?.textColor,
      },
      axisTick: {
        show: false,
      },
      splitLine: {
        show: getShowableValue(yAxisData.splitLine, false),
        lineStyle: {
          color: theme?.tooltipAxisColor,
        },
      },
      boundaryGap: yAxisData.boundaryGap,
    },
    animation: getValue(animation, false),
    animationEasing,
    animationDuration: getValue(animationDuration, 0),
    animationDurationUpdate: getValue(animationDurationUpdate, 0),
    series: series.map(({
      name,
      data,
      symbol = 'circle',
      symbolSize,
      itemStyle,
      lineStyle,
      areaStyle,
      smooth,
      markPoint,
    }) => ({
      type: 'line',
      name,
      data,
      symbol,
      showAllSymbol: true,
      symbolSize: symbolSize || defaultSymbolSize,
      lineStyle,
      areaStyle,
      itemStyle,
      smooth,
      markPoint,
    })),
    legend,
    dataZoom,
  };
}

/**
 * Gets chart config.
 * @param theme - theme settings
 * @param data - chart data
 * @returns chart config
 */
export function getMultiAxisChartConfig(
  theme = waldenTheme?.theme,
  {
    grid,
    series,
    xAxis,
    yAxis,
    legend,
  }: EChartOption<EChartOption.SeriesLine>,
): EChartOption<EChartOption.SeriesLine> {

  return {
    grid,
    tooltip: {
      trigger: 'axis',
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
        fontWeight: 'bold',
      },
      backgroundColor: theme?.markTextColor,
      borderColor: theme?.markTextColor,
      borderWidth: 0,
      extraCssText: 'border-radius: 4px; padding: 5px; box-shadow: 0px 3px 6px rgba(0,0,0,0.25)',
    },
    xAxis: ((xAxis || []) as EChartOption.XAxis[]).map(
      ({ type, data, axisLabel, axisLine, axisTick, name, nameLocation, nameGap }) => ({
        type: type || 'category',
        data,
        name,
        nameLocation,
        nameGap,
        silent: false,
        axisLine: axisLine || {
          show: true,
          lineStyle: {
            color: theme?.tooltipAxisColor,
          },
        },
        axisLabel,
        axisTick: axisTick || {
          show: false,
        },
        splitLine: {
          show: false,
        },
        boundaryGap: false,
      }),
    ),
    yAxis: ((yAxis || []) as EChartOption.YAxis[])
      .map(({ name, type, nameLocation, nameGap, nameRotate, splitLine }) => ({
        name,
        type: type || 'value',
        nameLocation,
        nameGap,
        nameRotate,
        axisLine: {
          show: true,
          lineStyle: {
            color: theme?.tooltipAxisColor,
          },
        },
        axisLabel: {
          show: true,
          fontSize: 10,
          color: theme?.textColor,
        },
        nameTextStyle: {
          fontSize: 10,
          color: theme?.textColor,
        },
        axisTick: {
          show: false,
        },
        splitLine,
      })),
    series: series.map(({
      name,
      data,
      itemStyle,
      lineStyle,
      areaStyle,
      xAxisIndex,
      yAxisIndex,
    }) => ({
      type: 'line',
      name,
      data,
      showAllSymbol: true,
      symbolSize: 5,
      xAxisIndex,
      yAxisIndex,
      lineStyle,
      areaStyle,
      itemStyle,
    })),
    legend,
  };
}

/**
 * Gets existing or dafault value.
 * @param value existing value
 * @param defaultValue default value
 * @returns value or default
 */
function getValue<T>(value: T | undefined, defaultValue: T): T | undefined {
  if (is(Boolean, value)) {
    return value;
  }

  return value || defaultValue;
}

/**
 * Gets existing showable value.
 * @param value existing showable value
 * @param defaultValue default value
 * @returns showable value or default
 */
function getShowableValue(value: Partial<{ show?: boolean; }>, defaultValue: boolean): boolean {
  return value && is(Boolean, value.show)
    ? value.show
    : defaultValue;
}
