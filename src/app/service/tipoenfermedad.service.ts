import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { TipoEnfermedad } from '../model/TipoEnfermedad';
import { environment } from 'src/environments/environment';
const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class TipoEnfermedadService {
  private url =`${base_url}/api/tipoEnfermedad`

  constructor(private http: HttpClient) {}

  list(): Observable<TipoEnfermedad[]> {
    return this.http.get<TipoEnfermedad[]>(`${this.url}`);
  }

  getById(id: number): Observable<TipoEnfermedad> {
    return this.http.get<TipoEnfermedad>(`${this.url}/${id}`);
  }

  create(tipoEnfermedad: TipoEnfermedad): Observable<TipoEnfermedad> {
    return this.http.post<TipoEnfermedad>(`${this.url}`, tipoEnfermedad);
  }

  update(id: number, tipoEnfermedad: TipoEnfermedad): Observable<TipoEnfermedad> {
    return this.http.put<TipoEnfermedad>(`${this.url}/${id}`, tipoEnfermedad);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }

  getByTipo(tipoTipoEnfermedad: string): Observable<TipoEnfermedad[]> {
    return this.http.get<TipoEnfermedad[]>(`${this.url}/tipo/${tipoTipoEnfermedad}`);
  }

  getByNombre(nombreTipoEnfermedad: string): Observable<TipoEnfermedad[]> {
    return this.http.get<TipoEnfermedad[]>(`${this.url}/nombre/${nombreTipoEnfermedad}`);
  }
}
