import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { HeaderComponent } from "./header/header.component";
import { LayoutComponent } from "./layout.component";

@NgModule({
  declarations: [
    LayoutComponent,
    HeaderComponent
  ],
  exports: [
    LayoutComponent,
    HeaderComponent
  ]
})
export class LayoutModule { }