import * as moment from 'moment';
import { enviroment } from 'src/enviroments/enviroment';

export class HelperFunctions {

  constructor() { }

  public static getFormatDate = (days: number): string => {
    let date = '';
    const today = moment().format('YYYY-MM-DD');
    if (days === enviroment.days_for_review) {
      date = moment(today).add(enviroment.days_for_review, 'days').format('YYYY-MM-DD');
    } else {
      date = `${today}`
    }
    return date;
  }
}
