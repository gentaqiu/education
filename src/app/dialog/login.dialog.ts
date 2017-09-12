import {Component, Inject, ViewChild, TemplateRef, OnInit} from '@angular/core';
import {DOCUMENT} from '@angular/platform-browser';
import {MdDialog, MdDialogRef, MD_DIALOG_DATA} from '@angular/material';
import { UsersService } from '../users/users.service';
@Component({
  selector: 'login-dialog',
  styles: [
    `iframe {
      width: 800px;
    }`
  ],
  templateUrl: 'login.html'
})
export class LoginDialog {
  alert_message:string;
  constructor(
    public dialogRef: MdDialogRef<LoginDialog>,
    @Inject(MD_DIALOG_DATA) public data: any,private usersService: UsersService) { 
      this.alert_message = "";
    }

  onConfirmClick(username:string,password:string,repeat_password:string): void {
    if(password != repeat_password) {
      console.log("no correct");
      this.alert_message = "Passwords Do Not Match!";
    }
    else {
      this.usersService.createUser(username,password).subscribe(users => {
        console.log(users);
      });

      this.dialogRef.close();
    }
    
  }


  onCancelClick(): void {
    console.log('cancel me');
    this.dialogRef.close();
  }
}