import {Component, Inject,  TemplateRef, OnInit,EventEmitter} from '@angular/core';
import {DOCUMENT} from '@angular/platform-browser';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { UploadOutput, UploadInput, UploadFile, humanizeBytes, UploaderOptions } from 'ngx-uploader';

@Component({
  selector: 'question-insert-dialog',
  styles: [
    `iframe {
      width: 800px;
    }`
  ],
  templateUrl: 'question-insert.html'
})
export class QuestionInsertDialog {
  files: UploadFile[];
  courseName: string;
  courses = [];
  uploadInput: EventEmitter<UploadInput>;
  dragOver: boolean;
  alert_message:string;
  constructor(
    public dialogRef: MatDialogRef<QuestionInsertDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { 
      this.alert_message = "";
    }

  onConfirmClick(title:string,answerA:string,answerB:string,answerC:string,answerD:string,correctAnswer:string): void {
    console.log("confirm for " + title);
    
  }

  onCancelClick(): void {
    console.log('cancel me');
    this.dialogRef.close();
  }
  insertAudio(): void {
  }
  insertPhoto(): void {
  }

  startUpload(): void {
    const event: UploadInput = {
      type: 'uploadAll',
      url: '/api/course/create',
      method: 'POST',
      data: { courseName: this.courseName }
    };
 
    this.uploadInput.emit(event);
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
      // update current data in files array for uploading file
      const index = this.files.findIndex(file => typeof output.file !== 'undefined' && file.id === output.file.id);
      this.files[index] = output.file;
      var filename = output.file.name;
      var item = {name:this.courseName,image:'assets/uploads/' + filename};
      this.courses.push(item);
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
}