import { Component, Input } from '@angular/core';
import * as moment from 'moment';
import { enviroment } from 'src/enviroments/enviroment';

@Component({
  selector: 'app-input-date',
  templateUrl: './input-date.component.html',
  styleUrls: ['./input-date.component.scss']
})
export class InputDateComponent {
  @Input() dataComponent: any;
  keyAddReview: string = enviroment.key_for_review;

  getCurrentDate(): string {
    let date = '';
    const today = moment().format('YYYY-MM-DD');
    if (this.dataComponent.min === enviroment.days_for_review) {
      date = moment(today).add(enviroment.days_for_review, 'days').format('YYYY-MM-DD');
    } else {
      date = `${today}`
    }
    return date;
  }

}
