import { Component, OnInit } from '@angular/core';
import { candidatoInterface } from '../../models/candidato.interface'

@Component({
  selector: 'app-crear-cadidato',
  templateUrl: './crear-cadidato.component.html',
  styleUrls: ['./crear-cadidato.component.css']
})
export class CrearCadidatoComponent implements OnInit {
  candidato: candidatoInterface = {}
  constructor() { }

  ngOnInit(): void { }

}
