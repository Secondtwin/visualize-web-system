import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* PAGES */
import { ChartExamplesComponent } from './pages/chart-examples/chart-examples.component';
import { CreateChartStepperComponent } from './pages/create-chart-stepper/create-chart-stepper.component';

const routes: Routes = [
  { path: 'charts', component: ChartExamplesComponent },
  { path: 'create-chart', component: CreateChartStepperComponent },
  { path: '',   redirectTo: 'charts', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
