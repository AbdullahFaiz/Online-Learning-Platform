import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
// import { Course } from '../models/course.model';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';
import { Role } from '../../role';
import { Course } from '../../models/course.model';
import { CourseService } from '../../services/course.service';
@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrl: './course.component.scss'
})
export class CourseComponent {
  constructor(private fb: FormBuilder,
    private courseService: CourseService,
    private router: Router,) {}

    courses: Course[] = [];
    selectedCourse: User | null = null;
    courseFormAdd: FormGroup;
    courseFormEdit: FormGroup;
    view : String = "default";

    ngOnInit() {
      this.getCourses();
      this.initForm();
    }

    initForm(){
      this.courseFormAdd = new FormGroup({
        'id': new FormControl(null),
        'title': new FormControl(null, [Validators.required]),
        'description': new FormControl(null, Validators.required)
      });
      this.courseFormEdit = new FormGroup({
        'id': new FormControl(null),
        'title': new FormControl(null, [Validators.required]),
        'description': new FormControl(null, Validators.required)
      });
    }

    getCourses() {
      this.courseService.getAllCourse().subscribe(courses => {
        this.courses = courses;

      });
    }

    createCourse() {
      if(this.courseFormAdd.valid){
        const course: Course = {
          id: this.courseFormAdd.value.id || null,
          title: this.courseFormAdd.value.title,
          description: this.courseFormAdd.value.description
        };
        this.courseService.create(course).subscribe((response) => {
          setTimeout(() => { }, 1500);


            Swal.fire({
              title: "Success",
              text: "Course Created Successfully!",
              icon: "success"
            });

            this.changeView('default', null);

        },
        error => {
          Swal.fire({
            title: "Failed",
            text: error,
            icon: "error"
          });
        });
      }else{
        Swal.fire({
          title: "Invalid",
          text: "Form Data Invalid",
          icon: "warning"
        });
      }

    }

    updateCourse() {
      if(this.courseFormEdit.valid){

        const course: Course = {
          id: this.courseFormEdit.value.id || null,
          title: this.courseFormEdit.value.title,
          description: this.courseFormEdit.value.description
        };

        this.courseService.update(course).subscribe((response) => {
          setTimeout(() => { }, 1500);

            Swal.fire({
              title: "Success",
              text: "Course Updated Successfully!",
              icon: "success"
            });
            this.changeView("default",null)
        },
         error => {
          Swal.fire({
            title: "Failed",
            text: error,
            icon: "error"
          });
        });
      }else{

        Swal.fire({
          title: "Invalid",
          text: "Form Data Invalid",
          icon: "warning"
        });

      }
    }

    deleteCourse(id: number) {
      this.courseService.delete(id).subscribe((response) => {
        Swal.fire({
          title: "Success",
          text: "Course Updated Successfully!",
          icon: "success"
        });
        this.changeView("default",null)

        },
        error => {
         Swal.fire({
           title: "Failed",
           text: error,
           icon: "error"
         });
       });
    }

    changeView(view,data){
      this.view = view
      if(view == "add"){
        this.courseFormAdd.reset();
      }else if (view == "edit"){
        this.courseFormEdit.reset();
        this.courseFormEdit.patchValue({

          'id'  : data.id,
          'title'  : data.title,
          'description'  : data.description,

        });
      }else if(this.view === 'delete'){


        Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!"
        }).then((result) => {

            this.courseFormEdit.reset();
            // this.authorEditForm.reset();
            this.view = "default";
            console.log("then");
            if (result) {
                console.log("confirm");

                this.deleteCourse(data["id"]);
            }
        });

      }else{
        this.view = "default";
        this.getCourses();
      }
    }

}
