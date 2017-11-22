import { CoursesComponent } from './courses.component';
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
import { QuestionService } from '../../service/question.service';

export const routes = [
    { path: '', component: CoursesComponent, pathMatch: 'full' },
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
    RouterModule.forChild(routes),
  ],
  declarations: [
   CoursesComponent,
   CorrectAnswerComponent,
   WrongAnswerComponent

  ],
  entryComponents: [CorrectAnswerComponent,WrongAnswerComponent],
  providers: [QuestionService],
})
export  class CoursesModule {
}