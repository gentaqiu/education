import {Component, Inject, ViewChild, TemplateRef, OnInit} from '@angular/core';
import {DOCUMENT} from '@angular/platform-browser';
import {MdDialog, MdDialogRef, MD_DIALOG_DATA} from '@angular/material';
import { UsersService } from '../../users/users.service';
import { RegisterDialog } from '../../dialog/register.dialog';
import { LoginDialog } from '../../dialog/login.dialog';

@Component({
    selector: 'education-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  constructor(public dialog: MdDialog) { }

    current:number = 1;
    col_num:number = 2;
    setColNum() {
        this.col_num = 3;
        var width = window.innerWidth;
        if(width <= 400) {
            this.col_num = 1;
        }
        else if (width <= 800) {
            this.col_num = 2;
        }    
    }

  ngOnInit() {
    this.setColNum();
  }
    onResize(event){
        this.setColNum();
    }
  openRegisterDialog(): void {
    let registerDialogRef = this.dialog.open(RegisterDialog);
    registerDialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
    });    
  }  
  openLoginDialog(): void {
    let loginDialogRef = this.dialog.open(LoginDialog);
  }    


}