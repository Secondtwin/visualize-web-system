import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-create-chart',
  templateUrl: './create-chart.component.html',
  styleUrls: ['./create-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateChartComponent {
}
