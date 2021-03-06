import { Route, RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';
// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '', component: LayoutComponent, children: [
      { path: '', redirectTo: 'index', pathMatch: 'full' },
      { path: 'index', loadChildren:'admin/index/index.module#IndexModule' },
      { path: 'subject', loadChildren:'admin/subject/subject.module#SubjectModule' },
      { path: 'courses/:subject_id', loadChildren:'admin/course/course.module#CourseModule' },
      { path: 'questions/:course_id', loadChildren:'admin/question/question.module#QuestionModule' },
    ]
  }
];

export const ROUTES  = routes;