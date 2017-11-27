import {Component, Inject,  TemplateRef, OnInit,EventEmitter} from '@angular/core';
import {DOCUMENT} from '@angular/platform-browser';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA,MatFormFieldModule} from '@angular/material';
import { UploadOutput, UploadInput, UploadFile, humanizeBytes, UploaderOptions } from 'ngx-uploader';


@Component({
  selector: 'course-insert-dialog',
  styleUrls: ['course-insert.dialog.css'],
  templateUrl: 'course-insert.dialog.html'
})
export class CourseInsertDialog {
  uploadInput: EventEmitter<UploadInput>;
  courseName: string;
  courseImage: string;
  sequence: string;
  constructor(
    public dialogRef: MatDialogRef<CourseInsertDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { 
    if(data.courseName) {
    	this.courseName = data.courseName;
    }
    if(data.sequence) {
    	this.sequence = data.sequence;
    }
    if(data.courseImage) {
    	this.courseImage = data.courseImage;
    }
    else {
    	this.courseImage = "/assets/uploads/default.jpg";
    }
    
    this.uploadInput = new EventEmitter<UploadInput>();
  }
  onCancelClick(): void {
    console.log('cancel me');
    this.dialogRef.close();
  } 

  onConfirmClick(): void {
    var course = {sequence:this.sequence,courseName:this.courseName,courseImage:this.courseImage};
    this.dialogRef.close(course);
  }

  onUploadOutput(output: UploadOutput): void {
    if (output.type === 'allAddedToQueue') { 
       const event: UploadInput = {
         type: 'uploadAll',
         url: '/api/file/upload',
         method: 'POST',
         data: {}
       };
       this.uploadInput.emit(event);
    } 
    else if(output.type === 'done' && typeof output.file !== 'undefined') {
      var response = output.file.response;
      this.courseImage = response.filepath;
    }  
  }
}