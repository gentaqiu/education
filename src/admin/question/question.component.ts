import { Component, EventEmitter, OnInit } from '@angular/core';
import { UploadOutput, UploadInput, UploadFile, humanizeBytes, UploaderOptions } from 'ngx-uploader';
import { CourseService } from '../../service/course.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { QuestionInsertDialog } from '../../dialog/question-insert.dialog';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA,MatFormFieldModule,MatIconModule,MatButtonModule} from '@angular/material';

@Component({
  selector: 'admin-course',
  templateUrl: 'question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent {
  course_name: string;
  private sub: any;

  constructor(private route: ActivatedRoute,private router: Router,public dialog: MatDialog) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
       this.course_name = params['course_name'];
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }  
  createQuestion() {
    console.log('create question for ' + this.course_name);
    let registerDialogRef = this.dialog.open(QuestionInsertDialog);
  }
}