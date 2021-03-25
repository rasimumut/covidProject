import { Component, OnInit,VERSION } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import {RequestsService} from "../../requests.service";
import {DatePipe, formatDate} from '@angular/common';
import {pipe} from "rxjs";
import {Data, Data2} from "../../model";


@Component({
  selector: 'app-my-line-chart',
  templateUrl: './my-line-chart.component.html',
  styleUrls: ['./my-line-chart.component.css']
})
export class MyLineChartComponent implements OnInit {
  version = VERSION.full;

  datee: Date;
  dateee:string
  obj: object | undefined;
  gecici:any[]=[];
  date4:string[]=[];
  date5: string | undefined;
  date3:any;
  date2: any;
  date: string | undefined;
  dataFirst:Data[]=[]
  data:any[]=[]
  data2:any[]=[]
  data3: object | undefined;
  data4:any[]=[];
  dataDate:[]=[];
  dataCase:any[]=[];
  dataDeath:any[]=[];
  dataRec:any[]=[];
  caseSum:number=0;
  deathSum:number=0;
  recSum:number=0;
  objArr:object[]=[]
  grouped:Map<any, any>=[]
  groupedarr:any=[]
  groupSum :object[]=[];
  groupSumm :Data2[]=[];
  groupedObj: Data2;
  constructor(private dataService:RequestsService) {
    dataService.getCountryData()
      .subscribe(response => {

        this.dataFirst = response
        for (let i=0;i<response.length;i++){
          this.data2[i] = this.dataFirst[i].value
        }
        for (let j=0;j<this.data2.length;j++){
          for (let k=0;k<this.data2.length;k++) {
            this.data3 = this.data2[j][k]
            if ( this.data3 != undefined){
              this.data4.push(this.data3)
            }}
        }
        function groupBy(list,keyGetter) {
          const map = new Map();
          list.forEach((item:object) => {
            const key = keyGetter(item);
            const collection = map.get(key);
            if (!collection) {
              map.set(key, [item]);
            } else {
              collection.push(item);
            }
          });
          return map;
        }
        this.grouped = groupBy(this.data4,data4 => data4.date)
        console.log(this.grouped)
        this.grouped.forEach(item => {
          this.groupedarr.push(item)})
        console.log(this.groupedarr[2])
        for (let i=0;i<this.groupedarr.length;i++){
          this.date5 =this.groupedarr[i][0].date
          for(let j=0;j<this.groupedarr[i].length;j++){
            this.recSum += this.groupedarr[i][j].recover
            this.deathSum += this.groupedarr[i][j].death
            this.caseSum += this.groupedarr[i][j].case
          }
          this.groupedObj={date:this.date5,case:this.caseSum,death:this.deathSum,recover:this.recSum}
          this.groupSum.push(this.groupedObj)
          this.caseSum=0;
          this.deathSum=0;
          this.recSum=0;
        }

        this.groupSumm =this.groupSum.sort(function(a,b){
                    return new Date(a.date) - new Date(b.date);
        });
        console.log(this.groupSumm)
        for (let i=0;i<this.groupSumm.length;i++){
          this.dataCase[i] = this.groupSumm[i].case
          this.dataDeath[i] = this.groupSumm[i].death
          this.dataRec[i] = this.groupSumm[i].recover
          this.datee = new Date(this.groupSumm[i].date)
          this.dateee= this.datee.toLocaleDateString("tr-tr")
          this.date4.push(this.dateee)
        }


      })

  }

  public lineChartData: ChartDataSets[] = [
    { data: this.dataCase, label: 'Vaka' },
    { data: this.dataDeath, label: 'Ölüm' },
    { data: this.dataRec, label: 'İyileşen' },
  ];
  public lineChartLabels: Label[] = this.date4;
  public lineChartOptions: ChartOptions = {
    responsive: true,
  };
  public lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,0,0,0.3)',
    },
  ];
  public lineChartLegend = true;
  public lineChartType: ChartType = 'line';
  public lineChartPlugins = [];

  ngOnInit(): void {
  }

}
//
