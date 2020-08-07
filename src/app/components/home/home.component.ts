import { candidatoInterface } from './../../models/candidato.interface';
import { ApiService } from './../../api.service';
import { Component, OnInit, ErrorHandler } from '@angular/core';
import { Router } from "@angular/router"
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  candidatos: candidatoInterface[]
  colores = {
    'blue': 'mat-accent',
    'red': 'mat-warn'
  }
  constructor(private _toast: MatSnackBar,private _router: Router, private _api: ApiService) { }

  ngOnInit(): void {
    this.mostrarCandidatos()
  }

  crearCandidato() {
    this._router.navigate(['/crear_candidato'])
  }

  mostrarCandidatos() {
    this._api.mostrarCandidatos().subscribe(
      data => {
        if (data['ok']) {
          this.candidatos = data['candidatos']
          console.log(this.candidatos);
        } else {
          this.mostrarToast(data['message'], '', 3000, 'red');
        }
      },
      (error: ErrorHandler) => {
        console.log(error);
      }
      )
    }
    
    editarCandidato(id){
      this.mostrarToast(id, '', 3000, 'blue');

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
