import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentComponent } from './student/student.component';
import { AuthGuard } from '../guard/auth.guard';
import { InnerComponent } from './inner.component';
import { HomeComponent } from './home/home.component';
import { CourseComponent } from './course/course.component';
import { AdminComponent } from './admin/admin.component';
import { EnrollmentComponent } from './enrollment/enrollment.component';

const routes: Routes = [
  {
    path: 'app',
    component: InnerComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'course', component: CourseComponent },
      { path: 'admin', component: AdminComponent },
      { path: 'enrollment', component: EnrollmentComponent },
      { path: 'student', component: StudentComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InnerRoutingModule { }
