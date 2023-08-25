import { Injectable } from '@angular/core';
import { ProductRepositoryApi } from 'src/app/core/infrastructure/api/product.repository.api';
import { enviroment } from 'src/enviroments/enviroment';
import { HttpHeaders, HttpClient } from '@angular/common/http';

const headers = new HttpHeaders()
  .set('authorId', '2')
  .set('content-type', 'application/json');

@Injectable({
  providedIn: 'root'
})
export class GestionProductosService {
  endpoint: string = enviroment.context;
  dataSource: any = []

  constructor(private productRepositoryApi: ProductRepositoryApi, private http: HttpClient) {
  }

  getProducts(): void {
     this.productRepositoryApi.getProducts().subscribe(products => {
      console.log("Observable http:", products)
    })
  }


}
