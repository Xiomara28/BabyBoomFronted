import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BebeTipoEnfermedad } from '../model/BebeTipoEnfermedad';
import { environment } from 'src/environments/environment';
const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class BebeTipoEnfermedadService {
  private baseUrl =`${base_url}/api/bebetipoenfermedades`


  constructor(private http: HttpClient) {}
  createBebeTipoEnfermedad(bebeTipoEnfermedadDTO: BebeTipoEnfermedad): Observable<BebeTipoEnfermedad> {
    return this.http.post<BebeTipoEnfermedad>(`${this.baseUrl}`, bebeTipoEnfermedadDTO);
  }

  getAllBebeTipoEnfermedades(): Observable<BebeTipoEnfermedad[]> {
    return this.http.get<BebeTipoEnfermedad[]>(`${this.baseUrl}`);
  }

  getBebeTipoEnfermedadById(id: number): Observable<BebeTipoEnfermedad> {
    return this.http.get<BebeTipoEnfermedad>(`${this.baseUrl}/${id}`);
  }

  getBebeTipoEnfermedadByNombreEnfermedad(nombreEnfermedad: string): Observable<BebeTipoEnfermedad[]> {
    return this.http.get<BebeTipoEnfermedad[]>(`${this.baseUrl}/nombreEnfermedad/${nombreEnfermedad}`);
  }
  deleteRelacion(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
