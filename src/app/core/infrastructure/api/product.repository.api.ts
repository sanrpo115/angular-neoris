import { Injectable } from '@angular/core';
import { ApiService } from '../../data/api.service';
import { Observable } from 'rxjs';
import { enviroment } from 'src/enviroments/enviroment';
import { ProductRepository } from '../../services/domain/repositories/product.repository';
import { Product } from '../../services/domain/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductRepositoryApi implements ProductRepository {
  private endpoint = enviroment.context;

  constructor(private apiService: ApiService) { }

  getProducts(): Observable<Product[]> {
    return this.apiService.get(this.endpoint);
  }

  createProduct(product: Product): Observable<any> {
    return this.apiService.post(this.endpoint, product);
  }

  updateProduct(product: Product): Observable<any> {
    return this.apiService.put(this.endpoint, product);
  }

  deleteProduct(): Observable<any> {
    return this.apiService.delete(this.endpoint);
  }

  verificationId(): Observable<boolean> {
    return this.apiService.verify(this.endpoint);
  }

}
