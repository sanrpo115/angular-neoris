import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LayoutComponent } from "../layout/layout.component";
import { ErrorComponent } from "../shared/components/error/error.component";
import { SharedModule } from "../shared/shared.module";

export const APP_ROUTES: Routes = [
  { path: '', 
    component: LayoutComponent, 
    children: [
      { path: '', redirectTo: 'productos', pathMatch: 'full' },
      { path: 'productos', loadChildren: () => import('./productos/productos.module').then(m => m.GestionProductosModule )}
    ]
  },
  { path: 'not-found', component: ErrorComponent },
  { path: '**', redirectTo: 'not-found' }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forRoot(APP_ROUTES, {useHash: false})
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})


export class RoutesModule { }