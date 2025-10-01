import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarPromocion } from './editar-promocion';

describe('EditarPromocion', () => {
  let component: EditarPromocion;
  let fixture: ComponentFixture<EditarPromocion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarPromocion]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarPromocion);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
