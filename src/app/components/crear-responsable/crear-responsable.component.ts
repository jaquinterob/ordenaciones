import { responsableInterface } from './../../models/responsable.interface';
import { Component, OnInit, ErrorHandler } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-crear-responsable',
  templateUrl: './crear-responsable.component.html',
  styleUrls: ['./crear-responsable.component.css']
})
export class CrearResponsableComponent implements OnInit {
  responsable: responsableInterface = {}
  colores = {
    'blue': 'mat-accent',
    'red': 'mat-warn'
  }

  constructor(private _api: ApiService, private _toast: MatSnackBar) { }

  ngOnInit(): void {
    this.responsable.barrio = JSON.parse(localStorage.getItem('ordenaciones'))['barrio']
  }

  guardarResponsable() {
    this._api.crearResponsable(this.responsable).subscribe(
      data => {
        this.mostrarToast(data['message'], '', 3000, 'blue');
        this.responsable = {}
      },
      (error:ErrorHandler)=>{
        this.mostrarToast(`Error: ${error.toString()}`, '', 3000, 'red');
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
