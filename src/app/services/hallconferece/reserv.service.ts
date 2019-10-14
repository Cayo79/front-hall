import { Injectable } from '@angular/core';
import { DatosApi } from '../datos_api';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { AssignedModule } from '../../models/assigned';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservService {

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  private urlEndPoint = DatosApi.urlBaseApi + 'assignedhall/';

  private Assigned: AssignedModule[];
  constructor(private http: HttpClient) { }

  getReservas() {
    return this.http.get(this.urlEndPoint).pipe(
      map((Response: any) => {
        // tslint:disable-next-line:no-unused-expression
        (Response.content as AssignedModule[]);
        return Response;
      })
    );
  }

  createReserva(reserva: AssignedModule): Observable<any> {
    return this.http
      .post<any>(this.urlEndPoint, reserva, { headers: this.httpHeaders })
      .pipe(
        catchError(e => {
          return throwError(e);
        })
      );
  }

  updateReserva(id: number, reserva: AssignedModule): Observable<any> {
    return this.http
      .put(this.urlEndPoint + id, reserva, { headers: this.httpHeaders })
      .pipe(
        catchError(e => {
          return throwError(e);
        })
      );
  }
}
