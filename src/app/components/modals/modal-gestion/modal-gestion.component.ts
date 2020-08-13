import { Component, OnInit, Inject, ErrorHandler } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from 'src/app/api.service';
import { gestionesInterface } from '../../../models/gestiones.interface'


@Component({
  selector: 'app-modal-gestion',
  templateUrl: './modal-gestion.component.html',
  styleUrls: ['./modal-gestion.component.css']
})
export class ModalGestionComponent implements OnInit {
  maxDate = new Date()
  gestiones: gestionesInterface = {}
  colores = {
    'blue': 'mat-accent',
    'red': 'mat-warn'
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _toast: MatSnackBar,
    private _api: ApiService,
  ) { }

  ngOnInit(): void {
    console.log(this.data);

  }

  async actualizarGestiones() {
    this.gestiones = await this.data['gestiones']
    console.log(this.gestiones);
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

  validarDetalles() {
    this.actualizarGestiones()

  }

  limpiarDatos(){
    delete this.gestiones[this.data['item'] + '_comentario']
    delete this.gestiones[this.data['item'] + '_fecha']
  }
  
}
