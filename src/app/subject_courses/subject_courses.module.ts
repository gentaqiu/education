import { SubjectCoursesComponent } from './subject_courses.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {MatFormFieldModule,MatGridListModule,MatCardModule,MatButtonModule} from '@angular/material';

export const routes = [
    { path: '', component: SubjectCoursesComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatGridListModule,
    MatCardModule,
    MatButtonModule,
    RouterModule.forChild(routes), 
  ],
  declarations: [
   SubjectCoursesComponent

  ],
  

})
export  class SubjectCoursesModule {
}