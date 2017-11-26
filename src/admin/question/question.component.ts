import { Component, EventEmitter, OnInit } from '@angular/core';
import { UploadOutput, UploadInput, UploadFile, humanizeBytes, UploaderOptions } from 'ngx-uploader';
import { CourseService } from '../../service/course.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { QuestionInsertDialog } from '../../dialog/question-insert.dialog';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatFormFieldModule, MatIconModule,MatButtonModule} from '@angular/material';
import { QuestionService } from '../../service/question.service';

@Component({
  selector: 'admin-course',
  templateUrl: 'question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent {
  course_id: string;
  question_id: string;
  private sub: any;

  questions: any[];

  constructor(private route: ActivatedRoute,private router: Router,public dialog: MatDialog,private questionService: QuestionService) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
       this.course_id = params['course_id'];
       this.questionService.getQuestions(this.course_id).subscribe(    
            suc => {
                this.questions = suc.questions;
            },
            err => {
                console.log(err);
            }
       );  
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }  
  editQuestion(question_id:string,title:string,answerA:string,answerB:string,answerC:string,answerD:string,correctAnswer:string) {
    console.log('edit question for ' + this.course_id);
    this.question_id = question_id;
    let questionDialogRef = this.dialog.open(QuestionInsertDialog,{
      height: '500px',
      width: '600px',
      data: {    
        title: title,  
        answerA: answerA,
        answerB: answerB,
        answerC: answerC,
        answerD: answerD,
        correctAnswer: correctAnswer
      }       
    });
    questionDialogRef.afterClosed().subscribe(result => {
      console.log("Dialog result: "); // 
      console.log(result);


      this.questionService.createQuestion(this.question_id,this.course_id,result.title,result.answerA,result.answerB,result.answerC,result.answerD,result.correctAnswer).subscribe(    
        suc => {
            console.log(suc);
            console.log('after successfully edit question');
            for(var i = this.questions.length - 1; i >= 0; i--) {
                if(this.questions[i]._id == this.question_id) {
                  console.log('find it');
                  this.questions[i] = suc.question;
                  break;
                }
            }            
            this.question_id = '';            
        },
        err => {
            console.log(err);
        }
      );       
    }); 
  }
  deleteQuestion(id:string) {
    this.questionService.deleteQuestion(id).subscribe(    
        suc => {
            console.log(suc);
            for(var i = this.questions.length - 1; i >= 0; i--) {
                if(this.questions[i]._id === id) {
                   this.questions.splice(i, 1);
                }
            }            
        },
        err => {
            console.log(err);
        }
      );   
  }
  createQuestion() {
    console.log('create question for ' + this.course_id);
    let questionDialogRef = this.dialog.open(QuestionInsertDialog,{
      height: '500px',
      width: '600px',
      data: {      
        answerA: '',
        answerB: '',
        answerC: '',
        answerD: '',
        correctAnswer: ''
      }       
    });
    questionDialogRef.afterClosed().subscribe(result => {
      console.log("Dialog result: "); // 
      console.log(result);

      this.questionService.createQuestion('',this.course_id,result.title,result.answerA,result.answerB,result.answerC,result.answerD,result.correctAnswer).subscribe(    
        suc => {
            console.log(suc);
            this.questions.push(suc.question);
        },
        err => {
            console.log(err);
        }
      );       
    });    
  }
}