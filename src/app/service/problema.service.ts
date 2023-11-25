import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Problema } from '../model/Problema';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class ProblemaService {
  private url = `${base_url}/api/problemas`;

  constructor(private http: HttpClient) {}

  getProblemas(): Observable<Problema[]> {
    return this.http.get<Problema[]>(this.url);
  }

  getProblemaById(id: number): Observable<Problema> {
    return this.http.get<Problema>(`${this.url}/${id}`);
  }

  createProblema(problema: Problema): Observable<Problema> {
    return this.http.post<Problema>(this.url, problema);
  }

  updateProblema(id: number, problema: Problema): Observable<Problema> {
    return this.http.put<Problema>(`${this.url}/${id}`, problema);
  }

  deleteProblema(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
