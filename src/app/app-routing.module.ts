import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { InnerComponent } from './inner/inner.component';

const routes: Routes = [
{
  path: '',
  component: LoginComponent
},{
  path: 'lms',component: InnerComponent, children: [{
    path: '', loadChildren: () => import('./inner/inner.module').then(m => m.InnerModule)}],
    outlet: 'inner'
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
