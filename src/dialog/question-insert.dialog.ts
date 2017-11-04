import {Component, Inject, ViewChild, TemplateRef, OnInit} from '@angular/core';
import {DOCUMENT} from '@angular/platform-browser';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';


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

}