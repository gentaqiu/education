import { QuestionComponent } from './question.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgUploaderModule } from 'ngx-uploader';
import {MatFormFieldModule,MatInputModule,MatButtonModule,MatGridListModule,MatCardModule,MatDialogModule} from '@angular/material';
import { QuestionInsertDialog } from '../../dialog/question-insert.dialog';

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
    MatDialogModule,
    NgUploaderModule
  ],
  entryComponents: [QuestionInsertDialog],
  declarations: [
   QuestionComponent,
   QuestionInsertDialog
  ],
  

})
export  class QuestionModule {
}