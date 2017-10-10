import { CourseComponent } from './course.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgUploaderModule } from 'ngx-uploader';
import {MatFormFieldModule,MatInputModule,MatButtonModule,MatGridListModule} from '@angular/material';

export const routes = [
    { path: '', component: CourseComponent, pathMatch: 'full' },
];


@NgModule({
  imports: [
    CommonModule, 
    FormsModule,
    RouterModule.forChild(routes),
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatGridListModule,
    NgUploaderModule
  ],
  declarations: [
   CourseComponent

  ],
  

})
export  class CourseModule {
}