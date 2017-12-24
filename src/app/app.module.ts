import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { SigninComponent } from './signin/signin.component';
import { MailcontainerComponent } from './mailcontainer/mailcontainer.component';
import { DetailComponent } from './detail/detail.component';
import { MailbodyComponent } from './mailbody/mailbody.component';

// Services
import { SigninService } from './services/signin.service';

import { routes } from './routes/route';



@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    MailcontainerComponent,
    DetailComponent,
    MailbodyComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    routes
  ],
  providers: [
    SigninService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
