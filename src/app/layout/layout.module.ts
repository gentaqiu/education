import { NgModule,ModuleWithProviders } from '@angular/core';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {MdButtonModule, MdCheckboxModule,MdMenuModule,MdIconModule,MdToolbarModule,MdDialogModule,MdInputModule,MdCardModule,MdGridListModule,MdProgressBarModule,MdTabsModule} from '@angular/material';
import { ROUTES } from './layout.routes';

import { LayoutComponent } from './layout.component';
import { RouterModule } from '@angular/router';
import { CKEditorModule } from 'ng2-ckeditor';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    FormsModule,
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
    MdTabsModule,
    CKEditorModule    
  ],
  declarations: [
    LayoutComponent,
    ToolbarComponent
  ],
  

})
export  class LayoutModule {
}