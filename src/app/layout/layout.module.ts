import { NgModule,ModuleWithProviders } from '@angular/core';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ROUTES } from './layout.routes';

import { LayoutComponent } from './layout.component';
import { RouterModule } from '@angular/router';
import {MatFormFieldModule,MatIconModule,MatMenuModule,MatDialogModule,MatInputModule,MatButtonModule} from '@angular/material';
import {MatToolbarModule} from '@angular/material/toolbar';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    FormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatMenuModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule   
  ],
  declarations: [
    LayoutComponent,
    ToolbarComponent
  ],
  

})
export  class LayoutModule {
}