import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

import {Employee} from'./employee.model'

var apiBaseUrl = "http://localhost:50539";

if (environment.production){
  apiBaseUrl = "http://192.168.1.112/api";
}

@Injectable()
export class EmployeeService {
  selectedEmployee : Employee;
  employeeList : Employee[];
  constructor(private http : Http) { }

  postEmployee(emp : Employee){
    var body = JSON.stringify(emp);
    var headerOptions = new Headers({'Content-Type':'application/json'});
    var requestOptions = new RequestOptions({method : RequestMethod.Post,headers : headerOptions});
    return this.http.post(apiBaseUrl + '/api/Employee',body,requestOptions).pipe(map(x => x.json()));
  }

  putEmployee(id, emp) {
    var body = JSON.stringify(emp);
    var headerOptions = new Headers({ 'Content-Type': 'application/json' });
    var requestOptions = new RequestOptions({ method: RequestMethod.Put, headers: headerOptions });
    return this.http.put(apiBaseUrl + '/api/Employee/' + id,
      body,
      requestOptions).pipe(map(res => res.json()));
  }

  getEmployeeList(){
    this.http.get(apiBaseUrl + '/api/Employee')
    .pipe(map((data : Response) =>{
      return data.json() as Employee[];
    })).toPromise().then(x => {
      this.employeeList = x;
    })
  }

  deleteEmployee(id: number) {
    return this.http.delete(apiBaseUrl + '/api/Employee/' + id).pipe(map(res => res.json()));
  }
}