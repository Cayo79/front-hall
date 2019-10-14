import { Component, OnInit, ViewChild, QueryList, ElementRef } from '@angular/core';
import { OptionsInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { CalendarComponent } from 'ng-fullcalendar';

import { AssignedModule } from '../../models/assigned';
import { EventModule } from '../../models/event';

import { ReservService } from '../../services/hallconferece/reserv.service';
import { Element } from '@angular/compiler';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-resevarsalon',
  templateUrl: './resevarsalon.component.html',
  providers: [DatePipe]
})
export class ResevarsalonComponent implements OnInit {

  public options: OptionsInput;
  public calendarPlugins = [dayGridPlugin];
  public listaAssigned: AssignedModule[];
  public listaEvent: any[] = [];
  myDate: Date;
  fechaInicio: string;
  fechaFin: string;
  event: EventModule;
  modalData: {
    action: string;
    event: EventModule;
  };
  nuevoEvento: boolean;
  editarEvento: boolean;

  constructor(
    private reservaService: ReservService,
    private datePipe: DatePipe
  ) {
  }

  ngOnInit() {

    console.log('Cargar Lista');
    this.myDate = new Date();
    this.fechaInicio = this.datePipe.transform(this.myDate, 'yyyy-MM-dd HH:mm');
    this.fechaFin = this.datePipe.transform(this.myDate, 'yyyy-MM-dd HH:mm');
    this.cargarReservas();

    this.options = {
      editable: true,
      customButtons: {
        crear: {
          text: 'Crear Reserva',
          click: function () {
            this.activarSala();
            this.modal.open(this.modalContent, { size: 'lg' });
          }
        },
        eliminar: {
          text: 'Eliminar Reserva',
          click: function () {
            Swal.fire({
              title: 'Seguro que desea Eliminar?',
              text: "Registro sera eliminado!",
              type: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Si, borrar!'
            }).then((result) => {
              if (result.value) {
                Swal.fire(
                  'Borrado!',
                  'Se borro la reserva.',
                  'success'
                )
              }
            });
          }
        }
      },
      header: {
        left: 'prev,next crear eliminar',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      },
      plugins: [dayGridPlugin]
    };
  }

  eventClick(model) {
    console.log(model);
  }
  eventDragStop(model) {
    console.log(model);
  }
  dateClick(model) {
    console.log(model);
  }
  updateEvents() {
    this.listaEvent = [{
      title: 'Updaten Event',
      start: this.yearMonth + '-08',
      end: this.yearMonth + '-10'
    }];
  }
  get yearMonth(): string {
    const dateObj = new Date();
    return dateObj.getUTCFullYear() + '-' + (dateObj.getUTCMonth() + 1);
  }

  cargarReservas() {
    this.reservaService.getReservas().subscribe(
      lista => {
        this.listaAssigned = lista;
        this.cargarEventos();
      });
  }

  cargarEventos() {

    for (var i = 0; i < this.listaAssigned.length; i++) {
      this.event = new EventModule();
      this.event.title = 'Identificador ' + this.listaAssigned[i].id;
      this.event.start = this.listaAssigned[i].beginDate;
      this.event.end = this.listaAssigned[i].endDate;

      this.listaEvent.push(this.event);
    }
  }

  handleDateClick(arg) { // handler method
    alert(arg.dateStr);
  }

  activarSala() {
    this.nuevoEvento = true;
    this.editarEvento = false;
    this.event.title = '';
    this.event.start = this.fechaInicio;
    this.event.end = this.fechaFin;
  }

}
