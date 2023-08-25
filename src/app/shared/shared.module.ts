import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { ErrorComponent } from "./components/error/error.component";
import { TableComponent } from './components/table/table.component';
import { InputDateComponent } from './components/input-date/input-date.component';
import { InputTextComponent } from './components/input-text/input-text.component';
import { InputUrlComponent } from './components/input-url/input-url.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    ErrorComponent,
    TableComponent,
    InputDateComponent,
    InputTextComponent,
    InputUrlComponent
  ],
  exports: [
    TableComponent,
    InputDateComponent,
    InputTextComponent,
    InputUrlComponent,
    ErrorComponent,
    RouterModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class SharedModule { }