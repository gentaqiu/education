import {Component, Inject,  TemplateRef, OnInit,EventEmitter} from '@angular/core';
import {DOCUMENT} from '@angular/platform-browser';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA,MatFormFieldModule} from '@angular/material';
import { UploadOutput, UploadInput, UploadFile, humanizeBytes, UploaderOptions } from 'ngx-uploader';


@Component({
  selector: 'subject-insert-dialog',
  styleUrls: ['subject-insert.dialog.css'],
  templateUrl: 'subject-insert.dialog.html'
})
export class SubjectInsertDialog {
  uploadInput: EventEmitter<UploadInput>;
  subjectName: string;
  subjectImage: string;
  sequence: string;
  constructor(
    public dialogRef: MatDialogRef<SubjectInsertDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { 
    if(data.subjectName) {
    	this.subjectName = data.subjectName;
    }
    if(data.sequence) {
    	this.sequence = data.sequence;
    }
    if(data.subjectImage) {
    	this.subjectImage = data.subjectImage;
    }
    else {
    	this.subjectImage = "/assets/uploads/default.jpg";
    }
    
    this.uploadInput = new EventEmitter<UploadInput>();
  }
  onCancelClick(): void {
    console.log('cancel me');
    this.dialogRef.close();
  } 

  onConfirmClick(): void {
    var subject = {sequence:this.sequence,subjectName:this.subjectName,subjectImage:this.subjectImage};
    this.dialogRef.close(subject);
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
      this.subjectImage = response.filepath;
    }  
  }
}