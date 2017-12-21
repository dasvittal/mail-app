import {RouterModule, Routes} from '@angular/router';
import { SigninComponent } from '../signin/signin.component';
import { MailcontainerComponent } from '../mailcontainer/mailcontainer.component';

const APP_ROUTES: Routes = [
    { path: 'emails', component: MailcontainerComponent },
    { path: '', component: SigninComponent }
   ];


export const routes = RouterModule.forRoot(APP_ROUTES);