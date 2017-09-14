import {Component, Inject, ViewChild, TemplateRef, OnInit} from '@angular/core';
import {DOCUMENT} from '@angular/platform-browser';
import {MdDialog, MdDialogRef, MD_DIALOG_DATA} from '@angular/material';
import { UsersService } from '../users/users.service';
@Component({
  selector: 'register-dialog',
  styles: [
    `iframe {
      width: 800px;
    }`
  ],
  templateUrl: 'register.html'
})
export class RegisterDialog {
  alert_message:string;
  constructor(
    public dialogRef: MdDialogRef<RegisterDialog>,
    @Inject(MD_DIALOG_DATA) public data: any,private usersService: UsersService) { 
      this.alert_message = "";
    }

  onConfirmClick(username:string,password:string,repeat_password:string): void {
    if(password != repeat_password) {
      console.log("no correct");
      this.alert_message = "Passwords Do Not Match!";
    }
    else {
      this.usersService.createUser(username,password).subscribe(    
        suc => {
            console.log(suc);
            this.dialogRef.close();
        },
        err => {
            console.log(err );
            this.alert_message = "Username already existed!";
        }
      );

      
    }
    
  }


  onCancelClick(): void {
    console.log('cancel me');
    this.dialogRef.close();
  }
}