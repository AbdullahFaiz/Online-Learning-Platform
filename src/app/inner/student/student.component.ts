import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
// import { Student } from '../models/student.model';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';
import { Role } from '../../role';
import { Student } from '../../models/student.model';
import { StudentService } from '../../services/student.service';
@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrl: './student.component.scss'
})
export class StudentComponent {
  constructor(private fb: FormBuilder,
    private studentService: StudentService,
    private router: Router,) {}

    students: Student[] = [];
    selectedStudent: User | null = null;
    studentFormAdd: FormGroup;
    studentFormEdit: FormGroup;
    view : String = "default";

    ngOnInit() {
      this.getStudents();
      this.initForm();
    }

    initForm(){
      this.studentFormAdd = new FormGroup({
        'id': new FormControl(null),
        'name': new FormControl(null, [Validators.required]),
        'age': new FormControl(null, Validators.required),
        'username': new FormControl(null, Validators.required),
        'password': new FormControl(null,Validators.required),
        'email': new FormControl(null, [Validators.required, Validators.email]),
        'role': new FormControl(Role.ROLE_STUDENT)
      });
      this.studentFormEdit = new FormGroup({
        'id': new FormControl(null),
        'name': new FormControl(null, [Validators.required]),
        'age': new FormControl(null, Validators.required),
        'username': new FormControl(null, Validators.required),
        'password': new FormControl(null,Validators.required),
        'email': new FormControl(null, [Validators.required, Validators.email]),
        'role': new FormControl(Role.ROLE_STUDENT)
      });
    }

    getStudents() {
      this.studentService.getAllStudent().subscribe(students => {
        this.students = students;

      });
    }

    createStudent() {
      if(this.studentFormAdd.valid){
        const user: User = {
          username: this.studentFormAdd.value.username,
          password: this.studentFormAdd.value.password,
          email: this.studentFormAdd.value.email,
          role: Role.ROLE_STUDENT
        };
        const student: Student = {
          id: this.studentFormAdd.value.id || null,
          name: this.studentFormAdd.value.name,
          age: this.studentFormAdd.value.age,
          user: user,
        };
        this.studentService.create(student).subscribe((response) => {
          setTimeout(() => { }, 1500);


            Swal.fire({
              title: "Success",
              text: "Student Created Successfully!",
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

    updateStudent() {
      if(this.studentFormEdit.valid){
        const user: User = {
          username: this.studentFormEdit.value.username,
          password: this.studentFormEdit.value.password,
          email: this.studentFormEdit.value.email,
          role: Role.ROLE_STUDENT
        };
        const student: Student = {
          id: this.studentFormEdit.value.id || null,
          name: this.studentFormEdit.value.name,
          age: this.studentFormEdit.value.age,
          user: user,
        };

        this.studentService.update(student).subscribe((response) => {
          setTimeout(() => { }, 1500);

            Swal.fire({
              title: "Success",
              text: "Student Updated Successfully!",
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

    deleteStudent(id: number) {
      this.studentService.delete(id).subscribe((response) => {
        Swal.fire({
          title: "Success",
          text: "Student Updated Successfully!",
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
        this.studentFormAdd.reset();
      }else if (view == "edit"){
        this.studentFormEdit.reset();
        this.studentFormEdit.patchValue({

          'id'  : data.id,
          'name'  : data.name,
          'age'  : data.age,
          'username'  : data.user.username,
          'email'  : data.user.email,
          'password'  : data.user.password

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

            this.studentFormEdit.reset();
            // this.authorEditForm.reset();
            this.view = "default";
            console.log("then");
            if (result) {
                console.log("confirm");

                this.deleteStudent(data["id"]);
            }
        });

      }else{
        this.view = "default";
        this.getStudents();
      }
    }

}
