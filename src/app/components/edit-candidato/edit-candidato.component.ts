import { Component, OnInit, ErrorHandler } from '@angular/core';
import { candidatoInterface } from '../../models/candidato.interface'
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from "../../api.service";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-candidato',
  templateUrl: './edit-candidato.component.html',
  styleUrls: ['./edit-candidato.component.css']
})
export class EditCandidatoComponent implements OnInit {
  id: string
  loader = false
  candidato: candidatoInterface = {}
  minDate = new Date()
  colores = {
    'blue': 'mat-accent',
    'red': 'mat-warn'
  }
  constr
  constructor(private _activeRoute: ActivatedRoute, private _toast: MatSnackBar, private _api: ApiService) { }

  ngOnInit(): void {
    this.id = this._activeRoute.snapshot.params.id
    this.traerDatosCandidato()
  }

  traerDatosCandidato() {
    this._api.traerCandidato(this.id).subscribe(
      data => {
        if (data['ok']) {
          this.candidato = data['candidato'][0]
        } else {
          this.mostrarToast(data['message'], '', 3000, 'blue');
        }
      },
      (error: ErrorHandler) => {
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

  actualizarCandidato() {
    this._api.actualizarCandidato(this.candidato).subscribe(
      data =>{
        if (data['ok']) {
          this.mostrarToast(data['message'], '', 3000, 'blue');
        } else {
          this.mostrarToast(data['message'], '', 3000, 'red');
        }
      },
      (error:ErrorHandler)=>{
        this.mostrarToast(`Error: ${error}`, '', 3000, 'red');
      }
    )
  }

}
