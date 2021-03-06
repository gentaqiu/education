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
  selector: 'app-course-questions',
  templateUrl: './course_questions.component.html',
  styleUrls: ['./course_questions.component.css'],
      host: {
        '(window:resize)': 'onResize($event)'
      }    
})
export class CourseQuestionsComponent implements OnInit {
  finished = false;
  inputAnswer: string;
  course_id: string;
  index:number;
  question_num:number;
  private sub: any;  
  color = 'primary';
  mode = 'determinate';
  value = 0;
  bufferValue = 0;
  col_num:number = 2;

  selection = "";
  check_disable = true;
  color_check = "";
  soundID = "Thunder";
  questions = [];
  selectedAnswers = [];
  question: any;
  answerAText = '';
  answerBText = '';
  answerCText = '';
  answerDText = '';
  checkOrContinue = '';
  class_buttonA = 'button_unselected';
  class_buttonB = 'button_unselected';
  class_buttonC = 'button_unselected';
  class_buttonD = 'button_unselected';

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
              this.answerAText = this.question.answerAText;
              this.answerBText = this.question.answerBText;
              this.answerCText = this.question.answerCText;
              this.answerDText = this.question.answerDText;
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

  selectOption(selection:string) {
    this.selectedAnswers.push(selection);
    for (var i = 0; i < this.question.answerA.length; i++) {
      var answerOption = this.question.answerA[i];
      if(answerOption == selection) {
        this.question.answerA.splice(i,1);
        break;
      }
    }
    this.check_disable = false;     
    this.color_check = "accent";     
  }

  deSelectOption(selection:string) {
    this.question.answerA.push(selection);

    for (var i = 0; i < this.selectedAnswers.length; i++) {
      var answerOption = this.selectedAnswers[i];
      if(answerOption == selection) {
        this.selectedAnswers.splice(i,1);
        break;
      }
    }
  }

  selectAnswer(selection:string) {
    this.selection = selection;
    if(selection == 'A') {
      this.class_buttonA = "button_selected";
      this.class_buttonB = "button_unselected";
      this.class_buttonC = "button_unselected";
      this.class_buttonD = "button_unselected";    
      if(this.question.answerASound) {
        this.playVoice(this.question.answerASound);
      }
    }
    else if(selection == 'B') {
      this.class_buttonA = "button_unselected";
      this.class_buttonB = "button_selected";
      this.class_buttonC = "button_unselected";
      this.class_buttonD = "button_unselected";     
      if(this.question.answerBSound) {
        this.playVoice(this.question.answerBSound);
      }       
    }
    else if(selection == 'C') {
      this.class_buttonA = "button_unselected";
      this.class_buttonB = "button_unselected";
      this.class_buttonC = "button_selected";
      this.class_buttonD = "button_unselected";   
      if(this.question.answerCSound) {
        this.playVoice(this.question.answerCSound);
      }         
    }
    else if(selection == 'D') {
      this.class_buttonA = 'button_unselected';
      this.class_buttonB = "button_unselected";
      this.class_buttonC = "button_unselected";
      this.class_buttonD = "button_selected";  
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
                this.inputAnswer = value;
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
  inputWriting() {
    this.check_disable = false; 
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
        var question_inputAnswer = this.inputAnswer.replace(re,'');
        var question_title = this.question.title[0].replace(re,''); 
        
        console.log('question_inputAnswer='+question_inputAnswer);
        console.log('question_title='+question_title);
        if(question_title == question_inputAnswer) {
          goodAnswer = true;
          //this.speechRecognitionService.DestroySpeechObject();
        }
      }

      else if(this.question.type == 4){
        var re = /(，|,|\s)+/gi; 
        var question_inputAnswer = this.inputAnswer.replace(re,'');
        var correctAnswer = this.question.correctAnswer.replace(re,''); 
        
        if(correctAnswer == question_inputAnswer) {
          goodAnswer = true;
        }
      }
      else if(this.question.type == 5){
        var correctAnswer = this.question.correctAnswer.split(' ');
        console.log('correctAnswer=');
        console.log(correctAnswer);
        console.log(this.selectedAnswers);
        if(correctAnswer.toString() == this.selectedAnswers.toString()) {
          goodAnswer = true;
        }
      }
      //
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
        this.checkOrContinue = 'Continue';
        this.playVoice('/assets/audio/wrong_answer.mp3');    
      }    

    }
    else if(this.checkOrContinue == 'Continue') {
      this.gotoNextQuestion();      
    }
  }

  gotoNextQuestion() {
    this.answerAText = '';
    this.answerBText = '';
    this.answerCText = '';
    this.answerDText = '';
    if(!(this.answerAText == '' && this.answerBText == '' && this.answerCText == '' && this.answerDText == '')) {
      return;
    }
    console.log('this.answerAText===' + this.answerAText);
      if(this.index <= this.question_num - 1) {
        this.index ++;
        this.value = this.index/this.question_num*100;
        if(this.index <= this.question_num - 1) {
          this.question = this.questions[this.index];
          this.answerAText = this.question.answerAText;
          this.answerBText = this.question.answerBText;
          this.answerCText = this.question.answerCText;
          this.answerDText = this.question.answerDText;          
        }
        else {
          this.finished = true;
        }
      }  
      console.log('this.answerAText2===' + this.answerAText);
      this.inputAnswer = ''; 
      this.checkOrContinue = 'Check';
      this.class_buttonA = "button_unselected";
      this.class_buttonB = "button_unselected";
      this.class_buttonC = "button_unselected";
      this.class_buttonD = "button_unselected";   
      this.check_disable = true;    
      this.selectedAnswers = [];
  }
  playVoice(path:string) {
      console.log("play me,"+path);
      var audio = new Audio();
      audio.src = path;
      audio.load();
      audio.play();    

  }
}
