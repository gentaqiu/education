import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class UsersService {

  constructor(private http: Http) { }

  createUser(fullname:string,email:string,password:string) {
  	console.log("createUser in users service");
    return this.http.post('/api/users/register',{fullname:fullname,email:email,password:password})
      .map(res => res.json());  
  }

  login(email:string,password:string) {
  	console.log("login in users service");
    return this.http.post('/api/users/login',{email:email,password:password})
      .map(res => res.json());   
  }
}