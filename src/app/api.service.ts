import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

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
}


