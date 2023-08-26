import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { enviroment } from 'src/enviroments/enviroment';
import { FIELDS_FORM } from 'src/app/shared/constants/constants';
import { HelperFunctions } from 'src/app/shared/utils/helper-functions';
import { ModalMessageService } from 'src/app/shared/services/modal-message.service';
import { GestionProductosService } from 'src/app/shared/services/gestion-productos.service';
import * as moment from 'moment';

@Component({
  selector: 'app-formulario-registro',
  templateUrl: './formulario-registro.component.html',
  styleUrls: ['./formulario-registro.component.scss']
})
export class FormularioRegistroComponent implements OnInit {
  formConfiguration = new Array();
  form: FormGroup;
  isEdit: boolean = false;
  idActive: any = '' || null;
  modalOpen: boolean = false;
  datasource: any = [];
  subscriptions: Subscription = new Subscription();

  constructor(
    private router: Router,
    private fb: FormBuilder, 
    private route: ActivatedRoute,
    private gestionProductosService: GestionProductosService, 
    private modalMessageService: ModalMessageService
  ) {
    this.subscriptions = this.gestionProductosService.dataSource.subscribe((res:any) => {
      if (res)
        this.datasource = res;
    });
    this.form = this.createFormGroup();
  }
  
  ngOnInit(): void {
    this.formConfiguration = FIELDS_FORM.fields;
    this.form.get('date_release')?.valueChanges.subscribe(newValue => {
      this.onControlDateValueChanges(newValue);
    })
    this.route.paramMap.subscribe(params => {
      if (this.datasource.length) {
        this.getFormValues(params);
      } else {
        this.removeParams();
      }
    });
  }

  getFormValues(params: any): void {
    if (params.has('id')) {
      this.isEdit = true;
      this.idActive = params.get('id');
      const values = this.datasource.find((x: any) => x.id === this.idActive);
      this.form.patchValue({
        id: values.id,
        name: values.name,
        description: values.description,
        logo: values.logo,
        date_release: values.date_release,
        date_revision: values.date_revision
      });
    }
  }

  removeParams(): void {
    this.router.navigate(['/productos/formulario-registro'], { relativeTo: this.route })
  }

  createFormGroup(): FormGroup {
    const today = moment().format('YYYY-MM-DD');
    return this.fb.group({
      id: this.fb.control('', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]),
      name: this.fb.control('', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]),
      description: this.fb.control('', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]),
      logo: this.fb.control('', [Validators.required]),
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
    this.form.reset();
  }

  async sendForm() {
    try {
      if (this.form.valid) {
        const values = this.form.value;
        this.gestionProductosService.verifyID(values.id).subscribe(async (data: any) => {
          if (!data) {
            const response = await this.gestionProductosService.createProduct(values);
            if (response.status === 200) {
              this.modalMessageService.setStateModal(response.status);
              this.modalMessageService.open();
            }
          } else {
            const response = await this.gestionProductosService.updateProduct(values);
            if (response.status === 200) {
              this.modalMessageService.setStateModal(response.status);
              this.modalMessageService.open();
            } else {
              this.modalMessageService.setStateModal(202);
              this.modalMessageService.open();
            }
          }
        });
      }
    } catch (error: any) {
      console.log(error.message);
      this.modalMessageService.setStateModal('warning');
      this.modalMessageService.open();
    }
  }

  goBack(): void {
    this.router.navigate(['/productos/gestion-productos'], { relativeTo: this.route })
  }
}
