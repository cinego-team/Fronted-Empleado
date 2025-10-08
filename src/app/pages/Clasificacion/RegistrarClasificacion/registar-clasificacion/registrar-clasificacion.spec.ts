import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistarClasificacion } from './registar-clasificacion';

describe('RegistarClasificacion', () => {
  let component: RegistarClasificacion;
  let fixture: ComponentFixture<RegistarClasificacion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistarClasificacion]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistarClasificacion);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
