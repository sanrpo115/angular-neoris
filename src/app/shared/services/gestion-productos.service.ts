import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ProductRepositoryApi } from 'src/app/core/infrastructure/api/product.repository.api';
import { enviroment } from 'src/enviroments/enviroment';
import * as moment from 'moment';
import { Product } from 'src/app/core/services/domain/models/product.model';
import { HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GestionProductosService {
  endpoint: string = enviroment.context;
  dataSource: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private productRepositoryApi: ProductRepositoryApi) { }

  getProducts(): void {
    this.productRepositoryApi.getProducts().subscribe(products => {
      products.forEach(product => {
        product.date_release = moment(product.date_release).format("YYYY-MM-DD");
        product.date_revision = moment(product.date_revision).format("YYYY-MM-DD");
      })
      this.dataSource.next(products);
    });
  }

  createProduct(product: Product): Promise<any> {
    return new Promise((resolve) => {
      this.productRepositoryApi.createProduct(product).subscribe((res: HttpResponse<any>) => {
        console.log("Create Product ::>", res)
        const response = { status: res.status, response: res.body };
        resolve(response);
      });
    });
  }


  verifyID(id: string): Observable<any> {
    return this.productRepositoryApi.verificationId(id);
  }

}
