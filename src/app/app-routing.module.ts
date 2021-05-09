import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientsComponent } from './components/clients/clients.component';
import { ClientComponent } from './components/clients/client/client.component';
import { AuthComponent } from './components/auth/auth.component';
import { AuthGuardService } from './services/auth-guard/auth-guard.service';
import { NewClientComponent } from './components/clients/new-client/new-client.component';

const routes: Routes = [
  {path: '', redirectTo: '/clients', pathMatch: 'full'},
  {path: 'clients', component: ClientsComponent, canActivate: [AuthGuardService]},
  {path: 'clients/:id', component: ClientComponent, canActivate: [AuthGuardService]},
  {path: 'new-client', component: NewClientComponent, canActivate: [AuthGuardService]},
  {path: 'auth', component: AuthComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
