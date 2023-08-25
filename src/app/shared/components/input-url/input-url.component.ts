import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-input-url',
  templateUrl: './input-url.component.html',
  styleUrls: ['./input-url.component.scss']
})
export class InputUrlComponent {
  @Input() dataComponent: any;

}
