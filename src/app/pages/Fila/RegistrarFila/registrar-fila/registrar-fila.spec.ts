import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarFila } from './registrar-fila';

describe('RegistrarFila', () => {
  let component: RegistrarFila;
  let fixture: ComponentFixture<RegistrarFila>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrarFila]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrarFila);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
