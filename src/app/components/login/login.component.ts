import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  barrioPorDefecto:string = 'sabaneta'
  barrio:string = this.barrioPorDefecto
  user:string = ''
  pass:string = ''
  colores = {
    'blue': 'mat-accent',
    'red': 'mat-warn'
  }
  constructor(private _toast: MatSnackBar) { }

  ngOnInit(): void {
  }

  validarCredenciales(){
    if (this.camposCompletos()) {
      
    } else {
      
    }
    console.log(this.barrio);
  }

  camposCompletos(){
    if (this.user !== '') {
      if (this.pass !== '') {
        return true
      } else {
        this.mostrarToast('Falta contraseña', '',3000, 'red');
        return false
      }
    } else {
      this.mostrarToast('Falta usuario', '',3000, 'red');
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
