import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bebe } from '../model/bebe';
import { environment } from 'src/environments/environment';
const base_url = environment.base;
@Injectable({
  providedIn: 'root',
})
export class BebeService {
  private url = `${base_url}/api/bebes`


  constructor(private http: HttpClient) {}

  getBebes(): Observable<Bebe[]> {
    return this.http.get<Bebe[]>(this.url);
  }

  getBebeById(id: number): Observable<Bebe> {
    return this.http.get<Bebe>(`${this.url}/${id}`);
  }

  createBebe(bebe: Bebe): Observable<Bebe> {
    return this.http.post<Bebe>(this.url, bebe);
  }

  updateBebe(id: number, bebe: Bebe): Observable<Bebe> {
    return this.http.put<Bebe>(`${this.url}/${id}`, bebe);
  }

  deleteBebe(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }

  // Agrega métodos adicionales según tus necesidades
}
