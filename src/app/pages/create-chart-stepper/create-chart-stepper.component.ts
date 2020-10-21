import { AppStorageService } from 'src/app/app-storage.service';
import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { ValueChanges } from 'src/app/shared/models';

@Component({
  selector: 'app-create-chart-stepper',
  templateUrl: './create-chart-stepper.component.html',
  styleUrls: ['./create-chart-stepper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateChartStepperComponent {
  @ViewChild('stepper') public stepper: MatStepper;

  public displayCharts: ValueChanges;
  public resetData: ValueChanges;
  public isChartTypeSelected = false;
  public selectedChartType: string;

  public constructor(private store: AppStorageService) {}

  /**
   * Inits next step.
   */
  public initNextStep(): void {
    this.stepper.next();
    this.displayCharts = { isValueChanged: true };
  }

  /**
   * Set selected Chart type.
   * @param radioButtonValue selected chart type
   */
  public setSelectedChartType(radioButtonValue: string): void {
    this.isChartTypeSelected = true;
    this.store.setSelectedChartType(radioButtonValue);
  }

  /**
   * Stepper selection changed.
   */
  public stepperSelectionChange(): void {
    this.selectedChartType = this.store.getSelectedChartType();
  }

  /**
   * Resets stepper.
   */
  public resetStepper(): void {
    this.displayCharts = { isValueChanged: false };
    this.resetData = { isValueChanged: true };
    this.isChartTypeSelected = false;
    this.store.setTableData([]);
    this.store.setRowHeaders([]);
    this.store.setColumnHeaders([]);
    this.store.setColumnSliderValue(1);
    this.store.setRowSliderValue(1);
    this.store.setSelectedChartType(undefined);
    this.stepper.reset();
  }
}
