import {Component, Inject, ViewChild, TemplateRef, OnInit} from '@angular/core';
import {DOCUMENT} from '@angular/platform-browser';
import {MdDialog, MdDialogRef, MD_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
      host: {
        '(window:resize)': 'onResize($event)'
      }    
})
export class IndexComponent implements OnInit {

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



}

