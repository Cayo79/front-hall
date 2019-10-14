import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { FullCalendarModule } from 'ng-fullcalendar';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ResevarsalonComponent } from './pages/resevarsalon/resevarsalon.component';
import { DiaReservaComponent } from './pages/dia-reserva/dia-reserva.component';

import { ReservService } from './services/hallconferece/reserv.service';

@NgModule({
  declarations: [
    AppComponent,
    ResevarsalonComponent,
    DiaReservaComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FullCalendarModule,
    AppRoutingModule
  ],
  providers: [
    ReservService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
