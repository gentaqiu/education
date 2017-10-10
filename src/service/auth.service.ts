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

  isLoggedIn() {
    var token = this.getToken();
    if(token) {
      return true;
    }
    return false;
  };

  currentUser() {
    if(this.isLoggedIn()){
      var token = this.getToken();
      var payload = token.split('.')[1];
      payload = atob(payload);
      payload = JSON.parse(payload);
      console.log("payload====");
      console.log(payload);
      return {
        email : "aaa",
        name : "bbb"
      };
    }
  };
}
