import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Provider } from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { TokenInterceptor } from './services/token-interceptor';

const TOKEN_INTERCEPTOR_PROVIDE: Provider =   {
  provide: HTTP_INTERCEPTORS,
  useClass: TokenInterceptor,
  multi: true
};


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [
    CookieService,
    TOKEN_INTERCEPTOR_PROVIDE
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
