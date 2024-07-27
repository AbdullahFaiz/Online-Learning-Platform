import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { TokenStorageService } from '../services/token-storage.service';
import { Router } from '@angular/router';
import { Role } from '../role';
import Swal from 'sweetalert2';
import { StudentService } from '../services/student.service';
import { Student } from '../models/student.model';
import { User } from '../models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;
  studentFormAdd: FormGroup;
  errorMessage = '';
  constructor(private fb: FormBuilder, private authService: AuthService,

    private studentService: StudentService,private tokenStorageService: TokenStorageService,private router : Router) {
  }
  ngOnInit() {
    this.initForm();

  }
  loginView = true
  initForm(){
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(3)]]
    });
    this.studentFormAdd = new FormGroup({
      'id': new FormControl(null),
      'name': new FormControl(null, [Validators.required]),
      'age': new FormControl(null, Validators.required),
      'username': new FormControl(null, Validators.required),
      'password': new FormControl(null,Validators.required),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'role': new FormControl(Role.ROLE_STUDENT)
    });
  }



  login() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      this.authService.login({ username, password })
        .subscribe(
          (res) => {
            // Successful login
            console.log('Login successful', res);
            this.tokenStorageService.saveToken(res.token);
            this.router.navigate(['/app/home']);
            console.log('navi', res);

          },
          (error) => {
            console.error('Login failed', error);
            this.errorMessage = error || 'Login failed';
          }
        );
    }else{
      Swal.fire({
        title: "Invalid",
        text: "Form Data Invalid",
        icon: "warning"
      });
    }
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
          this.loginView = true;

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

  changeView(){
    this.loginView = !this.loginView
  }


}
