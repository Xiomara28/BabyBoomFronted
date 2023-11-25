import { Injectable } from '@angular/core';
import { Apoderado } from '../model/Apoderado';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class ApoderadoService {
  private url =`${base_url}/api/apoderados`
  private listaCambio = new Subject<Apoderado[]>();

  constructor(private http: HttpClient) {}

  list(): Observable<Apoderado[]> {
    var result = this.http.get<Apoderado[]>(`${this.url}`);
    return result;
  }

  listId(id: number): Observable<Apoderado> {

    var result= this.http.get<Apoderado>(`${this.url}/${id}`);
    return result;
  }

  insert(apoderado: Apoderado): Observable<any> {
    return this.http.post(`${this.url}`, apoderado);
  }

  update(apoderado: Apoderado): Observable<any> {
    return this.http.put(`${this.url}/${apoderado.idApoderado}`, apoderado);
  }

  setList(listaNueva: Apoderado[]): void {
    this.listaCambio.next(listaNueva);
  }

  getList(): Observable<Apoderado[]> {
    return this.listaCambio.asObservable();
  }

  deleteApoderado(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
