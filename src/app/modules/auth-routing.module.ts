import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthTabsComponent } from '../components/auth-tabs/auth-tabs.component';

const routes: Routes = [
  {
    path: '',
    component: AuthTabsComponent
  },
  { path: 'auth', redirectTo: ''}
];
@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
