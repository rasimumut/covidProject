import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Data} from "../model";

export interface User {
  _id:string
  userName:string
  password:string
}


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide: false | undefined;

  constructor(private http:HttpClient,private router:Router) {
  }

  login(a:any,b:any){
    this.http.post<Data>('http://localhost:3000/api/user/giris',{userName:a,password:b})
      .subscribe( res =>{
      if(res._id){
         this.router.navigateByUrl('admin').then(r =>console.log(r) )
       }if(!res._id){
        this.router.navigateByUrl('giris').then(r => console.log(r))
      }
    })
  }

  ngOnInit(): void {
  }

}
