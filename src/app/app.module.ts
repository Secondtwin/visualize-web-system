import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { NgxEchartsModule } from 'ngx-echarts';

import { ChartExamplesComponent } from './pages/chart-examples/chart-examples.component';
import { CreateChartComponent } from './pages/create-chart/create-chart.component';
import {
  BarChartComponent,
  LineChartComponent,
  PieChartComponent,
  ScatterChartComponent,
} from './shared/components/index';

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
  ],
  declarations: [
    AppComponent,
    ChartExamplesComponent,
    BarChartComponent,
    LineChartComponent,
    PieChartComponent,
    ScatterChartComponent,
    CreateChartComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
