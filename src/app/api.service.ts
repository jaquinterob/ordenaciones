import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { candidatoInterface } from './models/candidato.interface'
import { gestionesInterface } from './models/gestiones.interface'
import { responsableInterface } from './models/responsable.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // API_URL: string = "http://190.7.153.162:5000/api/ordenaciones/"
  API_URL: string = "http://localhost:5000/api/ordenaciones/"
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
  
  traerBarrio(codBarrio:string){
    return this._http.get(this.API_URL+'barrios/' + codBarrio)
  }

  traerResponsables(barrio:string){
    return this._http.get(this.API_URL+'responsables/'+barrio)
  }
  
  eliminarResponsable(_id:string){
    return this._http.delete(this.API_URL + 'responsables/' + _id)
  }

  crearResponsable(responsable:responsableInterface){
    return this._http.post(this.API_URL + 'responsables/',responsable)
  }

}


