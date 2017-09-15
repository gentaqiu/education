import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {

  constructor() { }

  saveToken(token:string) {
    localStorage.setItem('mean-token', token);
  }
  getToken() {
    var token = localStorage.getItem("mean-token");
    return token;
  }
  logout() {
    localStorage.removeItem("mean-token");
  }

}
