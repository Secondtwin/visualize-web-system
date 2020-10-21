import { EChartOption } from 'echarts';
import { waldenTheme } from '../../theme/chart-theme.config';

/**
 * Gets chart config.
 * @param theme - theme settings
 * @param data - chart data
 * @returns chart config
 */
export function getChartConfig(
  theme = waldenTheme?.theme,
  { title, legend, series }: EChartOption<EChartOption.SeriesPie>,
): EChartOption<EChartOption.SeriesPie> {
  return {
    backgroundColor: 'transparent',
    title,
    color: theme?.color,
    legend: {
      ...legend,
      orient: 'vertical',
      top: 30,
      left: 0,
    },
    tooltip: {
      trigger: 'item',
      confine: true,
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
    series: series.map((item) => ({
      ...item,
      name: item?.name,
      type: 'pie',
      data: item?.data,
      radius: '75%',
      avoidLabelOverlap: false,
      label: {
          position: 'outer',
          alignTo: 'labelLine',
          distanceToLabelLine: 5
      },
      labelLine: {
        normal: {
          show: true,
        },
      },
    })),
    emphasis: {
      itemStyle: {
        shadowBlur: 10,
        shadowOffsetX: 0,
        shadowColor: 'rgba(0, 0, 0, 0.5)',
      },
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
