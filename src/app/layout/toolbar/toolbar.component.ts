import {Component, Inject, ViewChild, TemplateRef, OnInit} from '@angular/core';
import {DOCUMENT} from '@angular/platform-browser';
import { NgIf } from '@angular/common';
import {MdDialog, MdDialogRef, MD_DIALOG_DATA} from '@angular/material';
import { RegisterDialog } from '../../dialog/register.dialog';
import { LoginDialog } from '../../dialog/login.dialog';
import { AuthService } from '../../service/auth.service';

@Component({
    selector: 'education-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  constructor(public dialog: MdDialog,private authService: AuthService) { }

    current:number = 1;
    col_num:number = 2;
    audio = new Audio();
    isLogin = false;
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
      this.isLogin = true;
      console.log("this.isLogin="+this.isLogin);
    });    
  }  
  openLoginDialog(): void {
    let loginDialogRef = this.dialog.open(LoginDialog);
  }    

  logout(): void {
    this.authService.logout();
  }
  play(): void {
      var paths = [
        "/assets/audio/tang/chunxiao.mp3",
        "/assets/audio/tang/luchai.mp3"
      ];
      var index = 1;
      var audio = this.audio;
      audio.src = paths[0];
      audio.load();
      audio.play(); 
      audio.onended = function() {
          if(index < paths.length){
              audio.src=paths[index];
              audio.load();
              audio.play();
              index++;
          }
      };      
    
  }
  pause(): void {
      this.audio.pause();
  }
}