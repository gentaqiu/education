import {Component, Inject, ViewChild, TemplateRef, OnInit} from '@angular/core';
import {DOCUMENT} from '@angular/platform-browser';
import {MatDialog} from '@angular/material';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { CourseService } from '../../service/course.service';

@Component({
  selector: 'app-subject_courses',
  templateUrl: './subject_courses.component.html',
  styleUrls: ['./subject_courses.component.css'],
      host: {
        '(window:resize)': 'onResize($event)'
      }    
})
export class SubjectCoursesComponent implements OnInit {

  constructor(public dialog: MatDialog,private router: Router,private courseService:CourseService) { }

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
    swipeLeft() {
     console.log('swipeLeft');
    }
    swipeRight() {
     console.log('swipeRight');
    }    
    ngOnInit() {
      this.setColNum();
      this.courseService.getCourses().subscribe(    
          suc => {
              //console.log(suc);
              this.courses = suc.courses;
          },
          err => {
              console.log(err);
          }
      );        
    }
    onResize(event){
        this.setColNum();
    }

    startCourse(courseName:string): void {
      this.router.navigate(['/app/course_questions/'+courseName]);
    }

}

