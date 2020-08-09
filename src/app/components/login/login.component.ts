import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from "../../api.service";
import { Router } from "@angular/router"

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loader = false
  barrios:any={}
  barrioPorDefecto: string = '1'
  barrio: string = this.barrioPorDefecto
  user: string = ''
  pass: string = ''
  colores = {
    'blue': 'mat-accent',
    'red': 'mat-warn'
  }
  constructor(private _toast: MatSnackBar, private _api: ApiService, private _router: Router) { }

  ngOnInit(): void {
    this.validarLocalStorage()
    this.traerBarrios()
  }

  traerBarrios(){
    this._api.traerBarrios().subscribe(
      data =>{
        this.barrios = data['barrios']
      }
    )
  }

  validarLocalStorage() {
    if (localStorage.getItem('ordenaciones')) {
      const { user, pass, barrio } = JSON.parse(localStorage.getItem('ordenaciones'))
      this.user = user
      this.pass = pass
      this.barrio = barrio
      this.validarCredenciales()
    }
  }

  validarCredenciales() {
    if (this.camposCompletos()) {
      this._api.validarCredenciales(this.user, this.pass, this.barrio).subscribe(
        data => {
          if (data['auth']) {
            console.log(data);
            
            this.mostrarToast(`Hola ${data['nombre']}!`, '', 3000, 'blue');
            this._router.navigate(['/home'])
            localStorage.setItem('ordenaciones', JSON.stringify({
              user: this.user,
              pass: this.pass,
              barrio: this.barrio
            }))
            localStorage.setItem('idUsuario', data['_id'])
            this.loader = false
          } else {
            this.mostrarToast(data['message'], '', 3000, 'red');
            this.loader = false
          }
        },
        error => {
          this.mostrarToast('Error al autenticar' + error, '', 3000, 'red');
          this.loader = false
        }
        )
      }
    }
    
    camposCompletos() {
      if (this.user !== '') {
        if (this.pass !== '') {
          return true
        } else {
          this.mostrarToast('Falta contraseña', '', 3000, 'red');
          this.loader = false
          return false
        }
      } else {
        this.mostrarToast('Falta usuario', '', 3000, 'red');
        this.loader = false
      return false
    }
  }

  mostrarToast(mensaje: string, accion: string = '', duracion: number = 3000, color: string = 'blue') {
    this._toast.open(
      mensaje,
      accion,
      {
        duration: duracion,
        verticalPosition: 'bottom',
        panelClass: ['mat-toolbar', this.colores[color]]
      }
    );
  }
}
