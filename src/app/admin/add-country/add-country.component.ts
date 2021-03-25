import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-add-country',
  templateUrl: './add-country.component.html',
  styleUrls: ['./add-country.component.css']
})
export class AddCountryComponent implements OnInit {

  newBody: object | undefined

  constructor(private http:HttpClient) { }


  saveData(a:string,b:string){
    this.newBody={
      name:a,
      code:b,
      caseSum:0,
      value:[{
        date: "2020-12-01T21:00:00.000Z",
        recover: 0,
        death: 0,
        case: 0,
        name: a
      }]
    }
    if (a&&b){
      this.http.post('http://localhost:3000/api/country',this.newBody).subscribe(resP=>{
        console.log(resP)
        location.reload();
      })
    }

  }
  ngOnInit(): void {
  }

}
