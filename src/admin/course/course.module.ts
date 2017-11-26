import { CourseComponent } from './course.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgUploaderModule } from 'ngx-uploader';
import {MatFormFieldModule,MatInputModule,MatButtonModule,MatGridListModule,MatCardModule} from '@angular/material';
import {MatDialogModule} from '@angular/material/dialog';
import { CourseInsertDialog } from '../../dialog/course-insert.dialog';
import {MatIconModule} from '@angular/material/icon';

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
    MatCardModule,
    MatDialogModule,
    MatIconModule,
    NgUploaderModule
  ],
  entryComponents: [CourseInsertDialog],
  declarations: [
   CourseComponent,
   CourseInsertDialog
  ],
  

})
export  class CourseModule {
}