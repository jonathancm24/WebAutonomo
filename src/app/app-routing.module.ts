import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent } from "./components/login/login.component"
import {RegistroComponent} from "./components/registro/registro.component"
import {InicioComponent} from "./components/inicio/inicio.component"
import {PaginaNoEncontradaComponent} from "./components/pagina-no-encontrada/pagina-no-encontrada.component"
//Iniciar Server comando : ng serve

const routes: Routes = [
  {path: '', redirectTo: 'Login', pathMatch: 'full'},
  {path:"Login" , component:LoginComponent},
  {path:"Registro", component:RegistroComponent},
  {path:"Inicio", component:InicioComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
