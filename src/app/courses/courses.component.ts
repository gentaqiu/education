import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material';
import {CorrectAnswerComponent} from '../../components/correct-answer';
import {WrongAnswerComponent} from '../../components/wrong-answer';
import { VoiceService } from '../../service/voice.service';
import { CourseService } from '../../service/course.service';
import { QuestionService } from '../../service/question.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
      host: {
        '(window:resize)': 'onResize($event)'
      }    
})
export class CoursesComponent implements OnInit {
  course_id: string;
  index:number;
  question_num:number;
  private sub: any;  
  color = 'primary';
  mode = 'determinate';
  value = 50;
  bufferValue = 75;
  col_num:number = 2;
  color_A = "";
  color_B = "";
  color_C = "";
  color_D = "";
  selection = "";
  check_disable = true;
  color_check = "";
  soundID = "Thunder";
  questions = [];
  question: any;
  checkOrContinue = '';

  constructor(private route: ActivatedRoute, public snackBar: MatSnackBar,private questionService: QuestionService,private voiceService: VoiceService,private courseService:CourseService,private router: Router) { }

    setColNum() {
        this.col_num = 2;
        var width = window.innerWidth;
        if(width <= 600) {
            this.col_num = 1;
        }  
    }
    onResize(event){
        this.setColNum();
    }

  ngOnInit() {
    this.index = 0;
    this.checkOrContinue = 'Check';
    this.setColNum();  
    this.sub = this.route.params.subscribe(params => {
       this.course_id = params['course_id'];
      this.questionService.getQuestions(this.course_id).subscribe(    
          suc => {
              //console.log(suc);
              this.questions = suc.questions;
              for (var i = 0; i < this.questions.length; i++) {
                this.questions[i].title = this.questions[i].title.split("|||");
              }
              this.question_num = this.questions.length;
              this.question = this.questions[this.index];
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
  selectAnswer(selection:string) {
    this.selection = selection;
    if(selection == 'A') {
      this.color_A = "primary";
      this.color_B = "";
      this.color_C = "";
      this.color_D = "";      
    }
    else if(selection == 'B') {
      this.color_A = "";
      this.color_B = "primary";
      this.color_C = "";
      this.color_D = "";      
    }
    else if(selection == 'C') {
      this.color_A = "";
      this.color_B = "";
      this.color_C = "primary";
      this.color_D = "";      
    }
    else if(selection == 'D') {
      this.color_A = '';
      this.color_B = "";
      this.color_C = "";
      this.color_D = "primary";      
    }  
    this.check_disable = false;     
    this.color_check = "accent"; 
  }

  checkAnswer() {
    if(this.checkOrContinue == 'Check') {
      if(this.selection == this.question.correctAnswer) {
        this.snackBar.openFromComponent(CorrectAnswerComponent, {
          duration: 2000,
        });   
        this.checkOrContinue = 'Continue';
        this.playVoice('/assets/audio/right_answer.mp3');
      }
      else {
        this.snackBar.openFromComponent(WrongAnswerComponent, {
          duration: 2000,
        });  
        this.playVoice('/assets/audio/wrong_answer.mp3');    
      }    
    }
    else if(this.checkOrContinue == 'Continue') {
      if(this.index < this.question_num - 1) {
        this.index ++;
        this.question = this.questions[this.index];
      }   
      this.checkOrContinue = 'Check';
      this.color_A = "";
      this.color_B = "";
      this.color_C = "";
      this.color_D = "";  
      this.check_disable = true;         
    }
  }


  playVoice(path:string) {
      console.log("play me,"+path);
      var audio = new Audio();
      audio.src = path;
      audio.load();
      audio.play();    

  }
}
