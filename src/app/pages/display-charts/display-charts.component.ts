import {
  mapToBarChartHorizontalOptions,
  mapToBarChartHorizontalStackedOptions,
  mapToBarChartOptions,
  mapToBarChartStackedOptions,
  mapToDonutChartOptions,
  mapToLineAreaChartOptions,
  mapToLineChartOptions,
  mapToLineChartStackedOptions,
  mapToPieChartOptions,
  mapToScatterChartOptions,
} from 'src/app/shared/mappers';
import { EChartOption } from 'echarts';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AppStorageService } from 'src/app/app-storage.service';
import { ValueChanges } from 'src/app/shared/models';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-display-charts',
  templateUrl: './display-charts.component.html',
  styleUrls: ['./display-charts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisplayChartsComponent {
  @Input() public set displayCharts(value: ValueChanges) {
    this.displayChartsValue = value;
    this.selectedChart = this.store.getSelectedChartType();
    this.lineChartOptions = mapToLineChartOptions(
      this.store.getTableData(),
      this.store.getRowHeaders(),
      this.store.getColumnHeaders(),
    );
    this.lineChartStackedOptions = mapToLineChartStackedOptions(
      this.store.getTableData(),
      this.store.getRowHeaders(),
      this.store.getColumnHeaders(),
    );
    this.lineAreaChartOptions = mapToLineAreaChartOptions(
      this.store.getTableData(),
      this.store.getRowHeaders(),
      this.store.getColumnHeaders(),
    );
    this.barChartOption = mapToBarChartOptions(
      this.store.getTableData(),
      this.store.getRowHeaders(),
      this.store.getColumnHeaders(),
    );
    this.barChartStackedOption = mapToBarChartStackedOptions(
      this.store.getTableData(),
      this.store.getRowHeaders(),
      this.store.getColumnHeaders(),
    );
    this.barChartHorizontalOption = mapToBarChartHorizontalOptions(
      this.store.getTableData(),
      this.store.getRowHeaders(),
      this.store.getColumnHeaders(),
    );
    this.barChartHorizontalStackedOption = mapToBarChartHorizontalStackedOptions(
      this.store.getTableData(),
      this.store.getRowHeaders(),
      this.store.getColumnHeaders(),
    );
    this.pieChartOption = mapToPieChartOptions(
      this.store.getTableData(),
      this.store.getRowHeaders(),
      this.store.getColumnHeaders(),
    );
    this.donutChartOption = mapToDonutChartOptions(
      this.store.getTableData(),
      this.store.getRowHeaders(),
      this.store.getColumnHeaders(),
    );
    this.scatterChartOption = mapToScatterChartOptions(
      this.store.getTableData(),
      this.store.getRowHeaders(),
      this.store.getColumnHeaders(),
    );
  }
  public get displayCharts(): ValueChanges {
    return this.displayChartsValue;
  }

  public lineChartOptions: EChartOption;
  public lineChartStackedOptions: EChartOption;
  public lineAreaChartOptions: EChartOption;
  public barChartOption: EChartOption;
  public barChartStackedOption: EChartOption;
  public barChartHorizontalOption: EChartOption;
  public barChartHorizontalStackedOption: EChartOption;
  public scatterChartOption: EChartOption;
  public pieChartOption: EChartOption;
  public donutChartOption: EChartOption;
  public selectedChart: string;
  public options: FormGroup;

  private displayChartsValue: ValueChanges;

  public constructor(private store: AppStorageService) {}

  /**
   * Collects entered data
   */
  public collectFormData(): void {}

  /**
   * Chart tooltip formatter.
   * @param parameters - chart data
   * @returns html string
   */
  public tooltipBarChartFormatter(parameters: EChartOption.Tooltip.Format): string {
    const { value, name, color } = parameters;

    return `
    <div>
      <span style="color:${color};">
        <b>${name}</b>
      </span>
      <br>
      <div>
      <span>
        Value:
      </span>
      <span>
        ${value}
      </span>
      </div>
    </div>
    `;
  }

  /**
   * Chart tooltip formatter.
   * @param parameters - chart data
   * @returns html string
   */
  public tooltipLineChartFormatter(parameters: EChartOption.Tooltip.Format): string {
    const [{ name }] = parameters;

    return `
    <div>
      <span>
        <b>${name}</b>
      </span>
      <br>
      <div>
      <span>
        Data:
      </span>
      ${parameters.map(({ data, color }) => `
        <span style="color:${color};">
          ${data}
        </span>
      `)}
      </div>
    </div>
    `;
  }

  /**
   * Chart tooltip formatter.
   * @param parameters - chart data
   * @returns html string
   */
  public tooltipScatterChartFormatter(parameters: EChartOption.Tooltip.Format): string {
    const { data, color } = parameters;

    return `
    <div>
      <span style="color:${color};">
        Data:
      </span>
      <span>
        ${data.join(', ')}
      </span>
    </div>
    `;
  }
}
