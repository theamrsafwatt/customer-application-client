import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomerComponent } from './customer/customer.component';
import { SharedService } from './shared.service';

import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule, MatPaginatorModule, MatButtonModule, MatCardModule, MatInputModule, MatListModule, MatToolbarModule } from '@angular/material';
import { OktaAuthModule } from '@okta/okta-angular';
import { AuthInterceptor } from './auth.interceptor';

const config = {
  issuer: "https://dev-54261639.okta.com/oauth2/default",
  redirectUri: "http://localhost:4200/implicit/callback",
  clientId: "0oa1kj8v3awGWH6oq5d7"
};

@NgModule({
  declarations: [
    AppComponent,
    CustomerComponent
  ],
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatListModule,
    MatToolbarModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    OktaAuthModule.initAuth(config)
  ],
  providers: [SharedService, {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
