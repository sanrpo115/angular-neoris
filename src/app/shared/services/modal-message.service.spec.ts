import { TestBed } from '@angular/core/testing';
import { ModalMessageService } from './modal-message.service';

describe('ModalMessageService', () => {
  let service: ModalMessageService;

  const mockDefaultMssg = {
    success: { title: 'Success Title', message: 'Success Message' },
    warning: { title: 'Warning Title', message: 'Warning Message' },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModalMessageService);
    service.defaultMessage = mockDefaultMssg;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set title based on state', () => {
    service.setTitle('success');
    expect(service.title.getValue()).toBe('Success Title');
  });

  it('should set message based on state', () => {
    service.setMessage('success');
    expect(service.message.getValue()).toBe('Success Message');
  });

  it('should set title and message based on state', () => {
    service.setStateModal('warning');
    expect(service.title.getValue()).toBe('Warning Title');
    expect(service.message.getValue()).toBe('Warning Message');
  });

});