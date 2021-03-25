import {AfterViewInit, Component, Output, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {RequestsService} from "../../requests.service";
import {DatatasimaService} from "../../datatasima.service";
import {MatTableDataSource} from '@angular/material/table';
import {Data, Data2} from "../../model";

@Component({
  selector: 'app-admin-table',
  styleUrls: ['admin-table.component.css'],
  templateUrl: 'admin-table.component.html',
})
export class AdminTableComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'progress', 'color','btn'];
  dataSource: MatTableDataSource<Data> | undefined;
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  idDataArr:any;
  id:any;
  dataId: any;
  firstData: string[] =[];
  data: Data2[]=[];
  dataName: any;
  dataFirst: Data[]= [];
  lastData: any;
  dataSumCase: number = 0;
  dataSumDeath: number = 0;
  dataSumRec: number = 0;
  constructor(private dataService:RequestsService,private service:DatatasimaService) {

    dataService.getCountryData()
      .subscribe(response => {

        this.dataFirst = response
        for (let i=0;i<this.dataFirst.length;i++){
          this.data = this.dataFirst[i].value
          this.dataId = this.dataFirst[i]._id
          for (let j=0;j<this.data.length;j++){
             // this.dataId= this.data[0]._id
          this.dataName = this.data[j].name
          this.dataSumCase += this.data[j].case
          this.dataSumDeath += this.data[j].death
          this.dataSumRec += this.data[j].recover
          this.lastData = {
            id:this.dataId,
            name:this.dataName,
            case:this.dataSumCase.toLocaleString('en-US', {maximumFractionDigits:2}),
            death: this.dataSumDeath.toLocaleString('en-US', {maximumFractionDigits:2}),
            recover:this.dataSumRec.toLocaleString('en-US', {maximumFractionDigits:2})
            }
        }
        this.firstData[i] = this.lastData

          this.dataSource = this.firstData
          this.dataSumDeath = 0
          this.dataSumRec = 0
          this.dataSumCase=0
        }
        console.log(this.data)
        this.dataSource = new MatTableDataSource(this.dataSource)

      })
     }
  getIdData(id:string){
    this.dataService.getCountryIdData(id).subscribe(response => {
      this.idDataArr = response
      this.service.sendMessage(response);
    })
  }



  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;

    // @ts-ignore
    this.dataSource.filter = filterValue.trim().toLowerCase();

  }

  ngAfterViewInit(): void {
  }
  }





