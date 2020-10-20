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

  public constructor(private store: AppStorageService) {}

  /**
   * Inits next step.
   */
  public initNextStep(): void {
    this.stepper.next();
    this.displayCharts = { isValueChanged: true };
  }

  /**
   * Resets stepper.
   */
  public resetStepper(): void {
    this.stepper.reset();
    this.displayCharts = { isValueChanged: false };
    this.resetData = { isValueChanged: true };
    this.store.setTableData([]);
    this.store.setRowHeaders([]);
    this.store.setColumnHeaders([]);
    this.store.setColumnSliderValue(1);
    this.store.setRowSliderValue(1);
  }
}
