import {Component, Inject,  TemplateRef, OnInit,EventEmitter} from '@angular/core';
import {DOCUMENT} from '@angular/platform-browser';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA,MatFormFieldModule} from '@angular/material';
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
  title:string;
  answerA:string;
  answerB:string;
  answerC:string;
  answerD:string;
  correctAnswer:string;
  constructor(
    public dialogRef: MatDialogRef<QuestionInsertDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { 
      this.alert_message = "";
    this.files = []; // local uploading files array
    this.uploadInput = new EventEmitter<UploadInput>(); // input events, we use this to emit data to ngx-uploader  
    this.title = ""; 
    this.answerA = "";
    this.answerB = "";
    this.answerC = "";
    this.answerD = "";
    this.correctAnswer = "";   
    }

  onConfirmClick(): void {
    console.log("confirm for " + this.title);
    
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
  /*
    const event: UploadInput = {
      type: 'uploadAll',
      url: '/api/file/upload',
      method: 'POST',
      data: { courseName: this.courseName }
    };
 
    this.uploadInput.emit(event);
  */
  }

  onUploadOutput(output: UploadOutput): void {
    if (output.type === 'allAddedToQueue') { // when all files added in queue
      // uncomment this if you want to auto upload files when added
       const event: UploadInput = {
         type: 'uploadAll',
         url: '/api/file/upload',
         method: 'POST',
         data: { courseName: this.courseName }
       };
       this.uploadInput.emit(event);
    } else if (output.type === 'addedToQueue'  && typeof output.file !== 'undefined') { // add file to array when added
      //this.files.push(output.file);
    } else if (output.type === 'uploading' && typeof output.file !== 'undefined') {
      // update current data in files array for uploading file
      /*
      const index = this.files.findIndex(file => typeof output.file !== 'undefined' && file.id === output.file.id);
      this.files[index] = output.file;
      var filename = output.file.name;
      //console.log("output=");
      //console.log(output);
      var file = output.file;
      console.log("file === ");
      console.log(file);
      var response = file.response;
      console.log(response);
      
      var filepath = response.filepath;
      console.log(filepath);
      this.title += filepath;
      */
    } else if(output.type === 'done' && typeof output.file !== 'undefined') {
      var response = output.file.response;
      console.log(response);
      var filepath = response.filepath;
      console.log(filepath);
      this.title += filepath;      
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