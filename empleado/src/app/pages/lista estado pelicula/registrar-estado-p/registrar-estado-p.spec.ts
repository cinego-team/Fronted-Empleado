import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarEstadoP } from './registrar-estado-p';

describe('RegistrarEstadoP', () => {
  let component: RegistrarEstadoP;
  let fixture: ComponentFixture<RegistrarEstadoP>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrarEstadoP]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrarEstadoP);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
