import { QuestionComponent } from './question.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgUploaderModule } from 'ngx-uploader';
import {MatInputModule,MatButtonModule,MatGridListModule,MatCardModule,MatDialogModule} from '@angular/material';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { QuestionInsertDialog } from '../../dialog/question-insert.dialog';
import { QuestionService } from '../../service/question.service';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';

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
    MatSelectModule,
    MatListModule,
    MatIconModule,
    NgUploaderModule
  ],
  entryComponents: [QuestionInsertDialog],
  declarations: [
   QuestionComponent,
   QuestionInsertDialog
  ],
  providers: [QuestionService],

})
export  class QuestionModule {
}