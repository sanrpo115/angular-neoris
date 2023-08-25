import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { GestionProductosService } from './gestion-productos.service';
import { ApiService } from 'src/app/core/data/api.service';
import { ProductRepositoryApi } from 'src/app/core/infrastructure/api/product.repository.api';

// describe('GestionProductosService', () => {
//   let service: GestionProductosService;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports: [
//         HttpClientTestingModule
//       ],
//       providers: [
//         ApiService,
//         ProductRepositoryApi
//       ]
//     });
//     service = TestBed.inject(GestionProductosService);
//   });

//   it('should be created', () => {
//     expect(service).toBeTruthy();
//   });
// });
