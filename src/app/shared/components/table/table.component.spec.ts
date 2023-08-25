import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableComponent } from './table.component';
import { SharedModule } from '../../shared.module';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ SharedModule ],
      declarations: [TableComponent]
    });
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should toggle dropdown when window is clicked', () => {
  //   const fakeEvent = { target: { classList: { contains: (className: string) => className === 'actions' }}} as Event;

  //   component.activeDropdown = { id: 1, dropdownOpen: true }; // Define el estado inicial
  //   component.datasource = [{ id: 1, dropdownOpen: true }];

  //   component.onWindowClick(fakeEvent);

  //   expect(component.datasource[0].dropdownOpen).toBe(false);
  // });

});
