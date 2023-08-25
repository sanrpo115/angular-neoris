import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { FormularioRegistroComponent } from './formulario-registro.component';
import { FIELDS_FORM } from 'src/app/shared/constants/constants';
import { HelperFunctions } from 'src/app/shared/utils/helper-functions';
import { enviroment } from 'src/enviroments/enviroment';
import * as moment from 'moment';

describe('FormularioRegistroComponent', () => {
  let mockRouter: any;
  let mockActivatedRoute: any;
  let component: FormularioRegistroComponent;
  let fixture: ComponentFixture<FormularioRegistroComponent>;

  beforeEach(() => {
    mockRouter = {
      navigate: jasmine.createSpy('navigate')
    };

    mockActivatedRoute = {
      paramMap: of({ get: () => '123' })
    };

    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [FormularioRegistroComponent],
      providers: [
        FormBuilder,
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    });
    fixture = TestBed.createComponent(FormularioRegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form and subscribe to valueChanges', () => {
    expect(component.form).toBeDefined();
    expect(component.form.get('date_release')).toBeDefined();

    spyOn(component, 'onControlDateValueChanges');
    component.form.get('date_release')?.setValue('2023-08-24');
    expect(component.onControlDateValueChanges).toHaveBeenCalledWith('2023-08-24');
  });

  it('should set formConfiguration on ngOnInit', () => {
    component.ngOnInit();
    expect(component.formConfiguration).toEqual(FIELDS_FORM.fields);
  });

  it('should create form group with validators', () => {
    const formGroup: FormGroup = component.createFormGroup();
    expect(formGroup).toBeTruthy();
    expect(formGroup.get('id')).toBeTruthy();
    expect(formGroup.get('name')).toBeTruthy();
    expect(formGroup.get('description')).toBeTruthy();
    expect(formGroup.get('logo')).toBeTruthy();
    expect(formGroup.get('date_release')).toBeTruthy();
    expect(formGroup.get('date_revision')).toBeTruthy();
  });

  it('should return formatted current date', () => {
    const currentDate = component.getCurrentDate(0);
    const expectedDate = HelperFunctions.getFormatDate(
      HelperFunctions.getFormatDate(moment().format('YYYY-MM-DD'), 0),
      0
    );
    expect(currentDate).toBe(expectedDate);
  });

  it('should disable field based on input', () => {
    const disabled = component.isFieldDisabled(true);
    expect(disabled).toBeTrue();
  });

  it('should update date_revision on date_release change', () => {
    component.onControlDateValueChanges('2023-08-24');
    const updatedDate = HelperFunctions.getFormatDate(
      HelperFunctions.getFormatDate('2023-08-24', 0),
      enviroment.days_for_review
    );
    expect(component.form.get('date_revision')?.value).toBe(updatedDate);
  });

  it('should reset form', () => {
    spyOn(console, 'log');
    component.resetFields();
    expect(console.log).toHaveBeenCalledWith('resetFields');
    expect(component.form.pristine).toBeTrue();
  });

  it('should log "valido" if form is valid', () => {
    component.form.setValue({
      id: '123',
      name: 'Test Name',
      description: 'Test Description',
      logo: 'https://example.com/logo.png',
      date_release: '2023-08-24',
      date_revision: '2023-08-25'
    });
    spyOn(console, 'log');
    component.sendForm();
    expect(console.log).toHaveBeenCalledWith('valido');
  });

  it('should log "NO valido" if form is not valid', () => {
    spyOn(console, 'log');
    component.sendForm();
    expect(console.log).toHaveBeenCalledWith('NO valido');
  });

});
