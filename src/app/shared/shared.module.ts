import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { ErrorComponent } from "./components/error/error.component";
import { TableComponent } from './components/table/table.component';
import { GestionProductosService } from "./services/gestion-productos.service";
import { LoadingComponent } from './components/loading/loading.component';

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
  ],
  exports: [
    TableComponent,
    ErrorComponent,
    RouterModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class SharedModule { }