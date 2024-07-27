import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InnerRoutingModule } from './inner-routing.module';
import { InnerComponent } from './inner.component';
import { LoginComponent } from '../login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { StudentComponent } from './student/student.component';
import { CourseComponent } from './course/course.component';
import { AdminComponent } from './admin/admin.component';
import { EnrollmentComponent } from './enrollment/enrollment.component';


@NgModule({
  declarations: [
    InnerComponent,
    StudentComponent,
    CourseComponent,
    EnrollmentComponent,
    AdminComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    InnerRoutingModule
  ]
})
export class InnerModule { }
