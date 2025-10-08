import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaClasificacion } from './lista-clasificacion';

describe('ListaClasificacion', () => {
  let component: ListaClasificacion;
  let fixture: ComponentFixture<ListaClasificacion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaClasificacion]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaClasificacion);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
