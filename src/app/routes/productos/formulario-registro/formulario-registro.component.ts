import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { enviroment } from 'src/enviroments/enviroment';
import { FIELDS_FORM } from 'src/app/shared/constants/constants';
import { HelperFunctions } from 'src/app/shared/utils/helper-functions';
import { GestionProductosService } from 'src/app/shared/services/gestion-productos.service';
import * as moment from 'moment';
import { ModalMessageService } from 'src/app/shared/services/modal-message.service';

@Component({
  selector: 'app-formulario-registro',
  templateUrl: './formulario-registro.component.html',
  styleUrls: ['./formulario-registro.component.scss']
})
export class FormularioRegistroComponent {
  formConfiguration = new Array();
  form: FormGroup;
  isEdit: boolean = false;
  idActive: any = '' || null;
  modalOpen: boolean = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private gestionProductosService: GestionProductosService,
    private modalMessageService: ModalMessageService
  ) {
    this.form = this.createFormGroup();
    this.form.get('date_release')?.valueChanges.subscribe(newValue => {
      this.onControlDateValueChanges(newValue);
    })
  }

  ngOnInit(): void {
    this.formConfiguration = FIELDS_FORM.fields;
    this.route.paramMap.subscribe(params => {
      if (params.has('id')) {
        this.isEdit = true;
        this.idActive = params.get('id');
        console.log(this.idActive);
      }
    });
  }

  createFormGroup(): FormGroup {
    const today = moment().format('YYYY-MM-DD');
    return this.fb.group({
      id: this.fb.control('', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]),
      name: this.fb.control('', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]),
      description: this.fb.control('', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]),
      logo: this.fb.control('', [Validators.required]),
      // Se comenta control ya que la validacion Regex bloquea el formulario
      // logo: this.fb.control('', [Validators.required, Validators.pattern(/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/)]),
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
            console.log('resposn', response);
            if (response.status === 200) {
              this.modalMessageService.setStateModal(response.status);
              this.open();
            }
          } else {
            this.modalMessageService.setStateModal(202);
            this.open();
            console.log("ID existente")
          }
        });
      }
    } catch (error: any) {
      console.log(error.message);
      this.modalMessageService.setStateModal('warning');
      this.open();
    }
  }

  open() {
    this.modalMessageService.open();
  }
}
