import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-my-dashboard',
  templateUrl: './my-dashboard.component.html',
  styleUrls: ['./my-dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyDashboardComponent {}
