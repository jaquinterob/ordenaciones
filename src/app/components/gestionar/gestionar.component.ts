import { Component, OnInit, ErrorHandler } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ThemePalette } from '@angular/material/core';
import { gestionesInterface } from '../../models/gestiones.interface'
import { candidatoInterface } from '../../models/candidato.interface'

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
  candidato:candidatoInterface = {}
  
  constructor(private _activeRoute: ActivatedRoute, private _api:ApiService ) { }

  ngOnInit(): void {
    this.id = this._activeRoute.snapshot.params.id
    console.log(this.id);
    this._api.mostrarCandidato(this.id).subscribe(
      data=>{
        console.log(data);
        this.candidato = data['candidato'][0]
        this.gestiones = data['candidato'][0]['gestiones'][0]
        console.log(this.gestiones);
        
      },
      (error:ErrorHandler)=>{
        console.log(error);
        
      }
    )

  }

  verCambio(){
    console.log(this.gestiones.l3)
  }

}
