import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ControlVacunacion } from 'src/app/model/ControlVacunacion';
import { environment } from 'src/environments/environment';
const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class ControlVacunacionService {
  private url = `${base_url}/controlVacunacion`

  constructor(private http: HttpClient) {}

  getAllControlVacunaciones(): Observable<ControlVacunacion[]> {
    return this.http.get<ControlVacunacion[]>(this.url);
  }

  getControlVacunacionById(id: number): Observable<ControlVacunacion> {
    return this.http.get<ControlVacunacion>(`${this.url}/${id}`);
  }

  createControlVacunacion(controlVacunacion: ControlVacunacion): Observable<ControlVacunacion> {
    return this.http.post<ControlVacunacion>(this.url, controlVacunacion);
  }

  updateControlVacunacion(id: number, controlVacunacion: ControlVacunacion): Observable<ControlVacunacion> {
    return this.http.put<ControlVacunacion>(`${this.url}/${id}`, controlVacunacion);
  }

  deleteControlVacunacion(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
