import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import { ChartsModule } from 'ng2-charts';
import { MyPieChartComponent } from './my-pie-chart/my-pie-chart.component';
import { RequestsComponent } from './requests/requests.component';
import { MyLineChartComponent } from './my-line-chart/my-line-chart.component';
import { InfonavComponent } from './infonav/infonav.component';
import { AdminComponent } from './admin/admin.component';


@NgModule({
  declarations: [
    AppComponent,
    MyPieChartComponent,
    RequestsComponent,
    MyLineChartComponent,
    InfonavComponent,
    AdminComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
