import { Router } from '@angular/router';
import { Component, HostListener } from '@angular/core';
import { COLUMNS_TABLE } from '../../constants/constants';
import { enviroment } from 'src/enviroments/enviroment';

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
  datasource: DataItem[] = [
    { id: "idTest5", name: "TestName5", description: "Description 5", logo: "https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg", date_release: "2023-08-02T00:00:00.000+00:00", date_revision: "2024-08-02T00:00:00.000+00:00", dropdownOpen: false },
    { id: "idTest7", name: "TestName 7", description: "Description 7", logo: "https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg", date_release: "2023-07-28T00:00:00.000+00:00", date_revision: "2024-07-28T00:00:00.000+00:00", dropdownOpen: false },
    { id: "plc-acc", name: "Póliza Ahorro", description: "Póliza Ahorro Programado", logo: "https://www.cooprio.fin.ec/info/images/PLAZO-FIJO-WEB.jpg", date_release: "2023-08-04T00:00:00.000+00:00", date_revision: "2024-08-04T00:00:00.000+00:00", dropdownOpen: false },
    { id: "trj-cred", name: "Tarjeta de crédito visa", description: "Tarjeta credito", logo: "https://www.cooprio.fin.ec/info/images/PLAZO-FIJO-WEB.jpg", date_release: "2023-09-20T00:00:00.000+00:00", date_revision: "2024-09-20T00:00:00.000+00:00", dropdownOpen: false },
    { id: "plc-acc-1", name: "Póliza A Programado aa", description: "Póliza Programado Description", logo: "https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg", date_release: "2025-08-03T00:00:00.000+00:00", date_revision: "2026-08-03T00:00:00.000+00:00", dropdownOpen: false },
    { id: "test-8", name: "Prueba 8", description: "Tarjeta de consumo bajo la modalidad de crédito", logo: "https://i.ytimg.com/vi/oruCimr-1uI/maxresdefault.jpg", date_release: "2023-12-12T00:00:00.000+00:00", date_revision: "2024-12-12T00:00:00.000+00:00", dropdownOpen: false },
    { id: "test-123", name: "aaa", description: "descripción de la prueba", logo: "https://www.cooprio.fin.ec/info/images/PLAZO-FIJO-WEB.jpg", date_release: "2023-12-12T00:00:00.000+00:00", date_revision: "2024-12-12T00:00:00.000+00:00", dropdownOpen: false },
    { id: "test-300", name: "Spa test", description: "Spa description test", logo: "https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay With Visa/Tarjetas/visa-signature-400x225.jpg", date_release: "2023-12-11T00:00:00.000+00:00", date_revision: "2024-12-11T00:00:00.000+00:00", dropdownOpen: false },
    { id: "tst", name: "test", description: "prueba", logo: "https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay With Visa/Tarjetas/visa-signature-400x225.jpg", date_release: "2023-12-12T00:00:00.000+00:00", date_revision: "2024-12-12T00:00:00.000+00:00", dropdownOpen: false },
    { id: "test-50", name: "test50", description: "test 50", logo: "https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay With Visa/Tarjetas/visa-signature-400x225.jpg", date_release: "2023-12-12T00:00:00.000+00:00", date_revision: "2024-12-12T00:00:00.000+00:00", dropdownOpen: false },
    { id: "test-258", name: "test 258", description: "prueba test", logo: "https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay With Visa/Tarjetas/visa-signature-400x225.jpg", date_release: "2023-11-12T00:00:00.000+00:00", date_revision: "2024-11-12T00:00:00.000+00:00", dropdownOpen: false }
  ];

  constructor(private router: Router) {}

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
