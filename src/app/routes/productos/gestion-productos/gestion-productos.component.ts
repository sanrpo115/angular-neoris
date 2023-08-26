import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { enviroment } from 'src/enviroments/enviroment';
import { GestionProductosService } from 'src/app/shared/services/gestion-productos.service';

@Component({
  selector: 'app-gestion-productos',
  templateUrl: './gestion-productos.component.html',
  styleUrls: ['./gestion-productos.component.scss']
})
export class GestionProductosComponent implements OnInit {
  dataRes: any = [];
  searchQuery: string = '';

  constructor (private router: Router,  private gestionProductosService: GestionProductosService ) { }

  ngOnInit(): void {
    this.consult();
  }
  
  consult(): void {
    this.gestionProductosService.getProducts();
  }

  navigateTo(): void {
    this.router.navigate([`${enviroment.context_path}/formulario-registro`]);
  }

  searchInput(): void {
    this.gestionProductosService.search(this.searchQuery)
  }

}
