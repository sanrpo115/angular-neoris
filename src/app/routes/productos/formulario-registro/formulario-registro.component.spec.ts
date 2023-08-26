import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { FormularioRegistroComponent } from './formulario-registro.component';
import { HelperFunctions } from 'src/app/shared/utils/helper-functions';
import { GestionProductosService } from '../../../shared/services/gestion-productos.service';
import { ModalMessageService } from '../../../shared/services/modal-message.service';
import * as moment from 'moment';

describe('FormularioRegistroComponent', () => {
  let component: FormularioRegistroComponent;
  let fixture: ComponentFixture<FormularioRegistroComponent>;
  let mockGestionProductosService: any;
  let mockModalMessageService: any;
  let mockRouter: any;
  let mockActivatedRoute: any;

  const mockData = [
    { id: "test-5", name: "test", description: "test", logo: "test", date_release: "2023-12-12T00:00:00.000+00:00", date_revision: "2024-12-12T00:00:00.000+00:00" },
    { id: "test-2", name: "test", description: "test", logo: "test", date_release: "2023-11-12T00:00:00.000+00:00", date_revision: "2024-11-12T00:00:00.000+00:00"  }
  ];

  beforeEach(async () => {
    mockGestionProductosService = jasmine.createSpyObj(['dataSource', 'verifyID', 'createProduct', 'updateProduct']);
    mockGestionProductosService.dataSource = of([]);
    mockGestionProductosService.verifyID.and.returnValue(of(false));
    mockGestionProductosService.createProduct.and.returnValue({ status: 200 });
    mockGestionProductosService.updateProduct.and.returnValue({ status: 200 });
    mockModalMessageService = jasmine.createSpyObj(['setStateModal', 'open']);
    mockRouter = { navigate: jasmine.createSpy('navigate') };
    // mockActivatedRoute = { paramMap: of({ has: () => false }) };
    mockActivatedRoute = {
      paramMap: of({ has: (param: string) => param === 'id' }),
      snapshot: {
        paramMap: {
          get: (param: string) => 'mock_id'
        }
      }
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [FormularioRegistroComponent],
      providers: [
        { provide: GestionProductosService, useValue: mockGestionProductosService },
        { provide: ModalMessageService, useValue: mockModalMessageService },
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
    }).compileComponents();
  });
  
  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioRegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form and formConfiguration', () => {
    expect(component.form).toBeDefined();
    expect(component.formConfiguration).toBeDefined();
  });

  it('should handle paramMap without data source', () => {
    component.datasource = [];

    spyOn(component, 'getFormValues');
    spyOn(component, 'removeParams');

    component.ngOnInit();

    expect(component.getFormValues).not.toHaveBeenCalled();
    expect(component.removeParams).toHaveBeenCalled();
  });

  it('should navigate to the specified route', () => {
    component.removeParams();

    expect(mockRouter.navigate).toHaveBeenCalledWith(['/productos/formulario-registro'], {
      relativeTo: mockActivatedRoute,
    });
  }); 

  it('should return the value of disabled parameter', () => {
    const disabled = true;
    const result = component.isFieldDisabled(disabled);
    expect(result).toBe(disabled);
  });

  it('should update date_revision when date_release changes', () => {
    const mockValue = new Date('2023-08-26');
    component.form.get('date_release')?.setValue(mockValue);

    const formattedDate = moment(mockValue).format('YYYY-MM-DD');
    const expectedDate = HelperFunctions.getFormatDate(formattedDate, 366);

    expect(component.form.get('date_revision')?.value).toEqual(expectedDate);
  });

  it('should reset the form', () => {
    const mockFormValues = {
      id: '123',
      name: 'Product Name',
      description: 'Product Description',
      logo: 'product-logo.png',
      date_release: '2023-08-26',
      date_revision: '2023-08-28',
    };

    component.form.patchValue(mockFormValues);
    component.resetFields();

    expect(component.form.value).toEqual({
      id: null,
      name: null,
      description: null,
      logo: null,
      date_release: null,
      date_revision: null,
    });
  });

  it('should navigate to gestion-productos on goBack', () => {
    component.goBack();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/productos/gestion-productos'], { relativeTo: mockActivatedRoute });
  });


  afterEach(() => {
    TestBed.resetTestingModule();
  });

});