import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { SigninComponent } from './signin/signin.component';
import { MailcontainerComponent } from './mailcontainer/mailcontainer.component';

// Services
import { SigninService } from './services/signin.service';

import { routes } from './routes/route';


@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    MailcontainerComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    routes
  ],
  providers: [
    SigninService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
