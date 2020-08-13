import { Component, OnInit, ErrorHandler, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ThemePalette } from '@angular/material/core';
import { gestionesInterface } from '../../models/gestiones.interface'
import { candidatoInterface } from '../../models/candidato.interface'

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { MatAccordion } from '@angular/material/expansion';

import { ApiService } from 'src/app/api.service';
import { DialogDeleteComponent } from '../dialog-delete/dialog-delete.component';
import { ModalGestionComponent } from '../../components/modals/modal-gestion/modal-gestion.component'

@Component({
  selector: 'app-gestionar',
  templateUrl: './gestionar.component.html',
  styleUrls: ['./gestionar.component.css']
})
export class GestionarComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion;
  id: string
  color: ThemePalette = 'primary';
  recomendado = true;
  gestiones: gestionesInterface = {}
  candidato: candidatoInterface = {}
  colores = {
    'blue': 'mat-accent',
    'red': 'mat-warn'
  }

  constructor(
    private _toast: MatSnackBar,
    private _activeRoute: ActivatedRoute,
    private _api: ApiService,
    private _router: Router,
    private _dialog: MatDialog
  ) { }

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

  async borrarCandidato(idCandidato: string) {
    this._api.borrarCandidato(idCandidato).subscribe(
      data => {
        if (data['ok']) {
          this._router.navigate(['/home'])
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

  abrirDialog() {
    const dialogInstace = this._dialog.open(DialogDeleteComponent, { data: { titulo: 'Atención' }, disableClose: true })
    dialogInstace.afterClosed().subscribe(
      res => {
        if (res == 'true') {
          this.borrarCandidato(this.candidato['_id'])
        }
      }
    )
  }

  abrir_modal(event, item) {
    if (event.checked) {
      const dialogInstace = this._dialog.open(ModalGestionComponent, { data: { gestiones: this.gestiones, item: item }, disableClose: true })
      dialogInstace.afterClosed().subscribe(
        res => {
          if (res === "false") {
            this.gestiones[item] = false
            console.log(delete this.gestiones[item + '_fecha'])
            console.log(delete this.gestiones[item + '_comentario'])
            console.log(this.gestiones)
            this.actualizarGestiones()
          }
        }
      )
    } else {
      console.log(delete this.gestiones[item + '_fecha'])
      console.log(delete this.gestiones[item + '_comentario'])
      console.log(this.gestiones)
      this.actualizarGestiones()
    }
  }

}
