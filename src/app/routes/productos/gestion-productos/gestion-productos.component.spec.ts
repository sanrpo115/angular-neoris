import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GestionProductosComponent } from './gestion-productos.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { GestionProductosService } from 'src/app/shared/services/gestion-productos.service';
import { CoreModule } from 'src/app/core/core.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('GestionProductosComponent', () => {
  let component: GestionProductosComponent;
  let fixture: ComponentFixture<GestionProductosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ 
        SharedModule,
        CoreModule,
        HttpClientTestingModule
      ],
      providers: [
        GestionProductosService
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
