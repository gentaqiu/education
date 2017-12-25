import { Route, RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';
// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '', component: LayoutComponent, children: [
      { path: '', redirectTo: 'subjects', pathMatch: 'full' },
      { path: 'subjects', loadChildren:'app/subjects/subject.module#SubjectModule' },
      { path: 'subject_courses/:subject_id', loadChildren:'app/subject_courses/subject_courses.module#SubjectCoursesModule' },
      { path: 'course_questions/:course_id', loadChildren:'app/course_questions/course_questions.module#CourseQuestionsModule' }
    ]
  }
];

export const ROUTES  = routes;