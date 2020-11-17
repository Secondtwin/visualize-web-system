import { MyDashboardComponent } from './pages/my-dashboard/my-dashboard.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { CreateChartTableComponent } from './pages/create-chart-table/create-chart-table.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgxEchartsModule } from 'ngx-echarts';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { CdkTableModule } from '@angular/cdk/table';
import { MatSliderModule } from '@angular/material/slider';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import { MatRadioModule } from '@angular/material/radio';
import { MatExpansionModule } from '@angular/material/expansion';

import { ChartExamplesComponent } from './pages/chart-examples/chart-examples.component';
import { CreateChartComponent } from './pages/create-chart/create-chart.component';
import { CreateChartStepperComponent } from './pages/create-chart-stepper/create-chart-stepper.component';
import { DisplayChartsComponent } from './pages/display-charts/display-charts.component';
import { CreateAccountComponent } from './pages/create-account/create-account.component';
import {
  BarChartComponent,
  BarChartHorizontalComponent,
  LineChartComponent,
  PieChartComponent,
  ScatterChartComponent,
} from './shared/components/index';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatCardModule,
    NgxEchartsModule,
    MatTabsModule,
    MatBottomSheetModule,
    MatButtonModule,
    CdkTableModule,
    MatTableModule,
    MatSliderModule,
    FormsModule,
    MatInputModule,
    MatStepperModule,
    MatRadioModule,
    MatExpansionModule,
    ReactiveFormsModule,
  ],
  declarations: [
    AppComponent,
    ChartExamplesComponent,
    BarChartComponent,
    BarChartHorizontalComponent,
    LineChartComponent,
    PieChartComponent,
    ScatterChartComponent,
    CreateChartComponent,
    CreateChartTableComponent,
    CreateChartStepperComponent,
    DisplayChartsComponent,
    HomePageComponent,
    MyDashboardComponent,
    CreateAccountComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
