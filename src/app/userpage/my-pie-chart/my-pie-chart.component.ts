import {Component, OnInit} from '@angular/core';
import {ChartOptions, ChartType} from 'chart.js';
import {Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip, SingleDataSet} from 'ng2-charts';
import {RequestsService} from "../../requests.service";
import {Data, Data2, PieData} from "../../model";

@Component({
  selector: 'app-my-pie-chart',
  templateUrl: './my-pie-chart.component.html',
  styleUrls: ['./my-pie-chart.component.css']
})
export class MyPieChartComponent implements OnInit {

  dataCase:number[]=[]
  sortDataName:any[]=[]
  sortDataCase:Array<number | number[] | null | undefined>=[]
  sortData:any[]=[]
  dataSource: object | undefined;
  firstData: PieData[] =[];
  data: Data2[] = [];
  dataName: string | undefined;
  dataFirst: Data[] | undefined;
  lastData: object | undefined;
  dataSumCase: number = 0;
  otherSum: number = 0;
  otherName:string='Diğer';
  constructor(private dataService:RequestsService) {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
    dataService.getCountryData()
      .subscribe(response => {

        this.dataFirst = response

        for (let i=0;i<this.dataFirst.length;i++){


          const {value} = this.dataFirst[i];
          this.data = value
          for (let j=0;j<this.data.length;j++){
            this.dataName = this.data[j].name
            this.dataSumCase += this.data[j].case
            this.lastData = {name:this.dataName, case:this.dataSumCase}
          }
          this.firstData[i] = <PieData>this.lastData
          this.dataSource = this.firstData
          this.dataSumCase = 0;
        }

        this.sortData = this.firstData

        for (let i=0;i<4;i++){
          this.sortDataName[i] = this.sortData[i].name
          this.sortDataCase[i] = this.sortData[i].case
        }
        for (let i=4;i<this.sortData.length;i++){
           this.otherSum+= this.sortData[i].case

        }
        this.sortDataCase.push(this.otherSum)
        this.sortDataName.push(this.otherName)
        console.log(this.dataFirst)

      })
  }

  public pieChartOptions: ChartOptions = {
    responsive: true,
  };


  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];
  public pieChartLabels: Label[] = this.sortDataName;
  public pieChartData: SingleDataSet = this.sortDataCase;

  ngOnInit() {

  }
}
