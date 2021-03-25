import {RequestsService} from "../../requests.service";
import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {Data, Data2} from "../../model";

/**
 * @title Table retrieving data through HTTP
 */
@Component({
  selector: 'table-http-example',
  styleUrls: ['data-table.component.css'],
  templateUrl: 'data-table.component.html',
})
export class DataTableComponent implements AfterViewInit{

  dataSource: MatTableDataSource<any> | undefined;
  firstData: string[] =[];
  data: Data2[] = [];
  dataName:  any;
  dataFirst: Data[] = [];
  lastData:   any;
  dataSumCase: number = 0;
  dataSumDeath: number = 0;
  dataSumRec: number = 0;
  @ViewChild(MatSort) sort: MatSort | undefined;

    constructor(private dataService:RequestsService) {
      dataService.getCountryData()
        .subscribe(response => {
          this.dataFirst = response
          for (let i=0;i<this.dataFirst.length;i++){
            this.data = this.dataFirst[i].value
              for (let j=0;j<this.data.length;j++){
                this.dataName = this.data[j].name
                this.dataSumCase += this.data[j].case
                this.dataSumDeath += this.data[j].death
                this.dataSumRec += this.data[j].recover
                this.lastData = {
                  name:this.dataName,
                  case:this.dataSumCase.toLocaleString('en-US', {maximumFractionDigits:2}),
                  death: this.dataSumDeath.toLocaleString('en-US', {maximumFractionDigits:2}),
                  recover:this.dataSumRec.toLocaleString('en-US', {maximumFractionDigits:2})
                }
              }
            this.firstData[i] = this.lastData
            // this.dataSource = this.firstData
            this.dataSource = new MatTableDataSource(this.firstData);
            this.dataSumCase = 0
            this.dataSumDeath = 0
            this.dataSumRec = 0
          }
        })
    }


  displayedColumns = ['name', 'death', 'recover', 'case'];

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;

    // @ts-ignore
    this.dataSource.filter = filterValue.trim().toLowerCase();

  }


  ngAfterViewInit(): void {
  }

}





