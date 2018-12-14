import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { AuthComponent } from './auth.component';

const authRoutes: Routes = [
    { path: 'auth', component: AuthComponent },
    { path: 'login', component: LoginComponent }
]

@NgModule({
    imports: [
        RouterModule.forChild(authRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AuthRoutingModule {

}