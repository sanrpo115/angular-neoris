import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { enviroment } from 'src/enviroments/enviroment';
import { GestionProductosService } from 'src/app/shared/services/gestion-productos.service';

@Component({
  selector: 'app-gestion-productos',
  templateUrl: './gestion-productos.component.html',
  styleUrls: ['./gestion-productos.component.scss']
})
export class GestionProductosComponent implements OnInit {
  total: number = 0;
  dataRes: any = [];
  subscriptions: Subscription = new Subscription();

  constructor (private router: Router,  private gestionProductosService: GestionProductosService ) {
    this.subscriptions = this.gestionProductosService.dataSource.subscribe((res:any) => {
      if (res && res.length)
        this.total = res.length;
    });
  }

  ngOnInit(): void {
    this.consult();
  }
  
  consult(): void {
    this.gestionProductosService.getProducts();
  }

  navigateTo(): void {
    this.router.navigate([`${enviroment.context_path}/formulario-registro`]);
  }

}
