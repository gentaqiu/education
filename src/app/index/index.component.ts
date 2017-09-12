import {Component, Inject, ViewChild, TemplateRef, OnInit} from '@angular/core';
import {DOCUMENT} from '@angular/platform-browser';
import {MdDialog, MdDialogRef, MD_DIALOG_DATA} from '@angular/material';
import { UsersService } from '../users/users.service';
import { RegisterDialog } from '../dialog/register.dialog';
import { LoginDialog } from '../dialog/login.dialog';
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  constructor(public dialog: MdDialog) { }

  ngOnInit() {

  }

  openRegisterDialog(): void {
    let registerDialogRef = this.dialog.open(RegisterDialog);
  }  
  openLoginDialog(): void {
    let loginDialogRef = this.dialog.open(LoginDialog);
  }    
}

