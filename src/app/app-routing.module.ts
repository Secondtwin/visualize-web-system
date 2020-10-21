import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* PAGES */
import { ChartExamplesComponent } from './pages/chart-examples/chart-examples.component';
import { CreateAccountComponent } from './pages/create-account/create-account.component';
import { CreateChartStepperComponent } from './pages/create-chart-stepper/create-chart-stepper.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { MyDashboardComponent } from './pages/my-dashboard/my-dashboard.component';

const routes: Routes = [
  { path: 'charts', component: ChartExamplesComponent },
  { path: 'create-chart', component: CreateChartStepperComponent },
  { path: 'home', component: HomePageComponent },
  { path: 'create-account', component: CreateAccountComponent },
  { path: 'my-dashboard', component: MyDashboardComponent },
  { path: '',   redirectTo: 'charts', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
