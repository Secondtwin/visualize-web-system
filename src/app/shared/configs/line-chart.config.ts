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
    title,
    series = [],
    xAxis = {} as EChartOption.XAxis,
    yAxis = {},
    legend,
  }: EChartOption<EChartOption.SeriesLine>,
): EChartOption<EChartOption.SeriesLine> {
  const xAxisData = xAxis as EChartOption.XAxis;
  const yAxisData = yAxis as EChartOption.YAxis;
  const [top, right, bottom, left] = '70 20 40 50'.split(' ');
  const defaultSymbolSize = 10;

  return {
    grid: grid || { top, right, bottom, left },
    title: {
      ...title,
      textStyle: {
        fontWeight: 700,
        fontFamily: 'Montserrat',
      },
    },
    color: theme?.color,
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
        fontSize: 12,
        fontWeight: 700,
        fontFamily: 'Montserrat',
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
          fontSize: 12,
          fontWeight: 700,
          fontFamily: 'Montserrat',
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
          fontSize: 12,
          fontWeight: 700,
          fontFamily: 'Montserrat',
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
        fontSize: 12,
        fontWeight: 700,
        fontFamily: 'Montserrat',
        color: theme?.textColor,
      },
      nameTextStyle: {
        fontSize: 12,
        fontWeight: 700,
        fontFamily: 'Montserrat',
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
    series: series.map(({
      name,
      data,
      stack,
      symbol,
      symbolSize,
      itemStyle,
      lineStyle = { width: 3 },
      areaStyle,
      smooth,
      markPoint,
    }) => ({
      type: 'line',
      name,
      data,
      stack,
      symbol,
      showAllSymbol: true,
      symbolSize: symbolSize || defaultSymbolSize,
      lineStyle,
      areaStyle,
      itemStyle,
      smooth,
      markPoint,
    })),
    legend: {
      ...legend,
      top: 30,
      left: 0,
      textStyle: {
        fontWeight: 700,
        fontFamily: 'Montserrat',
      },
    },
    toolbox: {
      show: true,
      feature: {
        dataView: {
          title: 'See the displayed data',
          readOnly: true,
          lang: ['Data View', 'Back', 'Refresh Data'],
          buttonColor: '#673ab7',
        },
        saveAsImage: {
          title: 'Save as image',
        },
      }
    },
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
    legend: {
      ...legend,
      top: 30,
      left: 0,
    },
    toolbox: {
      show: true,
      feature: {
        dataView: {
          title: 'See the displayed data',
          readOnly: true,
          lang: ['Data View', 'Back', 'Refresh Data'],
          buttonColor: '#673ab7'
        },
        saveAsImage: {
          title: 'Save as image',
        },
      }
    },
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
