import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { GestionProductosService } from './gestion-productos.service';
import { ApiService } from 'src/app/core/data/api.service';
import { ProductRepositoryApi } from 'src/app/core/infrastructure/api/product.repository.api';

import { of, throwError } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import * as moment from 'moment'; 

describe('GestionProductosService', () => {
  let service: GestionProductosService;
  let mockProductRepositoryApi: any;

  const mockProduct = { 
    id: "test-5", 
    name: "test", 
    description: "test", 
    logo: "test", 
    date_release: "2023-12-12T00:00:00.000+00:00", 
    date_revision: "2024-12-12T00:00:00.000+00:00"
  };

  beforeEach(() => {
    mockProductRepositoryApi = jasmine.createSpyObj(['getProducts', 'createProduct', 'updateProduct', 'deleteProduct', 'verificationId']);

    TestBed.configureTestingModule({
      providers: [
        GestionProductosService,
        { provide: ProductRepositoryApi, useValue: mockProductRepositoryApi },
      ],
    });

    service = TestBed.inject(GestionProductosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get products and update dataSource', () => {
    const mockProducts = [mockProduct];
    mockProductRepositoryApi.getProducts.and.returnValue(of(mockProducts));

    service.getProducts();

    expect(mockProductRepositoryApi.getProducts).toHaveBeenCalled();
    expect(service.dataSource.value).toEqual(mockProducts);
  });

  it('should create product', async () => {
    const mockResponse = new HttpResponse({ status: 200, body: { id: 'mockId' } });
    mockProductRepositoryApi.createProduct.and.returnValue(of(mockResponse));

    const response = await service.createProduct(mockProduct);

    expect(mockProductRepositoryApi.createProduct).toHaveBeenCalledWith(mockProduct);
    expect(response).toEqual({ status: 200, response: mockResponse.body });
  });

  it('should update product', async () => {
    const mockResponse = { id: 'mockId' };
    mockProductRepositoryApi.updateProduct.and.returnValue(of(mockResponse));

    const response = await service.updateProduct(mockProduct);

    expect(mockProductRepositoryApi.updateProduct).toHaveBeenCalledWith(mockProduct);
    expect(response).toEqual({ status: 200, response: mockResponse });
  });

  it('should delete product', async () => {
    const mockId = 'mockId';
    const mockResponse = { id: mockId };
    mockProductRepositoryApi.deleteProduct.and.returnValue(of(mockResponse));

    const response = await service.deleteProducts(mockId);

    expect(mockProductRepositoryApi.deleteProduct).toHaveBeenCalledWith(mockId);
    expect(response).toEqual({ status: 200, response: mockResponse });
  });

  it('should handle error during product deletion', async () => {
    const mockId = 'mockId';
    const mockErrorResponse = { status: 404, message: 'Not found' };
    mockProductRepositoryApi.deleteProduct.and.returnValue(throwError(mockErrorResponse));

    const response = await service.deleteProducts(mockId);

    expect(mockProductRepositoryApi.deleteProduct).toHaveBeenCalledWith(mockId);
    expect(response).toEqual({ status: mockErrorResponse.status, response: mockErrorResponse.message });
  });

  it('should verify ID', () => {
    const mockId = 'mockId';
    const mockResponse = { id: mockId };
    mockProductRepositoryApi.verificationId.and.returnValue(of(mockResponse));

    service.verifyID(mockId).subscribe(response => {
      expect(mockProductRepositoryApi.verificationId).toHaveBeenCalledWith(mockId);
      expect(response).toEqual(mockResponse);
    });
  });

  it('should update searchQuery', () => {
    const mockSearchValue = 'search';
    service.search(mockSearchValue);

    service.searchQuery.subscribe(value => {
      expect(value).toBe(mockSearchValue);
    });
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });
});
