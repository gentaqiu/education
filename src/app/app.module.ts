import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// Imports commented out for brevity
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PostsService } from './posts.service';
import { UsersService } from '../service/users.service';
import { AuthService } from '../service/auth.service';
import { CourseService } from '../service/course.service';
import { VoiceService } from '../service/voice.service';
import { AppComponent } from './app.component';
import { PostsComponent } from './posts/posts.component';
import { RegisterDialog } from './dialog/register.dialog';
import { LoginDialog } from './dialog/login.dialog';
import { MenuDemo } from './menu/menu-demo';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { CKEditorModule } from 'ng2-ckeditor';
import {MatFormFieldModule} from '@angular/material';

import 'hammerjs';

// Define the routes
const ROUTES = [
  {
    path: '',
    redirectTo: 'app',
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
    path: 'posts',
    component: PostsComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    PostsComponent,
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
    CKEditorModule,
    MatFormFieldModule,
    RouterModule.forRoot(ROUTES) // Add routes to the app
  ],
  providers: [PostsService,UsersService,AuthService,VoiceService,CourseService],
  bootstrap: [AppComponent]
})
export class AppModule { }