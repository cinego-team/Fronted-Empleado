import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaRol } from './lista-rol';

describe('ListaRol', () => {
  let component: ListaRol;
  let fixture: ComponentFixture<ListaRol>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaRol]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaRol);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
