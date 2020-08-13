import { BorrarResponsableComponent } from './../modals/borrar-responsable/borrar-responsable.component';
import { ApiService } from 'src/app/api.service';
import { Component, OnInit, ErrorHandler } from '@angular/core';
import { responsableInterface } from '../../models/responsable.interface'
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';


@Component({
  selector: 'app-responsables',
  templateUrl: './responsables.component.html',
  styleUrls: ['./responsables.component.css']
})

export class ResponsablesComponent implements OnInit {
  puedeEditar: boolean
  barrio: string = ""
  responsables: responsableInterface[] = []
  colores = {
    'blue': 'mat-accent',
    'red': 'mat-warn'
  }
  constructor(
    private _toast: MatSnackBar,
    private _api: ApiService,
    private _dialog: MatDialog,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.barrio = JSON.parse(localStorage.getItem('ordenaciones'))['barrio']
    this.traerResponsables(this.barrio)
    this._api.usuarioPuedeEditar().subscribe(
      data => {
        this.puedeEditar = data['puedeEditar']
      }
    )
  }

  traerResponsables(barrio) {
    this._api.traerResponsables(barrio).subscribe(
      data => {
        this.responsables = data['responsables']
      },
      (error: ErrorHandler) => console.log(error)
    )
  }

  editarResponsable(_id) {
    console.log('editando', _id);
  }

  borrarResponsable(_id) {
    const dialogInstace = this._dialog.open(BorrarResponsableComponent, { data: { titulo: 'Atención' }, disableClose: true })
    dialogInstace.afterClosed().subscribe(
      res => {
        if (res == 'true') {
          this.efectuarBorradoResponsable(_id)
        }
      }
    )
  }

  efectuarBorradoResponsable(_id){
    this._api.eliminarResponsable(_id).subscribe(
      data=>{
          if(data['ok']){
            this.mostrarToast(data['message'], '', 3000, 'blue');
            this.traerResponsables(this.barrio)
          }
      },
      (error:ErrorHandler)=>{
        this.mostrarToast(error.toString(), '', 3000, 'red');
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

  crearResponsable(){
    this._router.navigate(['crear_responsable'])
  }

}
