import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Data, Data2} from "./model";

@Injectable({
  providedIn: 'root'
})
export class RequestsService {
 private urlCountry = 'http://localhost:3000/api/country/';
//  private urluser = "http://localhost:3000/api/user/giris"
  constructor(private http:HttpClient) { }

  getCountryData(): Observable<Data[]> {
    return this.http.get<Data[]>(this.urlCountry)
  }

  getCountryIdData(id:string):Observable<Data[]>{
    return this.http.get<Data[]>(this.urlCountry+id)
  }

  // postData(data){
  //   this.http.post(this.urlCountry)
  // }

  // login(){
  //  return  this.http.post(this.urluser)
  // }

  deleteData(id:string){
  return this.http.delete(this.urlCountry+id)
  }
  }

