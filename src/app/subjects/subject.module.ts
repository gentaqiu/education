import { SubjectComponent } from './subject.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {MatFormFieldModule,MatGridListModule,MatCardModule,MatButtonModule} from '@angular/material';

export const routes = [
    { path: '', component: SubjectComponent, pathMatch: 'full' },
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
   SubjectComponent

  ],
  
})
export  class SubjectModule {
}