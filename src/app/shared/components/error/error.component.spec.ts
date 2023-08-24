import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ErrorComponent } from './error.component';

describe('ErrorComponent', () => {
  let router: Router;
  let component: ErrorComponent;
  let fixture: ComponentFixture<ErrorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Router],
      declarations: [ErrorComponent]
    });
    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(ErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to home', () => {
    spyOn(router, 'navigate');
    component.navigateHome();
    expect(router.navigate).toHaveBeenCalledWith(['']);
  });

});
