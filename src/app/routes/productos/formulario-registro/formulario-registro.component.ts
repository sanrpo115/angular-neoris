import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { FIELDS_FORM } from 'src/app/shared/constants/constants';

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
      id: this.fb.control(''),
      name: this.fb.control(''),
      description: this.fb.control(''),
      logo: this.fb.control(''),
      date_release: this.fb.control(''),
      date_revision: this.fb.control('')
    });
  }

}
