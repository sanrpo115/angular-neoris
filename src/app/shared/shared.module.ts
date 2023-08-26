import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { ErrorComponent } from "./components/error/error.component";
import { TableComponent } from './components/table/table.component';
import { GestionProductosService } from "./services/gestion-productos.service";
import { LoadingComponent } from './components/loading/loading.component';
import { ModalMessageComponent } from './components/modal-message/modal-message.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  providers: [
    GestionProductosService
  ],
  declarations: [
    ErrorComponent,
    TableComponent,
    LoadingComponent,
    ModalMessageComponent
  ],
  exports: [
    TableComponent,
    ErrorComponent,
    ModalMessageComponent,
    RouterModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class SharedModule { }