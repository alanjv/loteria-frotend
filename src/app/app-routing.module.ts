import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PredecirComponent } from './components/predecir/predecir.component';
import { SorteosComponent } from './components/sorteos/sorteos.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
      {path: 'home', component: PredecirComponent},
      {path: 'sorteos', component: SorteosComponent},
      {path: 'login', component: LoginComponent},
      {path: '**', pathMatch: 'full', redirectTo: 'home'}
]
;

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
