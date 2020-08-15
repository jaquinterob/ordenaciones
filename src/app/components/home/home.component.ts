import { candidatoInterface } from './../../models/candidato.interface';
import { ApiService } from './../../api.service';
import { Component, OnInit, ErrorHandler } from '@angular/core';
import { Router } from "@angular/router"
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from 'moment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  puedeEditar: boolean
  candidatos: candidatoInterface[]
  colores = {
    'blue': 'mat-accent',
    'red': 'mat-warn'
  }
  constructor(private _toast: MatSnackBar, private _router: Router, private _api: ApiService) { }

  ngOnInit(): void {
    this.mostrarCandidatos()
    this._api.usuarioPuedeEditar().subscribe(
      data => {
        this.puedeEditar = data['puedeEditar']
      }
    )
  }

  crearCandidato() {
    this._router.navigate(['/crear_candidato'])
  }

  async mostrarCandidatos() {
    const { barrio } = await JSON.parse(localStorage.getItem('ordenaciones'))
    this._api.mostrarCandidatos(barrio).subscribe(
      data => {
        if (data['ok']) {
          this.candidatos = data['candidatos']
          this.agregarDiasRestantes()
        } else {
          this.mostrarToast(data['message'], '', 3000, 'red');
        }
      },
      (error: ErrorHandler) => {
      }
    )
  }

  editarCandidato(id) {
    this._api.usuarioPuedeEditar().subscribe(
      data => {
        this.puedeEditar = data['puedeEditar']
        if (this.puedeEditar) {
          this._router.navigate(['/gestionar', id])
        } else {
          this.mostrarToast(`Tu perfil de usuario no te permite editar ni gestionar Candidatos`, '', 3000, 'blue');
        }
      }
    )
  }

  agregarDiasRestantes() {
    for (const candidato of this.candidatos) {
      const fecha2 = moment(candidato.meta)
      const fecha1 = moment(new Date())
      candidato.diasRestantes =fecha2.diff(fecha1, 'days')
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
