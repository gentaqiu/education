import { NgModule,ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ROUTES } from './layout.routes';

import { LayoutComponent } from './layout.component';
import { RouterModule } from '@angular/router';
import { CKEditorModule } from 'ng2-ckeditor';
import {MatMenuModule,MatButtonModule} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    FormsModule,
    MatMenuModule,
    MatButtonModule,
    CKEditorModule    
  ],
  declarations: [
    LayoutComponent
  ],
  

})
export  class LayoutModule {
}