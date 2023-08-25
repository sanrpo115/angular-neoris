import { Router } from '@angular/router';
import { Component, HostListener } from '@angular/core';
import { Subscription } from 'rxjs';
import { COLUMNS_TABLE } from '../../constants/constants';
import { enviroment } from 'src/enviroments/enviroment';
import { GestionProductosService } from '../../services/gestion-productos.service';

interface DataItem {
  id: string;
  name: string;
  description: string;
  logo: string;
  date_release: string | Date;
  date_revision: string | Date;
  dropdownOpen: boolean;
  [key: string]: string | Date | boolean;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})

export class TableComponent {
  show: boolean = false;
  idActive: string = '';
  activeDropdown: DataItem | null = null;
  columns = Object.values(COLUMNS_TABLE);
  propsColumns = Object.keys(COLUMNS_TABLE)
  datasource: DataItem[] = [];
  subscriptions: Subscription = new Subscription();

  constructor(private router: Router, private gestionProductosService: GestionProductosService) {
    this.subscriptions = this.gestionProductosService.dataSource.subscribe((res: DataItem[]) => {
      this.datasource = res;
    });
  }

  toggleDropdown(item: DataItem) {
    this.idActive = item.id;
    this.activeDropdown = item;
    item.dropdownOpen = !item.dropdownOpen;
  }

  @HostListener('window:click', ['$event'])
  onWindowClick(element: Event) {
    const target = element.target as HTMLInputElement;
    if (!target.classList.contains('actions') && this.activeDropdown !== null) {
      let index = this.datasource.findIndex((x : DataItem) => x.id === this.idActive);
      this.datasource[index].dropdownOpen = !this.activeDropdown.dropdownOpen;
    }
  }

  editProduct(data: DataItem) {
    console.log('editar', data);
    this.router.navigate([`${enviroment.context_path}/formulario-registro`, data.id])
  }

  deleteProduct(data: DataItem) {
    console.log('eliminar', data);
  }

}
