import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import { ChartsModule } from 'ng2-charts';
import { MyPieChartComponent } from './userpage/my-pie-chart/my-pie-chart.component';
import { MyLineChartComponent } from './userpage/my-line-chart/my-line-chart.component';
import { InfonavComponent } from './userpage/infonav/infonav.component';
import { AdminComponent } from './admin/admin.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DataTableComponent } from './userpage/data-table/data-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { HomeComponent } from './home/home.component';
import { AdminTableComponent } from './admin/admin-table/admin-table.component';
import { InputFormComponent } from './admin/input-form/input-form.component';
import {MatNativeDateModule} from "@angular/material/core";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {DetailTableComponent} from "./admin/detail-table/detail-table.component";
import {DatatasimaService} from "./datatasima.service";
import {FormsModule} from "@angular/forms";
import { LoginComponent } from './login/login.component';
import {MatButtonModule} from "@angular/material/button";
import { TableuserComponent } from './userpage/tableuser/tableuser.component';
import { MapChartComponent } from './userpage/map-chart/map-chart.component';
import { MyPieChart2Component } from './my-pie-chart2/my-pie-chart2.component';
import { AddCountryComponent } from './admin/add-country/add-country.component';





@NgModule({
  declarations: [
    AppComponent,
    MyPieChartComponent,
    MyLineChartComponent,
    InfonavComponent,
    AdminComponent,
    DataTableComponent,
    HomeComponent,
    AdminTableComponent,
    InputFormComponent,
    DetailTableComponent,
    LoginComponent,
    TableuserComponent,
    MapChartComponent,
    MyPieChart2Component,
    AddCountryComponent

  ],
    imports: [
        MatDatepickerModule,
        MatNativeDateModule,
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        ChartsModule,
        BrowserAnimationsModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatInputModule,
        MatSelectModule,
        FormsModule,
        MatButtonModule,
    ],
  providers: [DatatasimaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
