import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { enviroment } from 'src/enviroments/enviroment';
import { Product } from 'src/app/core/services/domain/models/product.model';
import { ProductRepositoryApi } from 'src/app/core/infrastructure/api/product.repository.api';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class GestionProductosService {
  endpoint: string = enviroment.context;
  dataSource: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  searchQuery: BehaviorSubject<string> = new BehaviorSubject<string>('');

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
        const response = { status: res.status, response: res.body };
        resolve(response);
      });
    });
  }

  updateProduct(product: Product): Promise<any> {
    return new Promise((resolve) => {
      this.productRepositoryApi.updateProduct(product).subscribe((res: any) => {
        const response = { status: res && res.id ? 200 : 401, response: res };
        resolve(response);
      });
    });
  }
  
  deleteProducts(id: string): Promise<any> {
    return new Promise((resolve) => {
      this.productRepositoryApi.deleteProduct(id).subscribe(
        (res: any) => {
          console.log("Product deleted", res);
          const response = { status: res && res.id ? 200 : 401, response: res };
          resolve(response);
        },
        (error: any) => {
          console.log("Error deleting product", error);
          const response = { status: error.status || 500, response: error.message || 'An error occurred' };
          resolve(response);
        }
      );
    });
  }

  verifyID(id: string): Observable<any> {
    return this.productRepositoryApi.verificationId(id);
  }

  search(value: string): void {
    this.searchQuery.next(value);
  }

}
