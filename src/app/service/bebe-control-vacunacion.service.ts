// bebe-control-vacunacion.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BebeControlVacunacion } from '../model/BebeControlVacunacion';
import { environment } from 'src/environments/environment';
const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class BebeControlVacunacionService {
  private baseUrl =`${base_url}/api/bebeControlVacunaciones`

  constructor(private http: HttpClient) {}

  createBebeControlVacunacion(bebeControlVacunacionDTO: BebeControlVacunacion): Observable<BebeControlVacunacion> {
    return this.http.post<BebeControlVacunacion>(`${this.baseUrl}`, bebeControlVacunacionDTO);
  }

  getAllBebeControlVacunaciones(): Observable<BebeControlVacunacion[]> {
    return this.http.get<BebeControlVacunacion[]>(`${this.baseUrl}`);
  }

  getBebeControlVacunacionById(id: number): Observable<BebeControlVacunacion> {
    return this.http.get<BebeControlVacunacion>(`${this.baseUrl}/${id}`);
  }

  deleteBebeControlVacunacionById(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

}
