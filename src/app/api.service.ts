import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { candidatoInterface } from './models/candidato.interface'
import { gestionesInterface } from './models/gestiones.interface'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private _http: HttpClient) { }

  validarCredenciales(user: string, pass: string, barrio: string) {
    const body = {
      "user": user,
      "pass": pass,
      "barrio": barrio
    }
    return this._http.post('http://localhost:4000/api/ordenaciones/usuarios/login', body)
  }

  crearCandidato(candidato:candidatoInterface){
    return this._http.post<candidatoInterface>('http://localhost:4000/api/ordenaciones/candidatos/', candidato)
  }

  mostrarCandidatos(){
    return this._http.get('http://localhost:4000/api/ordenaciones/candidatos/')
  }

  mostrarCandidato(idCandidato){
    return this._http.get('http://localhost:4000/api/ordenaciones/candidatos/' + idCandidato)
  }
  
  actualizarGestiones(gestiones:gestionesInterface){
    return this._http.put('http://localhost:4000/api/ordenaciones/candidatos/', gestiones)

  }

}


