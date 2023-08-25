import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GestionProductosComponent } from './gestion-productos.component';
import { SharedModule } from 'src/app/shared/shared.module';

describe('GestionProductosComponent', () => {
  let component: GestionProductosComponent;
  let fixture: ComponentFixture<GestionProductosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ 
        SharedModule
      ],
      declarations: [
        GestionProductosComponent
      ]
    });
    fixture = TestBed.createComponent(GestionProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
