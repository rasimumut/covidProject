import { Component} from '@angular/core';
import {RequestsService} from "../../requests.service";
import {Data, Data2} from "../../model";


@Component({
  selector: 'app-infonav',
  templateUrl: './infonav.component.html',
  styleUrls: ['./infonav.component.css']
})
export class InfonavComponent {

  onCase:any=0;
  caseSum:any=0;
  deathSum:any=0;
  recoverSum:any=0;
  dataSource: object | undefined;
  firstData: Data2[] =[];
  data: Data2[] = [];
  dataName: string | undefined;
  dataFirst: Data[] = [];
  lastData: object | undefined;
  dataSumCase: number = 0;
  dataSumDeath: number = 0;
  dataSumRec: number = 0;
  constructor(private dataService:RequestsService) {
    dataService.getCountryData()
      .subscribe(response => {

        this.dataFirst = response
        for (let i=0;i<response.length;i++){
          this.data = this.dataFirst[i].value
          for (let j=0;j<this.data.length;j++){
            this.dataName = this.data[j].name
            this.dataSumCase += this.data[j].case
            this.dataSumDeath += this.data[j].death
            this.dataSumRec += this.data[j].recover
            this.lastData = {date:this.dataName, case:this.dataSumCase, death: this.dataSumDeath, recover:this.dataSumRec}
          }
          this.firstData[i] = <Data2>this.lastData
          this.dataSource = this.firstData
          this.dataSumCase = 0
          this.dataSumDeath = 0
          this.dataSumRec = 0
        }
        for (let i=0;i<this.firstData.length;i++){
          this.onCase = this.caseSum - (this.deathSum + this.recoverSum)
          this.caseSum += this.firstData[i].case
          this.deathSum += this.firstData[i].death
          this.recoverSum += this.firstData[i].recover
        }

          this.onCase = this.onCase.toLocaleString('en-US', {maximumFractionDigits:2})
          this.caseSum =this.caseSum.toLocaleString('en-US', {maximumFractionDigits:2})
          this.deathSum =this.deathSum.toLocaleString('en-US', {maximumFractionDigits:2})
          this.recoverSum =this.recoverSum.toLocaleString('en-US', {maximumFractionDigits:2})

      })
  }
}
