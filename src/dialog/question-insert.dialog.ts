import {Component, Inject,  TemplateRef, OnInit,EventEmitter} from '@angular/core';
import {DOCUMENT} from '@angular/platform-browser';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA,MatFormFieldModule} from '@angular/material';
import { UploadOutput, UploadInput, UploadFile, humanizeBytes, UploaderOptions } from 'ngx-uploader';


@Component({
  selector: 'question-insert-dialog',
  styleUrls: ['question-insert.dialog.css'],
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
  currentInputID:string;
  correctAnswer:string;

  constructor(
    public dialogRef: MatDialogRef<QuestionInsertDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { 
      this.alert_message = "";
    this.files = []; // local uploading files array
    this.uploadInput = new EventEmitter<UploadInput>(); 

    this.title = data.title; 
    this.answerA = data.answerA;
    this.answerB = data.answerB;
    this.answerC = data.answerC;
    this.answerD = data.answerD;
    this.correctAnswer = data.correctAnswer; 
    
    this.currentInputID = "";
      
  }

  
  onConfirmClick(): void {

    console.log("confirm for " + this.title);
    var question = {title:this.title,answerA:this.answerA,answerB:this.answerB,answerC:this.answerC,answerD:this.answerD,correctAnswer:this.correctAnswer};
    this.dialogRef.close(question);

  }

  onCancelClick(): void {
    console.log('cancel me');
    this.dialogRef.close();
  }

  changeText(event): void {
    var id = event.target.id;
    this.currentInputID = id;
    console.log('currentInputID==');
    console.log(this.currentInputID);
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

    } else if(output.type === 'done' && typeof output.file !== 'undefined') {
      var response = output.file.response;
      var filepath = response.filepath;
      this[this.currentInputID] += '|||' + filepath ; 

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