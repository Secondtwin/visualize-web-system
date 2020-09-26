import { BottomSheetComponent } from './../bottom-sheet/bottom-sheet.component';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-create-chart',
  templateUrl: './create-chart.component.html',
  styleUrls: ['./create-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateChartComponent {
  constructor(private bottomSheet: MatBottomSheet) {}

  /**
   * Opens bottom sheet to show options for open file.
   */
  public openBottomSheet(): void {
    this.bottomSheet.open(BottomSheetComponent);
  }
}
