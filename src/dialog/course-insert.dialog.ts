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
  constructor(
    public dialogRef: MatDialogRef<CourseInsertDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { 

  }
}