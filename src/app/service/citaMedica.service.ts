import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CitaMedica } from '../model/CitaMedica';
import { environment } from 'src/environments/environment';

const base_url = environment.base;
@Injectable({
  providedIn: 'root',
})
export class CitaMedicaService {
  private url = `${base_url}/api/citasmedicas`;


  constructor(private http: HttpClient) {}

  getCitaMedicas(): Observable<CitaMedica[]> {
    return this.http.get<CitaMedica[]>(this.url);
  }

  getCitaMedicaById(id: number): Observable<CitaMedica> {
    return this.http.get<CitaMedica>(`${this.url}/${id}`);
  }

  createCitaMedica(citaMedica: CitaMedica): Observable<CitaMedica> {
    return this.http.post<CitaMedica>(this.url, citaMedica);
  }

  updateCitaMedica(id: number, citaMedica: CitaMedica): Observable<CitaMedica> {
    return this.http.put<CitaMedica>(`${this.url}/${id}`, citaMedica);
  }

  deleteCitaMedica(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }

  // Agrega métodos adicionales según tus necesidades
}
