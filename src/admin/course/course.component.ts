import { Component, EventEmitter, OnInit } from '@angular/core';
import { UploadOutput, UploadInput, UploadFile, humanizeBytes, UploaderOptions } from 'ngx-uploader';
import { CourseService } from '../../service/course.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { CourseInsertDialog } from '../../dialog/course-insert.dialog';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'admin-course',
  templateUrl: 'course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent {
  options: UploaderOptions;
  formData: FormData;
  files: UploadFile[];
  uploadInput: EventEmitter<UploadInput>;
  humanizeBytes: Function;
  dragOver: boolean;
  course_id: string;
  courseName: string;
  createOrUpdate: string;
  courses = [];

  constructor(private courseService:CourseService,private router: Router,public dialog: MatDialog) {
    this.files = []; // local uploading files array
    this.uploadInput = new EventEmitter<UploadInput>(); // input events, we use this to emit data to ngx-uploader
    this.humanizeBytes = humanizeBytes;
  }
  ngOnInit() {
      this.courseService.getCourses().subscribe(    
          suc => {
              //console.log(suc);
              this.courses = suc.courses;
          },
          err => {
              console.log(err);
          }
      );  
      this.createOrUpdate = 'Create';    
      this.course_id = "";  
  }

  listQuestions(courseName:string) {
    this.router.navigate(['/admin/question',courseName]);
  }


 
  createUpdateCourse(): void {

    let courseDialogRef = this.dialog.open(CourseInsertDialog,{
      height: '500px',
      width: '600px',
      data: { 
        sequence: '',
        courseName: '',
        courseImage: ''
      }        
    });  

    courseDialogRef.afterClosed().subscribe(result => {

      this.courseService.createCourse(this.course_id,result.sequence,result.courseName,result.courseImage).subscribe(    
        suc => {
          this.courses.push(suc.course);
        },
        err => {
            console.log(err);
        }
      );       
    });
  }
 
  deleteCourse(course_id:string) {
    console.log(course_id);
      this.courseService.deleteCourse(course_id).subscribe(    
          suc => {
              console.log(suc);

              for(var i = this.courses.length - 1; i >= 0; i--) {
                  if(this.courses[i]._id == course_id) {
                    this.courses.splice(i, 1);
                    break;
                     
                  }
              }              
          },
          err => {
              console.log(err);
          }
      );     
  }

  editCourse(course_id:string,sequence:string,courseName:string,courseImage:string) {
    this.course_id = course_id;
    let courseDialogRef = this.dialog.open(CourseInsertDialog,{
      height: '500px',
      width: '600px',
      data: { 
        sequence: sequence,
        courseName: courseName,
        courseImage: courseImage
      }      
    });  
    courseDialogRef.afterClosed().subscribe(result => {

      this.courseService.createCourse(this.course_id,result.sequence,result.courseName,result.courseImage).subscribe(    
        suc => {
          for(var i = this.courses.length - 1; i >= 0; i--) {
              if(this.courses[i]._id == this.course_id) {
                this.courses[i] = suc.course;
                break;
              }
          }            
          this.course_id = '';

        },
        err => {
            console.log(err);
        }
      );       
    });           
  }

}