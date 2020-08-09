import { candidatoInterface } from './../../models/candidato.interface';
import { ApiService } from './../../api.service';
import { Component, OnInit, ErrorHandler } from '@angular/core';
import { Router } from "@angular/router"
import { MatSnackBar } from '@angular/material/snack-bar';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';


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
      data =>{
        this.puedeEditar = data['puedeEditar']
      }
    )
  }

  crearCandidato() {
    this._router.navigate(['/crear_candidato'])
  }

  async mostrarCandidatos() {
    const {barrio} = await JSON.parse(localStorage.getItem('ordenaciones'))
    this._api.mostrarCandidatos(barrio).subscribe(
      data => {
        if (data['ok']) {
          this.candidatos = data['candidatos']
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
