import { EditResponsableComponent } from './components/edit-responsable/edit-responsable.component';
import { CrearResponsableComponent } from './components/crear-responsable/crear-responsable.component';
import { LoginComponent } from './components/login/login.component';
import { CrearCadidatoComponent } from './components/crear-cadidato/crear-cadidato.component'
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { GestionarComponent } from './components/gestionar/gestionar.component';
import { EditCandidatoComponent } from './components/edit-candidato/edit-candidato.component';
import { ResponsablesComponent } from './components/responsables/responsables.component';

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
    path: 'responsables',
    component: ResponsablesComponent,
  },
  {
    path: 'crear_responsable',
    component: CrearResponsableComponent,
  },
  {
    path: 'edit_responsbles/:idResponsable',
    component: EditResponsableComponent,
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
