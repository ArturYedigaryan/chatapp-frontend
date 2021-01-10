import { Subscription } from 'rxjs';
import { UsersService } from './../../services/users.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit, OnDestroy {
  passwordForm: FormGroup;
  changeSub: Subscription;
  constructor(private fb: FormBuilder, private usersService: UsersService) { }

  ngOnInit(): void {
    this.init();
  }

  ngOnDestroy() {
    if (this.changeSub) {
      this.changeSub.unsubscribe();
    }
  }

  init() {
    this.passwordForm = this.fb.group(
      {
        cPassword: ['', Validators.required],
        newPassword: ['', Validators.required],
        confirmPassword: ['', Validators.required],
      },
      {
        validator: this.validate.bind(this)
      }
    );
  }

  changePassword() {
    if (this.passwordForm.valid) {
      this.changeSub = this.usersService.changePassword(this.passwordForm.value).subscribe(
        data => {
          this.passwordForm.reset();
        },
        err => console.log(err)
      );
    }

  }

  validate(passwordFormGroup: FormGroup) {
    const new_password = passwordFormGroup.controls.newPassword.value;
    const confirm_password = passwordFormGroup.controls.confirmPassword.value;

    if (confirm_password.length <= 0) {
      return null;
    }

    if (confirm_password !== new_password) {
      return {
        doesNotMatch: true
      };
    }

    return null;
  }

}
