import { Router } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { TableComponent } from './table.component';
import { GestionProductosService } from '../../services/gestion-productos.service';
import { ModalMessageService } from '../../services/modal-message.service';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;
  let mockGestionProductosService: any;
  let mockModalMessageService: any;
  let mockRouter: any;

  const mockData = [
    { id: "test-5", name: "test", description: "test", logo: "test", date_release: "2023-12-12T00:00:00.000+00:00", date_revision: "2024-12-12T00:00:00.000+00:00", dropdownOpen: false },
    { id: "test-2", name: "test", description: "test", logo: "test", date_release: "2023-11-12T00:00:00.000+00:00", date_revision: "2024-11-12T00:00:00.000+00:00", dropdownOpen: false }
  ];

  const mockItem = { id: "test-5", name: "test", description: "test", logo: "test", date_release: "2023-12-12T00:00:00.000+00:00", date_revision: "2024-12-12T00:00:00.000+00:00", dropdownOpen: false };

  beforeEach(() => {
    mockGestionProductosService = jasmine.createSpyObj(['dataSource', 'searchQuery', 'deleteProducts', 'getProducts']);
    mockGestionProductosService.dataSource = of(mockData);
    mockGestionProductosService.searchQuery = of('');
    mockModalMessageService = jasmine.createSpyObj(['setStateModal', 'open']);
    mockRouter = { navigate: jasmine.createSpy('navigate') };

    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      declarations: [TableComponent],
      providers: [
        { provide: GestionProductosService, useValue: mockGestionProductosService },
        { provide: ModalMessageService, useValue: mockModalMessageService },
        { provide: Router, useValue: mockRouter }
      ],
    });
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with data', () => {
    expect(component.datasource).toEqual(mockData);
    expect(component.originalData).toEqual(mockData);
    expect(component.filteredData).toEqual(mockData);
  });

  it('should toggle dropdown', () => {
    component.datasource = mockData;
    component.toggleDropdown(mockItem);

    expect(component.idActive).toBe(mockItem.id);
    expect(component.activeDropdown).toBe(mockItem);
    expect(mockItem.dropdownOpen).toBe(true);
  });

  it('should call editProduct and navigate to the edit page', () => {
    component.editProduct(mockItem);
    expect(mockRouter.navigate).toHaveBeenCalledWith([`productos/formulario-registro`, mockItem.id]);
  });

  // it('should filter data based on search query', () => {
  //   component.originalData = mockData;
  //   component.searchQuery = 'test';

  //   component.search();

  //   expect(component.filteredData.length).toBe(1);
  //   expect(component.filteredData[0].name).toContain('test');
  // });

  it('should paginate data correctly', () => {
    component.currentPage = 1;
    component.itemsPerPage = 1;

    component.filteredData = mockData;

    const paginatedData = component.getPaginatedData();

    expect(paginatedData.length).toBe(1);
    expect(paginatedData[0]).toEqual(mockData[0]);
  });

  // it('should increment currentPage when calling nextPage', () => {
  //   const initialPage = component.currentPage;
  //   component.total = 20; 
  //   component.itemsPerPage = 10;

  //   component.nextPage();

  //   expect(component.currentPage).toBe(initialPage + 1);
  // });

  it('should calculate total pages correctly', () => {
    component.itemsPerPage = 6;
    component.filteredData = mockData;

    const totalPages = component.getTotalPages();
    expect(totalPages).toBe(1);
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });

});
