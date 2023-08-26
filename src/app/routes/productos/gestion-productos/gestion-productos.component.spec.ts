import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GestionProductosComponent } from './gestion-productos.component';
import { GestionProductosService } from 'src/app/shared/services/gestion-productos.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { TableComponent } from 'src/app/shared/components/table/table.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';


describe('GestionProductosComponent', () => {
  let component: GestionProductosComponent;
  let fixture: ComponentFixture<GestionProductosComponent>;
  let mockRouter: any;
  let mockGestionProductosService: any;

  beforeEach(async () => {
    mockRouter = {
      navigate: jasmine.createSpy('navigate')
    };

    mockGestionProductosService = jasmine.createSpyObj(['getProducts', 'search']);

    await TestBed.configureTestingModule({
      imports: [ 
        RouterTestingModule
      ],
      declarations: [GestionProductosComponent],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: GestionProductosService, useValue: mockGestionProductosService },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call consult on ngOnInit', () => {
    spyOn(component, 'consult');
    component.ngOnInit();
    expect(component.consult).toHaveBeenCalled();
  });

  it('should call getProducts when consult is called', () => {
    component.consult();
    expect(mockGestionProductosService.getProducts).toHaveBeenCalled();
  });

  it('should navigate to formulario-registro', () => {
    component.navigateTo();
    expect(mockRouter.navigate).toHaveBeenCalledWith([`productos/formulario-registro`]);
  });

  it('should call search with searchQuery', () => {
    component.searchQuery = 'product';
    component.searchInput();
    expect(mockGestionProductosService.search).toHaveBeenCalledWith('product');
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });
  
});
