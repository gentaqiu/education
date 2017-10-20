import { CoursesComponent } from './courses.component';
import {CorrectAnswerComponent} from '../../components/correct-answer';
import {WrongAnswerComponent} from '../../components/wrong-answer';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

export const routes = [
    { path: '', component: CoursesComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
   CoursesComponent,
   CorrectAnswerComponent,
   WrongAnswerComponent

  ],
  entryComponents: [CorrectAnswerComponent,WrongAnswerComponent]

})
export  class CoursesModule {
}