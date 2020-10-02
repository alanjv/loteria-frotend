import { Injectable } from '@angular/core';
import { Prediccion } from '../models/prediccion';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class PredecirService {
  URL = 'https://api.loteriahn.gq/prediccion'

  constructor(private http: HttpClient) { }

  getSorteos(){
    return this.http.get(`${this.URL}/sorteos`);
  }

  getSorteosTodos(){
    return this.http.get(`${this.URL}/todos`);
  }

  getSorteosJornada(jornada: string){
    return this.http.get(`${this.URL}/${jornada}`);
  }

  getPrediccion(){
    return this.http.get(`${this.URL}`);
  }

  addPrediccion(prediccion: Prediccion){
    return this.http.post(`${this.URL}`, prediccion);
  }

}
