import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-create-chart',
  templateUrl: './create-chart.component.html',
  styleUrls: ['./create-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateChartComponent {
  public fileToUpload: File = null;

  /**
   * Opens file upload.
   * @param files - incoming file
   */
  public handleFileInput(files: FileList): void {
    this.fileToUpload = files.item(0);
  }
}
