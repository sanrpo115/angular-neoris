import { Component, OnInit } from '@angular/core';
import { ModalMessageService } from '../../services/modal-message.service';
import { Observable, of, Subscription } from 'rxjs';

@Component({
  selector: 'app-modal-message',
  templateUrl: './modal-message.component.html',
  styleUrls: ['./modal-message.component.scss']
})
export class ModalMessageComponent implements OnInit {
  title: string = 'Titulo';
  message: string = 'Mensaje';
  display$: Observable<'open' | 'close'> = of('close');
  subscriptions: Subscription = new Subscription();

  constructor(private modalMessageService: ModalMessageService) {
    this.subscriptions = this.modalMessageService.title.subscribe((txt: string) => {
      this.title = txt;
    });
    this.subscriptions = this.modalMessageService.message.subscribe((txt: string) => {
      this.message = txt;
    });
  }

  ngOnInit() {
    this.display$ = this.modalMessageService.watch();
  }

  close() {
    this.modalMessageService.close();
  }

}
