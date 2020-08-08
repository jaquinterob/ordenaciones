import { Component, OnInit, ErrorHandler } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ThemePalette } from '@angular/material/core';
import { gestionesInterface } from '../../models/gestiones.interface'
import { candidatoInterface } from '../../models/candidato.interface'

import { MatSnackBar } from '@angular/material/snack-bar';

import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-gestionar',
  templateUrl: './gestionar.component.html',
  styleUrls: ['./gestionar.component.css']
})
export class GestionarComponent implements OnInit {
  id: string
  color: ThemePalette = 'primary';
  recomendado = true;
  gestiones: gestionesInterface = {}
  candidato: candidatoInterface = {}
  colores = {
    'blue': 'mat-accent',
    'red': 'mat-warn'
  }

  constructor(private _toast: MatSnackBar, private _activeRoute: ActivatedRoute, private _api: ApiService) { }

  ngOnInit(): void {
    this.id = this._activeRoute.snapshot.params.id
    this._api.mostrarCandidato(this.id).subscribe(
      data => {
        this.candidato = data['candidato'][0]
        this.gestiones = data['candidato'][0]['gestiones'][0]
      },
      (error: ErrorHandler) => {
        this.mostrarToast(`Error al registrar: ${error}`, '', 3000, 'red');
      }
    )
  }

  actualizarGestiones() {
    this._api.actualizarGestiones(this.gestiones).subscribe(
      data => {
        if (data['ok']) {
          this.mostrarToast(data['message'], '', 3000, 'blue');

        } else {
          this.mostrarToast(data['message'], '', 3000, 'red');
        }
      },
      (error: ErrorHandler) => {
        this.mostrarToast(`Error al registrar: ${error}`, '', 3000, 'red');
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
