import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ModalMessageComponent } from './modal-message.component';
import { ModalMessageService } from '../../services/modal-message.service'; // Replace with the actual import path
import { Subject, of } from 'rxjs';


describe('ModalMessageComponent', () => {
  let component: ModalMessageComponent;
  let fixture: ComponentFixture<ModalMessageComponent>;
  let mockModalMessageService: any;

  beforeEach(async () => {
    mockModalMessageService = jasmine.createSpyObj(['title', 'message', 'close']);
    mockModalMessageService.title = of('Mock Title');
    mockModalMessageService.message = of('Mock Message');
    mockModalMessageService.watch = jasmine.createSpy('watch').and.returnValue(of('open'));

    await TestBed.configureTestingModule({
      declarations: [ModalMessageComponent],
      providers: [
        { provide: ModalMessageService, useValue: mockModalMessageService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize title, message, and display$', () => {
    expect(component.title).toBe('Mock Title');
    expect(component.message).toBe('Mock Message');
    expect(component.display$).toBeTruthy();
  });

  it('should close modal via modalMessageService', () => {
    component.close();
    expect(mockModalMessageService.close).toHaveBeenCalled();
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });
});
