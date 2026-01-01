import { NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  ReactiveFormsModule,
  Validator,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, NgIf],
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm: any;
  loading = false;
  error = '';

  constructor(
    private fb: FormBuilder,
    public router: Router,
    public http: HttpClient
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSumbit() {
    if (this.loginForm.invalid) return;

    this.loading = true;
    this.error = '';

    this.http
      .post<{ token: string }>(
        'https://fakestoreapi.com/auth/login',
        this.loginForm.value
      )
      .subscribe({
        next: (res) => {
          console.log(res, 'res');
          localStorage.setItem('token', res.token);
          this.router.navigate(['/products']);
        },
        error: () => {
          this.error = 'Invalid username or password';
          this.loading = false;
        },
      });
  }
}
