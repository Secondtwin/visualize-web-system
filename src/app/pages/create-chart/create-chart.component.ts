import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ValueChanges } from 'src/app/shared/models';

@Component({
  selector: 'app-create-chart',
  templateUrl: './create-chart.component.html',
  styleUrls: ['./create-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateChartComponent {
  @Input() public resetData: ValueChanges;

  @Output() public initNextStep: EventEmitter<void> = new EventEmitter();

  public fileToUpload: File = null;

  /**
   * Opens file upload.
   * @param files - incoming file
   */
  public handleFileInput(files: FileList): void {
    this.fileToUpload = files.item(0);
  }
}
