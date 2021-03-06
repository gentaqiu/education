import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// Imports commented out for brevity
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UsersService } from '../service/users.service';
import { AuthService } from '../service/auth.service';
import { CourseService } from '../service/course.service';
import { SubjectService } from '../service/subject.service';
import { VoiceService } from '../service/voice.service';
import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import { RegisterDialog } from '../dialog/register.dialog';
import { LoginDialog } from '../dialog/login.dialog';
import { MenuDemo } from './menu/menu-demo';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatFormFieldModule,MatInputModule,MatButtonModule} from '@angular/material';

import 'hammerjs';

// Define the routes
const ROUTES = [
  {
    path: '',
    redirectTo: 'index',
    pathMatch: 'full'
  },

  {
    path: 'app', loadChildren: 'app/layout/layout.module#LayoutModule'
  }, 
  {
    path: 'admin', loadChildren: 'admin/layout/layout.module#LayoutModule'
  },   
  {
    path: 'menu',
    component: MenuDemo
  },    
  {
    path: 'index',
    component: IndexComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    RegisterDialog,
    LoginDialog,
    MenuDemo
  ],
  entryComponents: [RegisterDialog,LoginDialog],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterModule.forRoot(ROUTES) // Add routes to the app
  ],
  providers: [UsersService,AuthService,VoiceService,CourseService,SubjectService],
  bootstrap: [AppComponent]
})
export class AppModule { }