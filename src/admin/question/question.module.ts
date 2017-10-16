import { QuestionComponent } from './question.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgUploaderModule } from 'ngx-uploader';
import {MatFormFieldModule,MatInputModule,MatButtonModule,MatGridListModule,MatCardModule} from '@angular/material';

export const routes = [
    { path: '', component: QuestionComponent, pathMatch: 'full' },
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
    NgUploaderModule
  ],
  declarations: [
   QuestionComponent

  ],
  

})
export  class QuestionModule {
}