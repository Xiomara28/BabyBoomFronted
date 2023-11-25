import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Soportetecnico } from '../model/Soportetecnico';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class SoporteTecnicoService {
  private url = `${base_url}/soporteTecnico`

  constructor(private http: HttpClient) {}

  list(): Observable<Soportetecnico[]> {
    return this.http.get<Soportetecnico[]>(`${this.url}`);
  }

  getById(id: number): Observable<Soportetecnico> {
    return this.http.get<Soportetecnico>(`${this.url}/${id}`);
  }

  create(soporteTecnico: Soportetecnico): Observable<Soportetecnico> {
    return this.http.post<Soportetecnico>(`${this.url}`, soporteTecnico);
  }

  update(id: number, soporteTecnico: Soportetecnico): Observable<Soportetecnico> {
    return this.http.put<Soportetecnico>(`${this.url}/${id}`, soporteTecnico);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }


}
