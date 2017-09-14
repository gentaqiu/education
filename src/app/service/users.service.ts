import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class UsersService {

  constructor(private http: Http) { }

  createUser(fullname:string,email:string,password:string) {
    return this.http.post('/api/users',{fullname:fullname,email:email,password:password})
      .map(res => res.json());  
  }

}