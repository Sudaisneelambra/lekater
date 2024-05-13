import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CommonInterceptor } from './common.interceptor';
import { LoadingComponent } from './components/loading/loading.component';
import { ConfirmComponent } from './components/confirm/confirm.component';
import { ErrorComponent } from './components/error/error.component';
import { SuccessComponent } from './components/success/success.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ConfirmComponent,
    LoadingComponent,
    ErrorComponent,
    SuccessComponent,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CommonInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
