import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './services/auth.guard';
import { GestGuard } from './services/gest.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [GestGuard],
    loadChildren: () => import('./modules/auth.module').then(m => m.AuthModule)
  },
  {
    path: '',
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/streams.module').then(m => m.StreamsModule)
  },
  // {path: '**', redirectTo: '', pathMatch: 'full'}
];
@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
