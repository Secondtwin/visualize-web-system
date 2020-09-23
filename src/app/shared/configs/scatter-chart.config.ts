import { EChartOption } from 'echarts';
import { waldenTheme } from '../../theme/chart-theme.config';

/**
 * Gets chart config.
 * @param theme - theme settings
 * @param chartData - chart data
 * @returns chart config
 */
export function getChartConfig(
  theme = waldenTheme?.theme,
  chartData: EChartOption,
): EChartOption {
  const {
    title,
    series,
    xAxis = {},
    yAxis = {},
  } = chartData;
  const [top, right, bottom, left] = '50 10 30 30'.split(' ');
  const { axisLabel: xAxisLabel } = xAxis as EChartOption.XAxis;
  const { axisLabel: yAxisLabel } = yAxis as EChartOption.XAxis;

  return {
    grid: {
      top,
      right,
      bottom,
      left,
    },
    title,
    color: theme?.color,
    tooltip: {
      trigger: 'item',
      confine: true,
      axisPointer: {
        type: 'none',
      },
      textStyle: {
        color: theme?.textColor,
        fontSize: 12,
        fontWeight: 700,
      },
      backgroundColor: theme?.markTextColor,
      borderColor: theme?.markTextColor,
      borderWidth: 1,
      extraCssText: 'border-radius: 4px; padding: 5px; box-shadow: 0px 3px 6px rgba(0,0,0,0.25)',
    },
    xAxis: {
      ...xAxis,
      nameGap: 20,
      nameLocation: 'center',
      nameTextStyle: {
        color: '#999',
        fontSize: 12,
      },
      axisLabel: {
        color: '#999',
        fontSize: 10,
        ...xAxisLabel,
      },
      axisTick: {
        show: false,
      },
      axisLine: {
        show: false,
      },
    },
    yAxis: {
      ...yAxis,
      nameGap: 20,
      nameLocation: 'center',
      nameTextStyle: {
        color: '#999',
        fontSize: 12,
      },
      axisLabel: {
        color: '#999',
        fontSize: 10,
        ...yAxisLabel,
      },
      axisTick: {
        show: false,
      },
      axisLine: {
        show: false,
      },
    },
    series: series.map((item) => ({
      ...item,
      symbolSize: 20,
    })),
  };
}
