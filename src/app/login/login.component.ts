import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { TokenStorageService } from '../services/token-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage = '';
  constructor(private fb: FormBuilder, private authService: AuthService,private tokenStorageService: TokenStorageService,private router : Router) {
  }
  ngOnInit() {
    this.initForm();

  }

  initForm(){
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(3)]]
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
    }
  }

}
