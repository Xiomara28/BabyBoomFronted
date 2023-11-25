import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Medico } from '../model/Medico';
const base_url = environment.base;


@Injectable({
  providedIn: 'root'
})
export class MedicoService {
  private url = `${base_url}/medicos`;

  constructor(private http: HttpClient) {}

  getAllMedicos(): Observable<Medico[]> {
    return this.http.get<Medico[]>(this.url);
  }

  getMedicoById(id: number): Observable<Medico> {
    return this.http.get<Medico>(`${this.url}/${id}`);
  }

  createMedico(medico: Medico): Observable<Medico> {
    return this.http.post<Medico>(this.url, medico);
  }

  updateMedico(id: number, medico: Medico): Observable<Medico> {
    return this.http.put<Medico>(`${this.url}/${id}`, medico);
  }

  deleteMedico(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }


}
