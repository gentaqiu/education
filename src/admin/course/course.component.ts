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

  onUploadOutput(output: UploadOutput): void {
    if (output.type === 'allAddedToQueue') { // when all files added in queue
      // uncomment this if you want to auto upload files when added
      // const event: UploadInput = {
      //   type: 'uploadAll',
      //   url: '/upload',
      //   method: 'POST',
      //   data: { foo: 'bar' }
      // };
      // this.uploadInput.emit(event);
    } else if (output.type === 'addedToQueue'  && typeof output.file !== 'undefined') { // add file to array when added
      this.files.push(output.file);
    } else if (output.type === 'uploading' && typeof output.file !== 'undefined') {

    } else if(output.type === 'done' && typeof output.file !== 'undefined') {
      var response = output.file.response;
      var course = response.course;
      this.courses.push(course);
    } else if (output.type === 'removed') {
      // remove file from array when removed
      this.files = this.files.filter((file: UploadFile) => file !== output.file);
    } else if (output.type === 'dragOver') {
      this.dragOver = true;
    } else if (output.type === 'dragOut') {
      this.dragOver = false;
    } else if (output.type === 'drop') {
      this.dragOver = false;
    }
  }
 
  createUpdateCourse(): void {

    let courseDialogRef = this.dialog.open(CourseInsertDialog,{
      height: '500px',
      width: '600px',
    });  
  /*
    const event: UploadInput = {
      type: 'uploadAll',
      url: '/api/course/createUpdate',
      method: 'POST',
      data: { 
        course_id: this.course_id,
        courseName: this.courseName 
      }
    };
 
    this.uploadInput.emit(event);
  */
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

  editCourse(course_id:string) {
      for(var i = this.courses.length - 1; i >= 0; i--) {
          if(this.courses[i]._id == course_id) {
              this.courseName = this.courses[i].name;
              this.course_id = course_id;
              this.createOrUpdate = 'Update';
              break;
          }
      }      
  }

  cancelUpload(id: string): void {
    this.uploadInput.emit({ type: 'cancel', id: id });
  }
 
  removeFile(id: string): void {
    this.uploadInput.emit({ type: 'remove', id: id });
  }
 
  removeAllFiles(): void {
    this.uploadInput.emit({ type: 'removeAll' });
  }
}