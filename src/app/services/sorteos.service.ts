import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Sorteo } from '../models/sorteo';

@Injectable({
  providedIn: 'root'
})
export class SorteosService {
  URL = 'https://api.loteriahn.gq/sorteos';

  constructor(private http: HttpClient) { }

  getSorteos(){
    return this.http.get(`${this.URL}`);
  }

  addSorteo(sorteo:Sorteo){
    return this.http.post(`${this.URL}`,sorteo);
  }

  editSorteo(id: string, sorteo:Sorteo){
  return this.http.put(`${this.URL}/${id}`, sorteo);
  }

  delSorteo(id: number){
    return this.http.delete(`${this.URL}/${id}`);
  }
}
