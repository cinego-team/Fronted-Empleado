import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarPromocion } from './registrar-promocion';

describe('RegistrarPromocion', () => {
  let component: RegistrarPromocion;
  let fixture: ComponentFixture<RegistrarPromocion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrarPromocion]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrarPromocion);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
