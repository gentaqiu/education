import { CoursesComponent } from './courses.component';
import {CorrectAnswerComponent} from '../components/correct-answer';
import {WrongAnswerComponent} from '../components/wrong-answer';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {MdButtonModule, MdCheckboxModule,MdMenuModule,MdIconModule,MdToolbarModule,MdDialogModule,MdInputModule,MdCardModule,MdGridListModule,MdProgressBarModule,MdSnackBarModule} from '@angular/material';

export const routes = [
    { path: '', component: CoursesComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    MdButtonModule, 
    MdCheckboxModule,   
    MdMenuModule, 
    MdIconModule,
    MdToolbarModule,
    MdDialogModule,
    MdInputModule,
    MdCardModule,
    MdGridListModule,
    MdProgressBarModule,  
    MdSnackBarModule  
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