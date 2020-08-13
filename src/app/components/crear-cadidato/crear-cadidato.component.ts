import { Component, OnInit, ErrorHandler } from '@angular/core';
import { candidatoInterface } from '../../models/candidato.interface'
import { responsableInterface } from '../../models/responsable.interface'
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
  responsables: responsableInterface[] = []
  colores = {
    'blue': 'mat-accent',
    'red': 'mat-warn'
  }
  constructor(private _toast: MatSnackBar, private _api: ApiService) { }

  ngOnInit(): void {
    this.cargarBarrio()
    this.traerResponsables()
  }

  async cargarBarrio() {
    const { barrio } = await JSON.parse(localStorage.getItem('ordenaciones'))
    this.candidato.barrio = barrio
  }

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
    return (this.candidato.celular && this.candidato.meta && this.candidato.nombre && this.candidato.responsable)
  }

  async traerResponsables() {
    const { barrio } = await JSON.parse(localStorage.getItem('ordenaciones'))
    this._api.traerResponsables(barrio).subscribe(
      data => {
        this.responsables = data['responsables']
      },
      (error: ErrorHandler) => {
        this.mostrarToast(`Error al cargar select ${error}`, '', 3000, 'red');
      }
    )
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
