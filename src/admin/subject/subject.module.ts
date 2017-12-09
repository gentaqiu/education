import { SubjectComponent } from './subject.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {MatFormFieldModule,MatInputModule,MatButtonModule,MatGridListModule,MatCardModule} from '@angular/material';
import {MatDialogModule} from '@angular/material/dialog';
import { SubjectInsertDialog } from '../../dialog/subject-insert.dialog';
import {MatIconModule} from '@angular/material/icon';
import { NgUploaderModule } from 'ngx-uploader';

export const routes = [
    { path: '', component: SubjectComponent, pathMatch: 'full' },
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
  entryComponents: [SubjectInsertDialog],
  declarations: [
   SubjectComponent,
   SubjectInsertDialog
  ],
  

})
export  class SubjectModule {
}