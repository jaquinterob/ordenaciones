import { responsableInterface } from './../../models/responsable.interface';
import { Component, OnInit, ErrorHandler } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-responsable',
  templateUrl: './edit-responsable.component.html',
  styleUrls: ['./edit-responsable.component.css']
})
export class EditResponsableComponent implements OnInit {
  responsable: responsableInterface = {}
  idResponsable
  colores = {
    'blue': 'mat-accent',
    'red': 'mat-warn'
  }
  con
  constructor(private _activeRoute: ActivatedRoute, private _api: ApiService, private _toast: MatSnackBar) { }

  ngOnInit(): void {
    this.idResponsable = this._activeRoute.snapshot.params.idResponsable
    this._api.traerResponsable(this.idResponsable).subscribe(
      data => {
        this.responsable = data['responsable']
      },
      (error: ErrorHandler) => {
        this.mostrarToast(`Error: ${error}`, '', 3000, 'red');
      }
      )
  }
  
  actualizarResponsable(){
    this._api.actualizarResponsable(this.responsable).subscribe(
      data=>{
        this.mostrarToast(data['message'], '', 3000, 'blue');
      },
      (error:ErrorHandler)=>{
        this.mostrarToast(`Error: ${error}`, '', 3000, 'red');
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
