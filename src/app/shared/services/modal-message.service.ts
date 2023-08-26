import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DEFAULT_MSSG } from '../constants/constants';

@Injectable({
  providedIn: 'root'
})
export class ModalMessageService {
  private defaultMessage: any = DEFAULT_MSSG;
  private display: BehaviorSubject<'open' | 'close'> = new BehaviorSubject<'open' | 'close'>('close');
  title: BehaviorSubject<any> = new BehaviorSubject<any>('Modal Title');
  message: BehaviorSubject<any> = new BehaviorSubject<any>('Modal Message');

  setTitle(state: string | number): void {
    this.title.next(this.defaultMessage[state].title);
  }

  setMessage(state: string | number): void {
    this.message.next(this.defaultMessage[state].message);
  }

  setStateModal(state: string | number): void {
    this.setTitle(state);
    this.setMessage(state);
  }

  watch(): Observable<'open' | 'close'> {
    return this.display.asObservable();
  }

  open() {
    this.display.next('open');
  }

  close() {
    this.display.next('close');
  }

}
