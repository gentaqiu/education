import { Component, OnInit } from '@angular/core';
import {MdSnackBar} from '@angular/material';
import {CorrectAnswerComponent} from '../components/correct-answer';
import {WrongAnswerComponent} from '../components/wrong-answer';
import { VoiceService } from '../service/voice.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
      host: {
        '(window:resize)': 'onResize($event)'
      }    
})
export class CoursesComponent implements OnInit {
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

  constructor(public snackBar: MdSnackBar,private voiceService: VoiceService) { }

    setColNum() {
        this.col_num = 4;
        var width = window.innerWidth;
        if(width <= 600) {
            this.col_num = 2;
        }  
    }
    onResize(event){
        this.setColNum();
    }

  ngOnInit() {
    this.setColNum();
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
      this.color_A = "";
      this.color_B = "";
      this.color_C = "";
      this.color_D = "primary";      
    }  
    this.check_disable = false;     
    this.color_check = "accent"; 
  }

  checkAnswer() {
    if(this.selection == 'A') {
      this.snackBar.openFromComponent(CorrectAnswerComponent, {
        duration: 50000,
      });     
    }
    else {
      this.snackBar.openFromComponent(WrongAnswerComponent, {
        duration: 1500,
      });      
    }
  }
  playVoice(text:string) {
    console.log("play me");
    

    this.voiceService.getVoiceFilePath(text).subscribe(    
        suc => {
          console.log(suc);
          var path = suc.path;
          console.log("path="+path);
          var audio = new Audio();
          audio.src = path;
          audio.load();
          audio.play();
        },
        err => {
            console.log(err);
        }
    );
  }
}
