import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class UsersService {

  constructor(private http: Http) { }

  createUser(username:string,password:string) {
    return this.http.post('/api/users',{username:username,password:password})
      .map(res => res.json());  
  }

}