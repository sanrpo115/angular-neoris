import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FIELDS_FORM } from 'src/app/shared/constants/constants';
import { HelperFunctions } from 'src/app/shared/utils/helper-functions';
import { enviroment } from 'src/enviroments/enviroment';

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
  }

  ngOnInit(): void {
    this.formConfiguration = FIELDS_FORM.fields;
  }

  createFormGroup(): FormGroup {
    return this.fb.group({
      id: this.fb.control('', Validators.required),
      name: this.fb.control('', Validators.required),
      description: this.fb.control('', Validators.required),
      logo: this.fb.control('', Validators.required),
      date_release: this.fb.control(HelperFunctions.getFormatDate(0), Validators.required),
      date_revision: this.fb.control({ value: HelperFunctions.getFormatDate(enviroment.days_for_review), disabled: true })
    });
  }

  getCurrentDate(days: number): string {
    return HelperFunctions.getFormatDate(days);
  }

  isFieldDisabled(disabled: boolean): boolean {
    return disabled;
  }

  resetFields(): void {
    console.log('resetFields');
  }

  onSubmit(): void {
    console.log('enviar');
  }

}
