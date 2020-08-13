import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-borrar-responsable',
  templateUrl: './borrar-responsable.component.html',
  styleUrls: ['./borrar-responsable.component.css']
})
export class BorrarResponsableComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
  }

}
