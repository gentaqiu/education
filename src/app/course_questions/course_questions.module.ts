import { CourseQuestionsComponent } from './course_questions.component';
import {CorrectAnswerComponent} from '../../components/correct-answer';
import {WrongAnswerComponent} from '../../components/wrong-answer';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatButtonModule} from '@angular/material/button';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { QuestionService } from '../../service/question.service';
import { SpeechRecognitionService } from '../../service/speech-recognition.service';

export const routes = [
    { path: '', component: CourseQuestionsComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatProgressBarModule,
    MatCardModule,
    MatGridListModule,
    MatButtonModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
   CourseQuestionsComponent,
   CorrectAnswerComponent,
   WrongAnswerComponent

  ],
  entryComponents: [CorrectAnswerComponent,WrongAnswerComponent],
  providers: [QuestionService,SpeechRecognitionService],
})
export  class CourseQuestionsModule {
}