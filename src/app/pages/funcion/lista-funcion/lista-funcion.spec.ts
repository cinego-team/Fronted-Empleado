import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaFuncion } from './lista-funcion';

describe('ListaFuncion', () => {
  let component: ListaFuncion;
  let fixture: ComponentFixture<ListaFuncion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaFuncion]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaFuncion);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
