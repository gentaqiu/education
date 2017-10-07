import { CourseComponent } from './course.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {MdButtonModule, MdCheckboxModule,MdMenuModule,MdIconModule,MdToolbarModule,MdDialogModule,MdInputModule,MdCardModule,MdGridListModule,MdProgressBarModule,MdSnackBarModule} from '@angular/material';
import { NgUploaderModule } from 'ngx-uploader';

export const routes = [
    { path: '', component: CourseComponent, pathMatch: 'full' },
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
    MdSnackBarModule,
    NgUploaderModule
  ],
  declarations: [
   CourseComponent

  ],
  

})
export  class CourseModule {
}