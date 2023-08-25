import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as moment from 'moment';
import { enviroment } from 'src/enviroments/enviroment';
import { FIELDS_FORM } from 'src/app/shared/constants/constants';
import { HelperFunctions } from 'src/app/shared/utils/helper-functions';

@Component({
  selector: 'app-formulario-registro',
  templateUrl: './formulario-registro.component.html',
  styleUrls: ['./formulario-registro.component.scss']
})
export class FormularioRegistroComponent {
  formConfiguration = new Array();
  form: FormGroup;

  constructor(private router: Router, private fb: FormBuilder) {
    this.form = this.createFormGroup();
    this.form.get('date_release')?.valueChanges.subscribe(newValue => {
      this.onControlDateValueChanges(newValue);
    })
  }

  ngOnInit(): void {
    this.formConfiguration = FIELDS_FORM.fields;
  }

  createFormGroup(): FormGroup {
    const today = moment().format('YYYY-MM-DD');
    return this.fb.group({
      id: this.fb.control('', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]),
      name: this.fb.control('', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]),
      description: this.fb.control('', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]),
      logo: this.fb.control('', [Validators.required, Validators.pattern(/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/)]),
      date_release: this.fb.control(HelperFunctions.getFormatDate(today, 0), Validators.required),
      date_revision: this.fb.control(HelperFunctions.getFormatDate(today, enviroment.days_for_review), Validators.required)
    });
  }

  getCurrentDate(days: number): string {
    const today = days === 0 ? moment().format('YYYY-MM-DD') : '';
    return HelperFunctions.getFormatDate(today, days);
  }

  isFieldDisabled(disabled: boolean): boolean {
    return disabled;
  }

  onControlDateValueChanges(value: any) {
    if (value !== '' && value !== null) {
      const newDate = moment(value).format('YYYY-MM-DD');
      this.form.get('date_revision')?.setValue(HelperFunctions.getFormatDate(newDate, enviroment.days_for_review));
    }
  }

  resetFields(): void {
    console.log('resetFields');
    this.form.reset();
  }

  sendForm(): void {
    if (this.form.valid) {
      console.log('valido');
    } else {
      console.log('NO valido');

    }
  }

}
