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
    MatTabsModule,
    MatBottomSheetModule,
    MatButtonModule,
    CdkTableModule,
    MatTableModule,
  ],
  declarations: [
    AppComponent,
    ChartExamplesComponent,
    BarChartComponent,
    LineChartComponent,
    PieChartComponent,
    ScatterChartComponent,
    CreateChartComponent,
    CreateChartTableComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
