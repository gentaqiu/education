import { NgModule,ModuleWithProviders } from '@angular/core';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ROUTES } from './layout.routes';

import { LayoutComponent } from './layout.component';
import { RouterModule } from '@angular/router';
import { CKEditorModule } from 'ng2-ckeditor';
import {MatFormFieldModule,MatIconModule,MatMenuModule,MatDialogModule} from '@angular/material';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    FormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatMenuModule,
    MatDialogModule,
    CKEditorModule    
  ],
  declarations: [
    LayoutComponent,
    ToolbarComponent
  ],
  

})
export  class LayoutModule {
}