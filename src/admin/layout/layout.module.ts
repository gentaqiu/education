import { NgModule,ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ROUTES } from './layout.routes';

import { LayoutComponent } from './layout.component';
import { RouterModule } from '@angular/router';
import { CKEditorModule } from 'ng2-ckeditor';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    FormsModule,
    CKEditorModule    
  ],
  declarations: [
    LayoutComponent
  ],
  

})
export  class LayoutModule {
}