import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { TokenService } from './../../services/token.service';
import { AuthService } from './../../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {
  aSub: Subscription;
  signupForm: FormGroup;
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
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  signupUser() {

    if (this.signupForm.valid) {
      this.loading = true;
      this.aSub = this.authService.registerUser(this.signupForm.value).subscribe(
        data => {
        this.tokenService.SetToken(data.token);
        this.signupForm.reset();
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
