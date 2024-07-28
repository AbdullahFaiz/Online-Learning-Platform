import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
// import { Admin } from '../models/admin.model';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';
import { Role } from '../../role';
import { AdminService } from '../../services/admin.service';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {
  constructor(private fb: FormBuilder,
    private adminService: AdminService,
    private router: Router,) {}

    admins: User[] = [];
    selectedAdmin: User | null = null;
    adminFormAdd: FormGroup;
    adminFormEdit: FormGroup;
    view : String = "default";

    ngOnInit() {
      this.getAdmins();
      this.initForm();
    }

    initForm(){
      this.adminFormAdd = new FormGroup({
        'id': new FormControl(null),
        'username': new FormControl(null, Validators.required),
        'password': new FormControl(null,Validators.required),
        'email': new FormControl(null, [Validators.required, Validators.email]),
        'role': new FormControl(Role.ROLE_STUDENT)
      });
      this.adminFormEdit = new FormGroup({
        'id': new FormControl(null),
        'username': new FormControl(null, Validators.required),
        'password': new FormControl(null,Validators.required),
        'email': new FormControl(null, [Validators.required, Validators.email]),
        'role': new FormControl(Role.ROLE_ADMIN)
      });
    }

    getAdmins() {
      this.adminService.getAllAdmin().subscribe(admins => {
        this.admins = admins;

      });
    }

    createAdmin() {
      if(this.adminFormAdd.valid){
        const admin: User = {
          username: this.adminFormAdd.value.username,
          password: this.adminFormAdd.value.password,
          email: this.adminFormAdd.value.email,
          role: Role.ROLE_ADMIN
        };

        this.adminService.create(admin).subscribe((response) => {
          setTimeout(() => { }, 1500);


            Swal.fire({
              title: "Success",
              text: "Admin Created Successfully!",
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

    updateAdmin() {
      if(this.adminFormEdit.valid){
        const admin: User = {
          id: this.adminFormEdit.value.id,
          username: this.adminFormEdit.value.username,
          password: this.adminFormEdit.value.password,
          email: this.adminFormEdit.value.email,
          role: Role.ROLE_ADMIN
        };


        this.adminService.update(admin).subscribe((response) => {
          setTimeout(() => { }, 1500);

            Swal.fire({
              title: "Success",
              text: "Admin Updated Successfully!",
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

    deleteAdmin(id: number) {
      this.adminService.delete(id).subscribe((response) => {
        Swal.fire({
          title: "Success",
          text: "Admin Updated Successfully!",
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
        this.adminFormAdd.reset();
      }else if (view == "edit"){
        this.adminFormEdit.reset();
        this.adminFormEdit.patchValue({

          'id'  : data.id,
          'username'  : data.username,
          'email'  : data.email,
          'password'  : data.password

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

            this.adminFormEdit.reset();
            // this.authorEditForm.reset();
            this.view = "default";
            console.log("then");
            if (result) {
                console.log("confirm");

                this.deleteAdmin(data["id"]);
            }
        });

      }else{
        this.view = "default";
        this.getAdmins();
      }
    }

}
