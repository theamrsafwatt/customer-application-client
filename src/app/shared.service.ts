import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
readonly APIUrl="http://localhost:9080/customer";

  constructor(private http:HttpClient) { }

  getCustomerList(query:any):Observable<any[]>{
    return this.http.get<any>(this.APIUrl + '/search' + query);
  }
}
