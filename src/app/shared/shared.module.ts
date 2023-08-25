import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";
import { ErrorComponent } from "./components/error/error.component";
import { RouterModule } from "@angular/router";
import {  } from "@angular/compiler";
import { TableComponent } from './components/table/table.component';
import { CommonModule } from "@angular/common";

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    ErrorComponent,
    TableComponent
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