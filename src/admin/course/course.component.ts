import {Component, Inject, ViewChild, TemplateRef, OnInit} from '@angular/core';
import {DOCUMENT} from '@angular/platform-browser';
import {MdDialog, MdDialogRef, MD_DIALOG_DATA} from '@angular/material';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'admin-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css'],
      host: {
        '(window:resize)': 'onResize($event)'
      }    
})
export class CourseComponent implements OnInit {

  constructor(public dialog: MdDialog,private router: Router) { }

    current:number = 1;
    col_num:number = 2;
    courses = [];

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

