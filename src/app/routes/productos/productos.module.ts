import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { GestionProductosComponent } from "./gestion-productos/gestion-productos.component";
import { SharedModule } from "src/app/shared/shared.module";
import { ErrorComponent } from "src/app/shared/components/error/error.component";
import { BrowserModule } from "@angular/platform-browser";
import { CommonModule } from "@angular/common";

const ADMIN_ROUTES: Routes = [
  { path: '**', redirectTo: 'gestion-productos' },
  { path: 'gestion-productos', component: GestionProductosComponent }
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(ADMIN_ROUTES)
  ],
  exports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    GestionProductosComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})

export class GestionProductosModule { }