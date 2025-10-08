import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarTipoCliente } from './registrar-tipo-cliente';

describe('RegistrarTipoCliente', () => {
  let component: RegistrarTipoCliente;
  let fixture: ComponentFixture<RegistrarTipoCliente>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrarTipoCliente]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrarTipoCliente);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
