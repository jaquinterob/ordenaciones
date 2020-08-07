import { Component, OnInit, ErrorHandler } from '@angular/core';
import { candidatoInterface } from '../../models/candidato.interface'
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from "../../api.service";


@Component({
  selector: 'app-crear-cadidato',
  templateUrl: './crear-cadidato.component.html',
  styleUrls: ['./crear-cadidato.component.css']
})
export class CrearCadidatoComponent implements OnInit {
  loader = false
  candidato: candidatoInterface = {}
  minDate = new Date()
  colores = {
    'blue': 'mat-accent',
    'red': 'mat-warn'
  }
  constructor(private _toast: MatSnackBar, private _api: ApiService) { }

  ngOnInit(): void { }

  guardarCandidato() {
    this.loader = true
    if (this.validarCandidato()) {
      this._api.crearCandidato(this.candidato).subscribe(
        estado => {
          this.mostrarToast(estado['message'], '', 3000, 'blue');
          this.candidato = {}
          this.loader = false
        },
        (error: ErrorHandler) => {
          this.mostrarToast(`Error: ${error.toString()}`, '', 3000, 'red');
          this.loader = false
        }
        )
      } else {
        this.mostrarToast("Faltan datos", '', 3000, 'red');
        this.loader = false
      }
  }

  validarCandidato() {
    return (this.candidato.celular && this.candidato.meta && this.candidato.nombre)
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
