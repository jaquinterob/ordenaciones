import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../api.service'

@Component({
  selector: 'app-edit-candidato',
  templateUrl: './edit-candidato.component.html',
  styleUrls: ['./edit-candidato.component.css']
})
export class EditCandidatoComponent implements OnInit {
  id: string
  constructor(private _activeRoute: ActivatedRoute, private _api: ApiService) { }

  ngOnInit(): void {
    this.id = this._activeRoute.snapshot.params.id
    console.log(this.id);
  }

}
