import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarTipoCliente } from './editar-tipo-cliente';

describe('EditarTipoCliente', () => {
  let component: EditarTipoCliente;
  let fixture: ComponentFixture<EditarTipoCliente>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarTipoCliente]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarTipoCliente);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
