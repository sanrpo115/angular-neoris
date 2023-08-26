import { Router } from '@angular/router';
import { Component, HostListener, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { COLUMNS_TABLE } from '../../constants/constants';
import { enviroment } from 'src/enviroments/enviroment';
import { GestionProductosService } from '../../services/gestion-productos.service';
import { ModalMessageService } from '../../services/modal-message.service';

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

export class TableComponent implements OnInit {
  show: boolean = false;
  idActive: string = '';
  activeDropdown: DataItem | null = null;
  columns = Object.values(COLUMNS_TABLE);
  propsColumns = Object.keys(COLUMNS_TABLE)
  datasource: DataItem[] = [];
  subscriptions: Subscription = new Subscription();

  constructor(private router: Router, private gestionProductosService: GestionProductosService, private modalMessageService: ModalMessageService) {
    this.subscriptions = this.gestionProductosService.dataSource.subscribe((res: DataItem[]) => {
      this.datasource = res;
    });
  }

  ngOnInit(): void {
    if(this.datasource && this.datasource.length > 0) {
      this.datasource.map(x => x.dropdownOpen = false);
    }
  }

  toggleDropdown(item: DataItem) {
    if (item.id !== this.idActive) {
      this.datasource.map(x => x.dropdownOpen = false);
      this.idActive = item.id;
      this.activeDropdown = item;
      item.dropdownOpen = !item.dropdownOpen;
    }
  }

  @HostListener('window:click', ['$event'])
  onWindowClick(element: Event) {
    const target = element.target as HTMLInputElement;
    if (!target.classList.contains('actions') && this.activeDropdown !== null) {
      let index = this.datasource.findIndex((x : DataItem) => x.id === this.idActive);
      this.datasource[index].dropdownOpen = !this.activeDropdown.dropdownOpen;
      this.activeDropdown = null;
    }
  }

  editProduct(data: DataItem) {
    this.router.navigate([`${enviroment.context_path}/formulario-registro`, data.id])
  }

  deleteRow(id: string) {
    return new Promise(async (resolve, reject) => {
      const response = await this.gestionProductosService.deleteProducts(id);
      if (response.status === 200) {
        this.modalMessageService.setStateModal(response.status);
        this.modalMessageService.open();
        this.gestionProductosService.getProducts();
      } else {
        this.modalMessageService.setStateModal('warning');
        this.modalMessageService.open();
      }
      resolve(response);
    });
  }

}
