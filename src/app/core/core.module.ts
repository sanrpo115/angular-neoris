import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { ApiService } from "./data/api.service";
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ProductRepositoryApi } from './infrastructure/api/product.repository.api';
import { HttpInterceptRequestService } from './http-interceptor/interceptor-request.service';

@NgModule({ 
  imports: [ 
    CommonModule,
    HttpClientModule
  ],
  providers: [
    ApiService,
    ProductRepositoryApi,
    { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptRequestService, multi: true }
  ],
  declarations: []
})

export class CoreModule { }