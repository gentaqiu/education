import { Component, EventEmitter, OnInit } from '@angular/core';
import { UploadOutput, UploadInput, UploadFile, humanizeBytes, UploaderOptions } from 'ngx-uploader';
import { CourseService } from '../../service/course.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { QuestionInsertDialog } from '../../dialog/question-insert.dialog';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA,MatFormFieldModule,MatIconModule,MatButtonModule} from '@angular/material';
import { QuestionService } from '../../service/question.service';

@Component({
  selector: 'admin-course',
  templateUrl: 'question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent {
  course_id: string;
  private sub: any;

  constructor(private route: ActivatedRoute,private router: Router,public dialog: MatDialog,private questionService: QuestionService) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
       this.course_id = params['course_id'];
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }  
  createQuestion() {
    console.log('create question for ' + this.course_id);
    let questionDialogRef = this.dialog.open(QuestionInsertDialog,{
      height: '500px',
      width: '600px',
    });
    questionDialogRef.afterClosed().subscribe(result => {
      console.log("Dialog result: "); // 
      console.log(result);

      this.questionService.createQuestion(this.course_id,result.title,result.answerA,result.answerB,result.answerC,result.answerD,result.correctAnswer).subscribe(    
        suc => {
            console.log(suc);
        },
        err => {
            console.log(err);
        }
      );       
    });    
  }
}