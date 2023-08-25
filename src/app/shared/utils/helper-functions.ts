import * as moment from 'moment';
import { enviroment } from 'src/enviroments/enviroment';

export class HelperFunctions {

  constructor() { }

  public static getFormatDate = (date: string, days: number): string => {
    let returnDate = '';
    const newDate = moment(date).format('YYYY-MM-DD');
    if (days === enviroment.days_for_review) {
      returnDate = moment(newDate).add(enviroment.days_for_review, 'days').format('YYYY-MM-DD');
    } else {
      returnDate = `${newDate}`
    }
    return returnDate;
  }
}
