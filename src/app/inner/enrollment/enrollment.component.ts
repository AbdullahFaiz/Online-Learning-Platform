import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
// import { Enrollment } from '../models/enrollment.model';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';
import { Role } from '../../role';
import { Enrollment } from '../../models/enrollment.model';
import { EnrollmentService } from '../../services/enrollement.service';
import { AuthService } from '../../services/auth.service';
import { Student } from '../../models/student.model';
import { CourseService } from '../../services/course.service';
import { Course } from '../../models/course.model';
@Component({
  selector: 'app-enrollment',
  templateUrl: './enrollment.component.html',
  styleUrl: './enrollment.component.scss'
})
export class EnrollmentComponent {
  constructor(private fb: FormBuilder,
    private enrollmentService: EnrollmentService,
    private authService: AuthService,
    private courseService: CourseService,
    private router: Router,) {

      this.authService.getStudent().subscribe(
        (res) => {
          // Successful login
          this.student = res;
          console.log(this.student);
        },
        (error) => {
          this.authService.logout();
        }
      );
    }

    enrollments: Enrollment[] = [];
    courses: Course[] = [];
    availableCourses: Course[] = [];

    selectedEnrollment: User | null = null;
    enrollmentFormAdd: FormGroup;
    enrollmentFormEdit: FormGroup;
    view : String = "default";
    student:Student;

    ngOnInit() {
      // this.getEnrollments();
      this.loadData();
      // this.availableCourses = this.filterEnrolledCourses(this.courses,this.enrollments);
    }


    async loadData() {
      try {
        console.log("this.courses");

        const courses = await this.getCourses();
        console.log("this.courses");
        console.log("this.en");

        const enrollments = await this.getEnrollments();
        console.log("this.enrol");

        this.courses = courses || [];
        this.enrollments = enrollments || [];
        console.log(this.courses);
        console.log(this.enrollments);
        this.availableCourses = this.filterEnrolledCourses(this.courses, this.enrollments);
      } catch (error) {
        console.error('Error loading data', error);
      }
    }

    filterEnrolledCourses(courses: Course[], enrollments: Enrollment[]): Course[] {
      const enrolledCourseIds = enrollments.map(enrollment => enrollment.course.id);
      console.log("enrolledCourseIds");
      console.log(enrolledCourseIds);
      return courses.filter(course => !enrolledCourseIds.includes(course.id));
    }



    getCourses(): Promise<any[]> {
      return this.courseService.getAllCourse().toPromise().then(courses => courses || []);
    }

    getEnrollments(): Promise<any[]> {
      return this.enrollmentService.getAllEnrollmentByStudent(this.student.id).toPromise().then(enrollments => enrollments || []);
    }



    updateEnrollment(courseId) {

        const enrollment: Enrollment = {
          student: this.student,
          course: {"id":courseId}
        };

        this.enrollmentService.create(enrollment).subscribe((response) => {
          setTimeout(() => { }, 1500);
          this.loadData();

            Swal.fire({
              title: "Success",
              text: "Enrollment Updated Successfully!",
              icon: "success"
            });
        },
         error => {
          Swal.fire({
            title: "Failed",
            text: error,
            icon: "error"
          });
        });
    }



    deleteEnrollment(id: any) {
      this.enrollmentService.delete(id).subscribe((response) => {
        this.loadData();

        Swal.fire({
          title: "Success",
          text: "Enrollment Removed Successfully!",
          icon: "success"
        });

        },
        error => {
         Swal.fire({
           title: "Failed",
           text: error,
           icon: "error"
         });
       });
    }


}
