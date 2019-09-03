import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { ListComponent } from './idea/list/list.component';


const routes: Routes = [{
    path: 'login', component: LoginComponent,
  }, {
    path: 'register', component: RegisterComponent,
  }, {
    path: 'main', component: ListComponent,
  }, {
    path: '', pathMatch: 'full', redirectTo: '/login',
  }, {
    path: '**', redirectTo: '/login',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
