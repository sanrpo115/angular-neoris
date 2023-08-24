import { RouterModule, Routes } from "@angular/router";
import { LayoutComponent } from "../layout/layout.component";
import { ErrorComponent } from "../shared/components/error/error.component";
import { NgModel } from "@angular/forms";
import { NgModule } from "@angular/core";

export const APP_ROUTES: Routes = [
  { path: '', component: LayoutComponent },
  { path: '**', component: ErrorComponent }
]

@NgModule({
  imports: [
    RouterModule.forRoot(APP_ROUTES, {useHash: false})
  ],
  declarations: []
})


export class RoutesModule { }