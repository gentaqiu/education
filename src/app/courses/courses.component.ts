import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material';
import {CorrectAnswerComponent} from '../../components/correct-answer';
import {WrongAnswerComponent} from '../../components/wrong-answer';
import { VoiceService } from '../../service/voice.service';
import { CourseService } from '../../service/course.service';
import { QuestionService } from '../../service/question.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { SpeechRecognitionService } from '../../service/speech-recognition.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
      host: {
        '(window:resize)': 'onResize($event)'
      }    
})
export class CoursesComponent implements OnInit {
  finished = false;
  speechData: string;
  course_id: string;
  index:number;
  question_num:number;
  private sub: any;  
  color = 'primary';
  mode = 'determinate';
  value = 0;
  bufferValue = 0;
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

  constructor(private route: ActivatedRoute, public snackBar: MatSnackBar,private questionService: QuestionService,private voiceService: VoiceService,private courseService:CourseService,private router: Router,private speechRecognitionService: SpeechRecognitionService) { }

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
    this.finished = false;
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
                this.questions[i].answerA = this.questions[i].answerA.split("|||");
                this.questions[i].answerB = this.questions[i].answerB.split("|||");
                this.questions[i].answerC = this.questions[i].answerC.split("|||");
                this.questions[i].answerD = this.questions[i].answerD.split("|||");
                this.questions[i].answerAText = this.questions[i].answerA[0];
                this.questions[i].answerBText = this.questions[i].answerB[0];
                this.questions[i].answerCText = this.questions[i].answerC[0];
                this.questions[i].answerDText = this.questions[i].answerD[0];
                if(this.questions[i].answerA.length>1) {
                  this.questions[i].answerASound = this.questions[i].answerA[1];
                }
                if(this.questions[i].answerB.length>1) {
                  this.questions[i].answerBSound = this.questions[i].answerB[1];
                }  
                if(this.questions[i].answerC.length>1) {
                  this.questions[i].answerCSound = this.questions[i].answerC[1];
                }  
                if(this.questions[i].answerD.length>1) {
                  this.questions[i].answerDSound = this.questions[i].answerD[1];
                }                                            
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
      if(this.question.answerASound) {
        this.playVoice(this.question.answerASound);
      }
    }
    else if(selection == 'B') {
      this.color_A = "";
      this.color_B = "primary";
      this.color_C = "";
      this.color_D = "";     
      if(this.question.answerBSound) {
        this.playVoice(this.question.answerBSound);
      }       
    }
    else if(selection == 'C') {
      this.color_A = "";
      this.color_B = "";
      this.color_C = "primary";
      this.color_D = "";   
      if(this.question.answerCSound) {
        this.playVoice(this.question.answerCSound);
      }         
    }
    else if(selection == 'D') {
      this.color_A = '';
      this.color_B = "";
      this.color_C = "";
      this.color_D = "primary";  
      if(this.question.answerDSound) {
        this.playVoice(this.question.answerDSound);
      }          
    }  
    this.check_disable = false;     
    this.color_check = "accent"; 
  }

  recordVoice() {
    console.log('recordVoice');

        this.speechRecognitionService.record()
            .subscribe(
            //listener
            (value) => {
                console.log(value);
                this.speechData = value;
                this.check_disable = false;   
                
            },
            //errror
            (err) => {
                console.log(err);
                if (err.error == "no-speech") {
                    console.log("--restatring service--");
                    //this.activateSpeechSearchMovie();
                }
            },
            //completion
            () => {
                //this.showSearchButton = true;
                console.log("--complete--");
                //this.activateSpeechSearchMovie();
            });

  }

  checkAnswer() {
    if(this.checkOrContinue == 'Check') {
      var goodAnswer = false;
      if(this.question.type == 1) {
        if(this.selection == this.question.correctAnswer) {
          goodAnswer = true;
        }
      }
      else if(this.question.type == 3){
        var re = /(，|,|\s)+/gi; 
        var question_speechData = this.speechData.replace(re,'');
        var question_title = this.question.title[0].replace(re,''); 
        
        console.log('question_speechData='+question_speechData);
        console.log('question_title='+question_title);
        if(question_title == question_speechData) {
          goodAnswer = true;
          //this.speechRecognitionService.DestroySpeechObject();
        }
      }
      if(goodAnswer) {
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
      if(this.index <= this.question_num - 1) {
        this.index ++;
        this.value = this.index/this.question_num*100;
        if(this.index <= this.question_num - 1) {
          this.question = this.questions[this.index];
        }
        else {
          this.finished = true;
        }
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
