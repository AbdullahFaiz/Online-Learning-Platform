import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
// import { Student } from '../models/student.model';
import Swal from 'sweetalert2';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrl: './student.component.scss'
})
export class StudentComponent {
  constructor(
    private studentService: UserService,
    private router: Router,) {}


  // studentList:Student[] = [];
  page = 0;
  size = 10;
  totalPages = 0;
  // tempstudentList:Student[] = [];
  studentDelete : any;

  studentAddForm : FormGroup;
  studentEditForm : FormGroup;
  view : String = "default";
  ngOnInit() {
    this.initForm();
    // this.getAllAuthor();
    // this.getAllStudent();
  }

   //Initialize the Add Form
   private initForm(){
    this.studentAddForm = new FormGroup({
      'name'  : new FormControl(null, Validators.required),
      'isbn'  : new FormControl(null, Validators.required),
      'author'  : new FormControl(null, Validators.required)
    });

    this.studentEditForm = new FormGroup({
      'studentId'  : new FormControl(null, Validators.required),
      'name'  : new FormControl(null, Validators.required),
      'isbn'  : new FormControl(null, Validators.required),
      'author'  : new FormControl(null, Validators.required)
    });
  }

  // //get all Author
  // getAllAuthor(){
  //   this.authorService.getAllAuthor().subscribe((data: Author[]) => {
  //     this.authorList  = [];
  //     this.tempauthorList  = [];

  //     setTimeout(() => {}, 1500);
  //     this.authorList  = data;
  //     this.tempauthorList  = data;

  //     console.log("this.authorList");
  //     console.log(this.authorList);
  //     console.log("this.authorList");

  //   })
  // }
  // //get all Student
  // getAllStudent(){
  //   this.studentService.getAllStudent(this.page, this.size).subscribe((data: any) => {
  //     this.studentList = data.content;
  //     this.totalPages = data.totalPages;
  //   });
  // }

  // nextPage(): void {
  //   if (this.page < this.totalPages - 1) {
  //     this.page++;
  //     this.getAllStudent();
  //   }
  // }

  // previousPage(): void {
  //   if (this.page > 0) {
  //     this.page--;
  //     this.getAllStudent();
  //   }
  // }

  // create(){
  //   let formData = new FormData();
  //   let data : object;
  //   data = {
  //     'name'             :  this.studentAddForm.value.name,
  //     'isbn'      :  this.studentAddForm.value.isbn,
  //     'author'      :  {'authorId':this.studentAddForm.value.author}
  //   }
  //   console.log(data);
  //   if(this.studentAddForm.valid){
  //     data = {
  //       'name'             :  this.studentAddForm.value.name,
  //       'isbn'      :  this.studentAddForm.value.isbn,
  //       'author'      :  {'authorId':this.studentAddForm.value.author}
  //     }

  //     this.studentService.create(data).subscribe((response) => {
  //       setTimeout(() => { }, 1500);


  //         Swal.fire({
  //           title: "Success",
  //           text: "Student Created Successfully!",
  //           icon: "success"
  //         });

  //         this.changeView('default', null);

  //     },
  //     error => {
  //       Swal.fire({
  //         title: "Failed",
  //         text: "Student Creation Unsuccessful!",
  //         icon: "error"
  //       });
  //     });
  //   }else{
  //     Swal.fire({
  //       title: "Invalid",
  //       text: "Form Data Invalid",
  //       icon: "warning"
  //     });
  //   }
  // }

  // //update student
  // update(){

  //   let formData = new FormData();
  //   let data : object;

  //   if(this.studentEditForm.valid){
  //     data = {
  //       'studentId'  :  this.studentEditForm.value.studentId,
  //       'name'             :  this.studentEditForm.value.name,
  //       'isbn'      :  this.studentEditForm.value.isbn,
  //       'author'      :  {'authorId':this.studentEditForm.value.author}
  //     }



  //     this.studentService.update(data).subscribe((response) => {
  //       setTimeout(() => { }, 1500);

  //         Swal.fire({
  //           title: "Success",
  //           text: "Student Updated Successfully!",
  //           icon: "success"
  //         });
  //         this.changeView("default",null)
  //     },
  //      error => {
  //       Swal.fire({
  //         title: "Failed",
  //         text: "Student Update Unsuccessful!",
  //         icon: "error"
  //       });
  //     });
  //   }else{

  //     Swal.fire({
  //       title: "Invalid",
  //       text: "Form Data Invalid",
  //       icon: "warning"
  //     });

  //   }
  // }
  // deletestudent(){

  //   console.log("delete");
  //   this.studentService.delete(this.studentDelete["studentId"]).subscribe((response) => {
  //   console.log("response");
  //   console.log(response);
  //   Swal.fire({
  //     title: "Success",
  //     text: "Student Updated Successfully!",
  //     icon: "success"
  //   });
  //   this.changeView("default",null)

  //   },
  //   error => {
  //    Swal.fire({
  //      title: "Failed",
  //      text: "Student Update Unsuccessful!",
  //      icon: "error"
  //    });
  //  });

  // }
  // changeView(view,data){
  //   this.view = view
  //   if(view == "add"){
  //     this.studentAddForm.reset();
  //   }else if (view == "edit"){
  //     this.studentEditForm.reset();
  //     this.studentEditForm.patchValue({

  //       'studentId'  : data.studentId,
  //       'name'  : data.name,
  //       'isbn'  : data.isbn,
  //       'author' : data.author.authorId

  //     });
  //   }else if(this.view === 'delete'){

  //     this.studentDelete = data;

  //     Swal.fire({
  //       title: "Are you sure?",
  //       text: "You won't be able to revert this!",
  //       icon: "warning",
  //       showCancelButton: true,
  //       confirmButtonColor: "#3085d6",
  //       cancelButtonColor: "#d33",
  //       confirmButtonText: "Yes, delete it!"
  //     }).then((result) => {

  //         this.studentAddForm.reset();
  //         this.studentEditForm.reset();
  //         this.view = "default";
  //         console.log("then");
  //         if (result) {
  //             console.log("confirm");

  //             this.deletestudent();
  //         }
  //     });

  //   }else{
  //     this.view = "default";
  //     this.getAllStudent();
  //   }
  // }


}
