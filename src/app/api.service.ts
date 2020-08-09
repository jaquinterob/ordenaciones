import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { candidatoInterface } from './models/candidato.interface'
import { gestionesInterface } from './models/gestiones.interface'

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private _http: HttpClient) { }

  usuarioPuedeEditar() {
    const idUsuario =  localStorage.getItem('idUsuario')
    return this._http.get('http://localhost:4000/api/ordenaciones/usuarios/' + idUsuario)
  }

  validarCredenciales(user: string, pass: string, barrio: string) {
    const body = {
      "user": user,
      "pass": pass,
      "barrio": barrio
    }
    return this._http.post('http://localhost:4000/api/ordenaciones/usuarios/login', body)
  }

  crearCandidato(candidato: candidatoInterface) {
    return this._http.post<candidatoInterface>('http://localhost:4000/api/ordenaciones/candidatos/', candidato)
  }

  mostrarCandidatos(barrio:string) {
    return this._http.get('http://localhost:4000/api/ordenaciones/candidatos/'+barrio)
  }

  mostrarCandidato(idCandidato) {
    return this._http.get('http://localhost:4000/api/ordenaciones/candidato/' + idCandidato)
  }

  actualizarGestiones(gestiones: gestionesInterface) {
    return this._http.put('http://localhost:4000/api/ordenaciones/gestiones/', gestiones)
  }

  traerCandidato(idCandidato: string) {
    return this._http.post('http://localhost:4000/api/ordenaciones/candidato/', { id: idCandidato })
  }

  actualizarCandidato(candidato: candidatoInterface) {
    return this._http.put('http://localhost:4000/api/ordenaciones/candidato/', candidato)
  }

}


