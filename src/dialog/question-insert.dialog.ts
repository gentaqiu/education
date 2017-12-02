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
  type:string;
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

    this.type = data.type?data.type.toString():'1';
    this.title = data.title; 
    this.answerA = data.answerA;
    this.answerB = data.answerB;
    this.answerC = data.answerC;
    this.answerD = data.answerD;
    this.correctAnswer = data.correctAnswer; 
    
    this.currentInputID = "";
      
  }

  
  onConfirmClick(): void {
    var question = {type:this.type,title:this.title,answerA:this.answerA,answerB:this.answerB,answerC:this.answerC,answerD:this.answerD,correctAnswer:this.correctAnswer};
    this.dialogRef.close(question);

  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  changeText(event): void {
    var id = event.target.id;
    this.currentInputID = id;
  }

  onUploadOutput(output: UploadOutput): void {
    if (output.type === 'allAddedToQueue') { 

       const event: UploadInput = {
         type: 'uploadAll',
         url: '/api/file/upload',
         method: 'POST',
         data: { courseName: this.courseName }
       };
       this.uploadInput.emit(event);
    }
    else if(output.type === 'done' && typeof output.file !== 'undefined') {
      var response = output.file.response;
      var filepath = response.filepath;
      this[this.currentInputID] += '|||' + filepath ; 
    } 
  }  
}