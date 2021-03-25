import { Component, OnInit } from '@angular/core';
import {Subscription} from "rxjs";
import {DatatasimaService} from "../../datatasima.service";
import {RequestsService} from "../../requests.service";
import {HttpClient} from "@angular/common/http";
@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.css']
})



export class InputFormComponent implements OnInit {
  newDate = new Date("MMM/dd/yyyy")
  caseSum:number =0;
  newBody:any;
  newObj:any;
  date:any;
  case:any;
  death:any;
  recover:number=0;
  value:any[]=[]
  dataId:any;
  dataName:any;
  dataCode:any;
  sub = new Subscription();
  constructor(private service:DatatasimaService,private requestsService:RequestsService,private http:HttpClient) { }
  ngOnInit(): void {
    this.sub.add( this.service.getMessage().subscribe((message)=>{
      this.dataCode= message[0].code
      this.dataId = message[0]._id
      this.dataName = message[0].value[0].name
      this.value = message[0].value
      this.caseSum = message[0].caseSum
    }));
  }

 saveData(a:number,b:number,c:number,d:Date,e:string,f:string) {
   this.caseSum +=Number(a)
   this.newObj = {date: d, recover: c, death: b, case: a, name: e}
   this.value.push(this.newObj)
   this.newBody = {
     code:f,
     caseSum:this.caseSum,
     name: e,
     value: this.value
   }

   if (this.newObj.case && this.newObj.date && this.newObj.death && this.newObj.name && this.newObj.recover){

   this.requestsService.deleteData(this.dataId).subscribe(res => {
     console.log(res)
     this.http.post('http://localhost:3000/api/country',this.newBody).subscribe(resP=>{
       console.log(resP)
       location.reload();
     })
   } )


   }else{
     location.reload();
   }

 }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  }




