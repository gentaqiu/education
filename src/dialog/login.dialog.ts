import {Component, Inject, ViewChild, TemplateRef, OnInit} from '@angular/core';
import {DOCUMENT} from '@angular/platform-browser';
import { UsersService } from '../service/users.service';
import { AuthService } from '../service/auth.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

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
    public dialogRef: MatDialogRef<LoginDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,private usersService: UsersService,private authService: AuthService) { 
      this.alert_message = "";
    }

  onConfirmClick(email:string,password:string): void {
    console.log('onConfirmClick in login');
      this.usersService.login(email,password).subscribe(    
        suc => {
            this.authService.saveToken(suc.token);
            this.dialogRef.close();
        },
        err => {
            console.log(err);
            this.alert_message = "Invalid Email or Password!";
        }
      );
    
  }


  onCancelClick(): void {
    console.log('cancel me');
    this.dialogRef.close();
  }
}