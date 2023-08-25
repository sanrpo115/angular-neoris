import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CommonModule } from "@angular/common";
import { SharedModule } from "src/app/shared/shared.module";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GestionProductosComponent } from "./gestion-productos/gestion-productos.component";
import { FormularioRegistroComponent } from './formulario-registro/formulario-registro.component';

const ADMIN_ROUTES: Routes = [
  { path: 'gestion-productos', component: GestionProductosComponent },
  { path: 'formulario-registro', component: FormularioRegistroComponent },
  { path: 'formulario-registro/:id', component: FormularioRegistroComponent },
  { path: '**', redirectTo: 'gestion-productos' },
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(ADMIN_ROUTES),
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    GestionProductosComponent,
    FormularioRegistroComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})

export class GestionProductosModule { }