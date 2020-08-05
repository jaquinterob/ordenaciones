import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private _http: HttpClient) {
    _http.get('http://localhost:4000/api/ordenaciones/usuario/eva').subscribe(
      data => {
        console.log(data)
      },
      error => {
        console.log(error)

      }
    )
  }


}
