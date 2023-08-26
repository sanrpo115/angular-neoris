import { TestBed } from '@angular/core/testing';
import { ApiService } from './api.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CommonModule } from '@angular/common';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        HttpClientTestingModule
      ],
      providers: [
        ApiService
      ]
    });
    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send GET request', () => {
    const endpoint = 'test';
    const responseData = { message: 'Test response' };

    service.get(endpoint).subscribe((response) => {
      expect(response).toEqual(responseData);
    });

    const req = httpMock.expectOne(`${service['urlBase']}/${endpoint}`);
    expect(req.request.method).toBe('GET');
    req.flush(responseData);
  });

  it('should send POST request', () => {
    const endpoint = 'test';
    const requestData = { data: 'Test data' };
    const responseData = { message: 'Test response' };

    service.post(endpoint, requestData).subscribe((response) => {
      expect(response.body).toEqual(responseData);
    });

    const req = httpMock.expectOne(`${service['urlBase']}/${endpoint}`);
    expect(req.request.method).toBe('POST');
    req.flush(responseData);
  });

  it('should send PUT request', () => {
    const endpoint = 'test';
    const requestData = { data: 'Test data' };
    const responseData = { message: 'Test response' };

    service.put(endpoint, requestData).subscribe((response) => {
      expect(response.body).toEqual(responseData);
    });

    const req = httpMock.expectOne(`${service['urlBase']}/${endpoint}`);
    expect(req.request.method).toBe('PUT');
    req.flush(responseData);
  });

  it('should send DELETE request', () => {
    const endpoint = 'test';
    const responseData = { message: 'Test response' };

    service.delete(endpoint).subscribe((response) => {
      expect(response).toEqual(responseData);
    });

    const req = httpMock.expectOne(`${service['urlBase']}/${endpoint}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(responseData);
  });

  it('should send VERIFY request', () => {
    const endpoint = 'test';
    const responseData = { message: 'Test response' };

    service.verify(endpoint).subscribe((response) => {
      expect(response).toEqual(responseData);
    });

    const req = httpMock.expectOne(`${service['urlBase']}/${endpoint}`);
    expect(req.request.method).toBe('GET');
    req.flush(responseData);
  });



});
