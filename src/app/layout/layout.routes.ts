import { Route, RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';
// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '', component: LayoutComponent, children: [
      { path: '', redirectTo: 'index', pathMatch: 'full' },
      { path: 'index', loadChildren:'app/index/index.module#IndexModule' },
      { path: 'courses/:course_id', loadChildren:'app/courses/courses.module#CoursesModule' }
    ]
  }
];

export const ROUTES  = routes;