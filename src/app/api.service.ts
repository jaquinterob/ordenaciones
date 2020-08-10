import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { candidatoInterface } from './models/candidato.interface'
import { gestionesInterface } from './models/gestiones.interface'

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  API_URL: string = "http://127.0.0.1:5000/api/ordenaciones/"
  constructor(private _http: HttpClient) { }

  usuarioPuedeEditar() {
    const idUsuario =  localStorage.getItem('idUsuario')
    return this._http.get(this.API_URL+'usuarios/' + idUsuario)
  }

  validarCredenciales(user: string, pass: string, barrio: string) {
    const body = {
      "user": user,
      "pass": pass,
      "barrio": barrio
    }
    return this._http.post(this.API_URL+'usuarios/login', body)
  }

  crearCandidato(candidato: candidatoInterface) {
    return this._http.post<candidatoInterface>(this.API_URL+'candidatos/', candidato)
  }

  mostrarCandidatos(barrio:string) {
    return this._http.get(this.API_URL+'candidatos/'+barrio)
  }

  mostrarCandidato(idCandidato) {
    return this._http.get(this.API_URL+'candidato/' + idCandidato)
  }

  actualizarGestiones(gestiones: gestionesInterface) {
    return this._http.put(this.API_URL+'gestiones/', gestiones)
  }

  traerCandidato(idCandidato: string) {
    return this._http.post(this.API_URL+'candidato/', { id: idCandidato })
  }

  actualizarCandidato(candidato: candidatoInterface) {
    return this._http.put(this.API_URL+'candidato/', candidato)
  }

  traerBarrios(){
    return this._http.get(this.API_URL+'barrios/')
  }
  
  borrarCandidato(idCandidato:string){
    return this._http.delete(this.API_URL+'candidatos/' + idCandidato)
  }

}


