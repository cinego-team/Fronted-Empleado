import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistrarFuncion } from './registrar-funcion';

describe('RegistrarFuncion', () => {
  let component: RegistrarFuncion;
  let fixture: ComponentFixture<RegistrarFuncion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrarFuncion]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrarFuncion);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
