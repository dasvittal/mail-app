import {RouterModule, Routes} from '@angular/router';
import { SigninComponent } from '../signin/signin.component';
import { MailcontainerComponent } from '../mailcontainer/mailcontainer.component';
import { DetailComponent } from '../detail/detail.component';

const APP_ROUTES: Routes = [
    { path: 'emails', component: MailcontainerComponent },
    { path: 'detail/:id', component: DetailComponent },
    { path: '', component: SigninComponent }
   ];


export const routes = RouterModule.forRoot(APP_ROUTES);