import { Observable } from 'rxjs';
import { Product } from "../models/product.model";

export interface ProductRepository {
  getProducts(): Observable<Product[]>
  createProduct(product: Product): Observable<any>;
  updateProduct(product: Product): Observable<any>;
  deleteProduct(id: string): Observable<any>;
  verificationId(id: string): Observable<boolean>;
}