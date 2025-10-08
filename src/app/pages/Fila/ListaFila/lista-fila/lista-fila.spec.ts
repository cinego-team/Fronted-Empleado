import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaFila } from './lista-fila';

describe('ListaFila', () => {
  let component: ListaFila;
  let fixture: ComponentFixture<ListaFila>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaFila]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaFila);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
