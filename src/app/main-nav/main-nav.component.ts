import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent implements OnInit {
  puedeEditar: boolean
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private _api: ApiService, private _router: Router) {
    this._api.usuarioPuedeEditar().subscribe(
      data => {
        this.puedeEditar = data['puedeEditar']
      }
    )
  }
  ngOnInit() {


  }
  async cerrarSesion() {
    await localStorage.removeItem('ordenaciones')
    await localStorage.removeItem('idUsuario')
    this._router.navigate(['/login'])
  }
}
