import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// Imports commented out for brevity
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PostsService } from './posts.service';
import { AppComponent } from './app.component';
import { PostsComponent } from './posts/posts.component';
import { IndexComponent,IFrameDialog } from './index/index.component';
import { MenuDemo } from './menu/menu-demo';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MdButtonModule, MdCheckboxModule,MdMenuModule,MdIconModule,MdToolbarModule,MdDialogModule,MdInputModule} from '@angular/material';

import 'hammerjs';

// Define the routes
const ROUTES = [
  {
    path: '',
    redirectTo: 'index',
    pathMatch: 'full'
  },
  {
    path: 'menu',
    component: MenuDemo
  },   
  {
    path: 'index',
    component: IndexComponent
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
    IndexComponent,
    IFrameDialog,
    MenuDemo
  ],
  entryComponents: [IFrameDialog],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    MdButtonModule, 
    MdCheckboxModule,   
    MdMenuModule, 
    MdIconModule,
    MdToolbarModule,
    MdDialogModule,
    MdInputModule,
    RouterModule.forRoot(ROUTES) // Add routes to the app
  ],
  providers: [PostsService],
  bootstrap: [AppComponent]
})
export class AppModule { }