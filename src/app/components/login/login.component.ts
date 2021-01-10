import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { TokenService } from './../../services/token.service';
import { AuthService } from './../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  aSub: Subscription;
  loginForm: FormGroup;
  errorMessage: string;
  loading = false;

  constructor(private authService: AuthService,
              private fb: FormBuilder,
              private router: Router,
              private tokenService: TokenService) { }

  ngOnInit(): void {
    this.init();
  }

  init() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required]]
    });
  }

  loginUser() {
    if (this.loginForm.valid) {
      this.loading = true;
      this.aSub = this.authService.loginUser(this.loginForm.value).subscribe(
        data => {
          this.tokenService.SetToken(data.token);
          this.loginForm.reset();
          this.router.navigate(['streams']);
        },
        err => {
          this.loading = false;
          if (err.error.msg) {
            this.errorMessage = err.error.msg[0].message;
          }

          if (err.error.message) {
            this.errorMessage = err.error.message;
          }
        }
      );
    }
  }

  ngOnDestroy() {
    if (this.aSub) {
      this.aSub.unsubscribe();
    }
  }

}
