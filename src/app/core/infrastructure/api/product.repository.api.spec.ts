import { TestBed } from '@angular/core/testing';
import { ProductRepositoryApi } from './product.repository.api';
import { ApiService } from '../../data/api.service';
import { of } from 'rxjs';
import { Product } from '../../services/domain/models/product.model';

describe('ProductRepositoryApi', () => {
  let productRepository: ProductRepositoryApi;
  let mockApiService: any;
  const mockData = [
    { id: "test-5", name: "test", description: "test", logo: "test", date_release: "2023-12-12T00:00:00.000+00:00", date_revision: "2024-12-12T00:00:00.000+00:00" },
    { id: "test-2", name: "test", description: "test", logo: "test", date_release: "2023-11-12T00:00:00.000+00:00", date_revision: "2024-11-12T00:00:00.000+00:00" }
  ];

  beforeEach(() => {
    mockApiService = jasmine.createSpyObj(['get', 'post', 'put', 'delete', 'verify']);
    TestBed.configureTestingModule({
      providers: [
        ProductRepositoryApi,
        { provide: ApiService, useValue: mockApiService },
      ],
    });
    productRepository = TestBed.inject(ProductRepositoryApi);
  });

  it('should retrieve products from ApiService', () => {
    mockApiService.get.and.returnValue(of(mockData));

    const products$ = productRepository.getProducts();

    products$.subscribe((products) => {
      expect(products).toEqual(mockData);
    });
  });

  it('should create a product using ApiService', () => {
    mockApiService.post.and.returnValue(of(mockData));
    const createProduct$ = productRepository.createProduct(mockData[0]);

    createProduct$.subscribe((response) => {
      expect(response).toEqual(mockData);
    });
  });

  it('should update a product using ApiService', () => {
    const mockProduct: Product = mockData[0];
    mockApiService.put.and.returnValue(of(mockProduct));
    const updateProduct$ = productRepository.updateProduct(mockProduct);

    updateProduct$.subscribe((response) => {
      expect(response).toEqual(mockProduct);
    });
    expect(mockApiService.put).toHaveBeenCalledWith('products', mockProduct);
  });

  it('should verify id using ApiService', () => {
    const mockId = '123';
    const mockResponse = true;
    mockApiService.verify.and.returnValue(of(mockResponse));

    const verification$ = productRepository.verificationId(mockId);

    verification$.subscribe((response) => {
      expect(response).toEqual(mockResponse);
      expect(mockApiService.verify).toHaveBeenCalledWith(`products/verification?id=${mockId}`);
    });
  });

});
