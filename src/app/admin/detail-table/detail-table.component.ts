
import {Component,OnInit, OnDestroy} from '@angular/core';
import {RequestsService} from "../../requests.service";
import {DatatasimaService} from "../../datatasima.service";
import {Subscription} from "rxjs";



/**
 * @title Table retrieving data through HTTP
 */
@Component({
  selector: 'app-detail-table',
  styleUrls: ['detail-table.component.css'],
  templateUrl: 'detail-table.component.html',
})
export class DetailTableComponent implements OnInit, OnDestroy{

  dataSource:any;
  data: object[] = [];
  sub = new Subscription();
    constructor(private dataService:RequestsService, private service: DatatasimaService) {

    }

  ngOnInit(): void {
      this.sub.add( this.service.getMessage().subscribe((message)=>{
        for (let i=0;i<message[0].value.length;i++){
          this.data[i] = message[0].value[i]
        }
        this.dataSource = this.data
        this.data=[]
    }));
    }

    ngOnDestroy() {
      this.sub.unsubscribe();
    }


  displayedColumns = ['name', 'death', 'recover', 'case'];

}


export class DataTableComponent {
}
