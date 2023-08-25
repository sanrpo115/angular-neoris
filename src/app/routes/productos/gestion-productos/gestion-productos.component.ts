import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { enviroment } from 'src/enviroments/enviroment';

@Component({
  selector: 'app-gestion-productos',
  templateUrl: './gestion-productos.component.html',
  styleUrls: ['./gestion-productos.component.scss']
})
export class GestionProductosComponent {
  total: number = 0;

  constructor (private router: Router) { }

  navigateTo(): void {
    console.log('navigateTo')
    this.router.navigate([`${enviroment.context_path}/formulario-registro`]);
  }

}
