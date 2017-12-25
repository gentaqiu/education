import {Component, Inject, ViewChild, TemplateRef, OnInit} from '@angular/core';
import {DOCUMENT} from '@angular/platform-browser';
import {MatDialog} from '@angular/material';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { SubjectService } from '../../service/subject.service';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css'],
      host: {
        '(window:resize)': 'onResize($event)'
      }    
})
export class SubjectComponent implements OnInit {

  constructor(public dialog: MatDialog,private router: Router,private subjectService:SubjectService) { }

    current:number = 1;
    col_num:number = 2;
    subjects = [];

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
      this.subjectService.getSubjects().subscribe(    
          suc => {
              this.subjects = suc.subjects;
          },
          err => {
              console.log(err);
          }
      );        
    }
    onResize(event){
        this.setColNum();
    }

    startSubject(subject_id:string): void {
      this.router.navigate(['/app/subject_courses/'+subject_id]);
    }

}

