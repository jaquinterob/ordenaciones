import { LoginComponent } from './components/login/login.component';
import { CrearCadidatoComponent } from './components/crear-cadidato/crear-cadidato.component'
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { GestionarComponent } from './components/gestionar/gestionar.component';
import { EditCandidatoComponent } from './components/edit-candidato/edit-candidato.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'crear_candidato',
    component: CrearCadidatoComponent,
  },
  {
    path: 'gestionar/:id',
    component: GestionarComponent,
  },
  {
    path: 'edit_candidato/:id',
    component: EditCandidatoComponent,
  },
  {
    path: '**',
    component: LoginComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
