import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerFuncion } from './ver-funcion';

describe('VerFuncion', () => {
  let component: VerFuncion;
  let fixture: ComponentFixture<VerFuncion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerFuncion]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerFuncion);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
