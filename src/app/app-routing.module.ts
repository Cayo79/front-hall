import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Component } from '@fullcalendar/core';
import { ResevarsalonComponent } from './pages/resevarsalon/resevarsalon.component';
import { DiaReservaComponent } from './pages/dia-reserva/dia-reserva.component';
import { AppComponent } from './app.component';


const routes: Routes = [
  { path: 'reserva', component: ResevarsalonComponent},
  { path: '', redirectTo: 'reserva', pathMatch:  'full'},
  { path: 'dia-reserva', component: DiaReservaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
