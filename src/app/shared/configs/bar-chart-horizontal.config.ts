import { EChartOption } from 'echarts';
import { identity, mergeDeepLeft, times } from 'ramda';
import { waldenTheme } from '../../theme/chart-theme.config';

/**
 * Gets chart config.
 * @param theme - chart theme
 * @param data - chart data
 * @returns chart config
 */
export function getChartConfig(
  theme = waldenTheme?.theme,
  {
    title,
    series = [],
    xAxis = {} as EChartOption.XAxis,
    yAxis = {},
  }: EChartOption<EChartOption.SeriesBar>,
): EChartOption<EChartOption.SeriesBar> {
  const checkForFalse = (value: string): boolean => value && value !== 'false';
  const xAxisLabel = (xAxis as EChartOption.XAxis).axisLabel
    ? (xAxis as EChartOption.XAxis).axisLabel
    : { rotate: '' };

  const [top, right, bottom, left] = '50 30 30 50'.split(' ');

  return {
    grid: {
      top,
      right,
      bottom,
      left,
    },
    title: {
      ...title,
      textStyle: {
        fontFamily: 'Montserrat',
      },
    },
    color: theme?.color,
    tooltip: {
      trigger: 'axis',
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
        fontSize: 12,
        fontWeight: 700,
        fontFamily: 'Montserrat',
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
          type: 'value',
          silent: false,
          min: 0,
          max: 'dataMax',
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
            fontSize: 12,
            fontWeight: 700,
            fontFamily: 'Montserrat',
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            show: true,
          },
        },
      ),
    ] as EChartOption.XAxis[],
    yAxis: mergeDeepLeft(
      yAxis,
      {
        type: 'category',
        boundaryGap: true,
        data: times(identity, Math.max(...series.map(({ data }) => data ? data.length : null))),
        show: checkForFalse('true'),
        axisLine: {
          show: false,
        },
        axisLabel: {
          show: true,
          color: theme?.textColor,
          fontSize: 12,
          fontWeight: 700,
          fontFamily: 'Montserrat',
        },
        nameTextStyle: {
          color: theme?.textColor,
          fontSize: 12,
          fontWeight: 700,
          fontFamily: 'Montserrat',
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: false,
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

      return {
        ...seriesItem,
        type: 'bar',
        name,
        hoverAnimation: checkForFalse('false'),
        data,
        stack,
        barWidth: '60%',
        barMaxWidth: '80%',
        barGap,
        zlevel: 0,
        barCategoryGap,
        animationDelayUpdate: 0,
        animationEasingUpdate: 'cubicOut',
        animationDurationUpdate: 1000,
      };
    }),
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
