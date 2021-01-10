import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import { AuthTabsComponent } from '../components/auth-tabs/auth-tabs.component';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from '../components/login/login.component';
import { SignupComponent } from '../components/signup/signup.component';
import { AuthService } from '../services/auth.service';



@NgModule({
  declarations: [
    AuthTabsComponent,
    LoginComponent,
    SignupComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AuthRoutingModule
  ],
  exports: [
  ],
  providers: []
})
export class AuthModule { }
